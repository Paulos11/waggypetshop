import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/front/cartSlice';
import { createOrder } from '../../features/front/orderSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token') || Cookies.get('token');

    if (!user || !token) {
      toast.error('You must be logged in to place an order.');
      navigate('/auth', { state: { from: '/checkout' } });
      return;
    }

    try {
      const orderData = {
        userId: user._id,
        products: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingDetails: formData
      };

      const resultAction = await dispatch(createOrder(orderData));
      if (createOrder.fulfilled.match(resultAction)) {
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/order-confirmation', { state: { orderId: resultAction.payload._id } });
      } else {
        if (resultAction.payload === 'You must be logged in to place an order.') {
          navigate('/auth', { state: { from: '/checkout' } });
        } else {
          toast.error(resultAction.payload || 'Failed to place order. Please try again.');
        }
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('There was an error processing your order. Please try again.');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'Chilanka, cursive' }}>Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Chilanka, cursive' }}>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.productId} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Chilanka, cursive' }}>Shipping Information</h3>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Postal Code</label>
              <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
