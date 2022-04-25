import React, { useEffect, useRef, useCallback } from 'react';

import { HStack, Text, Input, VStack, Box, Spinner } from '@chakra-ui/react';

import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../../hooks';
// import { BsSearch } from 'react-icons/bs';
interface Props {
  form: any;
}
const SearchBar = ({ form }: Props) => {
  const { loading, searchWords, filteredData, setSearchWords } = useSearch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keywords = searchParams.get('keywords');
  const inputText = useRef(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback((e) => {
    if (dropDownRef.current) {
      if (dropDownRef && !dropDownRef.current!.contains(e.target)) {
        dropDownRef.current!.style!.visibility = 'hidden';
      } else {
        return;
      }
    }
  }, []);
  const dropDownToggle = (status: boolean) => {
    if (status) {
      dropDownRef.current!.style!.visibility = 'visible';
    } else {
      dropDownRef.current!.style!.visibility = 'hidden';
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', (e: any) => handleClickOutside(e));
    return () => {
      document.removeEventListener('mousedown', (e: any) =>
        handleClickOutside(e),
      );
    };
  }, [handleClickOutside]);
  useEffect(() => {
    if (keywords) {
      if (inputText.current) {
        //@ts-ignore
        inputText!.current!.value = keywords;
        form.setFieldValue('keywords', keywords);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  return (
    <>
      <HStack
        w="100%"
        bgColor={'white'}
        justifyContent={'space-between'}
        py=".6em"
        px="3.5"
        position={'relative'}
        borderRadius={'6px'}
      >
        <HStack w="100%" justifyContent={'flex-end'}>
          {' '}
          <Input
            ref={inputText}
            backgroundColor="#f3f4f7"
            borderColor={'#f3f4f7'}
            border={'1px solid transparent'}
            p="8px"
            w="60%"
            variant="unstyled"
            onChange={(e) => {
              setSearchWords(e.target.value);
              dropDownToggle(true);
              form.setFieldValue('keywords', e.target.value);
            }}
          />
        </HStack>

        {searchWords.length > 0 && (
          <>
            {' '}
            <VStack
              ref={dropDownRef}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              bgColor={'#FFFFFF'}
              borderRadius={'8px'}
              mt="10px"
              ml="20px"
              w="85%"
              boxShadow={'0px 4px 20px rgba(0, 84, 80, 0.25)'}
              overflow={'hidden'}
              overflowY={'auto'}
              h="auto"
              maxH={'170px'}
              className="scroll-bar"
              py="8px"
              position="absolute"
              top="55px"
            >
              {loading ? (
                <HStack w="100%" justifyContent={'center'} py="25px">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="lg"
                  />
                </HStack>
              ) : (
                <>
                  {filteredData.length === 0 ? (
                    <>
                      <Text px="16px" py="6px" cursor="pointer">
                        No such product
                      </Text>
                    </>
                  ) : (
                    filteredData.slice(0, 10).map((value: any) => {
                      return (
                        <Box
                          key={value.product_id}
                          py="8px"
                          px="15px"
                          style={{
                            marginTop: '0px',
                          }}
                          _hover={{
                            backgroundColor: '#F7F7F7',
                          }}
                          w="100%"
                          cursor={'pointer'}
                          onClick={() => {
                            navigate({
                              pathname: '/products',
                              search: `?keywords=${value.product_name}`,
                            });
                            dropDownToggle(false);
                          }}
                        >
                          <Text>{value.product_name}</Text>
                        </Box>
                      );
                    })
                  )}
                </>
              )}
            </VStack>
          </>
        )}
      </HStack>
    </>
  );
};

export default SearchBar;
