const { Types } = require("mongoose");
const { Product, Review } = require("../../models");
const { errorHandle } = require("../../lib");

class ProductCtrl {
  featured = async (req, res, next) => {
    try {
      const featuredProducts = await Product.find({
        status: true,
        featured: true,
      }).limit(4);

      console.log("Featured products query executed");
      console.log("Featured products found:", featuredProducts);

      if (featuredProducts.length === 0) {
        return res.status(404).json({ message: "No featured products found" });
      }

      res.send(featuredProducts);
    } catch (err) {
      next(err);
    }
  };

  latest = async (req, res, next) => {
    try {
      const latestProducts = await Product.find({ status: true })
        .sort({ createdAt: "desc" })
        .limit(10);
      res.json(latestProducts);
    } catch (err) {
      next(err);
    }
  };

  top = async (req, res, next) => {
    try {
      const topProducts = await Product.aggregate()
        .match({ status: true })
        .lookup({
          from: "orderdetails",
          localField: "_id",
          foreignField: "productId",
          as: "details",
        })
        .addFields({ detail_count: { $size: "$details" } })
        .sort({ detail_count: -1 })
        .limit(10);

      res.json(topProducts);
    } catch (err) {
      next(err);
    }
  };

  byId = async (req, res, next) => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
  
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
  
      if (product.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
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
  
    } catch (err) {
      errorHandle(err, next);
    }
  };

  similar = async (req, res, next) => {
    try {
      const product = await Product.findOne({
        status: true,
        _id: req.params.id,
      });

      if (!product) {
        return notFoundError("Product not found", next);
      }

      const similarProducts = await Product.find({
        status: true,
        categoryId: product.categoryId,
        _id: { $ne: product._id },
      });

      res.send(similarProducts);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  review = async (req, res, next) => {
    try {
      const { comment, rating } = req.body;
      const userId = req.user.id;

      if (!comment || !rating) {
        return res
          .status(400)
          .json({ message: "Comment and rating are required" });
      }

      await Review.create({
        comment,
        rating,
        userId: userId,
        productId: req.params.id,
      });

      res.send({ message: "Thank you for your review" });
    } catch (err) {
      errorHandle(err, next);
    }
  };

  search = async (req, res, next) => {
    try {
      const searchTerm = req.query.term;

      if (!searchTerm) {
        return res.status(400).json({ message: "Search term is required" });
      }

      const products = await Product.find({
        status: true,
        name: { $regex: searchTerm, $options: "i" },
      });

      res.send(products);
    } catch (err) {
      errorHandle(err, next);
    }
  };
}

module.exports = new ProductCtrl();
