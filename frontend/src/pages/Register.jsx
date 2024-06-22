// src/pages/Register.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      const resultAction = await dispatch(register({ email, password }));
      if (register.fulfilled.match(resultAction)) {
        toast.success('Registration successful!');
      } else {
        toast.error(resultAction.error.message || 'Registration failed.');
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="border-b-2 border-gray-200 mb-4"></div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...formik.getFieldProps('email')}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Email Address"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...formik.getFieldProps('password')}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-600 text-sm mt-1">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
