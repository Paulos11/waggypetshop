import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { addToWishlist as addToWishlistAction, removeFromWishlist as removeFromWishlistAction } from './wishlistSlice';

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlistAsync',
  async (product, { dispatch }) => {
    try {
      const response = await api.post('/products/wishlist', { productId: product._id });
      dispatch(addToWishlistAction(product));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlistAsync',
  async (productId, { dispatch }) => {
    try {
      await api.delete(`/products/wishlist/${productId}`);
      dispatch(removeFromWishlistAction(productId));
    } catch (error) {
      throw error;
    }
  }
);

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (_, { dispatch }) => {
    try {
      const response = await api.get('/products/wishlist');
      dispatch(addToWishlistAction(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

