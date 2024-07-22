import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { setWithExpiry, getWithExpiry } from '../../utilities/storageUtils';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/cart');
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user ? auth.user._id : 'guest';
      
      const response = await api.post('/products/cart', { ...item, userId });
      console.log('Add to cart response:', response.data);
      if (response.data && response.data.items) {
        return response.data.items;
      } else {
        return rejectWithValue('Server returned an invalid response');
      }
    } catch (error) {
      console.error('Add to cart error:', error.response?.data);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (productId, { dispatch }) => {
    try {
      await api.delete(`/products/cart/${productId}`);
      return productId;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCartItemQuantityAsync = createAsyncThunk(
  'cart/updateCartItemQuantityAsync',
  async ({ productId, quantity }, { dispatch }) => {
    try {
      const response = await api.put(`/products/cart/${productId}`, { quantity });
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
      return [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user ? auth.user._id : 'guest';
      
      const response = await api.get(`/products/cart/${userId}`);
      return response.data.items;
    } catch (error) {
      console.error('Get cart error:', error.response?.data);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getWithExpiry('cartItems') || [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        setWithExpiry('cartItems', state.items);
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.productId !== action.payload);
        setWithExpiry('cartItems', state.items);
      })
      .addCase(updateCartItemQuantityAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.productId === action.payload.productId);
        if (index !== -1) {
          state.items[index] = action.payload;
          setWithExpiry('cartItems', state.items);
        }
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
        localStorage.removeItem('cartItems');
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.items = action.payload;
        setWithExpiry('cartItems', state.items);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
