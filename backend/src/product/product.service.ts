import { Inject, Injectable } from '@nestjs/common';
import { category } from '../models/category';
import { product } from 'src/models/product';
import { PRODUCT_REPOSITORY } from '../constants/index';

import { UpdateProductInput } from './dto/update-product.input';
import { Op } from 'sequelize';
@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: typeof product,
  ) {}

  async createProduct(data): Promise<product> {
    const { categories, ...res } = data;

    return await this.productRepo.create(res);
  }

  async findAll(): Promise<product[]> {
    return await this.productRepo.findAll({
      include: [category],
    });
  }

  async findById(id: string): Promise<product> {
    return await this.productRepo.findOne({
      where: {
        product_id: id,
      },
      include: [category],
    });
  }

  async updateById(data: UpdateProductInput, id: string) {
    const { product_id, ...res } = data;
    return await this.productRepo.update(res, {
      where: {
        product_id: id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.productRepo.destroy({
      where: {
        product_id: id,
      },
    });
  }

  async findByKeywords(keywords: string) {
    return await this.productRepo.findAll({
      where: {
        product_name: {
          [Op.iLike]: '%' + keywords.toLowerCase() + '%',
        },
      },
      include: [category],
    });
  }
}
