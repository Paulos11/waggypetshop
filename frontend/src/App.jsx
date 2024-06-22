// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductDetails from './components/ProductDetails'; 
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './pages/Auth';

const Shop = () => <div>Shop Page</div>;
const Blog = () => <div>Blog Page</div>;
const Pages = () => <div>Pages</div>;
const Others = () => <div>Others Page</div>;
const Category = () => <div>Category Page</div>;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/others" element={<Others />} />
        <Route path="/category" element={<Category />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} /> 
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
