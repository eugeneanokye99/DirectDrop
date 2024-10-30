// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import Cookies from 'js-cookie';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, Text, Spinner } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';// Import the useAuth hook

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Get auth state and setter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      showToast(data.message, "You're logged in.", 'success');
      if (data.message === 'Login successful') {
        Cookies.set('accessToken', data.access_token, { expires: 1 / (60 * 24) });
        setIsAuthenticated(true); // Update auth state
        navigate('/home');
      }
    } catch (error) {
      showToast('Login failed.', error.response ? error.response.data.message : 'An error occurred', 'error');
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
      <Box w="400px" p={6} boxShadow="lg" bg="white" borderRadius="md">
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

          <Button colorScheme="blue" width="full" onClick={handleLogin}>
            Login
          </Button>

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
