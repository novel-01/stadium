import { Module } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { StadiumController } from './stadium.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Stadium} from "./models/stadium.model";
import {UserGuard} from "../guards/user.guard";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  imports: [
      SequelizeModule.forFeature([Stadium]),
      JwtModule
  ],
  controllers: [StadiumController],
  providers: [StadiumService, UserGuard],
  exports: [StadiumService]
})
export class StadiumModule {}
