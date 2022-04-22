import { Module } from '@nestjs/common';
import { cartsProviders } from './cartItem.provider';

@Module({
  providers: [...cartsProviders],
  exports: [...cartsProviders],
})
export class CartItemModule {}
