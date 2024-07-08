import { createSlice } from '@reduxjs/toolkit';
import { getWishlist, addToWishlist, removeFromWishlist } from './wishlistActions';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { products: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.products = action.payload.products;
      });
  },
});

export default wishlistSlice.reducer;
