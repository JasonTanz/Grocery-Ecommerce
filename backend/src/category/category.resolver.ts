import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @Query(() => [Category], { name: 'Categories' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Query(() => [Category], { name: 'findByCategoryName' })
  async findByCategoryName(@Args('category_name') category_name: string) {
    return await this.categoryService.findByCategoryName(category_name);
  }

  @Query(() => Category, { name: 'Category' })
  async findById(@Args('category_id') category_id: string) {
    return await this.categoryService.findById(category_id);
  }

  @Mutation(() => String, { name: 'DeleteCategoryById' })
  async deleteById(@Args('category_id') category_id: string) {
    await this.categoryService.deleteById(category_id);
    return `Category with the id ${category_id} successfully deleted`;
  }
}
