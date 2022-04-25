import { Product } from './entities/product.entity';

export class ProductHelper {
  getPagination(page: number, pageSize: number) {
    const limit = pageSize ? pageSize : 10;

    const offset = page ? (page - 1) * limit : 0;

    return {
      limit,
      offset,
    };
  }

  getPaginateData(results, page: number, limit: number) {
    const { count: totalItems, rows: data } = results;
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, currentPage, totalPages };
  }
}
