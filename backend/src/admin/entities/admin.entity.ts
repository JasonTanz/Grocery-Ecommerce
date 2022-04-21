import { Field, ObjectType } from '@nestjs/graphql';
import { dataAdmin } from './dataAdmin.entity';

@ObjectType()
export class Admin {
  @Field()
  admin_id: string;

  @Field()
  admin_username: string;

  @Field()
  admin_email: string;

  @Field(() => dataAdmin)
  dataValues?: dataAdmin;
}
