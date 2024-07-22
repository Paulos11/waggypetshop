import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/front/cartActions';
import { fetchCategories } from '../../features/Product/categorySlice';
import { clearWishlist } from '../../features/front/wishlistSlice';

import { getWithExpiry } from '../../utilities/storageUtils';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ContactInfo from './ContactInfo';
import NavLinks from './NavLinks';
import UserActions from './UserActions';
import Sidebar from './Sidebar';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchSidebar, setSearchSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dispatch = useDispatch();
  const { categories = [], status } = useSelector((state) => state.categories || {});
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedCartItems = getWithExpiry('cartItems');
    const storedWishlistItems = getWithExpiry('wishlistItems');

    if (!storedCartItems) {
      dispatch(clearCart());
    }

    if (!storedWishlistItems) {
      dispatch(clearWishlist());
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(null);
    }
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [dropdownOpen, handleClickOutside]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSearchSidebar(false);
  };

  const toggleSearchSidebar = () => {
    setSearchSidebar(!searchSidebar);
    setSidebarOpen(false);
  };

  const toggleDropdown = useCallback((dropdown) => {
    setDropdownOpen(prevState => {
      if (prevState === dropdown) {
        return null;
      } else {
        setTimeout(() => {
          setDropdownOpen(dropdown);
        }, 10);
        return prevState;
      }
    });
  }, []);

  const dropdownRef = useRef(null);

  return (
    <>
      <nav className="bg-white py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <Logo />
          <SearchBar />
          <ContactInfo />
        </div>
        <hr className="mt-7" />
      </nav>
      <nav className="hidden lg:flex items-center min-h-[70px]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative">
            <button
              onClick={() => toggleDropdown('category')}
              className="text-black text-lg"
              style={{ fontFamily: 'Chilanka, cursive' }}
            >
              Shop by Category <span className="text-sm">▼</span>
            </button>
            <DropdownMenu 
              dropdownOpen={dropdownOpen} 
              categories={categories} 
              dropdownRef={dropdownRef} 
              handleCategoryClick={() => setDropdownOpen(null)}
            />
          </div>
          <NavLinks />
          <UserActions 
            toggleDropdown={toggleDropdown} 
            dropdownOpen={dropdownOpen} 
          />
        </div>
      </nav>
      <nav className="block lg:hidden">
        <div className="container mx-auto flex justify-between items-center py-4">
          <UserActions 
            toggleDropdown={toggleDropdown} 
            dropdownOpen={dropdownOpen} 
          />
          <MdMenu className="text-black text-2xl" onClick={toggleSidebar} />
        </div>
      </nav>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${sidebarOpen || searchSidebar ? 'block' : 'hidden'}`} onClick={() => { setSidebarOpen(false); setSearchSidebar(false); }}></div>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transition-transform transform ${searchSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <h2 className="text-lg font-bold" style={{ fontFamily: 'Chilanka, cursive' }}>Search</h2>
          <hr className="my-2" />
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 text-lg font-thin"
              placeholder="Search For More Than 10,000 Products"
              style={{ fontFamily: 'Chilanka, cursive' }}
            />
            <AiOutlineSearch className="absolute right-4 top-3 text-xl text-gray-800" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
