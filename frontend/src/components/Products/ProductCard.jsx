import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAsync } from '../../features/front/cartSlice';
import { addToWishlistAsync } from '../../features/front/wishlistSlice';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const imageUrl = import.meta.env.VITE_IMAGE_URL;

  const productImageUrl = product.images && product.images.length > 0
    ? `${imageUrl}/uploads/${product.images[0]}`
    : 'https://via.placeholder.com/150';
    const handleAddToCart = () => {
      dispatch(addToCartAsync({ 
        productId: product._id, 
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }))
        .unwrap()
        .then(() => toast.success(`${product.name} added to cart!`))
        .catch((error) => toast.error(`Failed to add ${product.name} to cart: ${error}`));
    };
  const handleAddToWishlist = () => {
    dispatch(addToWishlistAsync(product))
      .unwrap()
      .then(() => toast.success(`${product.name} added to wishlist!`))
      .catch((error) => toast.error(`Failed to add ${product.name} to wishlist: ${error.message}`));
  };

  return (
    <div className="overflow-hidden w-50">
      <Link to={`/product/${product._id}`}>
        <img src={productImageUrl} alt={product.name} className="object-contain h-[200px] rounded-lg " />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-gray-600 text-2xl mb-1" style={{ fontFamily: 'Chilanka, cursive' }}>{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 text-xl">{'★'.repeat(5)}</span>
          <span className="ml-1 text-gray-600 text-xs" style={{ fontFamily: 'Chilanka, cursive' }}>{product.rating}.0</span>
        </div>
        <p className="text-1xl text-[#B8860B] font-bold mb-3" style={{ fontFamily: 'Chilanka, cursive' }}>${product.price.toFixed(2)}</p>
        <div className="flex space-x-2">
          <button
        onClick={handleAddToCart}
        className="flex-1 py-2 px-4 bg-white text-gray-800 text-sm font-semibold rounded border border-gray-300 hover:bg-gray-100 transition duration-300"
        style={{ fontFamily: 'Chilanka, cursive' }}
      >
        ADD TO CART
      </button>
          <button
            onClick={handleAddToWishlist}
            className="flex-0 py-2 px-3 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition duration-300"
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
