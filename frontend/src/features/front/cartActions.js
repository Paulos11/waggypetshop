import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { addToCart as addToCartAction, removeFromCart as removeFromCartAction, updateCartItemQuantity as updateCartItemQuantityAction } from './cartSlice';

export const addToCart = (item) => ({
  type: 'cart/addToCart',
  payload: item,
});

export const removeFromCart = (productId) => ({
  type: 'cart/removeFromCart',
  payload: productId,
});

export const updateCartItemQuantity = ({ productId, quantity }) => ({
  type: 'cart/updateCartItemQuantity',
  payload: { productId, quantity },
});

export const clearCart = () => ({
  type: 'cart/clearCart',
});

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/cart');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item, { dispatch }) => {
    try {
      const response = await api.post('/products/cart', item);
      dispatch(addToCartAction(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (item, { dispatch }) => {
    try {
      await api.delete(`/products/cart/${item.productId}`);
      dispatch(removeFromCartAction(item));
    } catch (error) {
      throw error;
    }
  }
);
export const updateCartItemQuantityAsync = createAsyncThunk(
  'cart/updateCartItemQuantityAsync',
  async (item, { dispatch }) => {
    try {
      const response = await api.put(`/products/cart/${item.productId}`, { quantity: item.quantity });
      dispatch(updateCartItemQuantityAction(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/products/cart');
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { dispatch }) => {
    try {
      const response = await api.get('/products/cart');
      dispatch(addToCartAction(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);