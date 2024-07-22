import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import Register from './Register';
import Headername from '../components/Layout/Headername';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  if (user) {
    return null; 
  }
  return (
    <div>
      <Headername title="Account" />
      <div className="flex flex-col justify-center font-Chilanka px-4 sm:px-6 lg:px-8 py-9">
        <div className="w-full max-w-[800px] mx-auto mt-8">
          <div className="flex justify-center mb-4">
            <button
              className={`text-2xl py-2 px-4 ${isLogin ? 'text-[#e2a61f]' : 'border-transparent text-gray-800'} focus:outline-none`}
              onClick={() => setIsLogin(true)}
            >
              LOG IN
            </button>
            <button
              className={`text-2xl py-2 px-4 ${!isLogin ? 'text-[#e2a61f]' : 'border-transparent text-gray-800'} focus:outline-none ml-4`}
              onClick={() => setIsLogin(false)}
            >
              SIGN UP
            </button>
          </div>
          <div>
            <hr className="w-full py-3" />
            <p className="pb-3 text-center">Login with Social</p>
            <div className="flex justify-center gap-7">
              <button className="p-4 w-full max-w-xs border border-gray-300 rounded flex items-center justify-center">
                <FaGoogle className="mr-2" /> Google
              </button>
              <button className="p-4 w-full max-w-xs border border-gray-300 rounded flex items-center justify-center">
                <FaFacebook className="mr-2" /> Facebook
              </button>
            </div>
          </div>
          <div className="rounded bg-white px-6 py-8">
            {isLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;