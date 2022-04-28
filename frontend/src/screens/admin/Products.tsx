import { useLazyQuery } from '@apollo/client';
import {
  useToast,
  Center,
  Container,
  Spinner,
  Table,
  Thead,
  GridItem,
  Text,
  Tr,
  Th,
  useDisclosure,
  Tbody,
  VStack,
  Button,
  HStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { ProductRow } from '../../components/molecules';
import { AdminWrapper, GEModal } from '../../components/organisms';
import { findAllProducts } from '../../graphql/product';
import { Products as ProductProps } from '../../types/productTypes';
import { Formik, Form, Field, FormikProps } from 'formik';
// import * as yup from 'yup';
import GETextFilledForm from '../../components/atoms/GETextFilledForm/GETextFilledForm';
import { GESelectDropDown } from '../../components/atoms';

interface FormValues {
  product_name: string;
  product_brief_intro: string;
  product_description: string;
  product_img: string;
  product_price: number;
  product_qty: number;
  categories: any;
}
// problem
// under development
// chakra select styling problem
// is multi problem
const Products = () => {
  // eslint-disable-next-line no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [
    getAll,
    { data: products, loading: productLoading, error: productErr },
  ] = useLazyQuery(findAllProducts);
  const [type, setType] = useState<string>('Create');
  // eslint-disable-next-line no-unused-vars
  const [modalProduct, setModalProduct] = useState({
    product_name: '',
    product_brief_intro: '',
    product_description: '',
    product_img: '',
    product_price: 0,
    product_qty: 0,
    categories: [],
  });
  const initialValues = {
    product_name: modalProduct.product_name,
    product_brief_intro: modalProduct.product_brief_intro,
    product_description: modalProduct.product_description,
    product_img: modalProduct.product_img,
    product_price: modalProduct.product_price,
    product_qty: modalProduct.product_qty,
    categories: modalProduct.categories,
  };

  //   const schema = yup.object({});

  const toast = useToast();
  useEffect(() => {
    if (products) {
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

  useEffect(() => {
    getAll();
  }, [getAll]);
  return (
    <>
      <GEModal isOpen={isOpen} onClose={onClose}>
        <VStack py="2.5em">
          <Formik
            initialValues={initialValues}
            // validationSchema={schema}
            onSubmit={(data) => {
              console.log(data);
            }}
            enableReinitialize
          >
            {(props: FormikProps<FormValues>) => (
              <Form style={{ width: '100%' }}>
                <VStack pb="12px">
                  <Field
                    label={'Product name'}
                    name="product_name"
                    component={GETextFilledForm}
                    onChange={props.handleChange}
                    value={props.values.product_name}
                  />
                  <Field
                    name="product_brief_intro"
                    component={GETextFilledForm}
                    label={'Product Brief Introduction'}
                    onChange={props.handleChange}
                    value={props.values.product_brief_intro}
                  />
                  <Field
                    name="product_description"
                    component={GETextFilledForm}
                    label={'Product Description'}
                    onChange={props.handleChange}
                    value={props.values.product_description}
                  />
                  <Field
                    name="product_img"
                    component={GETextFilledForm}
                    label={'Product Image URL'}
                    onChange={props.handleChange}
                    value={props.values.product_img}
                  />
                  <Field
                    name="product_price"
                    component={GETextFilledForm}
                    label={'Unit Price'}
                    onChange={props.handleChange}
                    value={props.values.product_price}
                    type="number"
                  />{' '}
                  <Field
                    name="product_qty"
                    component={GETextFilledForm}
                    label={'Product Qty'}
                    onChange={props.handleChange}
                    value={props.values.product_qty}
                    type="number"
                  />{' '}
                  <VStack py="2em">
                    {' '}
                    <Field
                      name="categories"
                      component={GESelectDropDown}
                      customclass="custom-dropdown"
                      value={props.values.categories}
                      isMulti={true}
                      options={[
                        {
                          label: 'Fruits & Vegetables',
                          value: 'fe6e645c-951c-4a2d-8c94-abfd5d15227b',
                        },
                        {
                          label: 'Meats & Seafood',
                          value: '6ebc0a16-ede2-4f2c-a1e1-d790b216d7bd',
                        },
                        {
                          label: 'Breakfast & Dairy',
                          value: '60bf6267-44f8-487e-ba5a-9ba9f8dfe133',
                        },
                        {
                          label: 'Beverages',
                          value: '118d1a5f-5ef7-46c4-8719-958963f21464',
                        },
                        {
                          label: 'Frozen Foods',
                          value: '3cc8b578-1894-4165-a66d-131694b1398b',
                        },
                      ]}
                    />
                  </VStack>
                </VStack>

                <Button bg={'#3BB77E'} w="100%" type="submit" color="#FFF">
                  {type === 'Create' ? (
                    <Text>Create Product</Text>
                  ) : (
                    <Text>Update Product</Text>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </VStack>
      </GEModal>
      <AdminWrapper>
        {productLoading ? (
          <>
            <Center minH="75vh">
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
            <GridItem bg="#f8f9fa">
              <Container
                maxW={'container.xl'}
                py="1.5em"
                style={{ marginLeft: 0 }}
              >
                <HStack w="100%" justifyContent="flex-end">
                  <Button
                    onClick={() => {
                      onOpen();
                      setType('Create');
                      setModalProduct({
                        product_name: '',
                        product_brief_intro: '',
                        product_description: '',
                        product_img: '',
                        product_price: 0,
                        product_qty: 0,
                        categories: [],
                      });
                    }}
                  >
                    Create Product
                  </Button>
                </HStack>{' '}
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>Brief Description</Th>
                      <Th>Unit Price</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {allProducts.map((prod: ProductProps) => (
                      <ProductRow
                        product={prod}
                        key={prod.product_id}
                        setModalProduct={setModalProduct}
                        onOpen={onOpen}
                        setType={setType}
                      />
                    ))}
                  </Tbody>
                </Table>
              </Container>
            </GridItem>
          </>
        )}
      </AdminWrapper>
    </>
  );
};

export default Products;
