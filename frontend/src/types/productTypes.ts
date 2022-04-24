import { Category } from './categoryType';
export interface Products {
  product_id: string;
  product_name: string;
  product_brief_intro: string;
  product_description: string;
  product_img: string;
  product_price: number;
  categories: Category[];
}
