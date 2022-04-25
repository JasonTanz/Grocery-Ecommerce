import { gql } from '@apollo/client';
const createProduct = gql`
  mutation createProduct($createProduct: CreateProductInput!) {
    createProduct(createProductInput: $createProduct) {
      product_id
      product_name
    }
  }
`;

const findAllProducts = gql`
  query {
    Products {
      product_id
      product_name
      product_brief_intro
      product_description
      product_img
      product_price
      categories {
        category_id
        category_name
      }
    }
  }
`;

const findProductById = gql`
  query ($product_id: String!) {
    Product(product_id: $product_id) {
      product_id
      product_name
      product_brief_intro
      product_description
      product_img
      product_price
      categories {
        category_id
        category_name
      }
    }
  }
`;

const findByKeywords = gql`
  query ($keywords: String!) {
    searchProductByKeyword(keywords: $keywords) {
      product_name
    }
  }
`;

const findByKeywordsWithInfo = gql`
  query ($keywords: String!) {
    searchProductByKeyword(keywords: $keywords) {
      product_id
      product_name
      product_brief_intro
      product_description
      product_img
      product_price
      categories {
        category_id
        category_name
      }
    }
  }
`;

const getProductsPaginate = gql`
  query ($input: GetProductsInput!) {
    getProductsPaginate(getProductsInput: $input) {
      data {
        product_id
        product_name
        product_brief_intro
        product_description
        product_img
        product_price
        categories {
          category_id
          category_name
        }
      }
      currentPage
      totalPages
    }
  }
`;

const getPopularProduct = gql`
  query ($limit: Float!) {
    PopularProducts(limit: $limit) {
      product_id
      product_name
      product_brief_intro
      product_description
      product_img
      product_price
      categories {
        category_id
        category_name
      }
    }
  }
`;

const getSimilarProducts = gql`
  query ($category_name: SimilarProducts!) {
    findSimilarProducts(category_name: $category_name) {
      product_id
      product_name
      product_brief_intro
      product_description
      product_img
      product_price
      categories {
        category_id
        category_name
      }
    }
  }
`;

export {
  createProduct,
  findAllProducts,
  findProductById,
  findByKeywords,
  findByKeywordsWithInfo,
  getProductsPaginate,
  getPopularProduct,
  getSimilarProducts,
};
