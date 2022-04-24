import React, { useEffect, useRef, useCallback } from 'react';

import { HStack, Text, Input, VStack, Box, Spinner } from '@chakra-ui/react';

import { useSearchParams } from 'react-router-dom';

import { useSearch } from '../../../hooks';
interface Props {
  form: any;
  landing: boolean;
}
const SearchBar = ({ form, landing = false }: Props) => {
  const { loading, searchWords, filteredData, setSearchWords } = useSearch();
  const [searchParams] = useSearchParams();
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
        borderRadius={landing ? '25px' : '6px'}
      >
        <HStack w="100%">
          {landing ? (
            <Input
              borderColor={'#f3f4f7'}
              py="6px"
              border={'1px solid transparent'}
              variant="unstyled"
              onChange={(e) => {
                dropDownToggle(true);
                setSearchWords(e.target.value);
              }}
            />
          ) : (
            <Input
              backgroundColor="#f3f4f7"
              borderColor={'#f3f4f7'}
              border={'1px solid transparent'}
              p="8px"
              variant="unstyled"
              onChange={(e) => {
                setSearchWords(e.target.value);
                dropDownToggle(true);
                form.setFieldValue('keywords', e.target.value);
              }}
            />
          )}

          {/* <IconButton
              size="sm"
              aria-label="Search"
              type="submit"
              bgColor={'#005450'}
              color="#000000"
              borderRadius={'50%'}
              cursor="pointer"
            >
              <Image src={SearchIcon} w="12px" h="14px" />
            </IconButton> */}
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
                        No such service
                      </Text>
                    </>
                  ) : (
                    filteredData.slice(0, 10).map((value: any) => {
                      return (
                        <Box
                          key={value.service_id}
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
                            const url = new URL(
                              '/services',
                              window.location.href,
                            );
                            const searchParams = url.searchParams;
                            searchParams.set('keywords', value.service_name);
                            searchParams.delete('category');
                            url.search = searchParams.toString();
                            const newurl = url.toString();
                            window.location.href = newurl;
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
