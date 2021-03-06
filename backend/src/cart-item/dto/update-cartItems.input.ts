import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCartItemInput {
  @Field({
    nullable: true,
  })
  cart_id?: string;
  @Field(() => Int, { nullable: true })
  item_qty?: number;

  @Field({ nullable: true })
  cust_id?: string;

  @Field({ nullable: true })
  product_id?: string;
}
