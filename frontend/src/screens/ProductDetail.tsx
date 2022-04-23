import React from 'react';
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
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { GESelectDropDown } from '../components/atoms';
import { PageWrapper } from '../components/organisms';

const ProductDetail = () => {
  const initialValues = {
    testing: '',
  };
  return (
    <>
      <PageWrapper>
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
                    src={
                      'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg'
                    }
                    className="product-img"
                  />
                </VStack>
              </GridItem>
              <GridItem>
                <VStack alignItems={'flex-start'} gap="12px">
                  <Text color="#adadad">Category</Text>
                  <Heading>Seeds of Change Organic Quinoa, Brown</Heading>
                  <Heading color="#3BB77E" fontSize={'40px'}>
                    RM25
                  </Heading>
                  <Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sint quas totam voluptatem, natus iusto veritatis facere
                    temporibus animi nam tempora quo dolor sequi quam ea eveniet
                    praesentium, enim incidunt corporis?Lorem
                  </Text>
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
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                quis quam iusto fuga rerum quaerat, ipsam nostrum a
                exercitationem alias facilis delectus ullam pariatur excepturi
                veritatis tempore! Atque, eveniet suscipit. Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Nam asperiores fugit,
                ullam sequi, repellendus modi expedita deserunt rerum placeat
                quia animi doloribus eum illo molestiae error quae ad voluptatem
                qui.
              </Text>
            </VStack>
          </Container>
        </Center>
      </PageWrapper>
    </>
  );
};

export default ProductDetail;
