import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './models/admin.model';
import { MailModule } from 'src/mail/mail.module';
import {OtpModule} from "../otp/otp.module";
import {BotModule} from "../bot/bot.module";
import { Otp } from '../otp/models/otp.model';
import { AdminGuard } from '../guards/admin.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Otp]),
    JwtModule.register({}),
    MailModule,
    OtpModule,
    BotModule
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminGuard],
  exports: []
})
export class AdminModule {}
