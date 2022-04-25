import { gql } from '@apollo/client';
const createCartItem = gql`
  mutation createCartItem($input: CreateCartItemInput!) {
    createCartItem(createCartItemInput: $input) {
      item_qty
    }
  }
`;

const findCartByCustId = gql`
  query ($cust_id: String!) {
    findCartByCustId(cust_id: $cust_id) {
      cart_id
      item_qty
      product {
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
  }
`;

const deleteCartById = gql`
  mutation DeleteCartItemById($cart_id: String!) {
    DeleteCartItemById(cart_id: $cart_id)
  }
`;

const bulkDeleteCartItemById = gql`
  mutation BulkDeleteCartItemById($input: BulkDeleteCartItemById!) {
    BulkDeleteCartItemById(cart_id: $input)
  }
`;

export {
  createCartItem,
  findCartByCustId,
  deleteCartById,
  bulkDeleteCartItemById,
};
