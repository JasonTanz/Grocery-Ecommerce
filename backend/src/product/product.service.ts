import { Inject, Injectable } from '@nestjs/common';
import { category } from '../models/category';
import { product } from 'src/models/product';
import { PRODUCT_REPOSITORY } from '../constants/index';

import { UpdateProductInput } from './dto/update-product.input';
import { Op } from 'sequelize';
import { SimilarProducts } from './dto/get-products.input';
@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: typeof product,
  ) {}

  async createProduct(data): Promise<product> {
    const { categories, ...res } = data;

    return await this.productRepo.create(res);
  }

  async findSimilarProducts(category_name: SimilarProducts) {
    return await this.productRepo.findAll({
      include: [
        {
          model: category,
          where: {
            category_name: category_name.category_name,
          },
        },
      ],
    });
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

  async findPopular(limit: number) {
    return await this.productRepo.findAll({
      limit,
      include: [category],
    });
  }

  async findAllPaginate(
    keywords: string | null,
    limit: number,
    offset: number,
    condition,
    condition_2,
  ) {
    return await this.productRepo.findAndCountAll({
      distinct: true,
      where: condition,
      limit,
      offset,
      include: [
        {
          model: category,
          where: condition_2,
        },
      ],
    });
  }
}
