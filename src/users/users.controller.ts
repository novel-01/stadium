import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Response} from 'express'
import { CookieGetter } from 'src/decorators/cookie-getter.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { UserGuard } from 'src/guards/user.guard';
import { PhoneUserDto } from './dto/phone-user.dto';
import {VerifyOtpDto} from "./dto/verifyOtp.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'register User'})
    @ApiResponse({status: 201, type: User})
    @Post('signup')
    registration (
        @Body() createUserDto: CreateUserDto,
        @Res({passthrough: true}) res: Response
    ) {
        return this.usersService.registration(createUserDto, res)
    }

    @ApiOperation({summary: 'activate User'})
    @ApiResponse({status: 200, type: [User]})
    @Get('activate/:link')
    activate (@Param('link') link: string) {
        return this.usersService.activate(link)
    }

    @ApiOperation({summary: 'login User'})
    @ApiResponse({status: 200, type: User})
    @Post('signin')
    login (
        @Body() loginUserDto: LoginUserDto,
        @Res({passthrough: true}) res: Response
    ) {
        return this.usersService.login(loginUserDto, res)
    }
    
    @ApiOperation({summary: 'logout User'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.OK)
    @Post('signout')
    logout (
        @CookieGetter('refresh_token') refresh_token: string,
        @Res({passthrough: true}) res: Response
    ) {
        return this.usersService.logout(refresh_token, res)
    }

    @ApiOperation({summary: 'refresh Token'})
    @ApiResponse({status: 200, type: User})
    @Post(':id/refresh')
    refresh(
        @Param('id') id: number,
        @CookieGetter('refresh_token') refreshToken: string,
        @Res({passthrough: true}) res: Response
    ) {
        return this.usersService.refreshToken(id, refreshToken, res)
    }

    // New OTP
    @Post('/otp')
    newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOTP(phoneUserDto)
  }


    // Verify OTP
    @Post('verify-otp')
    verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.usersService.verifyOtp(verifyOtpDto)
    }

    @ApiOperation({summary: 'Get All Users'})
    @ApiResponse({status: 200, type: [User]})
    @Post('find')
    findAllUsers (@Body() findUserDto: FindUserDto) {
        return this.usersService.findAll(findUserDto);
    }

    @ApiOperation({summary: 'Get User By ID'})
    @ApiResponse({status: 200, type: [User]})
    @Get(':id')
    findUser (@Param('id') id: string) {
        return this.usersService.findUser(+id);
    }


    @ApiOperation({summary: 'Get All Users'})
    @ApiResponse({status: 200, type: [User]})
    @Delete()
    deleteUser (@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }

    @ApiOperation({summary: 'Update User'})
    @ApiResponse({status: 200, type: [User]})
    @Patch()
    updateUser () {}


}
