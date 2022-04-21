import { Field, ObjectType } from '@nestjs/graphql';
import { dataProduct } from './dataProduct.entity';
@ObjectType()
export class Product {
  @Field()
  product_id: string;

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

  @Field(() => dataProduct)
  dataValues?: dataProduct;
}
