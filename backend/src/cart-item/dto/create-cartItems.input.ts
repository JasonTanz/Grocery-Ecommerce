import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCartItemInput {
  @Field(() => Int)
  item_qty: number;

  @Field()
  cust_id: string;

  @Field()
  product_id: string;
}

@InputType()
export class BulkDeleteCartItemById {
  @Field(() => [String])
  cart_id: string[];
}
