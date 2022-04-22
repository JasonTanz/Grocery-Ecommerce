import { ORDER_REPOSITORY } from 'src/constants';
import { order } from 'src/models/order';

export const ordersProviders = [
  {
    provide: ORDER_REPOSITORY,
    useValue: order,
  },
];
