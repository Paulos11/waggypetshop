import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';
import Sidebar from './Sidebar';
import AdminAccountManagement from './AdminAccountManagement';

const AdminDashboard = () => {
  return (
    <div className="flex justify-center items-center py-16 ">
      <div className="w-[1000px] bg-[#DEAD6F] rounded-lg shadow-lg overflow-hidden flex h-[800px]">
        <Sidebar />
        <div className="flex-grow p-6 bg-white overflow-auto" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="products" />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="account" element={<AdminAccountManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
