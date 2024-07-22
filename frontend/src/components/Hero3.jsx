import React from 'react';

const Hero3 = () => {
  return (
    <div className="flex items-center justify-center py-[90px] bg-[#F9F3EC]  font-Chilanka">
      <div className="text-center w-[1000px] rounded">
        <h1 className="text-4xl font-Chilanka text-gray-800">
          Get 20% Off On <br/> <span className="text-orange-400">First Purchase</span>
        </h1>
        <form className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded"
            required
          /><br></br>
          <input
            type="password"
            placeholder="Create Password"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded"
            required
          /><br></br>
          <input
            type="password"
            placeholder="Repeat Password"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded"
            required
          /><br></br>
          <button
            type="submit"
            className="w-1/2 py-2 bg-gray-800 text-white font-Chilanka rounded"
          >
            REGISTER IT NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero3;
