import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { ORDER_REPOSITORY } from '../constants/index';
import { order } from '../models/order';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: Repository<order>;
  const mockOrder = {
    order_id: 'order-id',
    order_status: 'Pending',
    order_delivery_address: 'Jalan ABC, Taman ABC',
    order_phone_number: '017123412',
    order_total_price: 38,
    cust_id: 'cust-id',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ORDER_REPOSITORY,
          useValue: {
            create: jest.fn((data) => data),
            findOne: jest.fn((order_id: string) => {
              return { order_id, ...mockOrder };
            }),
            findAll: jest.fn(() => [mockOrder]),
            update: jest.fn((data) => {
              return {
                mockOrder: {
                  ...mockOrder,
                  ...data,
                },
              };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepo = module.get<Repository<order>>(ORDER_REPOSITORY);
  });

  it('orderService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('orderRepo should be defined', () => {
    expect(orderRepo).toBeDefined();
  });

  describe('Create an order', () => {
    it('should create a order with given body and return it', async () => {
      expect(await service.createOrder(mockOrder)).toEqual({
        order_id: 'order-id',
        ...mockOrder,
      });
    });

    it('should call the orderRepo.create once and with the correct params', async () => {
      await service.createOrder(mockOrder);
      expect(orderRepo.create).toHaveBeenCalled();
      expect(orderRepo.create).toHaveBeenCalledTimes(1);
      expect(orderRepo.create).toHaveBeenCalledWith(mockOrder);
    });

    it('should return the correct types', () => {
      return service.createOrder(mockOrder).then((order) => {
        expect(typeof order.order_id).toBe('string');
        expect(typeof order.order_status).toBe('string');
        expect(typeof order.order_delivery_address).toBe('string');
        expect(typeof order.order_phone_number).toBe('string');
        expect(typeof order.order_total_price).toBe('number');
      });
    });
  });

  describe('Get all orders', () => {
    it('should return an array of orders', async () => {
      expect(await service.findAll()).toEqual(
        expect.arrayContaining([expect.objectContaining(mockOrder)]),
      );
    });

    it('should call the orderRepo.findAll once', async () => {
      await service.findAll();
      expect(orderRepo.findAll).toHaveBeenCalled();
      expect(orderRepo.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return the correct types', () => {
      return service.findAll().then((orders) => {
        orders.forEach((order) => {
          expect(typeof order.order_id).toBe('string');
          expect(typeof order.order_status).toBe('string');
          expect(typeof order.order_delivery_address).toBe('string');
          expect(typeof order.order_phone_number).toBe('string');
          expect(typeof order.order_total_price).toBe('number');
        });
      });
    });
  });
});
