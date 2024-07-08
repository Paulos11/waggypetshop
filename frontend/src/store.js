import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import categoryReducer from './features/category/categorySlice';
import wishlistReducer from './features/wishlistSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;
