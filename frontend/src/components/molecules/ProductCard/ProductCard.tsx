import React from 'react';
import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { Category } from '../../../types/categoryType';
import { Products as ProductsProps } from '../../../types/productTypes';
interface Props {
  prod: ProductsProps;
}
const ProductCard = ({ prod }: Props) => {
  return (
    <VStack
      borderRadius={'15px'}
      minH="62vh"
      maxW="85vw"
      gap="1.8em"
      backgroundColor="#ffff"
      border="1px solid #ececec"
      overflow={'hidden'}
      px="1.2em"
      py="1.3em"
      cursor={'pointer'}
      _hover={{
        border: '1px solid #20c997',
        boxShadow: 'md',
        transition: 'opacity 500ms ease 0',
      }}
      onClick={() =>
        (window.location.href = `/product/detail/${prod.product_id}`)
      }
    >
      <VStack className="zoom-on-hover">
        <Image
          src={prod.product_img}
          minH="195px"
          minW="195px"
          maxH="320px"
          className="product-img"
        />
      </VStack>
      <VStack alignItems={'flex-start'} gap="3px" pt="8px" minW="12vw">
        <VStack alignItems={'flex-start'} minH="7vh" justifyContent={'center'}>
          {prod.categories.map((cat: Category, index) => (
            <Text
              style={{ marginTop: 0, marginLeft: 0 }}
              color="#adadad"
              fontSize={'12px'}
              key={index}
            >
              {cat.category_name}
            </Text>
          ))}
        </VStack>
        <Text fontSize={'16px'} fontWeight="700">
          {prod.product_name}
        </Text>
        <HStack justifyContent={'space-between'} w="100%">
          <Text fontSize={'18px'} fontWeight="bold" color="#3BB77E">
            RM{prod.product_price}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ProductCard;
