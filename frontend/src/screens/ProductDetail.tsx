/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Center,
  Container,
  GridItem,
  Grid,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { GESelectDropDown } from '../components/atoms';
import { PageWrapper } from '../components/organisms';
import { useParams } from 'react-router-dom';
import { findProductById } from '../graphql/product';
import { useQuery } from '@apollo/client';
import { Products as ProductProps } from '../types/productTypes';
import { Category } from '../types/categoryType';
const ProductDetail = () => {
  const initialValues = {
    testing: '',
  };
  const toast = useToast();
  const [productDetail, setProductDetail] = useState<ProductProps>();
  const { product_id } = useParams();
  console.log(product_id);
  const {
    data: product,
    loading: productLoading,
    error: productErr,
  } = useQuery(findProductById, {
    variables: { product_id },
  });

  useEffect(() => {
    if (product) {
      console.log(product);
      setProductDetail({ ...product.Product });
    }
    if (productErr) {
      toast({
        title: 'Fail to fetch products',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [productErr, product, toast]);

  return (
    <>
      <PageWrapper>
        {productLoading ? (
          <>
            <Center minH="100vh">
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
            {productDetail && (
              <>
                <Center pt="2em" pb="4em">
                  <Container maxW="container.xl">
                    <Grid
                      templateColumns={'repeat(2, 1fr)'}
                      justifyItems={'center'}
                      py="2.5em"
                    >
                      <GridItem
                        border={'1px solid #ececec'}
                        borderRadius="10px"
                        maxW="25vw"
                        cursor={'pointer'}
                        overflow="hidden"
                      >
                        <VStack className="zoom-on-hover">
                          <Image
                            src={productDetail.product_img}
                            className="product-img"
                          />
                        </VStack>
                      </GridItem>
                      <GridItem>
                        <VStack alignItems={'flex-start'} gap="12px">
                          {productDetail.categories.map((cat: Category) => (
                            <Text
                              style={{ marginTop: 0, marginLeft: 0 }}
                              color="#adadad"
                              fontSize={'12px'}
                              key={cat.category_id}
                            >
                              {cat.category_name}
                            </Text>
                          ))}

                          <Heading>{productDetail.product_name}</Heading>
                          <Heading color="#3BB77E" fontSize={'40px'}>
                            RM{productDetail.product_price}
                          </Heading>
                          <Text>{productDetail.product_brief_intro}</Text>
                          <HStack w="100%">
                            <Formik
                              initialValues={initialValues}
                              //   validationSchema={schema}
                              onSubmit={(data) => {
                                console.log(data);
                              }}
                            >
                              {() => (
                                <Form style={{ width: '100%' }}>
                                  <HStack spacing={'20px'} w="100%">
                                    <HStack>
                                      <Field
                                        name="qty"
                                        component={GESelectDropDown}
                                        customclass="custom-dropdown"
                                        options={[
                                          {
                                            label: '1',
                                            value: 1,
                                          },
                                          {
                                            label: '2',
                                            value: 2,
                                          },
                                          {
                                            label: '3',
                                            value: 3,
                                          },
                                          {
                                            label: '4',
                                            value: 4,
                                          },
                                          {
                                            label: '5',
                                            value: 5,
                                          },
                                        ]}
                                      />
                                    </HStack>

                                    <Button
                                      backgroundColor="#3BB77E"
                                      py="1.4em"
                                      px="4em"
                                      color="#FFF"
                                      _hover={{}}
                                      type="submit"
                                      w="30%"
                                    >
                                      Add To Cart
                                    </Button>
                                  </HStack>
                                </Form>
                              )}
                            </Formik>
                          </HStack>
                        </VStack>
                      </GridItem>
                    </Grid>
                    <VStack gap="1em" alignItems={'flex-start'}>
                      <Heading>Description</Heading>
                      <Text>{productDetail.product_description}</Text>
                    </VStack>
                  </Container>
                </Center>
              </>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default ProductDetail;
