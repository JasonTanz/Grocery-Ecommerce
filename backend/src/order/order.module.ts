import { Module } from '@nestjs/common';
import { ordersProviders } from './order.provider';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';

@Module({
  providers: [...ordersProviders, OrderService, OrderResolver],
  exports: [...ordersProviders, OrderService],
})
export class OrderModule {}
