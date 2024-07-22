import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice';
import api from './api/axios';
import Cookies from 'js-cookie';
import Loading from './components/Loading';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token') || Cookies.get('token');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default AuthProvider;
