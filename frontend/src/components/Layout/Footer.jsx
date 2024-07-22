import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaPinterest, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto flex flex-wrap justify-center items-start text-center lg:text-left">
        <div className="w-full lg:w-1/4 mb-10 lg:mb-0">
          <Link to="/" className="text-black text-2xl">
            <img src="https://demo.templatesjungle.com/waggy/images/logo.png" alt="Waggy Logo" className="h-15 lg:h-15 mx-auto lg:mx-0" />
          </Link>
          <p className="mt-4 text-gray-600" style={{ fontFamily: 'Chilanka, cursive' }}>Subscribe to our newsletter to get updates about our grand offers.</p>
          <div className="flex justify-center lg:justify-start space-x-4 mt-4">
            <a href="#" className="text-gray-500"><FaFacebook /></a>
            <a href="#" className="text-gray-500"><FaTwitter /></a>
            <a href="#" className="text-gray-500"><FaPinterest /></a>
            <a href="#" className="text-gray-500"><FaInstagram /></a>
            <a href="#" className="text-gray-500"><FaYoutube /></a>
          </div>
        </div>
        <div className="w-full lg:w-1/4 mb-10 lg:mb-0">
          <h4 className="text-black text-lg mb-4" style={{ fontFamily: 'Chilanka, cursive' }}>Quick Links</h4>
          <ul className="text-gray-600">
            <li className="mb-2"><Link to="/home" style={{ fontFamily: 'Chilanka, cursive' }}>Home</Link></li>
            <li className="mb-2"><Link to="/about" style={{ fontFamily: 'Chilanka, cursive' }}>About Us</Link></li>
            <li className="mb-2"><Link to="/offer" style={{ fontFamily: 'Chilanka, cursive' }}>Offer</Link></li>
            <li className="mb-2"><Link to="/services" style={{ fontFamily: 'Chilanka, cursive' }}>Services</Link></li>
            <li className="mb-2"><Link to="/contact" style={{ fontFamily: 'Chilanka, cursive' }}>Contact Us</Link></li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 mb-10 lg:mb-0">
          <h4 className="text-black text-lg mb-4" style={{ fontFamily: 'Chilanka, cursive' }}>Help Center</h4>
          <ul className="text-gray-600">
            <li className="mb-2"><Link to="/faq" style={{ fontFamily: 'Chilanka, cursive' }}>FAQs</Link></li>
            <li className="mb-2"><Link to="/payment" style={{ fontFamily: 'Chilanka, cursive' }}>Payment</Link></li>
            <li className="mb-2"><Link to="/returns" style={{ fontFamily: 'Chilanka, cursive' }}>Returns & Refunds</Link></li>
            <li className="mb-2"><Link to="/checkout" style={{ fontFamily: 'Chilanka, cursive' }}>Checkout</Link></li>
            <li className="mb-2"><Link to="/delivery" style={{ fontFamily: 'Chilanka, cursive' }}>Delivery Information</Link></li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 mb-10 lg:mb-0">
          <h4 className="text-black text-lg mb-4" style={{ fontFamily: 'Chilanka, cursive' }}>Our Newsletter</h4>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Chilanka, cursive' }}>Subscribe to our newsletter to get updates about our grand offers.</p>
          <form className="flex justify-center lg:justify-start">
            <div className="relative w-full">
              <input type="email" className="w-full border border-gray-300 rounded-full px-4 py-2 text-lg" placeholder="Enter Your Email Here" style={{ fontFamily: 'Chilanka, cursive' }} />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-2 bg-[#DEAD6F] text-white p-2 rounded-full"><FaPaperPlane /></button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-left text-gray-600" style={{ fontFamily: 'Chilanka, cursive' }}>
        <hr />
        <p className='pt-4 px-4'>&copy; 2024 Waggy. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
