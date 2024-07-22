import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/Product/productSlice';
import ProductCard from '../components/Products/ProductCard';
import Headername from '../components/Layout/Headername';

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const categories = useSelector(state => state.categories.categories);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('searchTerm') || '');
    setSelectedCategory(params.get('category') || '');
    const priceRange = params.get('priceRange');
    setSelectedPriceRange(priceRange ? JSON.parse(priceRange) : '');
  }, [location.search]);

  const updateUrlParams = (params) => {
    const urlParams = new URLSearchParams(params);
    navigate(`${location.pathname}?${urlParams.toString()}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateUrlParams({ searchTerm: value, category: selectedCategory, priceRange: JSON.stringify(selectedPriceRange) });
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    updateUrlParams({ searchTerm, category: categoryId, priceRange: JSON.stringify(selectedPriceRange) });
  };

  const handlePriceSelect = (priceRange) => {
    setSelectedPriceRange(priceRange);
    updateUrlParams({ searchTerm, category: selectedCategory, priceRange: JSON.stringify(priceRange) });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedPriceRange('');
    navigate(location.pathname);
  };

  const priceRanges = [
    { label: 'Less than $10', range: [0, 10] },
    { label: '$10 - $20', range: [10, 20] },
    { label: '$20 - $30', range: [20, 30] },
    { label: '$30 - $40', range: [30, 40] },
    { label: '$40 - $50', range: [40, 50] },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    const matchesPrice = !selectedPriceRange || (
      product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
    );
    return matchesSearchTerm && matchesCategory && matchesPrice;
  });

  return (
    <>
      <Headername title="Shop" />
      <div className="container mx-auto py-12 px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 pr-6 mb-8 lg:mb-0">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <button
                className="w-full px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                onClick={handleClearFilters}
              >
                All
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Categories</label>
              <ul>
                <li
                  className={`cursor-pointer py-2 ${!selectedCategory ? 'font-bold' : ''}`}
                  onClick={() => handleCategorySelect('')}
                >
                  All Categories
                </li>
                {categories.map(category => (
                  <li
                    key={category._id}
                    className={`cursor-pointer py-2 ${selectedCategory === category._id ? 'font-bold' : ''}`}
                    onClick={() => handleCategorySelect(category._id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Filter by Price</label>
              <ul>
                {priceRanges.map((priceRange, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer py-2 ${selectedPriceRange === priceRange.range ? 'font-bold' : ''}`}
                    onClick={() => handlePriceSelect(priceRange.range)}
                  >
                    {priceRange.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
