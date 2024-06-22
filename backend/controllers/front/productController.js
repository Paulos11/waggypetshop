const { Types } = require("mongoose");
const Product = require("../../models/productSchema");
const Review = require("../../models/reviewSchema");
const { errorHandler } = require("../../lib/index");

class ProductController {
  featured = async (req, res, next) => {
    try {
      const featuredProducts = await Product.find({
        status: true,
        featured: true,
      }).limit(4);

      if (featuredProducts.length === 0) {
        return res.status(404).json({ message: "No featured products found" });
      }

      res.send(featuredProducts);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };

  latest = async (req, res, next) => {
    try {
      const latestProducts = await Product.find({ status: true })
        .sort({ createdAt: "desc" })
        .limit(10)
        .exec();
  
      res.json(latestProducts.map(product => product.toJSON()));
    } catch (err) {
      errorHandler(err, req, res, next);
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

  similar = async (req, res, next) => {
    try {
      const product = await Product.findOne({
        status: true,
        _id: req.params.id,
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const similarProducts = await Product.find({
        status: true,
        categoryId: product.categoryId,
        _id: { $ne: product._id },
      });

      res.send(similarProducts);
    } catch (err) {
      errorHandler(err, req, res, next);
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
      errorHandler(err, req, res, next);
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
      errorHandler(err, req, res, next);
    }
  };
}

module.exports = new ProductController();