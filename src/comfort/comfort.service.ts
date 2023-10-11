import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { Comfort } from './models/comfort.model';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortRepository: typeof Comfort) {}
  
  async create(createComfortDto: CreateComfortDto) {
    const comfort = await this.comfortRepository.findOne({where: {name: createComfortDto.name}})
    if (comfort) {
      throw new BadRequestException('Comfort already exists')
    }
    return this.comfortRepository.create(createComfortDto);
  }

  findAll() {
    return this.comfortRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.comfortRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateComfortDto: UpdateComfortDto) {
    return this.comfortRepository.update(updateComfortDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.comfortRepository.destroy({where: {id}});
  }
}
