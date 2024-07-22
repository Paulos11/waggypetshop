import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdAdd, MdClose } from 'react-icons/md';
import { 
  fetchUsers, 
  addUser, 
  updateUser, 
  deleteUser, 
  selectUsers, 
  selectUsersStatus, 
  selectUsersError 
} from '../../features/User/userSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Customer',
    status: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateUser({ id: editingUserId, userData: form })).unwrap();
        toast.success('User updated successfully');
      } else {
        await dispatch(addUser(form)).unwrap();
        toast.success('User added successfully');
      }
      resetForm();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditing(true);
    setEditingUserId(user._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(id)).unwrap();
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error(`Error deleting user: ${error.message}`);
      }
    }
  }

  

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      role: 'Customer',
      status: true
    });
    setIsEditing(false);
    setEditingUserId(null);
    setIsFormVisible(false);
  };

  if (status === 'loading') {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#2D2C29]">Manage Users</h2>
      
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="mb-4 py-2 px-4 bg-[#DEAD6F] text-[#2D2C29] rounded hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors"
        >
          <MdAdd className="inline mr-2" /> Add New User
        </button>
      )}

      {isFormVisible && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 text-[#2D2C29]">
            {isEditing ? 'Edit User' : 'Add New User'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D2C29]">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DEAD6F] focus:ring focus:ring-[#DEAD6F] focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2C29]">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DEAD6F] focus:ring focus:ring-[#DEAD6F] focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2C29]">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DEAD6F] focus:ring focus:ring-[#DEAD6F] focus:ring-opacity-50"
              >
                <option value="Customer">Customer</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2C29]">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DEAD6F] focus:ring focus:ring-[#DEAD6F] focus:ring-opacity-50"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-[#DEAD6F] text-[#2D2C29] rounded hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors"
              >
                {isEditing ? 'Update User' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
      <h3 className="text-xl font-bold mb-4 text-[#2D2C29]">User List</h3>
        {status === 'failed' && <div className="text-red-500">Error: {error}</div>}
        {status === 'succeeded' && users.length === 0 && <div>No users found.</div>}
        {status === 'succeeded' && users.length > 0 && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.status ? 'Active' : 'Inactive'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(user)}
                      className="mr-2 p-1 bg-[#DEAD6F] text-[#2D2C29] rounded hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;