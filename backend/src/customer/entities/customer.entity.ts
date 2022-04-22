import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { dataCust } from './dataCust.entity';
@ObjectType()
export class Customer {
  @Field()
  cust_id: string;

  @Field()
  cust_username: string;

  @Field()
  cust_email: string;

  @Field(() => [Order])
  Orders?: Order[];

  @Field(() => dataCust)
  dataValues?: dataCust;
}
