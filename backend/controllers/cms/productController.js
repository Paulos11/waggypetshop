const { Types } = require("mongoose");
const Products = require("../../models/productSchema");
const { unlinkSync } = require("node:fs");
const { errorHandler } = require("../../lib/index");

class ProductCtrl {
  index = async (req, res, next) => {
    try {
      let products = await Products.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
      ]);

      let newList = products.map((product) => ({
        ...product,
        category: product.category.length > 0 ? product.category[0] : null,
      }));

      res.json(newList);
    } catch (err) {
      errorHandler(err, req, res, next);
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
        discountedPrice,
        categoryId,
      } = req.body;

      if (!categoryId) {
        return res
          .status(400)
          .json({ message: "categoryId is a required field" });
      }

      const images = req.files?.map((file) => file.filename) || [];

      const product = new Products({
        name,
        status: status ? status.trim().toLowerCase() === "true" : undefined,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        images,
      });

      await product.save();

      res.status(201).json({
        message: "Product Added Successfully",
      });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }
      res.json(product);
    } catch (error) {
      errorHandler(error, req, res, next);
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
        discountedPrice,
        categoryId,
        featured,
      } = req.body;

      const existingProduct = await Products.findById(req.params.id);
      if (!existingProduct) {
        return next({
          message: "Product Not found",
          status: 404,
        });
      }

      let images = existingProduct.images;
      if (req.files) {
        images = images.concat(req.files.map((file) => file.filename));
      }

      const updatedData = {
        name,
        status: status
          ? status.trim().toLowerCase() === "true"
          : existingProduct.status,
        description,
        summary,
        price,
        discountedPrice,
        categoryId,
        images,
        featured,
      };

      await Products.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
      });

      res.send({ message: "Product updated successfully" });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
  byId = async (req, res, next) => {
    try {
      const productId = new Types.ObjectId(req.params.id);

      let product = await Product.aggregate([
        { $match: { status: true, _id: productId } },
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brand",
          },
        },
        { $unwind: "$brand" },
      ]);

      if (product.length > 0) {
        let data = product[0];

        let reviews = await Review.aggregate([
          { $match: { productId: data._id } },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: "$user" },
        ]);

        data.reviews = reviews;
        res.send(data);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      errorHandler(err, req, res, next);
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
      errorHandler(err, req, res, next);
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
      errorHandler(err, req, res, next);
    }
  };
}

module.exports = new ProductCtrl();