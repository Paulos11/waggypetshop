import React from 'react';
import HomeSlider from '../components/HomeSlider';
import ProductSection from '../components/Products/ProductSection';
import CategoryShowcase from '../components/categoryShowcase';
import { Link } from 'react-router-dom';
import Hero2 from '../components/Hero2';
import Hero3 from '../components/Hero3';
import Hero4 from '../components/Hero4';

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <CategoryShowcase/>
      
     
      <ProductSection category="Clothes" />
    <Hero2/>
      <ProductSection category="Foods" />
      <Hero3/>
      <Hero4/>
    </div>
  );
};

export default Home;
