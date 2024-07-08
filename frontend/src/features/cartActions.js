import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`, { withCredentials: true });
  return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (data) => {
  const response = await axios.post(`${API_BASE_URL}/cart/add`, data, { withCredentials: true });
  toast.success('Added to cart');
  return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
  const response = await axios.post(`${API_BASE_URL}/cart/remove`, { productId }, { withCredentials: true });
  return response.data;
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await axios.post(`${API_BASE_URL}/cart/clear`, {}, { withCredentials: true });
  toast.success('Cart cleared');
  return response.data;
});
