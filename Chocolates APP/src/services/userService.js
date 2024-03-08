import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';
const token = localStorage.getItem('userToken');

// Axios instance with auth headers
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to append auth headers to the requestss
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken'); // Ensure this matches how you store the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization']; // Remove Authorization header if no token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register
export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  if (response.data.token) {
    localStorage.setItem('userToken', response.data.token);
    // Update api instance headers with the new token
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  }
  return response.data;
};

// Fetch all users
export const fetchAllUsers = async () => {
  const response = await api.get('/');
  return response.data;
};

// Fetch a single user by ID
export const fetchUserById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Update a user
export const updateUser = async (id, userData) => {
  const response = await api.put(`/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
