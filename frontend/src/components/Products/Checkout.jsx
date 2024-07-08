import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart } from '../../features/cartActions';
import { toast } from 'react-toastify';

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  if (!cart.items || cart.items.length === 0) {
    return <div className="container mx-auto py-12 px-6 lg:px-24 text-center text-gray-800">Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <h2 className="text-3xl font-Chilanka text-center text-gray-800 mb-8">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {cart.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 border-b">
              <div>
                <p className="font-Chilanka text-sm text-gray-800">{item.productId.name}</p>
                <p className="text-sm text-[#e2a61f]">${item.productId.price}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.productId._id))} className="py-1 px-2 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100">Remove</button>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-Chilanka text-gray-800 mb-4">Order Summary</h3>
          <p className="text-sm text-gray-600 mb-2">Items: {cart.items.length}</p>
          <p className="text-sm text-gray-600 mb-4">Total: ${cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0).toFixed(2)}</p>
          <button onClick={handleClearCart} className="w-full py-2 bg-[#DEAD6F] text-white rounded hover:bg-[#DEAD6F]">Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;