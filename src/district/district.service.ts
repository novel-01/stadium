import { District } from './models/district.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor (@InjectModel(District) private districtRepository: typeof District) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const district = await this.districtRepository.findOne({where: {name: createDistrictDto.name}});
    if (district) {
      throw new BadRequestException('District already exists')
    }
    return this.districtRepository.create(createDistrictDto);
  }

  findAll() {
    return this.districtRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.districtRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return ;
  }

  remove(id: number) {
    return this.districtRepository.destroy({where: {id}});
  }
}
