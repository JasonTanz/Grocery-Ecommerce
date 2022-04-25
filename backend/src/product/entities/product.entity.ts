import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
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

  @Field(() => [Category])
  categories?: Category[];

  @Field(() => dataProduct)
  dataValues?: dataProduct;
}

@ObjectType()
export class PaginateProduct {
  @Field(() => [Product])
  data: Product[];
  @Field()
  currentPage: number;
  @Field()
  totalPages: number;
}
