import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
interface Props {
  text: string;
  onClick?: () => void;
}
const ProfileDropDownText = ({ text, onClick }: Props) => {
  return (
    <Box
      _hover={{
        backgroundColor: '#F7F7F7',
      }}
      w="100%"
      cursor={'pointer'}
      onClick={onClick}
      style={{
        marginTop: '0px',
      }}
    >
      <Text px="15px" py="8px" color="#0F1A05">
        {text}
      </Text>
    </Box>
  );
};

ProfileDropDownText.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProfileDropDownText;
