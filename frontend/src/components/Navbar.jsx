import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdPerson, MdFavorite, MdShoppingCart, MdMenu } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { fetchCategories } from '../features/category/categorySlice';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchSidebar, setSearchSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, status, error } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSearchSidebar(false);
  };

  const toggleSearchSidebar = () => {
    setSearchSidebar(!searchSidebar);
    setSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAccountClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="bg-white py-4 ">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full text-center lg:w-auto lg:text-left">
            <Link to="/" className="text-black text-2xl">
              <img src="https://demo.templatesjungle.com/waggy/images/logo.png" alt="Waggy Logo" className="h-15 lg:h-15 mx-auto lg:mx-0" />
            </Link>
          </div>
          <div className="hidden lg:flex flex-1 mx-0 lg:mx-20 my-2 lg:my-0">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 lg:px-5 lg:py-5 text-lg lg:text-xl font-thin"
                placeholder="Search For More Than 10,000 Products"
                style={{ fontFamily: 'Chilanka, cursive' }}
              />
              <AiOutlineSearch className="absolute right-4 top-3 lg:top-5 text-xl lg:text-3xl text-gray-800" />
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <span className="text-sm text-gray-500" style={{ fontFamily: 'Chilanka, cursive' }}>Phone</span>
              <h5 className="text-lg text-black" style={{ fontFamily: 'Chilanka, cursive' }}>+980-34984089</h5>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500" style={{ fontFamily: 'Chilanka, cursive' }}>Email</span>
              <h5 className="text-lg text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Waggy@Gmail.Com</h5>
            </div>
          </div>
        </div>
        <hr className="mt-7"></hr>
      </nav>
      <nav className="hidden lg:flex items-center min-h-[70px]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-black text-lg"
              style={{ fontFamily: 'Chilanka, cursive' }}
            >
              Shop by Category <span className="text-sm">▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                {categories && categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block px-4 py-2 text-black hover:bg-gray-200"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-7">
            <Link to="/home" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Home</Link>
            <Link to="/pages" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>
              Pages <span className="text-sm">▼</span>
            </Link>
            <Link to="/shop" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Shop</Link>
            <Link to="/blog" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Blog</Link>
            <Link to="/contact" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Contact</Link>
            <Link to="/others" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Others</Link>
            <Link to="/get-pro" className="text-black text-[16px] font-bold" style={{ fontFamily: 'Chilanka, cursive' }}>GET PRO</Link>
          </div>
          <div className="flex items-center space-x-4">
            <MdPerson className="text-black text-2xl cursor-pointer" onClick={handleAccountClick} />
            {user ? (
              <button onClick={handleLogout} className="text-black text-2xl">Logout</button>
            ) : (
              <>
                <MdFavorite className="text-black text-2xl" />
                <div className="relative">
                  <MdShoppingCart className="text-black text-2xl" />
                  <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">03</span>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="block lg:hidden">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex space-x-4">
            <MdPerson className="text-black text-2xl cursor-pointer" onClick={handleAccountClick} />
            {user ? (
              <button onClick={handleLogout} className="text-black text-2xl">Logout</button>
            ) : (
              <>
                <MdFavorite className="text-black text-2xl" />
                <div className="relative">
                  <MdShoppingCart className="text-black text-2xl" />
                  <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">03</span>
                </div>
              </>
            )}
            <AiOutlineSearch className="text-black text-2xl" onClick={toggleSearchSidebar} />
          </div>
          <MdMenu className="text-black text-2xl" onClick={toggleSidebar} />
        </div>
      </nav>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${sidebarOpen || searchSidebar ? 'block' : 'hidden'}`} onClick={() => { setSidebarOpen(false); setSearchSidebar(false); }}></div>
      <div className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transition-transform transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <h2 className="text-lg font-bold" style={{ fontFamily: 'Chilanka, cursive' }}>Menu</h2>
          <hr className="my-2" />
          <Link to="/category" className="block py-2 text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Shop by Category</Link>
          <Link to="/home" className="block py-2 text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Home</Link>
          <Link to="/pages" className="block py-2 text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Pages</Link>
          <Link to="/shop" className="block py-2 text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Shop</Link>
          <Link to="/blog" className="block py-2 text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Blog</Link>
          <Link to="/contact" className="block py-2 text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Contact</Link>
          <Link to="/others" className="block py-2 text-black" style={{ fontFamily: 'Chilanka, cursive' }}>Others</Link>
          <Link to="/get-pro" className="block py-2 text-black font-bold" style={{ fontFamily: 'Chilanka, cursive' }}>GET PRO</Link>
        </div>
      </div>
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
