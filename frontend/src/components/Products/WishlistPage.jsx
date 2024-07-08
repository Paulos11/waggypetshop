import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, removeFromWishlist } from '../../features/wishlistActions';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <h2 className="text-3xl font-Chilanka text-center text-gray-800 mb-8">Your Wishlist</h2>
      {wishlist.products.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul>
          {wishlist.products.map(product => (
            <li key={product._id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-Chilanka text-lg text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-lg text-[#e2a61f] mb-4">${product.price}</p>
                </div>
                <button onClick={() => handleRemoveFromWishlist(product._id)} className="py-2 px-4 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
