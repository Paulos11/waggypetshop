import React from 'react';
import Headername from '../components/Layout/Headername';

const Contact = () => {
  return (
    <>
      <Headername title="Contact Us" />
      <div className="flex items-center justify-center py-[90px] bg-[#F9F3EC] font-Chilanka">
        <div className="text-center w-[1000px] rounded">
          <h1 className="text-4xl font-Chilanka text-gray-800 mb-8">
            Get in Touch <br/> <span className="text-orange-400">We'd Love to Hear from You</span>
          </h1>
          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              required
            /><br />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded"
              required
            /><br />
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded"
            /><br />
            <textarea
              placeholder="Your Message"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded h-32"
              required
            ></textarea><br />
            <button
              type="submit"
              className="w-1/2 py-2 bg-gray-800 text-white font-Chilanka rounded hover:bg-gray-700 transition duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;