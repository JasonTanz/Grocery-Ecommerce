import { Module } from '@nestjs/common';
import { cartsProviders } from './cart-item.provider';
import { CartItemService } from './cart-item.service';
import { CartItemResolver } from './cart-item.resolver';

@Module({
  providers: [...cartsProviders, CartItemService, CartItemResolver],
  exports: [...cartsProviders],
})
export class CartItemModule {}
