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
import { bulkDeleteCartItemById, findCartByCustId } from '../../graphql/cart';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Cart as CartProps } from '../../types/cartTypes';
import * as yup from 'yup';
import { createOrder } from '../../graphql/order';
import { CLEAR_CART } from '../../reducers/cartSlice';
interface FormValues {
  order_delivery_address: string;
  order_phone_number: string;
}
interface dataProps {
  cust_id: string;
  product_id: string;
  order_status: string;
  order_delivery_address: string;
  order_phone_number: string;
  order_total_price: number;
}
const Cart = () => {
  const authState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [cart, setCart] = useState<CartProps[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const toast = useToast();
  const schema = yup.object({
    order_delivery_address: yup
      .string()
      .required('Delivery address is a required field.'),
    order_phone_number: yup
      .string()
      .required('Phone number is a required field.'),
  });
  const {
    data: cartItems,
    loading: cartLoading,
    error: cartErr,
  } = useQuery(findCartByCustId, {
    variables: { cust_id: authState.user.id },
  });

  const [
    bulkDelete,
    { data: deletedCart, loading: deleteLoading, error: deleteErr },
  ] = useMutation(bulkDeleteCartItemById);

  const [
    createOrderAction,

    { data: orderData, loading: createLoading, error: createErr },
  ] = useMutation(createOrder);

  useEffect(() => {
    if (orderData) {
      let cart_id: string[] = [];
      cart.forEach((data) => {
        cart_id.push(data.cart_id);
      });

      bulkDelete({
        variables: {
          input: {
            cart_id,
          },
        },
      });
    }
    if (createErr) {
      toast({
        title: 'Fail to create order',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, orderData, createErr, cart, bulkDelete]);

  useEffect(() => {
    if (deletedCart) {
      dispatch(CLEAR_CART());
      window.location.href = '/cust/dashboard';
    }
    if (deleteErr) {
      toast({
        title: 'Fail to create order',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, bulkDelete, deletedCart, deleteErr, dispatch]);

  useEffect(() => {
    if (cartItems) {
      cartItems.findCartByCustId.forEach((item: CartProps) => {
        setTotalPrice(
          (prev: number) =>
            (prev += item.item_qty * item.product.product_price),
        );
      });
      setCart([...cartItems.findCartByCustId]);
    }
    if (cartErr) {
      toast({
        title: 'Fail to fetch products',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, cartItems, cartErr]);
  const initialValues = {
    order_delivery_address: '',
    order_phone_number: '',
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
            {' '}
            {cart.length > 0 ? (
              <>
                {' '}
                <Grid
                  templateColumns={'3fr 1fr'}
                  gap="2.5em"
                  px="1.5em"
                  py="2em"
                >
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
                              setTotalPrice={setTotalPrice}
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
                            <Text
                              color="#3BB77E"
                              fontSize="32px"
                              fontWeight={600}
                            >
                              RM {totalPrice}
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
                          validationSchema={schema}
                          onSubmit={(data) => {
                            let orderData: dataProps[] = [];
                            cart.forEach((item) => {
                              orderData.push({
                                cust_id: authState.user.id,
                                product_id: item.product.product_id,
                                order_status: 'Pending',
                                order_delivery_address:
                                  data.order_delivery_address,
                                order_phone_number: data.order_phone_number,
                                order_total_price:
                                  item.product.product_price * item.item_qty,
                              });
                            });
                            createOrderAction({
                              variables: {
                                input: {
                                  data: orderData,
                                },
                              },
                            });
                          }}
                          enableReinitialize
                        >
                          {(props: FormikProps<FormValues>) => (
                            <Form style={{ width: '100%' }}>
                              <VStack pb="12px">
                                <Field
                                  name="order_delivery_address"
                                  component={GETextFilledForm}
                                  placeholder={'Delivery address'}
                                  onChange={props.handleChange}
                                  value={props.values.order_delivery_address}
                                />
                                <Field
                                  name="order_phone_number"
                                  component={GETextFilledForm}
                                  placeholder={'Phone Number'}
                                  onChange={props.handleChange}
                                  value={props.values.order_phone_number}
                                />
                              </VStack>
                              <Button
                                isLoading={deleteLoading || createLoading}
                                colorScheme={'teal'}
                                w="100%"
                                type="submit"
                              >
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
            ) : (
              <>
                <Text>Your cart is empty</Text>
              </>
            )}
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default Cart;
