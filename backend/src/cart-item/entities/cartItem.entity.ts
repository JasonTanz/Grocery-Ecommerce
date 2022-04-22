import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { dataCart } from './dataCart.entity';

@ObjectType()
export class CartItems {
  @Field()
  cart_id: string;
  @Field(() => Int)
  item_qty: number;

  @Field(() => Customer)
  customer?: Customer;

  @Field(() => Product)
  product?: Product;

  @Field(() => dataCart)
  dataValues?: dataCart;
}
