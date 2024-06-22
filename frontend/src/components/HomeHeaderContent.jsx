import React from 'react';

const HomeHeaderContent = ({ imgSrc }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-evenly py-12 px-6  lg:px-24">
      <div className="mb-8 lg:mb-0">
        <img src={imgSrc} alt="Best Destination For Your Pets" className="max-w-full lg:max-w-md" />
      </div>
      <div className="max-w-lg text-center lg:text-left">
        <span className="text-lg text-[#e2a61f] font-Chilanka">SAVE 10 - 20 % OFF</span>
        <h1 className="text-4xl font-Chilanka my-4 text-[#4a4a4a]">
          <span className='text-6xl'>Best Destination <br />For</span> <br />
          <span className='text-[#e2a61f] text-4xl'>Your Pets</span>
        </h1>
        <button className="mt-6 py-3 px-6 border border-[#4a4a4a] text-[#4a4a4a] font-Chilanka text-lg hover:bg-gray-100">
          SHOP NOW →
        </button>
      </div>
    </div>
  );
};

export default HomeHeaderContent;
