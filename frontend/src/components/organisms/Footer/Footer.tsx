import { HStack, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { BsGithub } from 'react-icons/bs';
const Footer = () => {
  return (
    <HStack
      py="12px"
      justifyContent={'center'}
      w="100%"
      color="#00000"
      bg="#f7f8fd"
    >
      {' '}
      <Link
        cursor={'pointer'}
        href={'https://github.com/JasonTanz'}
        target="_blank"
      >
        <HStack>
          {' '}
          <BsGithub />
          <Text>Built by JasonTanz</Text>
        </HStack>
      </Link>
    </HStack>
  );
};

export default Footer;
