import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { GetProductsInput, SimilarProducts } from './dto/get-products.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PaginateProduct, Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductHelper } from './product.helper';
import { Op } from 'sequelize';
@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly productHelper: ProductHelper,
  ) {}

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

  @Query(() => [Product], { name: 'PopularProducts' })
  async findPopular(@Args('limit') limit: number) {
    return await this.productService.findPopular(limit);
  }

  @Query(() => Product, { name: 'Product' })
  async findById(@Args('product_id') product_id: string) {
    return await this.productService.findById(product_id);
  }

  @Query(() => [Product], { name: 'searchProductByKeyword' })
  async findByKeyword(@Args('keywords') keywords: string) {
    return await this.productService.findByKeywords(keywords);
  }

  @Query(() => [Product], { name: 'findSimilarProducts' })
  async findSimilarProducts(
    @Args('category_name') category_name: SimilarProducts,
  ) {
    return await this.productService.findSimilarProducts(category_name);
  }

  @Query(() => PaginateProduct, { name: 'getProductsPaginate' })
  async findProductPaginate(
    @Args('getProductsInput') getProductsInput: GetProductsInput,
  ) {
    const { keywords, category, limit: pageSize, page } = getProductsInput;
    const condition = keywords
      ? {
          product_name: {
            [Op.iLike]: '%' + keywords.toLowerCase() + '%',
          },
        }
      : null;
    const condition_2 = category
      ? {
          category_name: category,
        }
      : null;
    const { limit, offset } = this.productHelper.getPagination(page, pageSize);
    const products = await this.productService.findAllPaginate(
      keywords,
      limit,
      offset,
      condition,
      condition_2,
    );
    const result = this.productHelper.getPaginateData(products, page, limit);
   
    return result;
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
