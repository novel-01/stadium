import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor (@InjectModel(Region) private regionRepository: typeof Region) {}

  async create(createRegionDto: CreateRegionDto) {
    const region = await this.regionRepository.findOne({where: {name: createRegionDto.name}});
    
    if (region) {
      throw new BadRequestException('Region already exists')
    }
    return this.regionRepository.create(createRegionDto);
  }

  findAll() {
    return this.regionRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.regionRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return this.regionRepository.destroy({where: {id}});
  }
}
