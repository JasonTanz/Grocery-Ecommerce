import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class dataOrder {
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
}
