import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class dataAdmin {
  @Field()
  admin_id: string;

  @Field()
  admin_username: string;

  @Field()
  admin_email: string;
}
