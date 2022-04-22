import { Inject, Injectable } from '@nestjs/common';
import { CARTITEM_REPOSITORY } from '../constants/index';
import { cartItems } from '../models/cartItem';
import { CreateCartItemInput } from './dto/create-cartItems.input';

@Injectable()
export class CartItemService {
  constructor(
    @Inject(CARTITEM_REPOSITORY)
    private readonly cartItemRepo: typeof cartItems,
  ) {}

  async createCartItem(data: CreateCartItemInput): Promise<cartItems> {
    return await this.cartItemRepo.create(data);
  }
}
