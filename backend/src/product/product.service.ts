import { Inject, Injectable } from '@nestjs/common';
import { product } from 'src/models/product';
import { PRODUCT_REPOSITORY } from '../constants/index';
import { CreateProductInput } from './dto/create-product.input';
@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: typeof product,
  ) {}

  async createProduct(data: CreateProductInput): Promise<product> {
    return await this.productRepo.create(data);
  }

  async findAll(): Promise<product[]> {
    return await this.productRepo.findAll();
  }

  async findById(id: string): Promise<product> {
    return await this.productRepo.findOne({
      where: {
        product_id: id,
      },
    });
  }

  async updateById(data, id: string) {
    return await this.productRepo.update(data, {
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
}
