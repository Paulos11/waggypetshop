import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart } from '../../features/cartActions';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <h2 className="text-3xl font-Chilanka text-center text-gray-800 mb-8">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.items.map(item => (
            <li key={item.productId._id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-Chilanka text-lg text-gray-800 mb-2">{item.productId.name}</h3>
                  <p className="text-lg text-[#e2a61f] mb-4">${item.productId.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(item.productId._id)} className="py-2 px-4 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;