import React from 'react';
import { HStack, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
const CategoryButton = ({ children, onClick }: any) => {
  return (
    <Button
      border="1px solid #F2F3F4"
      borderRadius={'5px'}
      py="22px"
      px="20px"
      background={'#ffffff'}
      _hover={{
        border: '1px solid #20c997',
        boxShadow: 'md',
        transition: 'opacity 500ms ease 0',
      }}
      onClick={onClick}
      w="100%"
    >
      <HStack justifyContent={'flex-start'} w="100%">
        {children}
      </HStack>
    </Button>
  );
};

CategoryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.any,
};

export default React.memo(CategoryButton);
