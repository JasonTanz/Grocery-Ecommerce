/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PageWrapper } from '../components/organisms';
import {
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Divider,
  useToast,
  Center,
  Container,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import { GiFruitBowl, GiChickenLeg, GiFrozenOrb } from 'react-icons/gi';
import { BsEgg, BsFillGridFill } from 'react-icons/bs';
import { FaCoffee } from 'react-icons/fa';
import { CategoryButton } from '../components/atoms';
import { getProductsPaginate } from '../graphql/product';
import { Products as ProductsProps } from '../types/productTypes';
import { useLazyQuery } from '@apollo/client';
import { ProductCard } from '../components/molecules';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import Lottie from 'lottie-react';
import NotFound from '../assets/lottie/Not-found.json';
const ProductListings = () => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);
  const keywords = searchParams.get('keywords')
    ? searchParams.get('keywords')
    : '';

  const currentPage: string | number | null = searchParams.get('page')
    ? parseInt(searchParams.get('page')!, 10)
    : 1;

  const searchCategory: string | null = searchParams.get('category')
    ? searchParams.get('category')
    : null;
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState(0);
  const [category, setCategory] = useState<string | null>('');
  const [keyword, setKeyword] = useState<string | null>('');
  const paginateOppo = (e: any, val: any) => {
    searchParams.set('page', val);
    setSearchParams(searchParams);
    setPage(val);
  };

  const [
    getAll,
    { data: products, loading: productLoading, error: productErr },
  ] = useLazyQuery(getProductsPaginate);

  useEffect(() => {
    if (products) {
      if (
        products.getProductsPaginate.currentPage >
          products.getProductsPaginate.totalPages &&
        products.getProductsPaginate.totalPages !== 0
      ) {
        console.log(products.getProductsPaginate);
        if (products.getProductsPaginate.totalPages > 1) {
          setPage(1);
          //@ts-ignore
          searchParams.set('page', 1);
          setSearchParams(searchParams);
        } else {
          setPage(products.getProductsPaginate.totalPages);
          searchParams.set('page', products.getProductsPaginate.totalPages);
          setSearchParams(searchParams);
        }
      } else if (products.getProductsPaginate.totalPages !== 0) {
        setPage(products.getProductsPaginate.currentPage);
      }

      setAllProducts([...products.getProductsPaginate.data]);
      setPages(products.getProductsPaginate.totalPages);
    }

    if (productErr) {
      toast({
        title: 'Fail to fetch products',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [productErr, products, searchParams, setSearchParams, toast, keyword]);

  useEffect(() => {
    if (currentPage) {
      //@ts-ignore
      searchParams.set('page', currentPage);
      setSearchParams(searchParams);
      setPage(currentPage);
    }
    if (searchCategory !== null) {
      setCategory(searchCategory);
    }
    if (keywords !== '') {
      setKeyword(keywords);
    }
  }, [currentPage, keywords, searchCategory, searchParams, setSearchParams]);

  useEffect(() => {
    getAll({
      variables: {
        input: {
          keywords: keyword,
          page,
          category,
        },
      },
    });
  }, [category, getAll, keyword, page, searchParams, setSearchParams]);

  const handleCat = (name: string) => {
    setCategory(name);
    searchParams.set('category', name);
    setSearchParams(searchParams);
  };

  return (
    <>
      <PageWrapper>
        <Grid
          templateColumns={'1fr 4fr'}
          gap="16px"
          px="16px"
          pt="25px"
          pb="4em"
          minH="100vh"
        >
          <GridItem>
            <VStack position={'sticky'} top="15%">
              <VStack
                boxShadow={'5px 5px 15px rgb(0 0 0 / 5%)'}
                borderRadius="15px"
                border="1px solid #ececec"
                p="30px"
              >
                <VStack gap="8px" alignItems={'flex-start'}>
                  <Heading fontSize={'32px'}>Category</Heading>
                  <Divider />
                  <CategoryButton
                    onClick={() => {
                      setCategory(null);
                      searchParams.delete('category');
                      searchParams.delete('keywords');
                      setSearchParams(searchParams);
                    }}
                  >
                    {' '}
                    <BsFillGridFill
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>All</Text>
                  </CategoryButton>
                  <CategoryButton
                    onClick={() => {
                      handleCat('Fruits & Vegetables');
                    }}
                  >
                    {' '}
                    <GiFruitBowl
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Fruits & Vegetables</Text>
                  </CategoryButton>
                  <CategoryButton
                    onClick={() => {
                      handleCat('Meats & Seafood');
                    }}
                  >
                    {' '}
                    <GiChickenLeg
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Meats & Seafood</Text>
                  </CategoryButton>
                  <CategoryButton
                    onClick={() => {
                      handleCat('Breakfast & Dairy');
                    }}
                  >
                    {' '}
                    <BsEgg
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Breakfast & Dairy</Text>
                  </CategoryButton>
                  <CategoryButton
                    onClick={() => {
                      handleCat('Beverages');
                    }}
                  >
                    {' '}
                    <FaCoffee
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Beverages</Text>
                  </CategoryButton>
                  <CategoryButton
                    onClick={() => {
                      handleCat('Frozen Foods');
                    }}
                  >
                    {' '}
                    <GiFrozenOrb
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Frozen Foods</Text>
                  </CategoryButton>
                </VStack>
              </VStack>
            </VStack>
          </GridItem>
          <GridItem>
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
                {allProducts.length > 0 ? (
                  <Grid templateColumns={'repeat(4, 1fr)'} gap="1.2em">
                    {allProducts.map((prod) => (
                      <GridItem key={prod.product_id}>
                        <ProductCard prod={prod} />
                      </GridItem>
                    ))}
                  </Grid>
                ) : (
                  <VStack>
                    {' '}
                    <Heading fontSize={'30px'}>Product not found</Heading>
                    <Text>Try other keywords...</Text>
                    <VStack w="20vw">
                      <Lottie animationData={NotFound} />
                    </VStack>
                  </VStack>
                )}
              </>
            )}
            <HStack
              justifyContent={'center'}
              spacing={'20px'}
              alignItems={'center'}
              fontSize={'20px'}
              pt="25px"
              cursor={'pointer'}
            >
              {pages > 1 && (
                <>
                  <Pagination
                    count={pages}
                    color="primary"
                    size="large"
                    onChange={paginateOppo}
                    defaultPage={page}
                    page={page}
                  />
                </>
              )}
            </HStack>
          </GridItem>
        </Grid>
      </PageWrapper>
    </>
  );
};

export default ProductListings;
