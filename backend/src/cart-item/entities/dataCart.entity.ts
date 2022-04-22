import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class dataCart {
  @Field()
  cart_id: string;

  @Field(() => Int)
  item_qty: number;
}
