import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchProfile, updateProfile, updatePassword } from '../features/auth/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaLock, FaShoppingBag, FaStar, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axios';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchProfile());
    fetchUserOrders();
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Profile updated successfully!');
    } else if (status === 'failed') {
      toast.error(error);
    }
  }, [status, error]);

  const fetchUserOrders = async () => {
    try {
      const response = await api.get('/orders/user');
      setUserOrders(response.data);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      toast.error('Error fetching user orders');
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await api.post('/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile image updated successfully!');
      setProfileImage(response.data.profileImage);
    } catch (error) {
      toast.error('Failed to upload profile image.');
    }
  };

  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const resultAction = await dispatch(updateProfile(values));
      setSubmitting(false);
      if (updateProfile.fulfilled.match(resultAction)) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(resultAction.error.message || 'Failed to update profile.');
      }
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
      newPassword: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const resultAction = await dispatch(updatePassword(values));
      setSubmitting(false);
      if (updatePassword.fulfilled.match(resultAction)) {
        toast.success('Password updated successfully!');
      } else {
        toast.error(resultAction.error.message || 'Failed to update password.');
      }
    },
  });

  const renderForm = (formik, fields) => (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="relative">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            {...formik.getFieldProps(field.name)}
            className="w-full px-3 py-2 border text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder={field.placeholder}
          />
          {formik.touched[field.name] && formik.errors[field.name] ? (
            <div className="text-red-600 text-sm mt-1">{formik.errors[field.name]}</div>
          ) : null}
        </div>
      ))}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
        disabled={formik.isSubmitting}
      >
        {formik === profileFormik ? 'Update Profile' : 'Change Password'}
      </button>
    </form>
  );

  const profileFields = [
    { name: 'name', type: 'text', label: 'Name', placeholder: 'Enter Name' },
    { name: 'phone', type: 'tel', label: 'Phone', placeholder: 'Enter Phone Number' },
    { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter Address' },
  ];

  const passwordFields = [
    { name: 'oldPassword', type: 'password', label: 'Old Password', placeholder: 'Enter Old Password' },
    { name: 'newPassword', type: 'password', label: 'New Password', placeholder: 'Enter New Password' },
    { name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: 'Confirm New Password' },
  ];

  const menuItems = [
    { id: 'profile', icon: FaUser, label: 'Profile' },
    { id: 'password', icon: FaLock, label: 'Password' },
    { id: 'orders', icon: FaShoppingBag, label: 'Orders' },
    { id: 'reviews', icon: FaStar, label: 'Reviews' },
  ];

  return (
    <div className="flex items-center justify-center mb-16 mt-16">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
        <div className="text-center mb-6">
          <div className="relative w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3 overflow-hidden">
            {profileImage ? (
              <img src={`http://localhost:4002/${profileImage}`} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <FaUser className="w-full h-full text-gray-600 p-6" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        <div className="flex mb-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-2 px-3 text-center ${
                activeTab === item.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="mx-auto mb-1 text-sm" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'profile' && renderForm(profileFormik, profileFields)}
          {activeTab === 'password' && renderForm(passwordFormik, passwordFields)}
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
              {userOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left">Order ID</th>
                        <th className="p-2 text-left">Total</th>
                        <th className="p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrders.map(order => (
                        <tr key={order._id} className="border-b">
                          <td className="p-2">{order._id}</td>
                          <td className="p-2">${order.totalAmount}</td>
                          <td className="p-2">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          )}
          {activeTab === 'reviews' && <div>Reviews content here</div>}
        </div>

        <button
          className="mt-6 w-full flex justify-center items-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-[#DEAD6F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => navigate('/logout')}
        >
          <FaSignOutAlt className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
