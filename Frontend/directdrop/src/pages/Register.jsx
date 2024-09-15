import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {registerUser} from '../services/Api.jsx';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Text,
} from '@chakra-ui/react';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const data = await registerUser(firstName, lastName, email, password);
      toast({
        title: 'Registration successful.',
        description: "You can now log in.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // You can add redirection logic or other actions here
    } catch (error) {
      toast({
        title: 'Registration failed.',
        description: error || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };


  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
     bgGradient="linear(to-r, white, #eaeaea, #dcdcdc)"
    >
      <Box
        w="400px"
        p={6}
        boxShadow="lg"
        bg="white"
        borderRadius="md"
      >
        <VStack spacing={5}>
          <Heading size="lg">Register</Heading>

          <FormControl id="first-name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </FormControl>

          <FormControl id="last-name" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="full"
            onClick={handleRegister}
          >
            Register
          </Button>

          {/* Link to Login page */}
          <Text>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'blue' }}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Register;
