import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
  const { user, status } = useSelector((state) => state.auth);
  const location = useLocation();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  if (user.role === 'Admin') {
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
