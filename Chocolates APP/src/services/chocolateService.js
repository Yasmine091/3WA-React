import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chocolates';

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to append auth headers to the requestss
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Fetch all chocolates
export const fetchChocolates = async () => {
  const response = await api.get('/');
  return response.data;
};

// Fetch a single chocolate by ID
export const fetchChocolateById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Create a chocolate
export const createChocolate = async (chocolateData) => {
  const response = await api.post('/', chocolateData);
  return response.data;
};

// Update a chocolate
export const updateChocolate = async (id, chocolateData) => {
  const response = await api.put(`/${id}`, chocolateData);
  return response.data;
};

// Delete a chocolate
export const deleteChocolate = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
