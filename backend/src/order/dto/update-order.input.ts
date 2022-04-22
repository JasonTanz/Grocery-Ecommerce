import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput {
  @Field({ nullable: true })
  order_id?: string;
  @Field({ nullable: true })
  order_status?: string;

  @Field({ nullable: true })
  order_delivery_address?: string;

  @Field({ nullable: true })
  order_phone_number?: string;

  @Field({ nullable: true })
  order_total_price?: number;

  @Field({ nullable: true })
  cust_id?: string;

  @Field({ nullable: true })
  product_id?: string;
}
