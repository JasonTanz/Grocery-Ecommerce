import { Module } from '@nestjs/common';
import { productsProviders } from './product.provider';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductHelper } from './product.helper';
@Module({
  providers: [
    ProductService,
    ...productsProviders,
    ProductResolver,
    ProductHelper,
  ],
  exports: [ProductService, ...productsProviders],
})
export class ProductModule {}
