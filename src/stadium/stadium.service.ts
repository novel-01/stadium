import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Stadium} from "./models/stadium.model";

@Injectable()
export class StadiumService {
  constructor(@InjectModel(Stadium) private stadiumRepositroy: typeof Stadium) {}
  async create(createStadiumDto: CreateStadiumDto, req: Request) {
    const findStadium = await this.stadiumRepositroy.findOne({where: {name: createStadiumDto.name}})
    if (findStadium) { throw new BadRequestException('Stadium with this name already exists!') }

    const stadium = {
      ...createStadiumDto,
      owner_id: req['userId']
    }
    const newStadium = await this.stadiumRepositroy.create(stadium)
    return newStadium;
  }

  findAll() {
    return this.stadiumRepositroy.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} stadium`;
  }

  update(id: number, updateStadiumDto: UpdateStadiumDto) {
    return `This action updates a #${id} stadium`;
  }

  remove(id: number) {
    return `This action removes a #${id} stadium`;
  }
}
