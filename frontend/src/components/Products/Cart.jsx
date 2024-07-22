import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCartAsync, getCart, updateCartItemQuantityAsync } from '../../features/front/cartSlice';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);
  console.log('Cart items:', items);
  console.log('Cart status:', status);
  console.log('Cart error:', error);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCart());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRemove = (productId) => {
    dispatch(removeFromCartAsync(productId));
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateCartItemQuantityAsync({ productId, quantity: newQuantity }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'Chilanka, cursive' }}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.productId} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${item.image}`} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h3 className="font-semibold" style={{ fontFamily: 'Chilanka, cursive' }}>{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                  min="1"
                  className="w-16 text-center border rounded mr-4"
                />
                <button onClick={() => handleRemove(item.productId)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <h3 className="text-xl font-semibold" style={{ fontFamily: 'Chilanka, cursive' }}>Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
