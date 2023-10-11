import { FindAdminDto } from './dto/find-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { CookieGetter } from 'src/decorators/cookie-getter.decorator';
import { PhoneAdminDto } from './dto/phone-admin.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({summary: 'create Admin'})
  @ApiResponse({status: 201, type: Admin})
  registration(@Body() createAdminDto: CreateAdminDto, @Res({passthrough: true}) res: Response) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({summary: 'activate Admin'})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('activate/:link')
  activate (@Param('link') link: string) {
      return this.adminService.activate(link)
  }

  @ApiOperation({summary: 'Login Admin'})
  @ApiResponse({status: 200, type: [Admin]})
  @Post('login')
  login (
    @Body() loginAdminDto: LoginAdminDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({summary: 'Logout Admin'})
  @ApiResponse({status: 200, type: [Admin]})
  @UseGuards(AdminGuard)
  @Post('logout')
  logout (
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({passthrough: true}) res: Response
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({summary: 'Refresh Token'})
  @ApiResponse({status: 200, type: [Admin]})
  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: number, @CookieGetter('refresh_token') refreshToken: string, 
    @Res({passthrough: true}) res: Response
  ) {
    return this.adminService.refreshToken(id, refreshToken, res)
  }

  @Post('find')
  findAll(@Body() findAdminDto: FindAdminDto) {
    return this.adminService.findAll(findAdminDto);
  }

  // Send OTP
  @Post('send-otp')
  sendOtp(@Body() phoneAdminOtp: PhoneAdminDto) {
    return this.adminService.sendOtp(phoneAdminOtp)
  }

  // Verify OTP
  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.adminService.verifyOtp(verifyOtpDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
