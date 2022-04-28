import React from 'react';
import {
  Grid,
  GridItem,
  VStack,
  HStack,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import { GroceryLogo } from '../../../assets';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../../reducers/authSlice';
import { BiLogOut } from 'react-icons/bi';
import { BsFillGridFill } from 'react-icons/bs';
const AdminWrapper = ({ children }: any) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(LOGOUT());
    window.location.href = '/';
  };
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
          <VStack
            alignItems={'flex-start'}
            justifyContent="center"
            w="100%"
            px="1.2em"
            py="1.2em"
            gap="12px"
          >
            <HStack w="100%" justifyContent={'flex-start'}>
              <BsFillGridFill style={{ width: '20px', height: '20px' }} />
              <Link fontSize={'1.2rem'} href="/admin/dashboard">
                Dashboard
              </Link>
            </HStack>
            <HStack w="100%" justifyContent={'flex-start'}>
              <BiLogOut style={{ width: '25px', height: '25px' }} />
              <Link fontSize={'1.2rem'} onClick={() => logout()}>
                Logout
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </GridItem>
      {children}
    </Grid>
  );
};

export default AdminWrapper;
