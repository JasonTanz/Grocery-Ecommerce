import { gql } from '@apollo/client';

const getAllCategories = gql`
  query {
    Categories {
      category_name
    }
  }
`;

const getByCategoryName = gql`
  query ($category: String!) {
    findByCategoryName(category_name: $category) {
      category_name
      products {
        product_id
        product_name
        product_brief_intro
        product_description
        product_img
        product_price
        categories {
          category_name
        }
      }
    }
  }
`;

export { getAllCategories, getByCategoryName };
