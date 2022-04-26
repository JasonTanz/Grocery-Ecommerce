import React, { useRef, useCallback, useEffect } from 'react';
import {
  VStack,
  useToast,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { LOGOUT } from '../../../reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileDropDownText } from '../../atoms';
import RegistrationModal from '../RegistrationModal/RegistrationModal';

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const profileRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authState = useSelector((state: any) => state.auth.user);

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  const profileToggle = (status: boolean) => {
    if (status) {
      profileRef.current!.style!.visibility = 'visible';
    } else {
      profileRef.current!.style!.visibility = 'hidden';
    }
  };

  const logout = () => {
    dispatch(LOGOUT());
    window.location.href = '/';
    toast({
      title: 'Logout Successful',
      description: 'You have successfully logged out',
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleClickOutside = useCallback((e) => {
    if (profileRef.current) {
      if (profileRef && !profileRef.current!.contains(e.target)) {
        profileRef.current!.style!.visibility = 'hidden';
      } else {
        return;
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', (e: any) => handleClickOutside(e));
    return () => {
      document.removeEventListener('mousedown', (e: any) =>
        handleClickOutside(e),
      );
    };
  }, [handleClickOutside]);

  return (
    <>
      <RegistrationModal isOpen={isOpen} onClose={onClose} />
      {isAuthenticated ? (
        <VStack
          borderRadius={'50%'}
          background="#48BB78"
          w="55px"
          h="42px"
          color="#ffffff"
          fontWeight={'600'}
          alignItems="center"
          justifyContent={'center'}
          position="relative"
          cursor={'pointer'}
          onClick={() => {
            profileToggle(true);
          }}
        >
          <Text fontSize={'1.5rem'}>
            {' '}
            {authState.username[0].toUpperCase()}
          </Text>
        </VStack>
      ) : (
        <Button colorScheme={'teal'} w="30%" onClick={() => onOpen()}>
          Login/SignUp
        </Button>
      )}

      {isAuthenticated && (
        <VStack
          ref={profileRef}
          visibility={'hidden'}
          position={'absolute'}
          bgColor="#FFFFFF"
          top="90%"
          right="4%"
          width={'16em'}
          borderRadius={'8px'}
          boxShadow={'0px 4px 20px rgba(0, 84, 80, 0.25)'}
          justifyContent={'center'}
          alignItems={'flex-start'}
          py="15px"
          transition="150ms cubic-bezier(0.215,0.61,0.355,1);"
        >
          <ProfileDropDownText
            text={'My Dashboard'}
            onClick={() => (window.location.href = '/cust/dashboard')}
          />
          <ProfileDropDownText text={'Log Out'} onClick={() => logout()} />
        </VStack>
      )}
    </>
  );
};

export default React.memo(ProfileDropDown);
