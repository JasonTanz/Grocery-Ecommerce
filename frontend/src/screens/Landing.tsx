import React, { useEffect, useState, useRef } from 'react';

import {
  VStack,
  HStack,
  Center,
  Container,
  Heading,
  Grid,
  GridItem,
  useToast,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import { SearchProps } from '../types/searchTypes';
import { SearchBar, ProductCard } from '../components/molecules';
import { PageWrapper } from '../components/organisms';
import { findAllProducts } from '../graphql/product';
import { Products as ProductsProps } from '../types/productTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);
const Landing = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const initialValues = {
    keywords: '',
  };
  const toast = useToast();
  const {
    data: products,
    loading: productLoading,
    error: productErr,
  } = useQuery(findAllProducts);
  const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    if (products) {
      console.log(products);
      setAllProducts([...products.Products]);
    }

    if (productErr) {
      toast({
        title: 'Fail to fetch products',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [productErr, products, toast]);

  return (
    <>
      <PageWrapper>
        <VStack pt="2" w="100%">
          <VStack w="100%" h="100%">
            <Swiper
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              pagination={{
                clickable: true,
              }}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
              }}
              className="mySwiper"
              style={{
                width: '98%',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                paddingBottom: '30px',
              }}
            >
              <SwiperSlide
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px 14px',
                  width: '100%',
                }}
              >
                <VStack
                  style={{ marginTop: 0 }}
                  bgImg="http://wp.alithemes.com/html/nest/demo/assets/imgs/slider/slider-2.png"
                  w="98%"
                  borderRadius={'8px'}
                  h="60vh"
                  justifyContent={'center'}
                  alignItems="flex-start"
                  backgroundSize="cover"
                  backgroundPosition={'center center'}
                  gap="25px"
                >
                  <VStack
                    w="100%"
                    alignItems={'flex-start'}
                    px="15rem"
                    zIndex={200}
                  >
                    <VStack mb="2em" alignItems={'flex-start'}>
                      {' '}
                      <Heading fontWeight={600} fontSize="50px">
                        Fresh Vegetables
                      </Heading>
                      <Heading fontWeight={600} fontSize="50px">
                        Big Discount
                      </Heading>
                    </VStack>

                    <Formik
                      initialValues={initialValues}
                      onSubmit={(data: SearchProps) => {
                        const url = new URL(
                          '/services',
                          window.location.origin,
                        );
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
                        <Form style={{ width: '30%' }}>
                          <Field
                            placeholder="Search for products..."
                            component={SearchBar}
                            landing={true}
                          />
                        </Form>
                      )}
                    </Formik>
                  </VStack>
                </VStack>
              </SwiperSlide>
              <SwiperSlide
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px 14px',
                  width: '100%',
                }}
              >
                <VStack
                  style={{ marginTop: 0 }}
                  bgImg=" http://wp.alithemes.com/html/nest/demo/assets/imgs/slider/slider-1.png"
                  w="98%"
                  borderRadius={'8px'}
                  h="60vh"
                  justifyContent={'center'}
                  alignItems="flex-start"
                  backgroundSize="cover"
                  backgroundPosition={'center center'}
                  gap="25px"
                >
                  {' '}
                  <VStack
                    w="100%"
                    alignItems={'flex-start'}
                    px="15rem"
                    zIndex={200}
                  >
                    <VStack mb="2em" alignItems={'flex-start'}>
                      {' '}
                      <Heading fontWeight={600} fontSize="50px">
                        Fresh Vegetables
                      </Heading>
                      <Heading fontWeight={600} fontSize="50px">
                        Big Discount
                      </Heading>
                    </VStack>

                    <Formik
                      initialValues={initialValues}
                      onSubmit={(data: SearchProps) => {
                        const url = new URL(
                          '/services',
                          window.location.origin,
                        );
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
                        <Form style={{ width: '30%' }}>
                          <Field
                            placeholder="Search for products..."
                            component={SearchBar}
                            landing={true}
                          />
                        </Form>
                      )}
                    </Formik>
                  </VStack>
                </VStack>
              </SwiperSlide>

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
          </VStack>
        </VStack>
        <Center py="3em" bgColor="#fff">
          <Container maxW="container.xl">
            <HStack justifyContent={'center'} pb="2em">
              {' '}
              <Heading>Popular Items</Heading>
            </HStack>
            {productLoading ? (
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
            ) : (
              <>
                <Grid templateColumns={'repeat(5, 1fr)'} gap="1.2em">
                  {allProducts.map((prod) => (
                    <GridItem key={prod.product_id}>
                      <ProductCard prod={prod} />
                    </GridItem>
                  ))}
                </Grid>
              </>
            )}
          </Container>
        </Center>
      </PageWrapper>
    </>
  );
};

export default Landing;
