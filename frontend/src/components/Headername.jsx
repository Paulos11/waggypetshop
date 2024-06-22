// src/components/Headername.jsx
import React from 'react';

const Headername = ({ title }) => {
  return (
    <div className='w-full h-[200px] bg-orange-100 p-7 flex items-center justify-center text-5xl' style={{ fontFamily: 'Chilanka, cursive' }}>
      <h1>{title}</h1>
    </div>
  );
};

export default Headername;
