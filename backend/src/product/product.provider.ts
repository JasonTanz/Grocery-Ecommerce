import { product } from '../models/product';
import { PRODUCT_REPOSITORY } from '../constants/index';
export const productsProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: product,
  },
];
