import { Module } from '@nestjs/common';
import { cartsProviders } from './cartItem.provider';
import { CartItemService } from './cart-item.service';

@Module({
  providers: [...cartsProviders, CartItemService],
  exports: [...cartsProviders],
})
export class CartItemModule {}
