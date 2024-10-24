import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import Cookies library
import {
  Box, Flex, Text, IconButton, VStack, HStack, Input, Button, Avatar,
  useColorModeValue, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure
} from '@chakra-ui/react';
import { FiMenu, FiSearch, FiFile, FiSettings, FiTrash2, FiLogOut, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../services/api';

const Home = () => {
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen: isLogoutDialogOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();

  useEffect(() => {
    const token = Cookies.get('accessToken'); // Get the token from cookies
    if (token) {
      fetchData(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchData = async (token) => {
    try {
      const data = await fetchUserData(token); // Use the token from cookies
      setUser(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      console.error('Fetching user data failed:', errorMessage);
    }
  };

  const handleLogout = () => {
    onLogoutOpen();
  };

  const confirmLogout = () => {
    setIsLoading(true);
    Cookies.remove('accessToken'); // Remove the token from cookies

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Logout successful.',
        description: 'You have been logged out.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    }, 1000);
  };

  return (
    <Flex h="100vh" bg={useColorModeValue('gray.100', 'gray.900')} flexDirection={{ base: 'column', md: 'row' }}>
      {/* Sidebar Toggle Button */}
      <IconButton
        aria-label="Open sidebar"
        icon={<FiMenu />}
        onClick={onOpen}
        display={{ base: 'flex', md: 'none' }}
        position="absolute"
        zIndex="1"
        m={4}
      />

      {/* Sidebar */}
      <Box
        w={{ base: 'full', md: '250px' }}
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        shadow="md"
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        position={{ base: 'absolute', md: 'relative' }}
        top={0}
        left={0}
        zIndex={1}
      >
        {/* Close Button */}
        <IconButton
          aria-label="Close sidebar"
          icon={<FiX />}
          onClick={onClose}
          display={{ base: 'block', md: 'none' }}
          mb={4}
          variant="ghost"
          float="right"
        />

        {/* User Profile */}
        <Link to="/userprofile">
          <VStack spacing={3} align="start" mb={6}>
            <Avatar size="md" name="Freya Browning" src="https://bit.ly/dan-abramov" />
            {user && (
              <>
                <Text fontSize="md" fontWeight="bold">{user.first_name} {user.last_name}</Text>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>{user.email}</Text>
              </>
            )}
          </VStack>
        </Link>

        <VStack align="start" spacing={4}>
          <Text fontSize="xl" fontWeight="bold">Project files</Text>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiFile />}>New document</Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiFile />}>New spreadsheet</Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiFile />}>New project</Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiFile />}>New team</Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiSettings />}>Settings</Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiLogOut />} onClick={handleLogout}>Logout</Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Flex flex="1" direction="column" p={{ base: '4', md: '6' }} overflowY="auto" mt={{ base: '60px', md: '0' }}>
        <HStack justify="space-between" mb={6}>
          <HStack spacing={4}>
            <Input placeholder="Search..." size="md" width={{ base: 'auto', md: '200px' }} />
            <IconButton icon={<FiSearch />} aria-label="Search" />
          </HStack>
        </HStack>

        <Box bg={useColorModeValue('white', 'gray.800')} p={4} shadow="md" borderRadius="md">
          <Text fontSize="lg" mb={4}>Recently modified</Text>
          <VStack align="start" spacing={4}>
            <HStack justify="space-between" w="full">
              <Text>Dashboard tech requirements</Text>
              <HStack spacing={2}>
                <IconButton icon={<FiFile />} aria-label="Open file" size="sm" />
                <IconButton icon={<FiTrash2 />} aria-label="Delete file" size="sm" />
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Flex>

      {/* Logout Confirmation Dialog */}
      <AlertDialog isOpen={isLogoutDialogOpen} leastDestructiveRef={cancelRef} onClose={onLogoutClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Confirm Logout</AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to log out? You will be redirected to the login page.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onLogoutClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={confirmLogout} ml={3} isLoading={isLoading}>Logout</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Home;
