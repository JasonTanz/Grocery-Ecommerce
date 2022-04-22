import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productService.createProduct(createProductInput);
  }

  @Query(() => [Product])
  async findAll() {
    return await this.productService.findAll();
  }

  @Query(() => Product)
  async findById(@Args('product_id') product_id: string) {
    return await this.productService.findById(product_id);
  }

  @Mutation(() => Product)
  async updateById(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productService.updateById(
      updateProductInput,
      updateProductInput.product_id,
    );
    return await this.productService.findById(updateProductInput.product_id);
  }

  @Mutation(() => String)
  async deleteById(@Args('product_id') product_id: string) {
    await this.productService.deleteById(product_id);
    return `Product with the id ${product_id} successfully deleted`;
  }
}
