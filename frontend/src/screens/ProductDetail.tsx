/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
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
  IconButton,
  Spinner,
  Divider,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { GESelectDropDown } from '../components/atoms';
import { PageWrapper } from '../components/organisms';
import { useParams } from 'react-router-dom';
import { findProductById, getSimilarProducts } from '../graphql/product';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Products as ProductProps } from '../types/productTypes';
import { Category } from '../types/categoryType';
import { createCartItem } from '../graphql/cart';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATECART } from '../reducers/cartSlice';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
import { ProductCard } from '../components/molecules';
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);
interface CartProps {
  qty: number;
}
const ProductDetail = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [createCart, { data: cartData, loading: cartLoading, error: cartErr }] =
    useMutation(createCartItem);
  const initialValues = {
    qty: 1,
  };
  const authState = useSelector((state: any) => state.auth.user);
  const toast = useToast();
  const [productDetail, setProductDetail] = useState<ProductProps>();
  const [allSimilarProducts, setAllSimilarProducts] =
    useState<ProductProps[]>();
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const addToCartSchema = yup.object({
    qty: yup.number().required('Quantity is a required field'),
  });
  const currentCartQty = useSelector((state: any) => state.cart.cart_qty);
  const {
    data: product,
    loading: productLoading,
    error: productErr,
  } = useQuery(findProductById, {
    variables: { product_id },
  });
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const [
    getSimilar,
    { data: similarProducts, loading: similarLoading, error: similarErr },
  ] = useLazyQuery(getSimilarProducts);

  useEffect(() => {
    if (product) {
      let category_name: string[] = [];
      product.Product.categories.forEach((cat: Category) => {
        category_name.push(cat.category_name);
      });

      getSimilar({
        variables: {
          category_name: {
            category_name,
          },
        },
      });
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
  }, [productErr, product, toast, getSimilar]);

  useEffect(() => {
    if (similarProducts) {
      setAllSimilarProducts([...similarProducts.findSimilarProducts]);
    }
    if (similarErr) {
      toast({
        title: 'Fail to fetch similar products',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, getSimilar, similarProducts, similarErr, productErr]);

  useEffect(() => {
    if (cartData) {
      dispatch(
        UPDATECART({
          cart_qty: currentCartQty + 1,
        }),
      );
    }
    if (cartErr) {
      toast({
        title: 'Fail to add to cart',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, cartData, cartErr, dispatch]);

  return (
    <>
      <PageWrapper>
        {productLoading || similarLoading ? (
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
                              validationSchema={addToCartSchema}
                              onSubmit={(data) => {
                                createCart({
                                  variables: {
                                    input: {
                                      cust_id: authState.id,
                                      product_id,
                                      item_qty: data.qty,
                                    },
                                  },
                                });
                              }}
                            >
                              {(props: FormikProps<CartProps>) => (
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
                                      _hover={{
                                        backgroundColor: '#31a36f',
                                      }}
                                      disabled={!isAuthenticated}
                                      type="submit"
                                      w="30%"
                                    >
                                      {!isAuthenticated ? (
                                        <Text>Please Log In</Text>
                                      ) : (
                                        <Text> Add To Cart</Text>
                                      )}
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
                    {allSimilarProducts && (
                      <>
                        <VStack gap="12px" alignItems={'flex-start'} pt="5.2em">
                          <Heading fontSize={'30px'} fontWeight="600">
                            Related products
                          </Heading>
                          <Divider />{' '}
                          <HStack
                            spacing="10"
                            justifyContent="center"
                            w="100%"
                            maxW="100%"
                            h="500px"
                            style={{
                              marginTop: '2em',
                            }}
                          >
                            <Swiper
                              spaceBetween={15}
                              navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                              }}
                              onBeforeInit={(swiper) => {
                                // @ts-ignore
                                swiper.params.navigation.prevEl =
                                  navigationPrevRef.current;
                                // @ts-ignore
                                swiper.params.navigation.nextEl =
                                  navigationNextRef.current;
                              }}
                              pagination={{
                                clickable: true,
                              }}
                              autoplay={{
                                delay: 5000,
                              }}
                              slidesPerView={4}
                              className="mySwiper"
                              style={{
                                width: '100%',
                                justifyContent: 'center',

                                alignItems: 'center',
                                paddingBottom: '30px',
                              }}
                            >
                              {allSimilarProducts.map((prod, index) => (
                                <SwiperSlide
                                  key={index}
                                  style={{
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                  }}
                                >
                                  <ProductCard prod={prod} />
                                </SwiperSlide>
                              ))}

                              <IconButton
                                ref={navigationPrevRef}
                                aria-label="Prev Slide"
                                icon={<ChevronLeftIcon />}
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  left: '5px',
                                  zIndex: 1001,
                                  backgroundColor: '#ffffff',
                                  borderRadius: '50%',
                                  boxShadow: '0px 0px 10px #e9e9e9',
                                }}
                              />
                              <IconButton
                                ref={navigationNextRef}
                                aria-label="Next Slide"
                                icon={<ChevronRightIcon />}
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  right: '5px',
                                  zIndex: 1001,
                                  backgroundColor: '#ffffff',
                                  borderRadius: '50%',
                                  boxShadow: '0px 0px 10px #e9e9e9',
                                }}
                              />
                            </Swiper>
                          </HStack>
                        </VStack>
                      </>
                    )}
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
