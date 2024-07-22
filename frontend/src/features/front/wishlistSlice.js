import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { setWithExpiry, getWithExpiry } from '../../utilities/storageUtils';

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlistAsync',
  async (product, { rejectWithValue }) => {
    try {
      const response = await api.post('/products/wishlist', { productId: product._id });
      return product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlistAsync',
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`/products/wishlist/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/wishlist');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: getWithExpiry('wishlistItems') || [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.some(item => item._id === product._id)) {
        state.items.push(product);
        setWithExpiry('wishlistItems', state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      setWithExpiry('wishlistItems', state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlistItems');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        const product = action.payload;
        if (!state.items.some(item => item._id === product._id)) {
          state.items.push(product);
          setWithExpiry('wishlistItems', state.items);
        }
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        setWithExpiry('wishlistItems', state.items);
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
