import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div className="w-full text-center lg:w-auto lg:text-left">
    <Link to="/" className="text-black text-2xl">
      <img src="https://demo.templatesjungle.com/waggy/images/logo.png" alt="Waggy Logo" className="h-15 lg:h-15 mx-auto lg:mx-0" />
    </Link>
  </div>
);

export default Logo;
