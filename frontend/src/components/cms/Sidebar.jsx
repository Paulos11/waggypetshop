import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaProductHunt, FaThList, FaTags, FaShoppingCart, FaUsers, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <div className="bg-[#424542] text-white flex flex-col w-64 h-full transition-all duration-300">
      <h2 className="text-2xl font-bold p-4">Admin</h2>
      <nav className="flex flex-col flex-grow p-4 space-y-2">
        <Link to="products" className="flex items-center p-3 hover:bg-white hover:text-[#2D2C29] rounded transition-colors">
          <FaProductHunt className="mr-2" /> Products
        </Link>
        <Link to="categories" className="flex items-center p-3 hover:bg-white hover:text-[#2D2C29] rounded transition-colors">
          <FaThList className="mr-2" /> Categories
        </Link>
        <Link to="orders" className="flex items-center p-3 hover:bg-white hover:text-[#2D2C29] rounded transition-colors">
          <FaShoppingCart className="mr-2" /> Orders
        </Link>
        <Link to="users" className="flex items-center p-3 hover:bg-white hover:text-[#2D2C29] rounded transition-colors">
          <FaUsers className="mr-2" /> Users
        </Link>
      </nav>
      <div className="flex flex-col p-4 space-y-2">
        <Link to="account" className="flex items-center p-3 hover:bg-white hover:text-[#2D2C29] rounded transition-colors">
          <FaUser className="mr-2" /> Account
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 hover:bg-white hover:text-[#2D2C29] rounded transition-colors"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
