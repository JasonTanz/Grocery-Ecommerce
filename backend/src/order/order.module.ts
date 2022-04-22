import { Module } from '@nestjs/common';
import { ordersProviders } from './order.provider';
import { OrderService } from './order.service';

@Module({
  providers: [...ordersProviders, OrderService],
  exports: [...ordersProviders, OrderService],
})
export class OrderModule {}
