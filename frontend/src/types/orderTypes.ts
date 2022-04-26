import { Products } from './productTypes';

interface Customer {
  cust_username: string;
}

export interface Orders {
  order_id: string;
  order_status: string;
  order_total_price: number;
  order_delivery_address: string;
  order_phone_number: string;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
  product: Products;
}
