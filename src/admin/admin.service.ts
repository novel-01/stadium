import { FindAdminDto } from './dto/find-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  HttpException, HttpStatus
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from 'src/mail/mail.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid'
import { Response } from 'express';
import { Op } from 'sequelize';
import {PhoneAdminDto} from "./dto/phone-admin.dto";
import * as otpGenerator from 'otp-generator'
import {BotService} from "../bot/bot.service";
import {AddMinutesToDate} from "../helpers/addMinute";
import {Otp} from "../otp/models/otp.model";
import {dates, decode, encode} from "../helpers/crypto";
import { VerifyOtpDto } from './dto/verifyOtp.dto';


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    @InjectModel(Otp) private otpRepository: typeof Otp,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly botService: BotService,
    ) {}

    // Register admin
  async registration(createAdminDto: CreateAdminDto, res: Response) {
    
    const admin = await this.adminRepository.findOne({
      where: {username: createAdminDto.username}
    });
    
    if (admin) {
      throw new BadRequestException('Username already registered!');
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Passwords do not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 12)
    const newAdmin = await this.adminRepository.create({
      ...createAdminDto,
      hashed_password
    });

    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const uniqueKey: string = v4()

    const updatedAdmin = await this.adminRepository.update({
      hashed_refresh_token,
      activation_link: uniqueKey
    },
    {
      where: {id: newAdmin.id}, returning: true
    })
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    try {
      await this.mailService.sendAdminConfirmation(updatedAdmin[1][0])
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'Admin registered',
      admin: updatedAdmin[1][0],
      tokens
    }
    return response;
  }
  
  // activate admin
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not gound')
    }
    const updatedAdmin = await this.adminRepository.update(
      {is_active: true}, 
      {where: {activation_link: link, is_active: false}, returning: true}
    )
    if (!updatedAdmin) {
      throw new BadRequestException('Admin already activated')
    }
    const response = {
      message: 'Admin activated Successfully',
      admin: updatedAdmin
    }
    return response
  }

  // Login admin
  async login (loginAdminDto: LoginAdminDto, res: Response) {
    const {email, password} = loginAdminDto
    const admin = await this.adminRepository.findOne({where: {email}})
    if (!admin) throw new UnauthorizedException('Admin not found')
    if (!admin.is_active) throw new BadRequestException('Admin not active')

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password)
    if (!isMatchPass) throw new UnauthorizedException('Admin not found')

    const tokens = await this.getTokens(admin)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12)

    const updatedAdmin = await this.adminRepository.update(
      {hashed_refresh_token},
      {where: {id: admin.id}, returning: true}
    )
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })
    const response = {
      message: "Admin Logged In",
      user: updatedAdmin[1][0],
      tokens
    }
    return response;
  }

  // Log out admin
  async logout (refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken,
      {
        secret: process.env.REFRESH_TOKEN_KEY
      });
      
    if (!adminData) throw new ForbiddenException('Admin not found')
    
    const updatedAdmin = await this.adminRepository.update(
      {hashed_refresh_token: null},
      {where: {id: adminData.id}, returning: true}
    )

    res.clearCookie('refresh_token')
    const response = {
      message: 'Admin logged put successfully',
      user: updatedAdmin[1][0],
    }
    return response;
  }

  // Refresh Token admin
  async refreshToken (adminId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (adminId != decodedToken['id']) throw new BadRequestException('Admin not found')

    const admin = await this.adminRepository.findByPk(adminId);
    if (!admin || !admin.hashed_refresh_token) throw new BadRequestException('Admin not found')

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token
    )
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updateAdmin = await this.adminRepository.update(
      {hashed_refresh_token},
      {where: {id: adminId}, returning: true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    const response = {
      message: 'Token refreshed',
      admin: updateAdmin[1][0],
      tokens
    }
    return response;
  }

  // Find admin 
  async findAll(findAdminDto: FindAdminDto) {
    const where = {}

    if (findAdminDto.email) where['email'] = { [Op.like]: `%${findAdminDto.email}%`};
    if (findAdminDto.username) where['username'] = { [Op.like]: `%${findAdminDto.username}%`};
    if (findAdminDto.telegram_link) where['telegram_link'] = { [Op.like]: `%${findAdminDto.telegram_link}%`};
    
    const admins = await this.adminRepository.findAll({where, include: {all: true}},)
    if (!admins) throw new BadRequestException('No admins found')

    return admins;
  }


  // Send OTP

  async sendOtp(phoneAdminDto: PhoneAdminDto) {
    const phone_number = phoneAdminDto.phone;
    const otp = await otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })
    const isSend = await this.botService.sendOTP(phone_number, otp);
    if (!isSend) throw new HttpException('Please Sign Up firstly', HttpStatus.BAD_REQUEST)

    const now = new Date()
    const expiration_time = AddMinutesToDate(now, 5);

    await this.otpRepository.destroy({where: {chesk: phone_number}})

    const newOtp = await this.otpRepository.create({id: v4(), otp, expiration_time, chesk: phone_number});

    const details = {
      timestamp: now,
      chesk: phone_number,
      otp_id: newOtp.id
    }

    const encoded = await encode(JSON.stringify(details))

    return {message: 'Success', Details: encoded}
  }

  // Verify OTP
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const {verification_key, otp, chesk} = verifyOtpDto
    
    const currentDate = new Date()
    const decoded = await decode(verification_key)
    const details = JSON.parse(decoded)

    if (details.chesk != chesk) throw new BadRequestException('Otp Did not send to this Number')

    const result = await this.otpRepository.findOne({where: {id: details.otp_id}})

    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentDate)) {
          if (otp === result.otp) {
            const admin = await this.adminRepository.findOne({where: {phone_number: chesk}})
            if (admin) { 
              const updatedAdmin = await this.adminRepository.update(
                {is_creator: true},
                {where: {id: admin.id}, returning: true}
              )
              await this.otpRepository.update(
                {verified: true},
                {where: {id: details.otp_id}, returning: true}
              )
              const response = {
                message: "Admin updated as owner",
                admin: updatedAdmin[1][0]
              }
              return response
            } else {
              throw new BadRequestException('Admin did not found')
            }
          } else {
            throw new BadRequestException('Otps did not match')
          }
        } else {
          throw new BadRequestException('Otp expired')
        }
      } else {
        throw new BadRequestException('Otp already verified')
      }
    } else {
      throw new BadRequestException('Otp did not found')
    } 
  
  }




  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  };

}
