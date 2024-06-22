import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-4">Welcome, {user?.email}</p>
    </div>
  );
};

export default Profile;