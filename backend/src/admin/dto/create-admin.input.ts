import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field()
  admin_username: string;

  @Field()
  admin_email: string;

  @Field()
  admin_password: string;
}
