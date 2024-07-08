import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cartActions';
import { addToWishlist } from '../features/wishlistActions';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const imageUrl = product.images && product.images.length > 0 
    ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/uploads/${product.images[0]}` 
    : 'https://via.placeholder.com/150';

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <div className="rounded-lg overflow-hidden p-4 ">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img src={imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
        </Link>
        {product.new && <span className="absolute top-2 left-2 bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded">New</span>}
        {product.discount && <span className="absolute top-2 right-2 bg-red-200 text-red-800 px-2 py-1 text-xs rounded">-{product.discount}%</span>}
      </div>
      <div className="pt-4">
        <h3 className="font-Chilanka text-lg text-gray-800 mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">★★★★★</span>
          <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
        </div>
        <p className="text-lg text-[#e2a61f] mb-4">${product.price}</p>
        <div className="flex space-x-2">
          <button onClick={handleAddToCart} className="flex-1 py-2 border border-[#4a4a4a] text-[#4a4a4a] font-Chilanka text-lg hover:bg-gray-100 flex items-center justify-center">
            <FaShoppingCart className="mr-2" />
            ADD TO CART
          </button>
          <button onClick={handleAddToWishlist} className="flex-0 py-2 px-4 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100 flex items-center justify-center">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
