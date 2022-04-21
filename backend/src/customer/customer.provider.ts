import { customer } from '../models/customer';
import { CUST_REPOSITORY } from 'src/constants';
export const customersProviders = [
  {
    provide: CUST_REPOSITORY,
    useValue: customer,
  },
];
