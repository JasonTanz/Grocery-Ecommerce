import { gql } from '@apollo/client';
const createOrder = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(createOrderInput: $input) {
      order_id
      order_status
    }
  }
`;
export { createOrder };
