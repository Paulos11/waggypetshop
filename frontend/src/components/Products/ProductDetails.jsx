import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import productService from '../../features/Product/productService';
import { addToCartAsync } from '../../features/front/cartSlice';
import { addToWishlistAsync } from '../../features/front/wishlistSlice';
import { toast } from 'react-toastify';
import Headername from '../Layout/Headername';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const imageUrl = import.meta.env.VITE_IMAGE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id);
        setProduct(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(`${imageUrl}/uploads/${response.data.images[0]}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, imageUrl]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleImageSelect = (imgUrl) => {
    setSelectedImage(`${imageUrl}/uploads/${imgUrl}`);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select a color and size before adding to cart');
      return;
    }
    dispatch(addToCartAsync({
      productId: product._id,
      quantity,
      color: selectedColor,
      size: selectedSize,
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

  const handleQuantityChange = (action) => {
    setQuantity(prev => action === 'increment' ? prev + 1 : prev > 1 ? prev - 1 : 1);
  };

  const tabs = [
    { name: 'description', label: 'Description' },
  ];

  return (
    <>
      <Headername title="Product Details" />
      <div className="container mx-auto py-12 px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img src={selectedImage} alt={product.name} className="w-full h-auto rounded-lg" />
            <div className="flex mt-4 space-x-4 overflow-x-auto">
              {product.images && product.images.map((img, index) => (
                <img
                  key={index}
                  src={`${imageUrl}/uploads/${img}`}
                  alt={`Product Image ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer ${selectedImage.includes(img) ? 'border-2 border-black' : ''}`}
                  onClick={() => handleImageSelect(img)}
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.summary}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
            </div>
            <p className="text-2xl text-[#e2a61f] mb-4">
              ${product.price} <span className="line-through text-gray-500">{product.originalPrice}</span>
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-gray-700">Color:</span>
              <div className="flex space-x-2 mt-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`px-4 py-2 rounded-full ${selectedColor === color ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleColorSelect(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </button>
                ))}
              </div>
              {!selectedColor && <p className="text-red-500 text-sm mt-1">Please select a color</p>}
            </div>
            <div className="mb-4">
              <span className="text-gray-700">Size:</span>
              <div className="flex space-x-2 mt-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded ${selectedSize === size ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-red-500 text-sm mt-1">Please select a size</p>}
            </div>
            <p className="text-gray-700 mb-4">2 in stock</p>
            <div className="flex items-center mb-4 space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => handleQuantityChange('decrement')}>-</button>
              <span>{quantity}</span>
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => handleQuantityChange('increment')}>+</button>
            </div>
            <div className="flex items-center mb-4">
              <button
                className="py-2 px-6 border border-[#4a4a4a] text-[#4a4a4a] font-bold text-lg hover:bg-gray-100 mr-2"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
              <button
                className="py-2 px-6 border border-[#4a4a4a] text-[#4a4a4a] font-bold text-lg hover:bg-gray-100"
                onClick={handleAddToWishlist}
              >
                ADD TO WISHLIST
              </button>
              <button className="py-2 px-4 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-2">SKU: {product.sku}</p>
            <p className="text-gray-600 mb-2">Category: {product.categoryId.name}</p>
            <p className="text-gray-600">Tags: {Array.isArray(product.tags) ? product.tags.join(', ') : ''}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4">
            {tabs.map(tab => (
              <button
                key={tab.name}
                className={`block w-full py-4 px-6 text-left ${activeTab === tab.name ? 'bg-[#DEAD6F] text-white' : 'bg-gray-200 hover:bg-gray-300'} mb-2 lg:mb-0`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="w-full lg:w-3/4 p-4 bg-white shadow rounded-lg">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Product Description</h2>
                <p>{product.description ? product.description : 'Description not available.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
