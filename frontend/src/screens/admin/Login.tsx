import React, { useEffect } from 'react';
import {
  Center,
  Container,
  VStack,
  useToast,
  Heading,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Form, Field, Formik, FormikProps } from 'formik';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../reducers/authSlice';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import GETextFilledForm from '../../components/atoms/GETextFilledForm/GETextFilledForm';
import { adminLogin } from '../../graphql/auth';
interface AdminLoginProps {
  admin_email: string;
  admin_password: string;
}
const Login = () => {
  const adminLoginInitialValues = {
    admin_email: '',
    admin_password: '',
  };
  const dispatch = useDispatch();
  const logInSchema = yup.object({
    admin_email: yup.string().email().required('Email is a required field.'),
    admin_password: yup.string().required('Password is a required field.'),
  });
  const [logIn, { data: logInData, loading: logInLoading, error: logInErr }] =
    useMutation(adminLogin);

  const toast = useToast();

  useEffect(() => {
    if (logInData) {
      console.log(logInData);
      dispatch(
        LOGIN({
          user: {
            id: logInData.adminLogin.admin.admin_id,
            username: logInData.adminLogin.admin.admin_username,
            email: logInData.adminLogin.admin.admin_email,
          },
          accessToken: logInData.adminLogin.access_token,
        }),
      );

      toast({
        title: 'Log in successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      window.location.href = '/admin/dashboard';
    }
    if (logInErr) {
      toast({
        title: 'Log in failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [dispatch, logInData, logInErr, toast]);
  return (
    <Center minH="100vh">
      <Container maxW={'500px'}>
        <VStack boxShadow={'xs'} py="1.2em" px="1.5em" borderRadius={'12px'}>
          <Formik
            initialValues={adminLoginInitialValues}
            validationSchema={logInSchema}
            onSubmit={(data: any) => {
              console.log(data);
              logIn({
                variables: {
                  login: {
                    admin_email: data.admin_email,
                    admin_password: data.admin_password,
                  },
                },
              });
            }}
            enableReinitialize
          >
            {(props: FormikProps<AdminLoginProps>) => (
              <Form style={{ width: '100%' }}>
                <VStack gap="14px" alignItems={'flex-start'}>
                  <Heading fontSize={'30px'}>Admin Login</Heading>
                  <Field
                    name="admin_email"
                    label="Email"
                    component={GETextFilledForm}
                    placeholder={'Email'}
                    onChange={props.handleChange}
                    value={props.values.admin_email}
                  />
                  <Field
                    name="admin_password"
                    component={GETextFilledForm}
                    label="Password"
                    placeholder={'Password'}
                    type="password"
                    onChange={props.handleChange}
                    value={props.values.admin_password}
                  />
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
                </VStack>
              </Form>
            )}
          </Formik>
        </VStack>
      </Container>
    </Center>
  );
};

export default Login;
