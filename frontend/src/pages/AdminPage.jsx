import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import BrandManagement from './BrandManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Link to="products" className="p-6 bg-blue-500 text-white rounded text-center">
          Manage Products
        </Link>
        <Link to="categories" className="p-6 bg-green-500 text-white rounded text-center">
          Manage Categories
        </Link>
        <Link to="brands" className="p-6 bg-purple-500 text-white rounded text-center">
          Manage Brands
        </Link>
        <Link to="orders" className="p-6 bg-yellow-500 text-white rounded text-center">
          Manage Orders
        </Link>
        <Link to="users" className="p-6 bg-red-500 text-white rounded text-center">
          Manage Users
        </Link>
      </div>
      <Routes>
        <Route path="products" element={<ProductManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="brands" element={<BrandManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="users" element={<UserManagement />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
