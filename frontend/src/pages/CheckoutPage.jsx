import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { createOrder } from '../features/front/orderSlice';
import Checkout from '../components/Products/Checkout';
import Headername from '../components/Layout/Headername';
import { clearCart } from '../features/front/cartSlice';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handlePlaceOrder = async (shippingDetails) => {
    try {
      const orderData = {
        userId: user._id,
        products: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingDetails: shippingDetails
      };

      const resultAction = await dispatch(createOrder(orderData));
      if (createOrder.fulfilled.match(resultAction)) {
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/order-confirmation', { state: { orderId: resultAction.payload._id } });
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing your order.');
    }
  };

  return (
    <>
      <Headername title="Checkout" />
      <div className="container mx-auto py-12 px-6 lg:px-24">
        <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'Chilanka, cursive' }}>Checkout</h1>
        <Checkout onPlaceOrder={handlePlaceOrder} cartItems={cartItems} />
      </div>
    </>
  );
};

export default CheckoutPage;
