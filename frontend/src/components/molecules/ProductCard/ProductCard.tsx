import React from 'react';
import { VStack, HStack, Text, Button, Image } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const ProductCard = () => {
  return (
    <VStack
      borderRadius={'15px'}
      minH="25vh"
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
      onClick={() => (window.location.href = '/product/detail')}
    >
      <VStack className="zoom-on-hover">
        <Image
          src={
            'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg'
          }
          maxH="320px"
          className="product-img"
        />
      </VStack>
      <VStack alignItems={'flex-start'} gap="6px">
        <Text color="#adadad" fontSize={'12px'}>
          Snack
        </Text>
        <Text fontSize={'16px'} fontWeight="700">
          Seeds of Change Organic Quinoe Naurel
        </Text>
        <HStack justifyContent={'space-between'} w="100%">
          <Text fontSize={'18px'} fontWeight="bold" color="#3BB77E">
            RM28.85
          </Text>
          <Button
            backgroundColor={'#DEF9EC'}
            borderRadius="4px"
            px="8px"
            py="10px"
          >
            <HStack>
              <AiOutlineShoppingCart />
              <Text fontSize={'12px'}>Add</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ProductCard;
