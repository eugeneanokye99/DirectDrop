// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-api-url.com', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to send login request
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;  // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : error.message;  // Handle and throw the error
  }
};

// Register request function
export const registerUser = async (firstName, lastName, email, password) => {
    try {
      const response = await api.post('/register', {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;  // Return the response data
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };

export default api;
