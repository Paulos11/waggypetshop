import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../features/Product/categorySlice';
import { MdEdit, MdDelete, MdAdd, MdClose } from 'react-icons/md';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [form, setForm] = useState({ name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateCategory({ id: editingCategoryId, categoryData: form })).unwrap();
        toast.success('Category updated successfully!');
      } else {
        await dispatch(addCategory(form)).unwrap();
        toast.success('Category added successfully!');
      }
      setForm({ name: '' });
      setIsEditing(false);
      setEditingCategoryId(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Error saving category');
    }
  };

  const handleEdit = (category) => {
    setForm({ name: category.name });
    setIsEditing(true);
    setEditingCategoryId(category._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category');
    }
  };

  const handleAddCategory = () => {
    setIsFormVisible(true);
    setIsEditing(false);
    setForm({ name: '' });
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-[#2D2C29]">Manage Categories</h2>
      {!isFormVisible && (
        <button
          onClick={handleAddCategory}
          className="py-1 px-2 bg-[#DEAD6F] text-[#2D2C29] rounded mb-4 hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors"
        >
          <MdAdd size={18} className="mr-1 inline" /> Add Category
        </button>
      )}
      {isFormVisible && (
        <div className="relative">
          <button
            onClick={handleCloseForm}
            className="absolute top-0 right-0 mt-1 mr-1 text-[#2D2C29] hover:text-[#DEAD6F] transition-colors"
          >
            <MdClose size={18} />
          </button>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-1 focus:ring-[#DEAD6F] text-sm"
                required
              />
            </div>
            <button type="submit" className="py-1 px-2 bg-[#DEAD6F] text-[#2D2C29] rounded hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors text-sm">
              {isEditing ? 'Update Category' : 'Add Category'}
            </button>
          </form>
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold mb-2 text-center text-[#2D2C29]">Category List</h3>
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-1 px-2 border-b">Name</th>
              <th className="py-1 px-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="border-t">
                  <td className="py-1 px-2">{category.name}</td>
                  <td className="py-1 px-2 flex justify-center">
                    <button
                      onClick={() => handleEdit(category)}
                      className="py-1 px-2 bg-[#DEAD6F] text-[#2D2C29] rounded mr-2 hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="py-1 px-2 bg-[#2D2C29] text-[#DEAD6F] rounded hover:bg-[#DEAD6F] hover:text-[#2D2C29] transition-colors"
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-1 px-2 text-center text-[#2D2C29]">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
