import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => (
  <div className="hidden lg:flex flex-1 mx-0 lg:mx-20 my-2 lg:my-0">
    <div className="relative w-full">
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-4 py-2 lg:px-5 lg:py-5 text-lg lg:text-xl font-thin"
        placeholder="Search For More Than 10,000 Products"
        style={{ fontFamily: 'Chilanka, cursive' }}
      />
      <AiOutlineSearch className="absolute right-4 top-3 lg:top-5 text-xl lg:text-3xl text-gray-800" />
    </div>
  </div>
);

export default SearchBar;
