import { customer } from '../models/customer';

export const customersProviders = [
  {
    provide: 'CUST_REPOSITORY',
    useValue: customer,
  },
];
