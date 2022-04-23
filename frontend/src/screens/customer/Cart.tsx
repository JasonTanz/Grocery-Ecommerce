import React from 'react';
import { PageWrapper } from '../../components/organisms';
import {
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Image,
  Td,
  Button,
} from '@chakra-ui/react';

import { Formik, Form, Field, FormikProps } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';
import GETextFilledForm from '../../components/atoms/GETextFilledForm/GETextFilledForm';
interface FormValues {
  name: string;
  phoneNumber: string;
}
const Cart = () => {
  const initialValues = {
    name: '',
    phoneNumber: '',
  };
  const item = ['', '', '', '', ''];
  return (
    <PageWrapper>
      <Grid templateColumns={'3fr 1fr'} gap="2.5em" px="1.5em" py="2em">
        <GridItem>
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
              {item.map((_, index: number) => (
                <Tr key={index}>
                  <Td>
                    <HStack gap="1.5em">
                      <VStack border="1px solid #ececec" borderRadius={'12px'}>
                        <Image
                          src={
                            'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg'
                          }
                          maxH="120px"
                          className="product-img"
                        />
                      </VStack>
                      <VStack alignItems={'flex-start'}>
                        <Text
                          color="#253D4E"
                          fontSize={'16px'}
                          fontWeight="600"
                        >
                          Field Roast Chao Cheese Creamy Original
                        </Text>
                        <Text color="#adadad" fontSize={'12px'}>
                          Snack
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    {' '}
                    <VStack w="100%" alignItems={'center'}>
                      <Text>RM25</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack w="100%" alignItems={'center'}>
                      <Text>3</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack w="100%" alignItems={'center'}>
                      <Text>RM25</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack w="100%" alignItems={'center'}>
                      <BsFillTrashFill
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                        className="trash-can-icon"
                      />
                    </VStack>
                  </Td>
                </Tr>
              ))}
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
              <Grid templateColumns={'repeat(2, 1fr)'} alignItems="center">
                <GridItem>
                  <Text color="#B6B6B6 " fontSize={'16px'}>
                    SubTotal
                  </Text>
                </GridItem>
                <GridItem>
                  {' '}
                  <Text color="#3BB77E" fontSize="32px" fontWeight={600}>
                    RM300
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
                      Submit Order
                    </Button>
                  </Form>
                )}
              </Formik>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </PageWrapper>
  );
};

export default Cart;
