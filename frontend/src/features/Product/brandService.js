import api from '../../api/axios';


const getBrands = () => api.get('/cms/brands');
const addBrand = (brandData) => api.post('/cms/brands', brandData);
const updateBrand = (id, brandData) => api.put(`/cms/brands/${id}`, brandData);
const deleteBrand = (id) => api.delete(`/cms/brands/${id}`);

export default {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
};
