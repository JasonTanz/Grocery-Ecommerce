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
  Text,
  Button,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { ProductCard } from '../components/molecules';
import { PageWrapper } from '../components/organisms';
import { getPopularProduct } from '../graphql/product';
import { Products as ProductsProps } from '../types/productTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
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

  const toast = useToast();
  const {
    data: products,
    loading: productLoading,
    error: productErr,
  } = useQuery(getPopularProduct, {
    variables: {
      limit: 10,
    },
  });
  const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    if (products) {
      setAllProducts([...products.PopularProducts]);
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
              // autoplay={{
              //   delay: 5000,
              // }}
              className="mySwiper"
              style={{
                width: '98%',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
                paddingBottom: '30px',
                height: '75vh',
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
                  bgImg="https://klbtheme.com/bacola/wp-content/uploads/2021/05/slider-image-6.jpg"
                  w="98%"
                  borderRadius={'18px'}
                  h="65vh"
                  justifyContent={'center'}
                  alignItems="flex-start"
                  backgroundSize="cover"
                  backgroundPosition={'center center'}
                  gap="25px"
                >
                  <VStack
                    w="100%"
                    alignItems={'flex-start'}
                    px={['1.3em', '1.3em', '7.5em']}
                    zIndex={200}
                  >
                    <VStack mb="2em" alignItems={'flex-start'}>
                      {' '}
                      <Heading
                        fontWeight={700}
                        fontSize={['20px', '20px', '50px']}
                      >
                        Feed your family the best
                      </Heading>
                      <Text
                        fontSize={'30px'}
                        textAlign={['left', 'left', 'inherit']}
                      >
                        Fully prepared & delivered nationwide.
                      </Text>
                      <Text fontSize={'20px'} color="#7e7e7e">
                        Only this week. Don&apos;t miss...
                      </Text>
                      <Button
                        backgroundColor="#29A56C"
                        _hover={{
                          backgroundColor: '#238759',
                        }}
                        color="#ffffff"
                        onClick={() => (window.location.href = '/products')}
                        style={{
                          marginTop: '1.2em',
                        }}
                        w={['50%', '50%', '25%']}
                      >
                        <HStack alignItems={'center'} justifyContent="center">
                          <Text>Shop Now</Text>
                          <AiOutlineArrowRight />
                        </HStack>
                      </Button>
                    </VStack>
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
                  bgImg="http://wp.alithemes.com/html/nest/demo/assets/imgs/slider/slider-2.png"
                  w="98%"
                  borderRadius={'18px'}
                  h="65vh"
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
                    px={['1.3em', '1.3em', '7.5em']}
                    zIndex={200}
                    textAlign="left"
                  >
                    <VStack mb="2em" alignItems={'flex-start'}>
                      {' '}
                      <Heading
                        fontWeight={700}
                        fontSize={['30px', '30px', '50px']}
                      >
                        Fresh Vegetables
                      </Heading>
                      <Heading
                        fontWeight={700}
                        fontSize={['30px', '30px', '50px']}
                      >
                        Big discount
                      </Heading>
                      <Text fontSize={['25px', '25px', '30px']}>
                        Save up to 50% off on your first order
                      </Text>
                      <Button
                        backgroundColor="#29A56C"
                        _hover={{
                          backgroundColor: '#238759',
                        }}
                        color="#ffffff"
                        onClick={() => (window.location.href = '/products')}
                        style={{
                          marginTop: '1.2em',
                        }}
                        w={['50%', '50%', '25%']}
                      >
                        <HStack alignItems={'center'} justifyContent="center">
                          <Text>Shop Now</Text>
                          <AiOutlineArrowRight />
                        </HStack>
                      </Button>
                    </VStack>
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
                <Grid
                  templateColumns={[
                    'repeat(1,1fr)',
                    'repeat(2,1fr)',
                    'repeat(5, 1fr)',
                  ]}
                  gap="1.2em"
                >
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
