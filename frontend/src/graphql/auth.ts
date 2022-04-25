import { gql } from '@apollo/client';
const SignUp = gql`
  mutation custSignup($signup: SignUpCustInput!) {
    custSignup(signUpCustInput: $signup) {
      customer {
        cust_username
        cust_email
        cust_id
      }
      access_token
    }
  }
`;

const Login = gql`
  mutation custLogin($login: LoginCustomerInput!) {
    custLogin(loginCustomerInput: $login) {
      customer {
        cust_id
        cust_username
        cust_email
        cartItems {
          cart_qty
        }
      }
      access_token
    }
  }
`;

export { SignUp, Login };
