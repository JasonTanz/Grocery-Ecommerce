import React, { useEffect, useRef, useCallback } from 'react';
import {
  Center,
  HStack,
  Container,
  Image,
  Heading,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { GroceryLogo } from '../../../assets';
import { SearchBar } from '../../molecules';
import { Form, Field, Formik } from 'formik';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { SearchProps } from '../../../types/searchTypes';
import { useNavigate } from 'react-router-dom';
import ProfileDropDown from '../ProfileDropDown/ProfileDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { findCartByCustId } from '../../../graphql/cart';
import { ADD_TO_CART } from '../../../reducers/cartSlice';
interface Props {
  searchBar?: boolean;
}

// eslint-disable-next-line no-unused-vars
const Header = ({ searchBar = false }: Props) => {
  const headerSticky = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const initialValues = { keywords: '' };
  const toast = useToast();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const cart_qty = useSelector((state: any) => state.cart.cart_qty);
  const authState = useSelector((state: any) => state.auth.user);
  const [getCartByCustId, { data: cartItem, error: cartErr }] =
    useLazyQuery(findCartByCustId);

  const handleScroll = useCallback((e: any) => {
    const window = e.currentTarget;
    if (window.scrollY > 10) {
      stickyToggle(true);
    } else {
      stickyToggle(false);
    }
  }, []);

  const stickyToggle = (status: boolean) => {
    if (headerSticky.current) {
      if (status) {
        headerSticky.current!.style!.background = '#FFFFFF';
        headerSticky.current!.style!.boxShadow = ' 0 1px 2px 0 rgba(0,0,0,.1)';
      } else {
        headerSticky.current!.style!.background = 'transparent';
        headerSticky.current!.style!.boxShadow = 'none';
      }
    }
  };

  useEffect(() => {
    if (cartItem) {
      dispatch(
        ADD_TO_CART({
          cart_qty: cartItem.findCartByCustId.length,
        }),
      );
    }
    if (cartErr) {
      toast({
        title: 'Fail to fetch products',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, cartItem, cartErr, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      getCartByCustId({
        variables: {
          cust_id: authState.id,
        },
      });
    }
  }, [authState, getCartByCustId, isAuthenticated]);

  useEffect(() => {
    window.addEventListener('scroll', (e: any) => handleScroll(e));
    return () => {
      window.removeEventListener('scroll', (e: any) => handleScroll(e));
    };
  }, [handleScroll]);

  return (
    <>
      <Center
        bgColor="transparent"
        w="100%"
        zIndex="150"
        position="fixed"
        transition="150ms cubic-bezier(0.215,0.61,0.355,1);"
        py="16px"
        alignItems="center"
        justifyContent="center"
        id="header"
        ref={headerSticky}
      >
        <Container maxW="95%">
          <HStack
            justifyContent={'space-between'}
            alignItems="center"
            gap="2em"
          >
            <HStack w="50%" gap="1.2em" alignContent={'center'}>
              <Image
                src={GroceryLogo}
                w="60px"
                onClick={() => (window.location.href = '/')}
                cursor="pointer"
              />
              <Heading
                fontSize={'24px'}
                onClick={() => (window.location.href = '/')}
                cursor="pointer"
              >
                Grocery Ecommerce
              </Heading>
              <Link fontSize={'18px'} href="/" pt="6px">
                Home
              </Link>
              <Link fontSize={'18px'} href="/products" pt="6px">
                Products
              </Link>
            </HStack>
            <HStack gap="1.2em" w="50%" position={'relative'}>
              <HStack w="100%">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(data: SearchProps) => {
                    if (data.keywords !== '') {
                      navigate({
                        pathname: '/products',
                        search: `?keywords=${data.keywords}`,
                      });
                    } else {
                      window.location.href = '/products';
                    }
                  }}
                  enableReinitialize
                >
                  {() => (
                    <Form style={{ width: '100%' }}>
                      <Field
                        placeholder="Search for products..."
                        boxShadow={false}
                        component={SearchBar}
                      />
                    </Form>
                  )}
                </Formik>
              </HStack>
              {isAuthenticated && (
                <>
                  {' '}
                  <VStack position={'relative'}>
                    <AiOutlineShoppingCart
                      style={{
                        width: '35px',
                        height: '35px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        window.location.href = '/cart';
                      }}
                    />

                    <HStack
                      position={'absolute'}
                      w="20px"
                      h={'20px'}
                      borderRadius="50%"
                      color="#ffffff"
                      top="-12px"
                      left="20px"
                      backgroundColor="#3BB77E"
                      justifyContent={'center'}
                      alignItems="center"
                    >
                      <Text fontSize={'12px'} fontWeight="600">
                        {cart_qty}
                      </Text>
                    </HStack>
                  </VStack>
                </>
              )}

              <ProfileDropDown />
            </HStack>
          </HStack>
        </Container>
      </Center>
    </>
  );
};

export default Header;
