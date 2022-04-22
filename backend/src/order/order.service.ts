import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../constants/index';
import { order } from 'src/models/order';
import { CreateOrderInput } from './dto/create-order.input';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: typeof order,
  ) {}

  async createOrder(data: CreateOrderInput): Promise<order> {
    return await this.orderRepo.create(data);
  }
}
