const Category = require('../../models/category.mode');
const { errorHandle } = require('@/lib');

class CategoryCtrl {
  index = async (req, res, next) => {
    try {
      console.log('Fetching all categories'); 
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error); 
      errorHandle(error, req, res, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
      errorHandle(error, req, res, next);
    }
  };

  show = async (req, res, next) => {
    try {
      console.log('Fetching category with ID:', req.params.id); 
      const category = await Category.findById(req.params.id);
      if (!category) {
        console.log('Category not found:', req.params.id); 
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error('Error fetching category:', error); 
      errorHandle(error, req, res, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
      errorHandle(error, req, res, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      errorHandle(error, req, res, next);
    }
  };
}

module.exports = new CategoryCtrl();
