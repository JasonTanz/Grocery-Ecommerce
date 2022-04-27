import React from 'react';
import { Tr, Td, HStack, VStack, Image, Text, Button } from '@chakra-ui/react';

import { Products } from '../../../types/productTypes';
import { Category } from '../../../types/categoryType';
interface Props {
  product: Products;
  setModalProduct: any;
  onOpen: () => void;
  setType: any;
}
const ProductRow = ({ product, setModalProduct, onOpen, setType }: Props) => {
  return (
    <Tr>
      <Td>
        <HStack gap="1.5em">
          <VStack
            border="1px solid #ececec"
            borderRadius={'16px'}
            cursor="pointer"
          >
            <Image
              src={product.product_img}
              maxH="120px"
              className="product-img"
            />
          </VStack>
          <VStack alignItems={'flex-start'}>
            <Text color="#253D4E" fontSize={'16px'} fontWeight="600">
              {product.product_name}
            </Text>
            <VStack alignItems={'flex-start'}>
              {product.categories.map((cat: Category, index) => (
                <Text
                  style={{
                    marginTop: 0,
                    marginLeft: 0,
                  }}
                  color="#adadad"
                  fontSize={'12px'}
                  key={index}
                >
                  {cat.category_name}
                </Text>
              ))}
            </VStack>
          </VStack>
        </HStack>
      </Td>
      <Td>
        {' '}
        <Text isTruncated w="20vw">
          {product.product_brief_intro}
        </Text>
      </Td>
      <Td>
        {' '}
        <Text>RM{product.product_price}</Text>
      </Td>
      <Td>
        {' '}
        <HStack>
          <Button
            onClick={() => {
              onOpen();
              setType('Update');
              let cat: any = [];
              product.categories.forEach((category) => {
                console.log(category);
                cat.push({
                  label: category.category_name,
                  value: category.category_id,
                });
              });
              setModalProduct({
                product_name: product.product_name,
                product_brief_intro: product.product_brief_intro,
                product_description: product.product_description,
                product_img: product.product_img,
                product_price: product.product_price,
                product_qty: product.product_qty,
                categories: cat,
              });
            }}
          >
            Update
          </Button>
          <Button>Delete</Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default ProductRow;
