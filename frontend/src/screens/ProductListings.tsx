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
import { BsEgg } from 'react-icons/bs';
import { FaCoffee } from 'react-icons/fa';
import { CategoryButton } from '../components/atoms';
import {
  // findAllProducts,
  // findByKeywordsWithInfo,
  getProductsPaginate,
} from '../graphql/product';
import { Products as ProductsProps } from '../types/productTypes';
import { useLazyQuery } from '@apollo/client';
import { ProductCard } from '../components/molecules';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { getByCategoryName } from '../graphql/category';
const ProductListings = () => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);
  const keywords = searchParams.get('keywords')
    ? searchParams.get('keywords')
    : '';
  const currentPage: any = searchParams.get('page')
    ? searchParams.get('page')
    : 1;
  const [page, setPage] = useState(parseInt(currentPage, 10));
  const [pages, setPages] = useState(0);
  const [category, setCategory] = useState<string>('');
  const paginateOppo = (e: any, val: any) => {
    setPage(val);
    getAll({
      variables: {
        input: {
          keywords,
          limit: 12,
          page: val,
          category,
        },
      },
    });
    // setSearchParams({ page: val });
  };
  // Get By Category name
  const [
    getProductsByCatName,
    {
      data: productByCategory,
      loading: productLoadingByCategory,
      error: productErrByCategory,
    },
  ] = useLazyQuery(getByCategoryName);

  // Get By product keywords
  // const [
  //   getByProductKeywords,
  //   {
  //     data: productsByKeyword,
  //     loading: productLoadingByKeyword,
  //     error: productErrByKeyword,
  //   },
  // ] = useLazyQuery(findByKeywordsWithInfo, {
  //   variables: { keywords },
  // });

  const [
    getAll,
    { data: products, loading: productLoading, error: productErr },
  ] = useLazyQuery(getProductsPaginate);

  useEffect(() => {
    if (products) {
      setAllProducts([...products.getProductsPaginate.data]);
      setPages(products.getProductsPaginate.totalPages);
      setPage(products.getProductsPaginate.currentPage);
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

  useEffect(() => {
    if (productByCategory) {
      setAllProducts([...productByCategory.findByCategoryName[0].products]);
    }

    if (productErrByCategory) {
      toast({
        title: 'Fail to fetch products by category',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [productByCategory, productErrByCategory, toast]);

  // useEffect(() => {
  //   if (productsByKeyword) {
  //     console.log('here');
  //     setAllProducts([...productsByKeyword.searchProductByKeyword]);
  //   }

  //   if (productErrByKeyword) {
  //     toast({
  //       title: 'Fail to fetch products by keywords',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // }, [productErrByKeyword, productsByKeyword, toast]);

  // useEffect(() => {
  //   console.log('rerender');
  //   if (keywords !== '') {
  //     getByProductKeywords();
  //   } else {
  //     console.log('there');
  //     getAll();
  //   }
  // }, [getAll, getByProductKeywords, keywords]);
  useEffect(() => {
    getAll({
      variables: {
        input: {
          keywords,
          limit: 12,
          page: 1,
          category,
        },
      },
    });
  }, [category, getAll, keywords, setPage]);

  return (
    <>
      <PageWrapper>
        <Grid
          templateColumns={'1fr 4fr'}
          gap="16px"
          px="16px"
          pt="25px"
          pb="2em"
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
                      getAll({
                        variables: {
                          input: {
                            keywords,
                            limit: 10,
                            page: 1,
                          },
                        },
                      });
                    }}
                  >
                    {' '}
                    <GiFruitBowl
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>All</Text>
                  </CategoryButton>
                  <CategoryButton
                    onClick={() => {
                      setCategory('Fruits & Vegetables');
                      // getProductsByCatName({
                      //   variables: { category: 'Fruits & Vegetables' },
                      // });
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
                      setCategory('Meats & Seafood');
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
                      setCategory('Breakfast & Dairy');
                      // getProductsByCatName({
                      //   variables: { category: 'Breakfast & Dairy' },
                      // });
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
                      setCategory('Beverages');
                      // getProductsByCatName({
                      //   variables: { category: 'Beverages' },
                      // });
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
                      setCategory('Frozen Foods');
                      // getProductsByCatName({
                      //   variables: { category: 'Frozen Foods' },
                      // });
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
            {productLoading || productLoadingByCategory ? (
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
                <Grid templateColumns={'repeat(4, 1fr)'} gap="1.2em">
                  {allProducts.map((prod) => (
                    <GridItem key={prod.product_id}>
                      <ProductCard prod={prod} />
                    </GridItem>
                  ))}
                </Grid>
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
