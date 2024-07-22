import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { HiArrowSmRight } from "react-icons/hi";
import ProductCard from './ProductCard';
import { fetchProducts, selectProductList } from '../../features/Product/productSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSection = ({ category }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  const slidesToShow = Math.min(filteredProducts.length, 4);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(filteredProducts.length, 3),
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(filteredProducts.length, 2),
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(filteredProducts.length, 1),
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mx-auto py-12 px-6 lg:px-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-Chilanka text-gray-800">
          {category ? `${category} Products` : 'Our Products'}
        </h2>
        <Link to="/shop" className="text-gray-500 border border-gray-500 py-2 px-4 rounded flex items-center font-Chilanka">
          Shop <HiArrowSmRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
      {filteredProducts.length > 0 ? (
        <Slider {...settings}>
          {filteredProducts.map((product) => (
            <div key={product._id} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-600">No products available in this category</p>
      )}
    </div>
  );
};

export default ProductSection;
