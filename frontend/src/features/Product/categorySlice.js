import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await categoryService.getCategories();
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryData) => {
    const response = await categoryService.addCategory(categoryData);
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }) => {
    const response = await categoryService.updateCategory(id, categoryData);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    await categoryService.deleteCategory(id);
    return id;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;