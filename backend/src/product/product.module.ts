import { Module } from '@nestjs/common';
import { productsProviders } from './product.provider';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
@Module({
  providers: [ProductService, ...productsProviders, ProductResolver],
  exports: [ProductService, ...productsProviders],
})
export class ProductModule {}
