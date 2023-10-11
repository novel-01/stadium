import { Category } from './models/category.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor (@InjectModel(Category) private categoryRepository: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({where: {name: createCategoryDto.name}})
    if (category) {
      throw new BadRequestException('Category already exists')
    }
    return this.categoryRepository.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.categoryRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return this.categoryRepository.destroy({where: {id}});
  }
}
