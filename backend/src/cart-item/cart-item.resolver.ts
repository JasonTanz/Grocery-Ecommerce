import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartItemService } from './cart-item.service';
import {
  BulkDeleteCartItemById,
  CreateCartItemInput,
} from './dto/create-cartItems.input';
import { UpdateCartItemInput } from './dto/update-cartItems.input';
import { CartItems } from './entities/cartItem.entity';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) {}

  @Mutation(() => CartItems)
  async createCartItem(
    @Args('createCartItemInput') createCartItemInput: CreateCartItemInput,
  ) {
    return await this.cartItemService.createCartItem(createCartItemInput);
  }

  @Query(() => [CartItems], { name: 'CartItems' })
  async findAll() {
    return await this.cartItemService.findAll();
  }

  @Query(() => CartItems, { name: 'CartItem' })
  async findById(@Args('cart_id') cart_id: string) {
    return await this.cartItemService.findById(cart_id);
  }

  @Query(() => [CartItems], { name: 'findCartByCustId' })
  async findCartByCustId(@Args('cust_id') cust_id: string) {
    return await this.cartItemService.findCartByCustId(cust_id);
  }

  @Mutation(() => CartItems, { name: 'UpdateCartItemById' })
  async updateById(
    @Args('updateCartItemInput') updateCartItemInput: UpdateCartItemInput,
  ) {
    await this.cartItemService.updateById(
      updateCartItemInput,
      updateCartItemInput.cart_id,
    );
    return await this.cartItemService.findById(updateCartItemInput.cart_id);
  }

  @Mutation(() => String, { name: 'DeleteCartItemById' })
  async deleteById(@Args('cart_id') cart_id: string) {
    await this.cartItemService.deleteById(cart_id);
    return `${cart_id}`;
  }

  @Mutation(() => [String], { name: 'BulkDeleteCartItemById' })
  async bulkDelete(@Args('cart_id') cart_id: BulkDeleteCartItemById) {
    await this.cartItemService.bulkDelete(cart_id);
    return cart_id.cart_id;
  }
}
