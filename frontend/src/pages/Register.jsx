import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { register } from '../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits')
        .required('Phone number is required'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(register(values));
      if (register.fulfilled.match(resultAction)) {
        toast.success('Registration successful!');
        const user = resultAction.payload?.user;
        if (user && user.role) {
          if (user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/profile');
          }
        } else {
          toast.error('User role is not defined.');
        }
      } else {
        toast.error(resultAction.error.message || 'Registration failed.');
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-2xl space-y-8 rounded-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              {...formik.getFieldProps('name')}
              required
              className="w-full px-3 py-3 border text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
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
              {...formik.getFieldProps('password')}
              required
              className="w-full px-3 py-3 border text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              {...formik.getFieldProps('confirmPassword')}
              required
              className="w-full px-3 py-3 border text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Confirm Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <div className="relative">
            <label htmlFor="phone" className="sr-only">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              {...formik.getFieldProps('phone')}
              required
              className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Phone Number"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="relative">
            <label htmlFor="address" className="sr-only">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              {...formik.getFieldProps('address')}
              required
              className="w-full px-3 py-3 border text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter Address"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.address}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-1"
          >
            SIGN UP
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
