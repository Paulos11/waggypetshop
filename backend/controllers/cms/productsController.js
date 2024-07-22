const { errorHandle } = require("@/lib");
const Products = require("@/models/product.model");
const mongoose = require("mongoose");
const { unlinkSync } = require("node:fs");

class ProductCtrl {
  index = async (req, res, next) => {
    try {
      let products = await Products.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true
          }
        }
      ]);

      console.log('Products from backend:', JSON.stringify(products, null, 2));
      res.json(products);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const {
        name,
        status,
        description,
        summary,
        price,
        discounted_price,
        categoryId,
        colors,
        sizes,
      } = req.body;

      console.log('Received discounted_price:', discounted_price); 

      const product = new Products({
        name,
        status: status ? status.trim().toLowerCase() === "true" : undefined,
        description,
        summary,
        price,
        discounted_price: discounted_price || 0,
        categoryId,
        images: req.files?.map((file) => file.filename) || [],
        colors: colors ? JSON.parse(colors) : [],
        sizes: sizes ? JSON.parse(sizes) : [],
      });

      const savedProduct = await product.save();
      console.log('Saved product:', savedProduct); 

      res.status(201).json(savedProduct);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const {
        name,
        status,
        description,
        summary,
        price,
        discounted_price,
        categoryId,
        colors,
        sizes,
      } = req.body;

      console.log('Updating product, received discounted_price:', discounted_price); 

      const updatedData = {
        name,
        status: status ? status.trim().toLowerCase() === "true" : undefined,
        description,
        summary,
        price,
        discounted_price: discounted_price || 0,
        categoryId,
        colors: colors ? JSON.parse(colors) : [],
        sizes: sizes ? JSON.parse(sizes) : [],
      };

      if (req.files && req.files.length > 0) {
        updatedData.images = req.files.map((file) => file.filename);
      }

      const updatedProduct = await Products.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
      });

      console.log('Updated product:', updatedProduct); 

      res.json(updatedProduct);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  show = async (req, res, next) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next({
          message: "Invalid product ID",
          status: 400,
        });
      }
      const product = await Products.findById(req.params.id);
      if (!product) {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }
      res.json(product);
    } catch (error) {
      errorHandle(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const deletedProduct = await Products.findByIdAndDelete(req.params.id);
      if (deletedProduct) {
        for (let image of deletedProduct.images) {
          unlinkSync(`./uploads/${image}`);
        }
        res.send({
          message: "Product deleted successfully",
          product: deletedProduct,
        });
      } else {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }
    } catch (err) {
      errorHandle(err, next);
    }
  };

  destroyImage = async (req, res, next) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }

      const { filename } = req.params;
      unlinkSync(`./uploads/${filename}`);
      let updatedImages = product.images.filter((image) => image !== filename);

      await Products.findByIdAndUpdate(req.params.id, {
        images: updatedImages,
      });

      res.send({
        message: "Product image deleted successfully",
      });
    } catch (err) {
      errorHandle(err, next);
    }
  };

  byId = async (req, res, next) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next({
          message: "Invalid product ID",
          status: 400,
        });
      }
      const product = await Products.findById(req.params.id);
      if (!product) {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }
      res.json(product);
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new ProductCtrl();
