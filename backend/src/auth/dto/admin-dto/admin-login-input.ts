import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAdminInput {
  @Field()
  admin_email: string;

  @Field()
  admin_password: string;
}
