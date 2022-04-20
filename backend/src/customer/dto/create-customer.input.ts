import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field()
  cust_id: string;

  @Field()
  cust_username: string;

  @Field()
  cust_email: string;

  @Field()
  cust_password: string;
}
