import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || Cookies.get('token');
  if (token) {
    console.log('Token found, adding to headers');
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('No token found');
  }
  return config;
}, (error) => {
  console.error('Error in request interceptor:', error);
  return Promise.reject(error);
});

export default api;
