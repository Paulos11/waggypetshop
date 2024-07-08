import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async () => {
  const response = await axios.get('/api/wishlist');
  return response.data;
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId) => {
  const response = await axios.post('/api/wishlist/add', { productId });
  return response.data;
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (productId) => {
  const response = await axios.post('/api/wishlist/remove', { productId });
  return response.data;
});
