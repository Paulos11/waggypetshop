import api from '../../api/axios';

const getProducts = () => api.get('/products');

const addProduct = (productData) => api.post('/cms/products', productData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const updateProduct = (id, productData) => api.put(`/cms/products/${id}`, productData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const deleteProduct = (id) => api.delete(`/cms/products/${id}`);

const getProductById = (id) => api.get(`/product/${id}`);
const getProductReviews = (id) => api.get(`/${id}/reviews`);
const getProductAdditionalInfo = (id) => api.get(`/product/${id}/additional-info`);

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductReviews,
  getProductAdditionalInfo,
};
