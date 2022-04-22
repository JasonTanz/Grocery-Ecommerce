import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../constants/index';
import { order } from 'src/models/order';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: typeof order,
  ) {}

  async createOrder(data: CreateOrderInput): Promise<order> {
    return await this.orderRepo.create(data);
  }

  async findAll(): Promise<order[]> {
    return await this.orderRepo.findAll();
  }

  async findById(id: string): Promise<order> {
    return await this.orderRepo.findOne({
      where: {
        order_id: id,
      },
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
}
