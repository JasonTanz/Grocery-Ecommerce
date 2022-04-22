import { category } from '../models/category';
import { CATEGORY_REPOSITORY } from '../constants/index';
export const categoriesProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: category,
  },
];
