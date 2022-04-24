import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import GEModal from '../GEModal/GEModal';
import GETextFilledForm from '../../atoms/GETextFilledForm/GETextFilledForm';
import { LOGIN } from '../../../reducers/authSlice';
import * as yup from 'yup';
import {
  useToast,
  VStack,
  Heading,
  Text,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Login, SignUp } from '../../../graphql/auth';
import { Form, Field, Formik, FormikProps } from 'formik';
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
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const RegistrationModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState('Login');
  const [
    signUp,
    { data: signUpData, loading: signUpLoading, error: signUpErr },
  ] = useMutation(SignUp);
  const [logIn, { data: logInData, loading: logInLoading, error: logInErr }] =
    useMutation(Login);
  const toast = useToast();

  useEffect(() => {
    if (logInData) {
      dispatch(
        LOGIN({
          user: {
            id: logInData.custLogin.customer.cust_id,
            username: logInData.custLogin.customer.cust_username,
            email: logInData.custLogin.customer.cust_email,
          },
          accessToken: logInData.custLogin.access_token,
        }),
      );
      toast({
        title: 'Log in successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      onClose();
    }
    if (logInErr) {
      toast({
        title: 'Log in failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [dispatch, logInData, logInErr, onClose, toast]);

  useEffect(() => {
    if (signUpData) {
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
      toast({
        title: 'Sign up successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      onClose();
    }
    if (signUpErr) {
      toast({
        title: 'Sign up failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [dispatch, onClose, signUpData, signUpErr, toast]);

  useEffect(() => {
    setPage('Login');
  }, [isOpen]);

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
  return (
    <GEModal isOpen={isOpen} onClose={onClose}>
      {page === 'Login' ? (
        <>
          {' '}
          <VStack py="1.2em">
            <Formik
              initialValues={custLoginInitialValues}
              validationSchema={logInSchema}
              onSubmit={(data: any) => {
                logIn({
                  variables: {
                    login: {
                      cust_email: data.cust_email,
                      cust_password: data.cust_password,
                    },
                  },
                });
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
                      placeholder={'Email'}
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
                    <Button
                      isLoading={logInLoading}
                      type="submit"
                      w="35%"
                      colorScheme="blue"
                    >
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
                    signup: {
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
  );
};

export default React.memo(RegistrationModal);
