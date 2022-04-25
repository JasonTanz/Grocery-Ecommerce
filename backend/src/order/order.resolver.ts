import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateOrderInputAll } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}
  @Mutation(() => [Order])
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInputAll,
  ) {
    return await this.orderService.createOrder(createOrderInput);
  }

  @Query(() => [Order], { name: 'Orders' })
  async findAll() {
    return await this.orderService.findAll();
  }

  @Query(() => Order, { name: 'Order' })
  async findById(@Args('order_id') order_id: string) {
    return await this.orderService.findById(order_id);
  }

  @Mutation(() => Order, { name: 'UpdateOrderById' })
  async updateById(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    await this.orderService.updateById(
      updateOrderInput,
      updateOrderInput.order_id,
    );
    return await this.orderService.findById(updateOrderInput.order_id);
  }

  @Mutation(() => String, { name: 'DeleteOrderById' })
  async deleteById(@Args('order_id') order_id: string) {
    await this.orderService.deleteById(order_id);
    return `Order with the id ${order_id} successfully deleted`;
  }
}
