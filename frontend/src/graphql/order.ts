import { gql } from '@apollo/client';
const createOrder = gql`
  mutation createOrder($input: CreateOrderInputAll!) {
    createOrder(createOrderInput: $input) {
      order_id
      order_status
    }
  }
`;

const findOrderByCustId = gql`
  query ($cust_id: String!) {
    findOrderByCustId(cust_id: $cust_id) {
      order_id
      order_status
      order_total_price
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

const updateOrderById = gql`
  mutation UpdateOrderById($input: UpdateOrderInput!) {
    UpdateOrderById(updateOrderInput: $input) {
      order_id
      order_status
      order_total_price
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
export { createOrder, findOrderByCustId, updateOrderById };
