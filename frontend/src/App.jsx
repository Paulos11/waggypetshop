import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductDetails from './components/Products/ProductDetails';
import PrivateRoute from './components/PrivateRoute';
import Auth from './pages/Auth';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage'; 
import Checkout from './pages/CheckoutPage'; 
import Footer from './components/Layout/Footer';
import AdminDashboard from './components/cms/AdminDashboard';
import AuthProvider from './AuthProvider';
import AdminRoute from './components/cms/AdminRoute';
import Shop from './pages/Shop';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default App;
