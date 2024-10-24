import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  Box, Button, Flex, Grid, Heading, Image, Stack, Text, Icon, useColorModeValue, Divider,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Input, FormControl, FormLabel, useDisclosure, useToast
} from '@chakra-ui/react';
import { PencilIcon, ShareIcon, DocumentIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { fetchUserData, updateUserData } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const MotionButton = motion(Button);

const UserProfile = () => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setAccessToken(token);
      fetchData(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchData = async (token) => {
    try {
      const data = await fetchUserData(token);
      setUser(data);
      setFormData({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        bio: data.bio,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      console.error('Fetching user data failed:', errorMessage);
      alert('Fetching user data Failed: ' + errorMessage);
    }
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const { firstName, lastName, email, bio } = formData;
      const data = await updateUserData(accessToken, firstName, lastName, bio, email);
      toast({
        title: data.message,
        description: "You have successfully updated your profile",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      if (data.message === 'User update successful') {
        setUser({ 
          ...user, // Keep existing user data
          first_name: firstName, 
          last_name: lastName, 
          email, 
          bio 
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: 'Update failed.',
        description: error.response ? error.response.data.message : 'An error occurred',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const userInfo = {
    status: 'Online',
    reputation: '4.8 / 5',
    uploadedFiles: [
      { name: 'Project Report.pdf', size: '1.2MB', date: '2024-09-12', downloads: 12, status: 'Public' },
      { name: 'Vacation Photos.zip', size: '45MB', date: '2024-08-22', downloads: 5, status: 'Private' },
    ],
    sharedWithMe: [
      { name: 'Design Mockup.png', size: '2.5MB', date: '2024-09-10', from: 'Alice', status: 'View Only' },
      { name: 'Hey There.pdf', size: '5.5MB', date: '2024-10-10', from: 'Lucy', status: 'View Only' },
    ],
  };

  const statusColor = userInfo.status === 'Online' ? 'green.400' : 'red.400';

  return (
    <Box bgGradient="linear(to-r, white, #eaeaea, #dcdcdc)">
      <Box maxW="6xl" mx="auto" p="8">
        <Flex direction="column" align="center" mb="8">
          <Image
            src={user.profilePicture} // Make sure user object contains profilePicture
            alt="Profile"
            borderRadius="full"
            boxSize="150px"
            mb="4"
            shadow="md"
            border="4px solid"
            borderColor={useColorModeValue('gray.800')}
          />
          <Heading size="lg" color='grey.500'>{user.first_name} {user.last_name}</Heading>
          <Text fontSize="lg" color="grey" mt="1">
            {user.email} &bull;{' '}
            <Text as="span" color={statusColor} fontWeight="bold">
              {userInfo.status}
            </Text>
          </Text>
          <Box
            bg={useColorModeValue('yellow.600')}
            borderRadius='lg'
            paddingTop='1'
            paddingBottom='2'
            paddingRight='5'
            paddingLeft='5'
            marginTop='2'
          >
            <Text fontSize='small' color="white" mt="2">
              Reputation: {userInfo.reputation}
            </Text>
          </Box>
        </Flex>

        {/* Edit Profile Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Bio</FormLabel>
                <Input
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Box
          bg={useColorModeValue('gray.800')}
          shadow="md"
          rounded="lg"
          p="6"
          mb="8"
          maxW="lg"
          mx="auto"
        >
          <Flex direction="column" align="center" mb="4">
            <Heading fontSize='lg' color="white">User Information</Heading>
            <Button size='sm' leftIcon={<Icon as={PencilIcon} boxSize="4" />} colorScheme="green" mt="4" onClick={onOpen}>
              Edit Profile
            </Button>
          </Flex>
          <Stack fontSize='sm' spacing="4">
            <Flex>
              <Text color='grey'>{user.email}</Text>
            </Flex>
            <Flex>
              <Text color='grey'>{user.bio}</Text>
            </Flex>
            <Text color='grey'>Joined on {user.created_at}</Text>
          </Stack>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            borderColor={useColorModeValue('gray.800')}
            shadow="md"
            transition="all 0.2s"
            _hover={{ shadow: 'lg' }}
          >
            <Flex
              bg={useColorModeValue('gray.800')}
              color="white" p="4" align="center">
              <Icon as={DocumentIcon} boxSize="20px" mr="2" />
              <Text fontWeight="bold" fontSize="lg">
                Uploaded Files
              </Text>
            </Flex>
            <Box fontSize="sm" p="4">
              {userInfo.uploadedFiles.map((file, index) => (
                <Box key={index} mb="4">
                  <Text fontWeight="semibold" textAlign="center" mb="1">
                    {file.name}
                  </Text>
                  <Flex justify="space-between">
                    <Text color="gray.600" fontWeight="semibold">Size</Text>
                    <Text color="blue.600" fontWeight="bold">{file.size}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="gray.600" fontWeight="semibold">Date</Text>
                    <Text color="blue.600" fontWeight="bold">{file.date}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="gray.600" fontWeight="semibold">Downloads</Text>
                    <Text color="blue.600" fontWeight="bold">{file.downloads}</Text>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            borderColor={useColorModeValue('gray.800')}
            shadow="md"
            transition="all 0.2s"
            _hover={{ shadow: 'lg' }}
          >
            <Flex
              bg={useColorModeValue('gray.800')}
              color="white" p="4" align="center">
              <Icon as={ShareIcon} boxSize="20px" mr="2" />
              <Text fontWeight="bold" fontSize="lg">
                Shared With Me
              </Text>
            </Flex>
            <Box fontSize="sm" p="4">
              {userInfo.sharedWithMe.map((file, index) => (
                <Box key={index} mb="4">
                  <Text fontWeight="semibold" textAlign="center" mb="1">
                    {file.name}
                  </Text>
                  <Flex justify="space-between">
                    <Text color="gray.600" fontWeight="semibold">Size</Text>
                    <Text color="blue.600" fontWeight="bold">{file.size}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="gray.600" fontWeight="semibold">Date</Text>
                    <Text color="blue.600" fontWeight="bold">{file.date}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="gray.600" fontWeight="semibold">From</Text>
                    <Text color="blue.600" fontWeight="bold">{file.from}</Text>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;
