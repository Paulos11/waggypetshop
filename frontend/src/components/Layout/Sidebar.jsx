import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import categoryService from '../../features/Product/categoryService';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transition-transform transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
      <div className="p-4">
        <h2 className="text-lg font-bold" style={{ fontFamily: 'Chilanka, cursive' }}>Menu</h2>
        <hr className="my-2" />

        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2" style={{ fontFamily: 'Chilanka, cursive' }}>Shop by Category</h3>
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/shop?searchTerm=&category=${category._id}&priceRange=%22%22`}
              className="block py-1 text-black text-sm hover:bg-gray-100"
              style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }} 
              onClick={toggleSidebar} 
            >
              {category.name}
            </Link>
          ))}
        </div>

        <Link to="/home" className="block py-2 text-black hover:bg-gray-100" style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}>Home</Link>
        <Link to="/pages" className="block py-2 text-black hover:bg-gray-100" style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}>Pages</Link>
        <Link to="/shop" className="block py-2 text-black hover:bg-gray-100" style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}>Shop</Link>
        <Link to="/blog" className="block py-2 text-black hover:bg-gray-100" style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}>Blog</Link>
        <Link to="/contact" className="block py-2 text-black hover:bg-gray-100" style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}>Contact</Link>
        <Link to="/others" className="block py-2 text-black hover:bg-gray-100" style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}>Others</Link>
        <Link to="/get-pro" className="block py-2 text-black font-bold hover:bg-gray-100" style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}>GET PRO</Link>
      </div>
    </div>
  );
};

export default Sidebar;
