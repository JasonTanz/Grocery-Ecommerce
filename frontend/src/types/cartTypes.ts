import { Products } from './productTypes';

export interface Cart {
  cart_id: string;
  item_qty: number;
  product: Products;
}
