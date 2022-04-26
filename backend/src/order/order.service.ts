import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../constants/index';
import { order } from 'src/models/order';

import { UpdateOrderInput } from './dto/update-order.input';
import { customer } from '../models/customer';
import { product } from '../models/product';
import { category } from '../models/category';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: typeof order,
  ) {}

  async createOrder(data): Promise<order[]> {
    return await this.orderRepo.bulkCreate(data.data);
  }

  async findAll(): Promise<order[]> {
    return await this.orderRepo.findAll({
      include: [
        {
          model: customer,
        },
        {
          model: product,
          include: [category],
        },
      ],
    });
  }

  async findById(id: string): Promise<order> {
    return await this.orderRepo.findOne({
      where: {
        order_id: id,
      },
      include: [{ model: customer }, { model: product, include: [category] }],
    });
  }

  async updateById(data: UpdateOrderInput, id: string) {
    const { order_id, ...res } = data;
    return await this.orderRepo.update(res, {
      where: {
        order_id: id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.orderRepo.destroy({
      where: {
        order_id: id,
      },
    });
  }

  async findByCustId(id: string): Promise<order[]> {
    return await this.orderRepo.findAll({
      where: {
        cust_id: id,
      },
      include: {
        model: product,
        include: [category],
      },
    });
  }
}
