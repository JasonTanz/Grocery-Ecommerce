import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../constants/index';
import { category } from '../models/category';
import { CreateCategoryInput } from './dto/create-category.input';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: typeof category,
  ) {}

  async createCategory(data: CreateCategoryInput): Promise<category> {
    return await this.categoryRepo.create(data);
  }

  async findAll(): Promise<category[]> {
    return await this.categoryRepo.findAll();
  }

  async findById(id: string): Promise<category> {
    return await this.categoryRepo.findOne({
      where: {
        category_id: id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.categoryRepo.destroy({
      where: {
        category_id: id,
      },
    });
  }
}
