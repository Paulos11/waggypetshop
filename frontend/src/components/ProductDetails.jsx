// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Headername from './Headername';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cms/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const imageUrl = product.images && product.images.length > 0 
    ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/uploads/${product.images[0]}` 
    : 'https://via.placeholder.com/150';

  return (
    <><Headername title="Product Details" />
    <div className="container mx-auto py-12 px-6 lg:px-24 ">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <img src={imageUrl} alt={product.name} className="w-full h-auto rounded-lg" />
          <div className="flex mt-4 space-x-4">
            {product.images && product.images.slice(1).map((img, index) => (
              <img key={index} src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/uploads/${img}`} alt={`Product Image ${index + 2}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-10">
          <h1 className="text-4xl font-Chilanka text-gray-800 mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★★★★★</span>
            <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
          </div>
          <p className="text-2xl text-[#e2a61f] mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="text-gray-700">Color:</span>
            <div className="flex space-x-2 mt-2">
            
              <button className="w-8 h-8 bg-gray-300 rounded-full"></button>
              <button className="w-8 h-8 bg-black rounded-full"></button>
              <button className="w-8 h-8 bg-blue-300 rounded-full"></button>
              <button className="w-8 h-8 bg-red-300 rounded-full"></button>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-gray-700">Size:</span>
            <div className="flex space-x-2 mt-2">
            
              <button className="px-4 py-2 border border-gray-400 rounded">S</button>
              <button className="px-4 py-2 border border-gray-400 rounded">M</button>
              <button className="px-4 py-2 border border-gray-400 rounded">L</button>
              <button className="px-4 py-2 border border-gray-400 rounded">XL</button>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <button className="py-2 px-6 border border-[#4a4a4a] text-[#4a4a4a] font-Chilanka text-lg hover:bg-gray-100">ADD TO CART</button>
            <button className="py-2 px-4 border border-[#4a4a4a] text-[#4a4a4a] hover:bg-gray-100 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600">SKU: {product.sku}</p>
          <p className="text-gray-600">Category: {product.categoryId.name}</p>
          <p className="text-gray-600">Tags: {Array.isArray(product.tags) ? product.tags.join(', ') : ''}</p>
        </div>
      </div>
    </div></>
  );
};

export default ProductDetails;
