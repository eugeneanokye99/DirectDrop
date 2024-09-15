import React from 'react';
import { Box, Button, Flex, Grid, Heading, Image, Stack, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import { PencilIcon, ShareIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const UserProfile = () => {
  const userInfo = {
    username: 'JohnDoe123',
    displayName: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
    status: 'Online',
    reputation: '4.8 / 5',
    bio: 'Software Engineer passionate about full-stack development and AI.',
    registrationDate: 'Joined on January 10, 2021',
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
    <Box maxW="6xl" mx="auto" p="8">
      {/* Profile Section */}
      <Flex direction="column" align="center" mb="8">
        <Image
          src={userInfo.profilePicture}
          alt="Profile"
          borderRadius="full"
          boxSize="150px"
          mb="4"
          shadow="md"
          border="4px solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        />
        <Heading size="lg">{userInfo.displayName}</Heading>
        <Text fontSize="lg" color="gray.500" mt="1">
          @{userInfo.username} &bull;{' '}
          <Text as="span" color={statusColor} fontWeight="bold">
            {userInfo.status}
          </Text>
        </Text>
        <Text color="gray.600" mt="2">
          Reputation: {userInfo.reputation}
        </Text>
      </Flex>

      {/* User Information */}
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        shadow="md"
        rounded="lg"
        p="6"
        mb="8"
        maxW="lg"
        mx="auto"
      >
        <Flex justify="space-between" align="center" mb="4">
          <Heading size="md">User Information</Heading>
          <Button size="sm" leftIcon={<PencilSquareIcon />} colorScheme="blue">
            Edit Profile
          </Button>
        </Flex>
        <Stack spacing="4">
          <Flex justify="space-between">
            <Text fontWeight="semibold">Email:</Text>
            <Text>{userInfo.email}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontWeight="semibold">Bio:</Text>
            <Text>{userInfo.bio}</Text>
          </Flex>
          <Text>{userInfo.registrationDate}</Text>
        </Stack>
      </Box>

      {/* Uploaded Files and Shared Files */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="6">
        {/* Uploaded Files */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
          transition="all 0.2s"
          _hover={{ shadow: 'lg' }}
        >
          <Flex bg="red.500" color="white" p="4" align="center">
            <IconButton icon={<PencilIcon />} aria-label="Uploaded Files" mr="2" />
            <Text fontWeight="bold" fontSize="lg">
              Uploaded Files
            </Text>
          </Flex>
          <Box p="4">
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
                <Flex justify="space-between">
                  <Text color="gray.600" fontWeight="semibold">Status</Text>
                  <Text color="blue.600" fontWeight="bold">{file.status}</Text>
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Shared Files */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
          transition="all 0.2s"
          _hover={{ shadow: 'lg' }}
        >
          <Flex bg="green.700" color="white" p="4" align="center">
            <IconButton icon={<ShareIcon />} aria-label="Shared Files" mr="2" />
            <Text fontWeight="bold" fontSize="lg">
              Shared With Me
            </Text>
          </Flex>
          <Box p="4">
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
                <Flex justify="space-between">
                  <Text color="gray.600" fontWeight="semibold">Status</Text>
                  <Text color="blue.600" fontWeight="bold">{file.status}</Text>
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default UserProfile;
