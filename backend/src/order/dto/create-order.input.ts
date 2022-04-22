import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  order_status: string;

  @Field()
  order_delivery_address: string;

  @Field()
  order_phone_number: string;

  @Field()
  order_total_price: number;

  @Field()
  cust_id: string;
}
