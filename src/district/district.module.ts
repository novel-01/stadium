import { Region } from './../region/models/region.model';
import { District } from './models/district.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([District, Region])
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
