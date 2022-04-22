import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  product_name: string;

  @Field()
  product_brief_intro: string;

  @Field()
  product_description: string;

  @Field()
  product_img: string;

  @Field()
  product_price: number;

  @Field()
  product_qty: number;

  @Field(() => [String])
  categories: string[];
}
