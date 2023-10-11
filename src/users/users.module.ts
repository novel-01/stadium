import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { BotModule } from 'src/bot/bot.module';
import { OtpModule } from 'src/otp/otp.module';
import { Otp } from 'src/otp/models/otp.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Otp]),
    JwtModule.register({}),
    MailModule,
    BotModule,
    OtpModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: []
})
export class UsersModule {}
