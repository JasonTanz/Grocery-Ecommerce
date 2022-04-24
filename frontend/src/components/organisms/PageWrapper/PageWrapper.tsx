import React from 'react';
import { VStack, HStack, Text } from '@chakra-ui/react';
import { AiFillFire } from 'react-icons/ai';
const PageWrapper = ({ children }: any) => {
  return (
    <VStack pt="6em" w="100%">
      <HStack
        bgColor={'#fff'}
        borderTop="1px solid #ececec"
        borderBottom="1px solid #ececec"
        w="100%"
        py="6px"
        justifyContent={'center'}
      >
        <HStack>
          <AiFillFire />
          <Text>Free Delivery, Save up to 50%</Text>
        </HStack>
      </HStack>
      {children}
    </VStack>
  );
};

export default PageWrapper;
