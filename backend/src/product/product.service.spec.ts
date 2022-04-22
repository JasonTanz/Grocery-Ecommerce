import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { PRODUCT_REPOSITORY } from '../constants/index';
import { product } from 'src/models/product';
import { ProductService } from './product.service';

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
            findOne: jest.fn((product_id: string) => {
              return { product_id, ...mockProduct };
            }),
            findAll: jest.fn(() => [mockProduct]),
            update: jest.fn((data) => {
              return {
                mockProduct: {
                  ...mockProduct,
                  ...data,
                },
              };
            }),
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

  // Create Product
  describe('Create a product', () => {
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
      return service.createProduct(mockProduct).then((product) => {
        expect(typeof product.product_id).toBe('string');
        expect(typeof product.product_name).toBe('string');
        expect(typeof product.product_brief_intro).toBe('string');
        expect(typeof product.product_description).toBe('string');
        expect(typeof product.product_img).toBe('string');
        expect(typeof product.product_price).toBe('number');
        expect(typeof product.product_qty).toBe('number');
      });
    });
  });

  // Get All Products
  describe('Get all products', () => {
    it('should return an array of products', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(mockProduct)]),
      );
    });

    it('should call the productRepo.findAll once', async () => {
      await service.findAll();
      expect(productRepo.findAll).toHaveBeenCalled();
      expect(productRepo.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return the correct types', () => {
      return service.findAll().then((products) => {
        products.forEach((product) => {
          expect(typeof product.product_id).toBe('string');
          expect(typeof product.product_name).toBe('string');
          expect(typeof product.product_brief_intro).toBe('string');
          expect(typeof product.product_description).toBe('string');
          expect(typeof product.product_img).toBe('string');
          expect(typeof product.product_price).toBe('number');
          expect(typeof product.product_qty).toBe('number');
        });
      });
    });
  });

  //Get product by id
  describe('Get product with given id', () => {
    it('should return a order with the given id', async () => {
      return service.findById('carrot-id').then((product) => {
        expect(product.product_id).toEqual('carrot-id');
        expect(product).toEqual(mockProduct);
      });
    });

    it('should call the productRepo.findOne once and with the correct params', async () => {
      await service.findById('carrot-id');
      expect(productRepo.findOne).toHaveBeenCalled();
      expect(productRepo.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return the correct types', () => {
      return service.findById('carrot-id').then((product) => {
        expect(typeof product.product_id).toBe('string');
        expect(typeof product.product_name).toBe('string');
        expect(typeof product.product_brief_intro).toBe('string');
        expect(typeof product.product_description).toBe('string');
        expect(typeof product.product_img).toBe('string');
        expect(typeof product.product_price).toBe('number');
        expect(typeof product.product_qty).toBe('number');
      });
    });
  });

  //update by id
  describe('update product with given id', () => {
    it('should return a project with the given id', async () => {
      return service
        .updateById({ product_name: 'Cabbage' }, 'carrot-id')
        .then((product: any) => {
          console.log(product);
          expect(product.mockProduct.product_name).toEqual('Cabbage');
        });
    });

    it('should call the productRepo.update once and with the correct params', async () => {
      await service.updateById({ product_name: 'Cabbage' }, 'carrot-id');
      expect(productRepo.update).toHaveBeenCalled();
      expect(productRepo.update).toHaveBeenCalledTimes(1);
    });

    it('should return the correct types', () => {
      return service
        .updateById({ product_name: 'Cabbage' }, 'carrot-id')
        .then((product: any) => {
          expect(typeof product.mockProduct.product_id).toBe('string');
          expect(typeof product.mockProduct.product_name).toBe('string');
          expect(typeof product.mockProduct.product_brief_intro).toBe('string');
          expect(typeof product.mockProduct.product_description).toBe('string');
          expect(typeof product.mockProduct.product_img).toBe('string');
          expect(typeof product.mockProduct.product_price).toBe('number');
          expect(typeof product.mockProduct.product_qty).toBe('number');
        });
    });
  });
});
