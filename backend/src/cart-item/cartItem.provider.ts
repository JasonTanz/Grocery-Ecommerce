import { cartItems } from '../models/cartItem';
import { CARTITEM_REPOSITORY } from '../constants/index';
export const cartsProviders = [
  {
    provide: CARTITEM_REPOSITORY,
    useValue: cartItems,
  },
];
