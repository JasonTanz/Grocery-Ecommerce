import React from 'react';

import {
  VStack,
  HStack,
  Center,
  Container,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { SearchProps } from '../types/searchTypes';
import { SearchBar, ProductCard } from '../components/molecules';
import { PageWrapper } from '../components/organisms';
const Landing = () => {
  const initialValues = {
    keywords: '',
  };
  const item = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  return (
    <>
      <PageWrapper>
        <VStack pt="2" w="100%">
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
            <VStack w="100%" alignItems={'flex-start'} px="15rem">
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
                  const url = new URL('/services', window.location.origin);
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
        </VStack>
        <Center py="3em" bgColor="#fff">
          <Container maxW="container.xl">
            <HStack justifyContent={'center'} pb="2em">
              {' '}
              <Heading>Popular Items</Heading>
            </HStack>

            <Grid templateColumns={'repeat(5, 1fr)'} gap="1.2em">
              {item.map((_, index: number) => (
                <GridItem key={index}>
                  <ProductCard />
                </GridItem>
              ))}
            </Grid>
          </Container>
        </Center>
      </PageWrapper>
    </>
  );
};

export default Landing;
