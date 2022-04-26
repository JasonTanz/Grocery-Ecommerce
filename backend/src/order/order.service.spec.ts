import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { ORDER_REPOSITORY } from '../constants/index';
import { order } from '../models/order';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: Repository<order>;
  const mockOrder = [
    {
      order_id: 'order-id',
      order_status: 'Pending',
      order_delivery_address: 'Jalan ABC, Taman ABC',
      order_phone_number: '017123412',
      order_total_price: 38,
      cust_id: 'cust-id',
      product_id: 'product-id',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ORDER_REPOSITORY,
          useValue: {
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
  });

  describe('Get order with given id', () => {
    it('should call the orderRepo.findOne once and with the correct params', async () => {
      await service.findById('order-id');
      expect(orderRepo.findOne).toHaveBeenCalled();
      expect(orderRepo.findOne).toHaveBeenCalledTimes(1);
    });
  });

  //update by id
  describe('update order with given id', () => {
    it('should return a order with the given id', async () => {
      return service
        .updateById({ order_status: 'Delivering' }, 'order-id')
        .then((order: any) => {
          expect(order.mockOrder.order_status).toEqual('Delivering');
        });
    });

    it('should call the orderRepo.update once and with the correct params', async () => {
      await service.updateById({ order_status: 'Delivering' }, 'order-id');
      expect(orderRepo.update).toHaveBeenCalled();
      expect(orderRepo.update).toHaveBeenCalledTimes(1);
    });
  });
});
