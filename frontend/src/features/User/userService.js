import api from '../../api/axios';

const getUsers = () => api.get('/cms/users');
const addUser = (userData) => api.post('/cms/users', userData);
const updateUser = (id, userData) => api.put(`/cms/users/${id}`, userData);
const deleteUser = (id) => api.delete(`/cms/users/${id}`);

export default {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
