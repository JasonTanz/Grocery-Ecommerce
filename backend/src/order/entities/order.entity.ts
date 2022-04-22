import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from 'src/customer/entities/customer.entity';
import { dataOrder } from './dataOrder.entity';
@ObjectType()
export class Order {
  @Field()
  order_id: string;

  @Field()
  order_status: string;

  @Field()
  order_delivery_addres: string;

  @Field()
  order_phone_number: string;

  @Field()
  order_total_price: number;

  @Field(() => Customer)
  customer?: Customer;

  @Field(() => dataOrder)
  dataValues?: dataOrder;
}
