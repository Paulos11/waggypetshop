import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Hero4 = () => {
  const images = [
    'images/insta1.jpg',
    'images/insta2.jpg',
    'images/insta3.jpg',
    'images/insta4.jpg',
    'images/insta5.jpg',
    'images/insta6.jpg',
  ];

  return (
    <div className="flex items-center justify-center bg-white pb-12 pt-5">
      <div className="flex">
        {images.map((image, index) => (
          <div key={index} className="relative group overflow-hidden w-1/6">
            <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaInstagram className="text-white text-4xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero4;
