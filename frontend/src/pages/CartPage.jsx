import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from '../components/Products/Cart.jsx';
import Headername from '../components/Layout/Headername.jsx';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Headername title="Shopping Cart" />
      <div className="container mx-auto py-12 px-6 lg:px-24">
        <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'Chilanka, cursive' }}>Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <Link to="/shop" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <Cart />
            <div className="mt-8 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold" style={{ fontFamily: 'Chilanka, cursive' }}>Total: ${total.toFixed(2)}</h2>
              </div>
              <Link to="/checkout" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-300">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;