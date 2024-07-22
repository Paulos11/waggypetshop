import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowSmRight } from "react-icons/hi";

const Hero2 = () => {
  return (
    <div>
      <div className='bg-[#F9F3EC] h-[400px] flex justify-evenly items-center font-Chilanka'>
        <div className='' > <p className=' text-xl'>UPTO 40% OFF</p>
        <h2 className='text-3xl py-3'>Clearance Sale !!!</h2>
        <Link to="/shop" className="text-gray-500 border border-gray-500 py-2 px-4 rounded flex items-center font-Chilanka text-2xl">
          Shop <HiArrowSmRight className="w-5 h-5 ml-2" />
        </Link></div>
        <div> <img src="https://demo.templatesjungle.com/waggy/images/banner-img2.png" alt="puppy " className='w-80' /></div>
      </div>
      
    </div>
  )
}

export default Hero2
