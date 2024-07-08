import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdPerson, MdFavorite, MdShoppingCart, MdMenu } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { fetchCategories } from '../features/category/categorySlice';
import { getWishlist } from '../features/wishlistActions';
import { getCart, removeFromCart } from '../features/cartActions';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchSidebar, setSearchSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, status, error } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
    if (user) {
      dispatch(getWishlist());
      dispatch(getCart());
    }
  }, [status, dispatch, user]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSearchSidebar(false);
  };

  const toggleSearchSidebar = () => {
    setSearchSidebar(!searchSidebar);
    setSidebarOpen(false);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown); 
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

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <>
      <nav className="bg-white py-4">
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
            {dropdownOpen === 'category' && (
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
          <div className="flex items-center space-x-4 relative">
            <MdPerson className="text-black text-2xl cursor-pointer" onClick={handleAccountClick} />
            {user ? (
              <>
                <Link to="/wishlist">
                  <MdFavorite className="text-black text-2xl" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">{wishlist.products.length}</span>
                </Link>
                <div className="relative">
                  <MdShoppingCart className="text-black text-2xl cursor-pointer" onClick={() => toggleDropdown('cart')} />
                  <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">{cart.items.length}</span>
                  {dropdownOpen === 'cart' && (
                    <div className="absolute right-0 mt-2 py-2 w-64 bg-white border rounded shadow-xl">
                      {cart.items.length === 0 ? (
                        <p className="text-center p-4">Your cart is empty</p>
                      ) : (
                        <div>
                          {cart.items.map((item) => (
                            <div key={item.productId._id} className="flex justify-between items-center p-2 border-b">
                              <div>
                                <p className="font-Chilanka text-sm text-gray-800">{item.productId.name}</p>
                                <p className="text-sm text-[#e2a61f]">${item.productId.price}</p>
                                <p className="text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <button onClick={() => handleRemoveFromCart(item.productId._id)} className="py-1 px-2 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100">Remove</button>
                            </div>
                          ))}
                          <div className="p-2">
                            <Link to="/checkout" className="block text-center py-2 bg-[#4a4a4a] text-white rounded hover:bg-gray-700">Go to Checkout</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="text-black text-2xl">Logout</button>
              </>
            ) : (
              <>
                <MdFavorite className="text-black text-2xl" />
                <div className="relative">
                  <MdShoppingCart className="text-black text-2xl cursor-pointer" onClick={() => toggleDropdown('cart')} />
                  <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">{cart.items.length}</span>
                  {dropdownOpen === 'cart' && (
                    <div className="absolute right-0 mt-2 py-2 w-64 bg-white border rounded shadow-xl">
                      {cart.items.length === 0 ? (
                        <p className="text-center p-4">Your cart is empty</p>
                      ) : (
                        <div>
                          {cart.items.map((item) => (
                            <div key={item.productId._id} className="flex justify-between items-center p-2 border-b">
                              <div>
                                <p className="font-Chilanka text-sm text-gray-800">{item.productId.name}</p>
                                <p className="text-sm text-[#e2a61f]">${item.productId.price}</p>
                                <p className="text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <button onClick={() => handleRemoveFromCart(item.productId._id)} className="py-1 px-2 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100">Remove</button>
                            </div>
                          ))}
                          <div className="p-2">
                            <Link to="/checkout" className="block text-center py-2 bg-[#4a4a4a] text-white rounded hover:bg-gray-700">Go to Checkout</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
              <>
                <Link to="/wishlist">
                  <MdFavorite className="text-black text-2xl" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">{wishlist.products.length}</span>
                </Link>
                <div className="relative">
                  <MdShoppingCart className="text-black text-2xl cursor-pointer" onClick={() => toggleDropdown('cart')} />
                  <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">{cart.items.length}</span>
                  {dropdownOpen === 'cart' && (
                    <div className="absolute right-0 mt-2 py-2 w-64 bg-white border rounded shadow-xl">
                      {cart.items.length === 0 ? (
                        <p className="text-center p-4">Your cart is empty</p>
                      ) : (
                        <div>
                          {cart.items.map((item) => (
                            <div key={item.productId._id} className="flex justify-between items-center p-2 border-b">
                              <div>
                                <p className="font-Chilanka text-sm text-gray-800">{item.productId.name}</p>
                                <p className="text-sm text-[#e2a61f]">${item.productId.price}</p>
                                <p className="text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <button onClick={() => handleRemoveFromCart(item.productId._id)} className="py-1 px-2 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100">Remove</button>
                            </div>
                          ))}
                          <div className="p-2">
                            <Link to="/checkout" className="block text-center py-2 bg-[#4a4a4a] text-white rounded hover:bg-gray-700">Go to Checkout</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="text-black text-2xl">Logout</button>
              </>
            ) : (
              <>
                <MdFavorite className="text-black text-2xl" />
                <div className="relative">
                  <MdShoppingCart className="text-black text-2xl cursor-pointer" onClick={() => toggleDropdown('cart')} />
                  <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">{cart.items.length}</span>
                  {dropdownOpen === 'cart' && (
                    <div className="absolute right-0 mt-2 py-2 w-64 bg-white border rounded shadow-xl">
                      {cart.items.length === 0 ? (
                        <p className="text-center p-4">Your cart is empty</p>
                      ) : (
                        <div>
                          {cart.items.map((item) => (
                            <div key={item.productId._id} className="flex justify-between items-center p-2 border-b">
                              <div>
                                <p className="font-Chilanka text-sm text-gray-800">{item.productId.name}</p>
                                <p className="text-sm text-[#e2a61f]">${item.productId.price}</p>
                                <p className="text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <button onClick={() => handleRemoveFromCart(item.productId._id)} className="py-1 px-2 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100">Remove</button>
                            </div>
                          ))}
                          <div className="p-2">
                            <Link to="/checkout" className="block text-center py-2 bg-[#4a4a4a] text-white rounded hover:bg-gray-700">Go to Checkout</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
