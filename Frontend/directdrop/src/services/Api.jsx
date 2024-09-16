import axios from 'axios';

const apiURL = 'http://127.0.0.1:8000/'

const api = axios.create({
  baseURL: apiURL, 
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
export const registerUser = async (first_name, last_name, email, password) => {
    try {
      const response = await api.post('/register', {
        first_name,
        last_name,
        email,
        password,
      });
      return response.data;  // Return the response data
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };

export default api;
