import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => (
  <div className="flex space-x-7">
    <Link to="/home" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Home</Link>
    <Link to="/shop" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Shop</Link>
    <Link to="/blog" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Blog</Link>
    <Link to="/contact" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Contact</Link>
    <Link to="/others" className="text-black text-[16px]" style={{ fontFamily: 'Chilanka, cursive' }}>Others</Link>
  </div>
);

export default NavLinks;
