import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoriesProviders } from './category.provider';
@Module({
  providers: [CategoryService, ...categoriesProviders],
  exports: [...categoriesProviders],
})
export class CategoryModule {}
