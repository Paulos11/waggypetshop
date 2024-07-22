import React from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ dropdownOpen, categories, handleCategoryClick, dropdownRef }) => (
  dropdownOpen === 'category' && (
    <div ref={dropdownRef} className="absolute mt-2 py-2 w-48 bg-white border rounded shadow-xl z-50">
      {categories.map((category) => (
        <Link
          key={category._id}
          to={`/shop?searchTerm=&category=${category._id}&priceRange=%22%22`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          style={{ fontFamily: 'Chilanka, cursive', cursor: 'pointer' }}
          onClick={handleCategoryClick} 
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
);

export default DropdownMenu;
