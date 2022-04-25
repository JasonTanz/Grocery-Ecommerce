import React, { useEffect, useState } from 'react';
import { PageWrapper } from '../../components/organisms';
import {
  Grid,
  GridItem,
  VStack,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
  useToast,
  Center,
  Container,
  Spinner,
} from '@chakra-ui/react';
import { CartItemRow } from '../../components/molecules';
import { Formik, Form, Field, FormikProps } from 'formik';
import GETextFilledForm from '../../components/atoms/GETextFilledForm/GETextFilledForm';
import { findCartByCustId } from '../../graphql/cart';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Cart as CartProps } from '../../types/cartTypes';

interface FormValues {
  name: string;
  phoneNumber: string;
}
const Cart = () => {
  const authState = useSelector((state: any) => state.auth);

  const [cart, setCart] = useState<CartProps[]>([]);

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const toast = useToast();

  const {
    data: cartItems,
    loading: cartLoading,
    error: cartErr,
  } = useQuery(findCartByCustId, {
    variables: { cust_id: authState.user.id },
  });

  useEffect(() => {
    if (cartItems) {
      setCart([...cartItems.findCartByCustId]);
      console.log(cartItems);
    }
    if (cartErr) {
      console.log(cartErr);
      toast({
        title: 'Fail to fetch products',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, cartItems, cartErr]);
  const initialValues = {
    name: '',
    phoneNumber: '',
  };

  return (
    <PageWrapper>
      <>
        {!isAuthenticated ? (
          <>
            <Text>Please Login</Text>
          </>
        ) : cartLoading ? (
          <>
            {' '}
            <Center minH="75vh">
              <Container
                d="flex"
                justifyContent={'center'}
                maxW="container.xl"
                mb="30px"
              >
                <Spinner
                  thickness="5px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Container>
            </Center>
          </>
        ) : (
          <>
            <Grid templateColumns={'3fr 1fr'} gap="2.5em" px="1.5em" py="2em">
              {' '}
              <GridItem>
                {' '}
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>Unit Price</Th>
                      <Th>Quantity</Th>
                      <Th>Subtotal</Th>

                      <Th>Remove</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cart.map((item: CartProps) => {
                      return (
                        <CartItemRow
                          key={item.cart_id}
                          item={item}
                          setCart={setCart}
                        />
                      );
                    })}
                  </Tbody>
                </Table>
              </GridItem>
              <GridItem>
                <VStack position={'fixed'} top="25%">
                  <VStack
                    borderRadius="15px"
                    boxShadow={'5px 5px 15px rgb(0 0 0 / 5%)'}
                    py="2em"
                    px="3em"
                    alignItems={'flex-start'}
                  >
                    <Grid
                      templateColumns={'repeat(2, 1fr)'}
                      alignItems="center"
                    >
                      <GridItem>
                        <Text color="#B6B6B6 " fontSize={'16px'}>
                          SubTotal
                        </Text>
                      </GridItem>
                      <GridItem>
                        {' '}
                        <Text color="#3BB77E" fontSize="32px" fontWeight={600}>
                          RM 300
                        </Text>
                      </GridItem>
                      <GridItem>
                        {' '}
                        <Text color="#B6B6B6 " fontSize={'16px'}>
                          Shipping
                        </Text>
                      </GridItem>
                      <GridItem>
                        <Text fontSize="25px">Free</Text>
                      </GridItem>
                    </Grid>

                    <Formik
                      initialValues={initialValues}
                      onSubmit={(data) => {
                        console.log(data);
                      }}
                      enableReinitialize
                    >
                      {(props: FormikProps<FormValues>) => (
                        <Form style={{ width: '100%' }}>
                          <VStack pb="12px">
                            <Field
                              name="email"
                              component={GETextFilledForm}
                              placeholder={'Delivery address'}
                              onChange={props.handleChange}
                              value={props.values.name}
                            />
                            <Field
                              name="phoneNumber"
                              component={GETextFilledForm}
                              placeholder={'Phone Number'}
                              // onChange={props.handleChange}
                              // value={props.values.email}
                            />
                          </VStack>
                          <Button colorScheme={'teal'} w="100%">
                            Place Order
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </VStack>
                </VStack>
              </GridItem>
            </Grid>
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default Cart;
