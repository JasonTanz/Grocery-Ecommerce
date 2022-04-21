import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginCustomerInput {
  @Field()
  cust_email: string;

  @Field()
  cust_password: string;
}
