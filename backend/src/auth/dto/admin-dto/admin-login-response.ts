import { Field, ObjectType } from '@nestjs/graphql';
import { Admin } from 'src/admin/entities/admin.entity';

@ObjectType()
export class AdminLoginResponse {
  @Field()
  access_token: string;

  @Field(() => Admin)
  admin: Admin;
}
