import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { dataCat } from './dataCat.entity';

@ObjectType()
export class Category {
  @Field()
  category_id: string;

  @Field()
  category_name: string;

  @Field(() => [Product])
  products?: Product[];

  @Field(() => dataCat)
  dataValues?: dataCat;
}
