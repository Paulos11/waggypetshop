import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchProfile, updateProfile, updatePassword } from '../../features/auth/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaLock, FaCamera } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axios';

const AdminAccountManagement = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Updated successfully!');
    } else if (status === 'failed') {
      toast.error(error);
    }
  }, [status, error]);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await api.post('/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProfileImage(response.data.profileImage);
      toast.success('Image updated!');
    } catch (error) {
      toast.error('Upload failed.');
    }
  };

  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      await dispatch(updateProfile(values));
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Required'),
      newPassword: Yup.string().min(6, 'Min 6 characters').required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Required'),
    }),
    onSubmit: async (values) => {
      await dispatch(updatePassword(values));
    },
  });

  const renderForm = (formik, fields) => (
    <form onSubmit={formik.handleSubmit} className="space-y-3">
      {fields.map((field) => (
        <div key={field.name} className="relative">
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            {...formik.getFieldProps(field.name)}
            className="w-full p-2 text-sm border border-[#DEAD6F] rounded focus:outline-none focus:ring-1 focus:ring-[#DEAD6F]"
            placeholder={field.placeholder}
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div className="text-red-500 text-xs mt-1">{formik.errors[field.name]}</div>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#DEAD6F] text-[#2D2C29] text-sm font-medium rounded hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors"
      >
        {formik === profileFormik ? 'Update Profile' : 'Change Password'}
      </button>
    </form>
  );

  const profileFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'phone', type: 'tel', placeholder: 'Phone' },
    { name: 'address', type: 'text', placeholder: 'Address' },
  ];

  const passwordFields = [
    { name: 'oldPassword', type: 'password', placeholder: 'Old Password' },
    { name: 'newPassword', type: 'password', placeholder: 'New Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
  ];

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white rounded-lg  w-full max-w-md">
        <h2 className="text-lg font-semibold text-center text-[#2D2C29] mb-4">Admin Account</h2>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <img
              src={profileImage ? `http://localhost:4002/${profileImage}` : 'https://via.placeholder.com/100'}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-[#DEAD6F] rounded-full p-1 cursor-pointer">
              <FaCamera className="text-[#2D2C29] text-sm" />
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex mb-4 bg-gray-100 rounded-md">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-3 text-sm ${activeTab === 'profile' ? 'bg-[#DEAD6F] text-[#2D2C29]' : 'text-[#2D2C29]'} rounded-md transition-colors`}
          >
            <FaUser className="inline-block mr-1" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-2 px-3 text-sm ${activeTab === 'password' ? 'bg-[#DEAD6F] text-[#2D2C29]' : 'text-[#2D2C29]'} rounded-md transition-colors`}
          >
            <FaLock className="inline-block mr-1" /> Password
          </button>
        </div>
        {activeTab === 'profile' && renderForm(profileFormik, profileFields)}
        {activeTab === 'password' && renderForm(passwordFormik, passwordFields)}
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={true} />
    </div>
  );
};

export default AdminAccountManagement;