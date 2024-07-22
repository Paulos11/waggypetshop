
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import brandService from './brandService';


export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const response = await brandService.getBrands();
  return response.data;
});

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;