import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  product_id?: string;
  @Field({ nullable: true })
  product_name?: string;

  @Field({ nullable: true })
  product_brief_intro?: string;

  @Field({ nullable: true })
  product_description?: string;

  @Field({ nullable: true })
  product_img?: string;

  @Field({ nullable: true })
  product_price?: number;

  @Field({ nullable: true })
  product_qty?: number;
}
