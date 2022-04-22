import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { CARTITEM_REPOSITORY } from '../constants/index';
import { cartItems } from '../models/cartItem';
import { CartItemService } from './cart-item.service';

describe('CartItemService', () => {
  let service: CartItemService;
  let cartItemRepo: Repository<cartItems>;
  const mockCartItem = {
    cart_id: 'cart-id',
    item_qty: 3,
    cust_id: 'cust-id',
    product_id: 'product-id',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemService,
        {
          provide: CARTITEM_REPOSITORY,
          useValue: {
            create: jest.fn((data) => data),
            findOne: jest.fn((cart_id: string) => {
              return { cart_id, ...mockCartItem };
            }),
            findAll: jest.fn(() => [mockCartItem]),
            update: jest.fn((data) => {
              return {
                mockCartItem: {
                  ...mockCartItem,
                  ...data,
                },
              };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CartItemService>(CartItemService);
    cartItemRepo = module.get<Repository<cartItems>>(CARTITEM_REPOSITORY);
  });

  it('cartService should be defined', () => {
    expect(service).toBeDefined();
  });
  it('cartItemRepo should be defined', () => {
    expect(cartItemRepo).toBeDefined();
  });

  describe('Create a cart item', () => {
    it('should create a cart item with given body and return it', async () => {
      expect(await service.createCartItem(mockCartItem)).toEqual({
        cart_id: 'cart-id',
        ...mockCartItem,
      });
    });

    it('should call the cartItemRepo.create once and with the correct params', async () => {
      await service.createCartItem(mockCartItem);
      expect(cartItemRepo.create).toHaveBeenCalled();
      expect(cartItemRepo.create).toHaveBeenCalledTimes(1);
      expect(cartItemRepo.create).toHaveBeenCalledWith(mockCartItem);
    });

    it('should return the correct types', () => {
      return service.createCartItem(mockCartItem).then((item) => {
        expect(typeof item.cart_id).toBe('string');
        expect(typeof item.item_qty).toBe('number');
        expect(typeof item.cust_id).toBe('string');
        expect(typeof item.product_id).toBe('string');
      });
    });
  });
});