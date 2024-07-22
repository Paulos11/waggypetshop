import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Wishlist from '../components/Products/Wishlist';
import Headername from '../components/Layout/Headername';

const WishlistPage = () => {
  const wishlistItems = useSelector(state => state.wishlist.items);

  return (
    <>
      <Headername title="Wishlist" />
      <div className="container mx-auto py-12 px-6 lg:px-24">
        <h1 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'Chilanka, cursive' }}>Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div>
            <p>Your wishlist is empty.</p>
            <Link to="/shop" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <Wishlist />
        )}
      </div>
    </>
  );
};

export default WishlistPage;