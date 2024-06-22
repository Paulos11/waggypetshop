import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Headername from '../components/Headername';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const notifySuccess = (message) => toast.success(message);

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
        notifySuccess('Login successful!');
        navigate('/profile');
      }
    },
  });

  const formikRegister = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const { name, email, password, confirmPassword } = values;
      const resultAction = await dispatch(register({ name, email, password, confirmPassword }));
      if (register.fulfilled.match(resultAction)) {
        notifySuccess('Registration successful!');
      }
    },
  });

  return (
    <div>
      <Headername title="Account" />
      <div className="flex flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8 font-Chilanka">
        <ToastContainer />
        <div className="max-w-lg w-full space-y-8">
          <div className="flex justify-center mb-8">
            <button
              className={`font-Chilanka text-lg py-2 px-4 border-b-2 ${isLogin ? 'border-[#e2a61f]' : 'border-transparent'} focus:outline-none`}
              onClick={() => setIsLogin(true)}
            >
              LOG IN
            </button>
            <button
              className={`font-Chilanka text-lg py-2 px-4 border-b-2 ${!isLogin ? 'border-[#e2a61f]' : 'border-transparent'} focus:outline-none`}
              onClick={() => setIsLogin(false)}
            >
              SIGN UP
            </button>
          </div>
          {isLogin ? (
            <form onSubmit={formikLogin.handleSubmit} className="space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...formikLogin.getFieldProps('email')}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#e2a61f] focus:border-[#e2a61f] focus:z-10 sm:text-sm"
                    placeholder="Enter Email Address"
                  />
                  {formikLogin.touched.email && formikLogin.errors.email ? (
                    <div className="text-red-600 text-sm mt-1">{formikLogin.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...formikLogin.getFieldProps('password')}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#e2a61f] focus:border-[#e2a61f] focus:z-10 sm:text-sm"
                    placeholder="Enter Password"
                  />
                  {formikLogin.touched.password && formikLogin.errors.password ? (
                    <div className="text-red-600 text-sm mt-1">{formikLogin.errors.password}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-[#e2a61f] focus:ring-[#e2a61f] border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember Me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#e2a61f] hover:text-[#e2a61f]">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4a4a4a] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e2a61f]"
                >
                  LOG IN
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={formikRegister.handleSubmit} className="space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    {...formikRegister.getFieldProps('name')}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#e2a61f] focus:border-[#e2a61f] focus:z-10 sm:text-sm"
                    placeholder="Enter Name"
                  />
                  {formikRegister.touched.name && formikRegister.errors.name ? (
                    <div className="text-red-600 text-sm mt-1">{formikRegister.errors.name}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...formikRegister.getFieldProps('email')}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#e2a61f] focus:border-[#e2a61f] focus:z-10 sm:text-sm"
                    placeholder="Enter Email Address"
                  />
                  {formikRegister.touched.email && formikRegister.errors.email ? (
                    <div className="text-red-600 text-sm mt-1">{formikRegister.errors.email}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...formikRegister.getFieldProps('password')}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#e2a61f] focus:border-[#e2a61f] focus:z-10 sm:text-sm"
                    placeholder="Enter Password"
                  />{formikRegister.touched.password && formikRegister.errors.password ? (
                    <div className="text-red-600 text-sm mt-1">{formikRegister.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    {...formikRegister.getFieldProps('confirmPassword')}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#e2a61f] focus:border-[#e2a61f] focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                  {formikRegister.touched.confirmPassword && formikRegister.errors.confirmPassword ? (
                    <div className="text-red-600 text-sm mt-1">{formikRegister.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4a4a4a] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e2a61f]"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;