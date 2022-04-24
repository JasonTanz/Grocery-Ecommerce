import { gql } from '@apollo/client';

const getAllCategories = gql`
  query {
    Categories {
      category_name
    }
  }
`;

export { getAllCategories };
