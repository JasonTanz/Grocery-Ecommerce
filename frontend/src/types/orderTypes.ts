import { Products } from './productTypes';
export interface Orders {
  order_id: string;
  order_status: string;
  order_total_price: number;
  product: Products;
}
