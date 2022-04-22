import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field({
    nullable: true,
  })
  category_id?: string;
  @Field({ nullable: true })
  category_name?: string;
}
