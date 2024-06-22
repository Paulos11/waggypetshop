const Category = require("../../models/categorySchema");
const { errorHandler } = require("../../lib/index");

class CategoryController {
  index = async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json({ message: "Category added successfully" });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  };
}

module.exports = new CategoryController();
