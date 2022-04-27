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
      }
      access_token
    }
  }
`;

const adminLogin = gql`
  mutation adminLogin($login: LoginAdminInput!) {
    adminLogin(loginAdminInput: $login) {
      admin {
        admin_id
        admin_username
        admin_email
      }
      access_token
    }
  }
`;

const checkAuth = gql`
  query {
    checkAuth
  }
`;

export { SignUp, Login, checkAuth, adminLogin };
