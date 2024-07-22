import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlistAsync } from '../../features/front/wishlistSlice';
import { addToCartAsync } from '../../features/front/cartSlice';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromWishlistAsync(productId));
    toast.success('Item removed from wishlist');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCartAsync({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    }));
    dispatch(removeFromWishlistAsync(product._id));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'Chilanka, cursive' }}>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item._id} className="border rounded-lg overflow-hidden">
              <img 
                src={item.images && item.images.length > 0 
                  ? `${import.meta.env.VITE_IMAGE_URL}/uploads/${item.images[0]}` 
                  : 'https://via.placeholder.com/150'} 
                alt={item.name} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2" style={{ fontFamily: 'Chilanka, cursive' }}>{item.name}</h3>
                <p className="text-gray-600 mb-4">${item.price?.toFixed(2)}</p>
                <div className="flex justify-between">
                  <button onClick={() => handleAddToCart(item)} className="flex items-center text-blue-500 hover:text-blue-600">
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                  <button onClick={() => handleRemove(item._id)} className="text-red-500 hover:text-red-600">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
