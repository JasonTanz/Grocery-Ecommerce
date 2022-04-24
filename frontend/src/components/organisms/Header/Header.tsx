import React, { useEffect, useRef, useCallback } from 'react';
import {
  Center,
  HStack,
  Container,
  Image,
  Heading,
  Link,
} from '@chakra-ui/react';
import { GroceryLogo } from '../../../assets';
import { SearchBar } from '../../molecules';
import { Form, Field, Formik } from 'formik';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { SearchProps } from '../../../types/searchTypes';

import ProfileDropDown from '../ProfileDropDown/ProfileDropDown';

interface Props {
  searchBar?: boolean;
}

// eslint-disable-next-line no-unused-vars
const Header = ({ searchBar = false }: Props) => {
  const headerSticky = useRef<HTMLDivElement>(null);

  const initialValues = { keywords: '' };

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
              <Link fontSize={'18px'} href="/product/" pt="6px">
                Products
              </Link>
            </HStack>
            <HStack gap="1.2em" w="50%">
              <HStack w="100%">
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
              <ProfileDropDown />
            </HStack>
          </HStack>
        </Container>
      </Center>
    </>
  );
};

export default Header;
