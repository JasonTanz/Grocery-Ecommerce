import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '../../../customer/entities/customer.entity';

@ObjectType()
export class CustLoginResponse {
  @Field()
  access_token: string;

  @Field(() => Customer)
  customer: Customer;
}
