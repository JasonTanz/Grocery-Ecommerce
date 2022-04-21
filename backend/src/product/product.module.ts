import { Module } from '@nestjs/common';
import { productsProviders } from './product.provider';
import { ProductService } from './product.service';
@Module({
  providers: [ProductService, ...productsProviders],
  exports: [ProductService, ...productsProviders],
})
export class ProductModule {}
