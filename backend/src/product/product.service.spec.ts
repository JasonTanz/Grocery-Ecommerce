import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { PRODUCT_REPOSITORY } from '../constants/index';
import { product } from 'src/models/product';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';

describe('ProductService', () => {
  let service: ProductService;
  let productRepo: Repository<product>;
  const mockProduct = {
    product_id: 'carrot-id',
    product_name: 'Carrot',
    product_brief_intro: 'This is a carrot.',
    product_description: 'A healthy carrot',
    product_img:
      'https://sb-assets.sgp1.cdn.digitaloceanspaces.com/product/main_image/39913/b63ea637-1811-4243-b576-7a0a7343a4a1.jpg',
    product_price: 25,
    product_qty: 3,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: {
            create: jest.fn((data) => data),
            findById: jest.fn((id) => {
              return { id, ...mockProduct };
            }),
            findAll: jest.fn(),
            DeleteById: jest.fn(),
            UpdateById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepo = module.get<Repository<product>>(PRODUCT_REPOSITORY);
  });

  it('productService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('productRepo should be defined', () => {
    expect(productRepo).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product with given body and return it', async () => {
      expect(await service.createProduct(mockProduct)).toEqual({
        product_id: 'carrot-id',
        ...mockProduct,
      });
    });
    it('should call the productRepo.create once and with the correct params', async () => {
      await service.createProduct(mockProduct);
      expect(productRepo.create).toHaveBeenCalled();
      expect(productRepo.create).toHaveBeenCalledTimes(1);
      expect(productRepo.create).toHaveBeenCalledWith(mockProduct);
    });
    it('should return the correct types', () => {
      expect(
        service.createProduct(mockProduct).then((product) => {
          console.log(product.product_id);
          expect(typeof product.product_id).toBe('string');
          expect(typeof product.product_name).toBe('string');
          expect(typeof product.product_brief_intro).toBe('string');
          expect(typeof product.product_description).toBe('string');
          expect(typeof product.product_img).toBe('string');
          expect(typeof product.product_price).toBe('number');
          expect(typeof product.product_qty).toBe('number');
        }),
      );
    });
  });
});
