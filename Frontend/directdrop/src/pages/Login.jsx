import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/Api';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

    // Check if access token is already stored and redirect to home
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        navigate('/home');
      }
    }, [navigate]);

  const handleLogin = async () => {
    try {
        const data = await loginUser(email, password);
        toast({
          title: data.message,
          description: "You're logged in.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        if(data.message == 'Login successful'){
          // Store the access token in local storage
          localStorage.setItem('accessToken', data.access_token);
        
          // Navigate to the home page
          navigate('/home');
        }
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: error.response ? error.response.data.message : 'An error occurred',
        status: 'error',
        duration: 2000,
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
          <Heading size="lg">Login</Heading>

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
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Link to Register page */}
          <Text>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'blue' }}>
              Register
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
