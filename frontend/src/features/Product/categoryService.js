import api from '../../api/axios';

const getCategories = () => api.get('/categories');
const addCategory = (categoryData) => api.post('/cms/categories', categoryData);
const updateCategory = (id, categoryData) => api.put(`/cms/categories/${id}`, categoryData);
const deleteCategory = (id) => api.delete(`/cms/categories/${id}`);

export default {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
