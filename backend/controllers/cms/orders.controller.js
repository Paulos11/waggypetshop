const Order = require("@/models/order.model");
const { errorHandle } = require("@/lib");
const OrderDetails = require("@/models/order-details.model");

class OrdersController {
  index = async (req, res, next) => {
    try {
      let orders = await Order.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          }
        },
        {
          $unwind: "$user"
        }
      ]);

      for (let order of orders) {
        let details = await OrderDetails.aggregate([
          {
            $match: { orderId: order._id }
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "product",
            }
          },
          {
            $unwind: "$product"
          }
        ]);

        order.details = details;
      }

      res.send(orders);
    } catch (error) {
      errorHandle(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      await OrderDetails.deleteMany({ orderId: order._id });
      res.json({
        message: "Order and associated details deleted successfully",
      });
    } catch (error) {
      errorHandle(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: "Order updated successfully", order });
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new OrdersController();
