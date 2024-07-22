const Review = require("../../models/review.mode");
const { errorHandle } = require("@/lib");

class ReviewController {
  index = async (req, res, next) => {
    try {
      let reviews = await Review.aggregate()
        .lookup({
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        })
        .lookup({
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        });
      for (let i in reviews) {
        reviews[i].product = reviews[i].product[0];
        reviews[i].user = reviews[i].user[0];
      }

      res.send(reviews);
    } catch (error) {
      errorHandle(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new ReviewController();
