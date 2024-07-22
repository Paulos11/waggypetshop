import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import productService from './productService';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await productService.getProducts();
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const response = await productService.addProduct(productData);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  const response = await productService.updateProduct(id, productData);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await productService.deleteProduct(id);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product._id === action.payload._id);
        state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectCategories = (state) => state.categories.categories;

export const selectProductList = createSelector(
  [selectProducts, selectCategories],
  (products, categories) => {
    return products.map((product) => ({
      ...product,
      category: categories.find(cat => cat._id === product.categoryId)?.name,
    }));
  }
);

export default productSlice.reducer;
