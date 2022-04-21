import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpCustInput {
  @Field()
  cust_username: string;

  @Field()
  cust_email: string;

  @Field()
  cust_password: string;
}
