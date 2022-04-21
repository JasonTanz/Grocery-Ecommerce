import { Field, ObjectType } from '@nestjs/graphql';
import { dataCust } from './dataCust.entity';
@ObjectType()
export class Customer {
  @Field()
  cust_id: string;

  @Field()
  cust_username: string;

  @Field()
  cust_email: string;

  @Field(() => dataCust)
  dataValues?: dataCust;
}
