import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, IconButton, VStack, HStack, Icon, Input, Button, Avatar, useColorModeValue, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiPlus, FiSearch, FiFile, FiSettings, FiTrash2, FiLogOut, FiHome, FiTerminal, FiUsers, FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../services/Api';

const Home = () => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState('');
  const [data, setData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    } else {
      navigate('/login');
    }

    fetchData(token);
  }, [navigate]);

  const onClose = () => setIsOpen(false);

  const handleLogout = () => {
    setIsOpen(true);
  };

  const fetchData = async (token) => {
    try {
      const data = await fetchUserData(token)
      setUser(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      console.error('Fetching user data failed:', errorMessage);
      Alert.alert('Fetching user data Failed', errorMessage);
    }
  }

  const confirmLogout = () => {
    setIsLoading(true);
    // Remove the access token from local storage
    localStorage.removeItem('accessToken');

    setTimeout(() => {
      setIsLoading(false);
      // Show success toast
      toast({
        title: 'Logout successful.',
        description: 'You have been logged out.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Navigate to the login page
      navigate('/login');
    }, 1000); // Simulate a delay for demonstration
  };

  return (
    <Flex h="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {/* Sidebar */}
      <Box w="250px" bg={useColorModeValue('white', 'gray.800')} p={4} shadow="md">
        {/* User Profile */}
        <Link to="/userprofile">
          <VStack spacing={3} align="start" mb={6}>
            <Avatar size="md" name="Freya Browning" src="https://bit.ly/dan-abramov" />
            <Text fontSize="md" fontWeight="bold">{user.first_name}  {user.last_name}</Text>
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>{user.email}</Text>
          </VStack>
        </Link>

        <VStack align="start" spacing={4}>
          
          <Menu>
            <MenuButton as={Button} leftIcon={<FiPlus />} variant="solid" w="full" justifyContent="start">
              New
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => console.log('New File clicked')}>New File</MenuItem>
              <MenuItem onClick={() => console.log('New Folder clicked')}>New Folder</MenuItem>
            </MenuList>
          </Menu>
          <Text fontSize="xl" fontWeight="bold">DirectDrop</Text>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiHome />}>
            Home
          </Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiUsers />}>
            Shared with me
          </Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiUsers />}>
            Spam
          </Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiTrash />}>
            Trash
          </Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiSettings />}>
            Settings
          </Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiLogOut />} onClick={handleLogout}>
            Logout
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Flex flex="1" direction="column" p={6}>
        {/* Top Navigation */}
        <HStack justify="space-between" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">DirectDrop</Text>
          <HStack spacing={4}>
            <Input placeholder="Search..." size="md" />
            <IconButton icon={<FiSearch />} aria-label="Search" />
          </HStack>
        </HStack>

        {/* Content */}
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
            {/* Add more file items here */}
          </VStack>
        </Box>

      </Flex>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to log out? You will be redirected to the login page.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={confirmLogout} ml={3} isLoading={isLoading}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Home;
