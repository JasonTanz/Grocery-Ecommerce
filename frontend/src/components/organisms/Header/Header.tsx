/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  Center,
  HStack,
  Container,
  Image,
  Button,
  Heading,
  useDisclosure,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { GroceryLogo } from '../../../assets';
import { SearchBar } from '../../molecules';
import { Form, Field, Formik, FormikProps } from 'formik';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { SearchProps } from '../../../types/searchTypes';
import { GEModal } from '../index';
import * as yup from 'yup';
import GETextFilledForm from '../../atoms/GETextFilledForm/GETextFilledForm';
import { gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../../../reducers/authSlice';
interface Props {
  searchBar?: boolean;
}
interface CustLoginProps {
  cust_email: string;
  cust_password: string;
}

interface CustSignUpProps {
  cust_email: string;
  cust_password: string;
  cust_username: string;
  confirm_password: string;
}
const Header = ({ searchBar = false }: Props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth.user);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SignUp = gql`
    mutation custSignup($input: SignUpCustInput!) {
      custSignup(signUpCustInput: $input) {
        customer {
          cust_username
          cust_email
          cust_id
        }
        access_token
      }
    }
  `;
  const [
    signUp,
    { data: signUpData, loading: signUpLoading, error: signUpErr },
  ] = useMutation(SignUp);

  const headerSticky = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState('Login');
  const initialValues = { keywords: '' };
  const custLoginInitialValues = {
    cust_email: '',
    cust_password: '',
  };

  const custSignUpInitialValues = {
    cust_email: '',
    cust_username: '',
    confirm_password: '',
    cust_password: '',
  };

  const signUpSchema = yup.object({
    cust_username: yup.string().required('Username is a required field.'),
    cust_email: yup
      .string()
      .email('Email must be valid')
      .required('Email is a required field.'),
    cust_password: yup.string().required('Password is a required field.'),
    confirm_password: yup
      .string()
      .required('Confirm password is a required field.')
      .oneOf([yup.ref('cust_password'), null], 'Password does not match'),
  });

  const logInSchema = yup.object({
    cust_email: yup.string().email().required('Email is a required field.'),
    cust_password: yup.string().required('Password is a required field.'),
  });
  const handleScroll = useCallback((e: any) => {
    const window = e.currentTarget;
    if (window.scrollY > 10) {
      stickyToggle(true);
    } else {
      stickyToggle(false);
    }
  }, []);

  const stickyToggle = (status: boolean) => {
    if (headerSticky.current) {
      if (status) {
        headerSticky.current!.style!.background = '#FFFFFF';
        headerSticky.current!.style!.boxShadow = ' 0 1px 2px 0 rgba(0,0,0,.1)';
      } else {
        headerSticky.current!.style!.background = 'transparent';
        headerSticky.current!.style!.boxShadow = 'none';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', (e: any) => handleScroll(e));
    return () => {
      window.removeEventListener('scroll', (e: any) => handleScroll(e));
    };
  }, [handleScroll]);

  useEffect(() => {
    setPage('Login');
  }, [isOpen]);

  useEffect(() => {
    if (signUpData) {
      console.log(signUpData.custSignup.customer.cust_id);
      dispatch(
        LOGIN({
          user: {
            id: signUpData.custSignup.customer.cust_id,
            username: signUpData.custSignup.customer.cust_username,
            email: signUpData.custSignup.customer.cust_email,
          },
          accessToken: signUpData.custSignup.access_token,
        }),
      );
      onClose();
    }
    if (signUpErr) {
      console.log(signUpErr);
      toast({
        title: 'Sign up failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [dispatch, onClose, signUpData, signUpErr, toast]);

  return (
    <>
      <GEModal isOpen={isOpen} onClose={onClose}>
        {page === 'Login' ? (
          <>
            {' '}
            <VStack py="1.2em">
              <Formik
                initialValues={custLoginInitialValues}
                validationSchema={logInSchema}
                onSubmit={(data: any) => {
                  console.log(data);
                }}
                enableReinitialize
              >
                {(props: FormikProps<CustLoginProps>) => (
                  <Form style={{ width: '100%' }}>
                    <VStack gap="12px" alignItems={'flex-start'}>
                      <Heading fontSize={'30px'}>Login</Heading>
                      <Field
                        name="cust_email"
                        label="Email"
                        component={GETextFilledForm}
                        placeholder={'Username'}
                        onChange={props.handleChange}
                        value={props.values.cust_email}
                      />
                      <Field
                        name="cust_password"
                        component={GETextFilledForm}
                        label="Password"
                        placeholder={'Password'}
                        type="password"
                        onChange={props.handleChange}
                        value={props.values.cust_password}
                      />
                    </VStack>
                    <VStack w="100%" alignItems={'flex-start'} py="12px">
                      {' '}
                      <Text>Don&apos;t have an account yet?</Text>
                      <Text
                        color="#3366BB"
                        cursor={'pointer'}
                        _hover={{
                          textDecoration: 'underline',
                          color: '#0645AD',
                        }}
                        onClick={() => setPage('Signup')}
                      >
                        Sign Up
                      </Text>
                    </VStack>
                    <HStack w="100%" justifyContent={'flex-end'}>
                      <Button type="submit" w="35%" colorScheme="blue">
                        Login
                      </Button>
                    </HStack>
                  </Form>
                )}
              </Formik>
            </VStack>
          </>
        ) : (
          <>
            {' '}
            <VStack py="1.2em">
              <Formik
                initialValues={custSignUpInitialValues}
                validationSchema={signUpSchema}
                onSubmit={(data: any) => {
                  signUp({
                    variables: {
                      input: {
                        cust_username: data.cust_username,
                        cust_email: data.cust_email,
                        cust_password: data.cust_password,
                      },
                    },
                  });
                }}
                enableReinitialize
              >
                {(props: FormikProps<CustSignUpProps>) => (
                  <Form style={{ width: '100%' }}>
                    <VStack gap="12px" alignItems={'flex-start'}>
                      <Heading fontSize={'30px'}>Sign Up</Heading>
                      <Field
                        name="cust_username"
                        component={GETextFilledForm}
                        label="Username"
                        placeholder={'Username'}
                        onChange={props.handleChange}
                        value={props.values.cust_username}
                      />
                      <Field
                        name="cust_email"
                        component={GETextFilledForm}
                        label="Email"
                        placeholder={'Email'}
                        onChange={props.handleChange}
                        value={props.values.cust_email}
                      />

                      <Field
                        name="cust_password"
                        component={GETextFilledForm}
                        label="Password"
                        type="password"
                        placeholder={'Password'}
                        onChange={props.handleChange}
                        value={props.values.cust_password}
                      />
                      <Field
                        name="confirm_password"
                        component={GETextFilledForm}
                        label="Confirm Password"
                        type="password"
                        placeholder={'Re-type Password'}
                        onChange={props.handleChange}
                        value={props.values.confirm_password}
                      />
                    </VStack>
                    <VStack w="100%" alignItems={'flex-start'} py="14px">
                      {' '}
                      <Text>Already have an account?</Text>
                      <Text
                        color="#3366BB"
                        cursor={'pointer'}
                        _hover={{
                          textDecoration: 'underline',
                          color: '#0645AD',
                        }}
                        onClick={() => setPage('Login')}
                      >
                        Log in
                      </Text>
                    </VStack>
                    <HStack w="100%" justifyContent={'flex-end'}>
                      <Button
                        type="submit"
                        w="35%"
                        colorScheme="blue"
                        isLoading={signUpLoading}
                      >
                        Sign Up
                      </Button>
                    </HStack>
                  </Form>
                )}
              </Formik>
            </VStack>
          </>
        )}
      </GEModal>
      <Center
        bgColor="transparent"
        w="100%"
        zIndex="150"
        position="fixed"
        transition="150ms cubic-bezier(0.215,0.61,0.355,1);"
        py="16px"
        alignItems="center"
        justifyContent="center"
        id="header"
        ref={headerSticky}
      >
        <Container maxW="95%">
          <HStack
            justifyContent={'space-between'}
            alignItems="center"
            gap="2em"
          >
            <HStack w="50%" gap="1.2em" alignContent={'center'}>
              <Image
                src={GroceryLogo}
                w="60px"
                onClick={() => (window.location.href = '/')}
                cursor="pointer"
              />
              <Heading
                fontSize={'24px'}
                onClick={() => (window.location.href = '/')}
                cursor="pointer"
              >
                Grocery Ecommerce
              </Heading>
            </HStack>
            <HStack gap="1.2em" w="50%">
              <HStack w="100%">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(data: SearchProps) => {
                    const url = new URL('/services', window.location.origin);
                    const searchParams = url.searchParams;
                    searchParams.set('keywords', data.keywords);
                    searchParams.delete('category');
                    url.search = searchParams.toString();
                    const newurl = url.toString();
                    window.location.href = newurl;
                  }}
                  enableReinitialize
                >
                  {() => (
                    <Form style={{ width: '100%' }}>
                      <Field
                        placeholder="Search for products..."
                        boxShadow={false}
                        component={SearchBar}
                      />
                    </Form>
                  )}
                </Formik>
              </HStack>
              <AiOutlineShoppingCart
                style={{
                  width: '35px',
                  height: '35px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.location.href = '/cart';
                }}
              />
              {authState.username ? (
                <>
                  <VStack
                    borderRadius={'50%'}
                    background="#48BB78"
                    w="55px"
                    h="42px"
                    color="#ffffff"
                    fontWeight={'600'}
                    alignItems="center"
                  >
                    <Text fontSize={'1.5rem'}> {authState.username[0]}</Text>
                  </VStack>
                </>
              ) : (
                <>
                  {' '}
                  <Button colorScheme={'teal'} w="30%" onClick={() => onOpen()}>
                    Login/SignUp
                  </Button>
                </>
              )}
            </HStack>
          </HStack>
        </Container>
      </Center>
    </>
  );
};

export default Header;
