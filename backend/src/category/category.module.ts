import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoriesProviders } from './category.provider';
import { CategoryResolver } from './category.resolver';
@Module({
  providers: [CategoryService, ...categoriesProviders, CategoryResolver],
  exports: [...categoriesProviders],
})
export class CategoryModule {}
