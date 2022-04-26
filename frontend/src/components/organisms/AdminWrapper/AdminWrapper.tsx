import React from 'react';
import { Grid, GridItem, VStack, HStack, Image, Text } from '@chakra-ui/react';
import { GroceryLogo } from '../../../assets';
const AdminWrapper = ({ children }: any) => {
  return (
    <Grid templateColumns={'1fr 5fr'}>
      <GridItem borderRight="1px solid #eee">
        <VStack position="fixed">
          <HStack w="100%" borderBottom={'1px solid #eee'}>
            <Image src={GroceryLogo} maxW="4vw" />
            <Text fontSize={'1.2rem'} fontWeight={500}>
              Grocery Ecommerce
            </Text>
          </HStack>
          <VStack alignItems={'flex-start'} w="100%" px="1.2em">
            <Text>Dashboard</Text>
            <Text>Products</Text>
          </VStack>
        </VStack>
      </GridItem>
      {children}
    </Grid>
  );
};

export default AdminWrapper;
