import React from 'react';
import { PageWrapper } from '../components/organisms';
import {
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
import { GiFruitBowl, GiChickenLeg, GiFrozenOrb } from 'react-icons/gi';
import { BsEgg } from 'react-icons/bs';
import { FaCoffee } from 'react-icons/fa';
import { CategoryButton } from '../components/atoms';
import { ProductCard } from '../components/molecules';
const ProductListings = () => {
  const item = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  return (
    <>
      <PageWrapper>
        <Grid
          templateColumns={'1fr 4fr'}
          gap="16px"
          px="14px"
          pt="25px"
          pb="2em"
        >
          <GridItem>
            <VStack position={'sticky'} top="15%">
              <VStack
                boxShadow={'5px 5px 15px rgb(0 0 0 / 5%)'}
                borderRadius="15px"
                border="1px solid #ececec"
                p="30px"
              >
                <VStack gap="8px" alignItems={'flex-start'}>
                  <Heading fontSize={'32px'}>Category</Heading>
                  <Divider />
                  <CategoryButton>
                    {' '}
                    <GiFruitBowl
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Fruits & Vegetables</Text>
                  </CategoryButton>
                  <CategoryButton>
                    {' '}
                    <GiChickenLeg
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Meets & Seafood</Text>
                  </CategoryButton>
                  <CategoryButton>
                    {' '}
                    <BsEgg
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Breakfast & Dairy</Text>
                  </CategoryButton>
                  <CategoryButton>
                    {' '}
                    <FaCoffee
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Beverages</Text>
                  </CategoryButton>
                  <CategoryButton>
                    {' '}
                    <GiFrozenOrb
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                    />
                    <Text>Frozen Foods</Text>
                  </CategoryButton>
                </VStack>
              </VStack>
            </VStack>
          </GridItem>
          <GridItem>
            <Grid templateColumns={'repeat(4, 1fr)'} gap="1.2em">
              {item.map((_, index: number) => (
                <GridItem key={index}>
                  <ProductCard />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </PageWrapper>
    </>
  );
};

export default ProductListings;
