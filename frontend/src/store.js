import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import wishlistReducer from './features/front/wishlistSlice';
import cartReducer from './features/front/cartSlice';
import orderReducer from './features/front/orderSlice';
import productReducer from './features/Product/productSlice';
import categoryReducer from './features/Product/categorySlice';
import userReducer from './features/User/userSlice';
import brandReducer from './features/Product/brandSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    brands: brandReducer,
    categories: categoryReducer,
    users: userReducer,
    orders: orderReducer,

  },
});

export default store;
