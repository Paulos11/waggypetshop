import React, { useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdPerson, MdFavorite, MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { removeFromCartAsync, clearCartAsync } from '../../features/front/cartSlice';

const UserActions = ({ toggleDropdown, dropdownOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { user, cart, wishlist } = useSelector(state => ({
    user: state.auth.user,
    cart: state.cart.items,
    wishlist: state.wishlist.items,
  }));

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
    dispatch(removeFromCartAsync(productId));
  };

  const handleCartClick = useCallback((e) => {
    e.stopPropagation();
    toggleDropdown('cart');
  }, [toggleDropdown]);

  const handleClearCart = () => {
    dispatch(clearCartAsync());
  };

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown(null);
    }
  }, [toggleDropdown]);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen, handleClickOutside]);

  return (
    <div className="flex items-center space-x-4 relative">
      <MdPerson className="text-black text-2xl cursor-pointer" onClick={handleAccountClick} />
      {user ? (
        <>
          <Link to="/wishlist" className="relative">
            <MdFavorite className="text-black text-2xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">{wishlist.length}</span>
          </Link>
          <div className="relative">
            <MdShoppingCart 
              className="text-black text-2xl cursor-pointer" 
              onClick={(e) => handleCartClick(e)} 
            />
            <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">{cart.length}</span>
            {dropdownOpen === 'cart' && (
              <div 
                ref={dropdownRef} 
                className="absolute right-0 mt-2 py-2 w-64 bg-white border rounded shadow-xl z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {cart.length === 0 ? (
                  <p className="text-center p-4">Your cart is empty</p>
                ) : (
                  <div>
                    {cart.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center p-2 border-b">
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-sm text-gray-600">${(item.price?.toFixed(2)) || '0.00'}</p>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromCart(item.productId)}
                          className="py-1 px-2 border border-red-500 text-red-500 hover:bg-red-100 rounded text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="p-2 flex justify-between">
                      <Link 
                        to="/checkout" 
                        className="block text-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Checkout
                      </Link>
                      <button
                        onClick={handleClearCart}
                        className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Clear Cart
                      </button>
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
            <span className="absolute top-0 right-0 bg-yellow-500 text-white rounded-full text-xs px-1">{cart.length}</span>
            {dropdownOpen === 'cart' && (
              <div 
                ref={dropdownRef} 
                className="absolute right-0 mt-2 py-2 w-64 bg-white border rounded shadow-xl z-50"
                onClick={(e) => e.stopPropagation()}
              >
                {cart.length === 0 ? (
                  <p className="text-center p-4">Your cart is empty</p>
                ) : (
                  <div>
                    {cart.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center p-2 border-b">
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-sm text-gray-600">${(item.price?.toFixed(2)) || '0.00'}</p>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromCart(item.productId)}
                          className="py-1 px-2 border border-red-500 text-red-500 hover:bg-red-100 rounded text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="p-2 flex justify-between">
                      <Link 
                        to="/checkout" 
                        className="block text-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Checkout
                      </Link>
                      <button
                        onClick={handleClearCart}
                        className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserActions;
