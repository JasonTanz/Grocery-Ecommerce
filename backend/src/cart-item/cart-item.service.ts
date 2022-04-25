import { Inject, Injectable } from '@nestjs/common';
import { product } from '../models/product';
import { CARTITEM_REPOSITORY } from '../constants/index';
import { cartItems } from '../models/cartItem';
import { CreateCartItemInput } from './dto/create-cartItems.input';
import { UpdateCartItemInput } from './dto/update-cartItems.input';
import { category } from 'src/models/category';

@Injectable()
export class CartItemService {
  constructor(
    @Inject(CARTITEM_REPOSITORY)
    private readonly cartItemRepo: typeof cartItems,
  ) {}

  async createCartItem(data: CreateCartItemInput): Promise<cartItems> {
    return await this.cartItemRepo.create(data);
  }

  async findAll(): Promise<cartItems[]> {
    return await this.cartItemRepo.findAll({
      include: [product],
    });
  }

  async findById(id: string): Promise<cartItems> {
    return await this.cartItemRepo.findOne({
      where: {
        cart_id: id,
      },
      include: [product],
    });
  }

  async updateById(data: UpdateCartItemInput, id: string) {
    const { cart_id, ...res } = data;
    return await this.cartItemRepo.update(res, {
      where: {
        cart_id: id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.cartItemRepo.destroy({
      where: {
        cart_id: id,
      },
    });
  }

  async findCartByCustId(cust_id: string): Promise<cartItems[]> {
    return await this.cartItemRepo.findAll({
      where: {
        cust_id,
      },
      include: [
        {
          model: product,
          include: [category],
        },
      ],
    });
  }
}
