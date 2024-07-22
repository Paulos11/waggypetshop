import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, fetchUserData } from '../features/auth/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(login(values));
        if (login.fulfilled.match(resultAction)) {
          toast.success('Login successful!');
          await dispatch(fetchUserData()); 
          if (user && user.role) {
            if (user.role === 'Admin') {
              navigate('/admin');
            } else {
              navigate('/profile');
            }
          } else {
            toast.error('User role is not defined.');
          }
        } else {
          const errorPayload = resultAction.payload || resultAction.error;
          const errorMessage = errorPayload.message || 'Login failed.';
          const errorDetails = errorPayload.errors
            ? Object.entries(errorPayload.errors).map(([key, value]) => `${key}: ${value}`).join(', ')
            : '';
          toast.error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ''}`);
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error('An error occurred during login.');
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-2xl space-y-8 rounded-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              {...formik.getFieldProps('email')}
              required
              className="w-full px-3 py-3 border text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Email Address"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              {...formik.getFieldProps('password')}
              required
              className="w-full px-3 py-3 border text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember Me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-black">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
          >
            LOG IN
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
