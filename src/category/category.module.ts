import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './models/category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Category]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: []
})
export class CategoryModule {}
