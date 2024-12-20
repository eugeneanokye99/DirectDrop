import axios from 'axios';

const apiURL = 'http://127.0.0.1:8000/';

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
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Register request function
export const registerUser = async (first_name, last_name, email, bio, password) => {
  try {
    const response = await api.post('/register', {
      first_name,
      last_name,
      email,
      bio,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to fetch user data request
export const fetchUserData = async (token) => {
  try {
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to update user data request
export const updateUserData = async (token, first_name, last_name, bio, email) => {
  try {
    const response = await api.put('/updateprofile', 
      {
        first_name,
        last_name,
        bio,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data)

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;
