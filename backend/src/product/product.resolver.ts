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
    const product = await this.productService.createProduct(createProductInput);
    await product.$set('categories', createProductInput.categories);
    return product;
  }

  @Query(() => [Product], { name: 'Products' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Query(() => Product, { name: 'Product' })
  async findById(@Args('product_id') product_id: string) {
    return await this.productService.findById(product_id);
  }

  @Query(() => [Product], { name: 'searchProductByKeyword' })
  async findByKeyword(@Args('keywords') keywords: string) {
    return await this.productService.findByKeywords(keywords);
  }

  @Mutation(() => Product, { name: 'UpdateProductById' })
  async updateById(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productService.updateById(
      updateProductInput,
      updateProductInput.product_id,
    );
    return await this.productService.findById(updateProductInput.product_id);
  }

  @Mutation(() => String, { name: 'DeleteProductById' })
  async deleteById(@Args('product_id') product_id: string) {
    await this.productService.deleteById(product_id);
    return `Product with the id ${product_id} successfully deleted`;
  }
}
