import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct, selectProductList } from '../../features/Product/productSlice';
import { fetchCategories } from '../../features/Product/categorySlice';
import { MdEdit, MdDelete, MdClose, MdAdd } from 'react-icons/md';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const categories = useSelector((state) => state.categories.categories);
  const [form, setForm] = useState({
    name: '',
    status: true,
    description: '',
    summary: '',
    price: '',
    discounted_price: '',
    categoryId: '',
    images: [],
    colors: '',
    sizes: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log('Products in component:', products);
  }, [products]);






  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: [...form.images, ...files] });

    const newPreviewImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...form.images];
    newImages.splice(index, 1);
    setForm({ ...form, images: newImages });

    const newPreviewImages = [...previewImages];
    URL.revokeObjectURL(newPreviewImages[index].url);
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (key === 'images') {
        form.images.forEach((image) => {
          formData.append('images', image);
        });
      } else if (key === 'colors' || key === 'sizes') {
        formData.append(key, JSON.stringify(form[key].split(',').map(item => item.trim())));
      } else if (key === 'discounted_price') {
        
        formData.append(key, form[key] === '' ? '0' : form[key]);
        console.log('Discounted price being sent:', form[key]); 
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      let result;
      if (isEditing) {
        result = await dispatch(updateProduct({ id: editingProductId, productData: formData })).unwrap();
      } else {
        result = await dispatch(addProduct(formData)).unwrap();
      }
      console.log('Product saved/updated:', result);
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      status: product.status,
      description: product.description,
      summary: product.summary,
      price: product.price,
      discounted_price: product.discounted_price || '',
      categoryId: product.categoryId || product.category?._id,
      images: [],
      colors: Array.isArray(product.colors) ? product.colors.join(", ") : '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : '',
    });
    setIsEditing(true);
    setEditingProductId(product._id);
    setIsFormVisible(true);

    setPreviewImages(product.images.map(image => ({
      file: null,
      url: `${import.meta.env.VITE_IMAGE_URL}/uploads/${image}`
    })));
  };
  const resetForm = () => {
    setForm({
      name: '',
      status: true,
      description: '',
      summary: '',
      price: '',
      discounted_price: '',
      categoryId: '',
      images: [],
      colors: '',
      sizes: '',
    });
    setIsEditing(false);
    setEditingProductId(null);
    setIsFormVisible(false);
    setPreviewImages([]);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
  };

  const handleAddProduct = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    resetForm();
  };


  const renderCategoryName = (product) => {
    if (product.category && typeof product.category === 'object') {
      return product.category.name;
    } else if (typeof product.category === 'string') {
      return product.category;
    } else if (product.categoryId && typeof product.categoryId === 'object') {
      return product.categoryId.name;
    } else {
      return 'N/A';
    }
  };

  const renderDiscountedPrice = (product) => {
    console.log('Rendering discounted price for:', product.name, 'Price:', product.discounted_price); 
    const discountedPrice = Number(product.discounted_price);
    return discountedPrice && discountedPrice !== 0 ? discountedPrice.toFixed(2) : 'N/A';
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#2D2C29]">Manage Products</h2>
      {!isFormVisible && (
        <button
          onClick={handleAddProduct}
          className="py-1 px-2 bg-[#DEAD6F] text-[#2D2C29] rounded mb-4 hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors text-sm"
        >
          <MdAdd size={16} className="mr-1 inline" /> Add Product
        </button>
      )}
      {isFormVisible && (
        <div className="relative">
          <button
            onClick={handleCloseForm}
            className="absolute top-0 right-0 mt-1 mr-1 text-[#2D2C29] hover:text-[#DEAD6F] transition-colors text-sm"
          >
            <MdClose size={16} />
          </button>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
                required
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Summary</label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Discounted Price</label>
              <input
                type="number"
                name="discounted_price"
                value={form.discounted_price}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Category</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Colors (comma separated)</label>
              <input
                type="text"
                name="colors"
                value={form.colors}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Sizes (comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={form.sizes}
                onChange={handleInputChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-[#2D2C29] mb-1 text-sm">Images</label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="w-full p-1 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F] text-sm"
                multiple
              />
              <div className="mt-2 flex flex-wrap">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative mr-2 mb-2">
                    <img src={image.url} alt="preview" className="w-16 h-16 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="py-1 px-2 bg-[#DEAD6F] text-[#2D2C29] rounded hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors text-sm">
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      )}
      <div>
      <h3 className="text-xl font-bold mb-4 text-[#2D2C29]">Product List</h3>
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-1 px-2 text-center">Name</th>
              <th className="py-1 px-2 text-center">Price</th>
              <th className="py-1 px-2 text-center">Discounted Price</th>
              <th className="py-1 px-2 text-center">Category</th>
              <th className="py-1 px-2 text-center">Colors</th>
              <th className="py-1 px-2 text-center">Sizes</th>
              <th className="py-1 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-1 px-2 text-center">{product.name}</td>
                  <td className="py-1 px-2 text-center">{product.price}</td>
                  <td className="py-1 px-2 text-center">{renderDiscountedPrice(product)}</td>
                  <td className="py-1 px-2 text-center">{renderCategoryName(product)}</td>
                  <td className="py-1 px-2 text-center">{Array.isArray(product.colors) ? product.colors.join(", ") : 'N/A'}</td>
                  <td className="py-1 px-2 text-center">{Array.isArray(product.sizes) ? product.sizes.join(", ") : 'N/A'}</td>
                  <td className="py-1 px-2 text-center flex justify-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="py-1 px-2 bg-[#DEAD6F] text-[#2D2C29] rounded mr-1 hover:bg-[#2D2C29] hover:text-[#DEAD6F] transition-colors text-xs"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="py-1 px-2 bg-[#2D2C29] text-[#DEAD6F] rounded hover:bg-[#DEAD6F] hover:text-[#2D2C29] transition-colors text-xs"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-1 px-2 text-center text-[#2D2C29]">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
