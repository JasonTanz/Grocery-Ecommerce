import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field()
  cust_id: string;

  @Field()
  cust_username: string;

  @Field()
  cust_email: string;
}
