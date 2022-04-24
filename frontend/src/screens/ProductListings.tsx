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
} from '@chakra-ui/react';
import { GiFruitBowl, GiChickenLeg, GiFrozenOrb } from 'react-icons/gi';
import { BsEgg } from 'react-icons/bs';
import { FaCoffee } from 'react-icons/fa';
import { CategoryButton } from '../components/atoms';
import { findAllProducts } from '../graphql/product';
import { Products as ProductsProps } from '../types/productTypes';
import { useQuery } from '@apollo/client';
import { ProductCard } from '../components/molecules';
const ProductListings = () => {
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
                  <CategoryButton>
                    {' '}
                    <GiFruitBowl
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Fruits & Vegetables</Text>
                  </CategoryButton>
                  <CategoryButton>
                    {' '}
                    <GiChickenLeg
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Meats & Seafood</Text>
                  </CategoryButton>
                  <CategoryButton>
                    {' '}
                    <BsEgg
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Breakfast & Dairy</Text>
                  </CategoryButton>
                  <CategoryButton>
                    {' '}
                    <FaCoffee
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Beverages</Text>
                  </CategoryButton>
                  <CategoryButton>
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
                <Grid templateColumns={'repeat(4, 1fr)'} gap="1.2em">
                  {allProducts.map((prod) => (
                    <GridItem key={prod.product_id}>
                      <ProductCard prod={prod} />
                    </GridItem>
                  ))}
                </Grid>
              </>
            )}
          </GridItem>
        </Grid>
      </PageWrapper>
    </>
  );
};

export default ProductListings;
