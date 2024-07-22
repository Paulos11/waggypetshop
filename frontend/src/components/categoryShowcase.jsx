import React from 'react';
import { Link } from 'react-router-dom';
import { MdRestaurant, MdPets } from 'react-icons/md';
import { GiSittingDog, GiBirdHouse } from 'react-icons/gi';
import { FaFishFins } from 'react-icons/fa6';

const CategoryShowcase = () => {
  const categories = [
    { id: 1, name: "Foodies", slug: "foodies", icon: MdRestaurant },
    { id: 2, name: "Bird Shop", slug: "bird-shop", icon: GiBirdHouse },
    { id: 3, name: "Dog Shop", slug: "dog-shop", icon: GiSittingDog },
    { id: 4, name: "Fish Shop", slug: "fish-shop", icon: FaFishFins },
    { id: 5, name: "Cat Shop", slug: "cat-shop", icon: MdPets }
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20 xl:gap-40">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to="/shop" 
              className="flex flex-col items-center w-1/2 sm:w-1/3 md:w-auto"
            >
              <category.icon className="text-[#DEAD6F] text-5xl md:text-6xl lg:text-7xl mb-2" />
              <h5 className="text-base md:text-lg lg:text-xl text-gray-700 text-center">{category.name}</h5>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
