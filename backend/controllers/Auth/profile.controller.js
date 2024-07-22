const bcrypt = require('bcryptjs');
const User = require('@/models/user.model');
const { errorHandle } = require('@/lib');
const { Review, Order } = require('@/models');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

class ProfileCtrl {
  show = async (req, res) => {
    res.send(req.user);
  };

  update = async (req, res, next) => {
    try {
      const { name, phone, address } = req.body;
      const userId = req.uid;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, phone, address },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (err) {
      errorHandle(err, next);
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const userId = req.uid;

      if (newPassword !== confirmPassword) {
        return next({
          message: 'Validation error',
          errors: { newPassword: 'New passwords do not match' },
          status: 422,
        });
      }

      const user = await User.findById(userId).select('+password');
      if (!user) {
        return next({ message: 'User not found', status: 404 });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return next({
          message: 'Authentication error',
          errors: { oldPassword: 'Old password is incorrect' },
          status: 401,
        });
      }

      const hash = await bcrypt.hash(newPassword, 10);
      user.password = hash;
      await user.save();

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
      errorHandle(err, next);
    }
  };

  reviews = async (req, res, next) => {
    try {
      const reviews = await Review.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.uid) } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        { $project: { 'user.password': 0 } },
      ]);

      res.send(reviews);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  orders = async (req, res, next) => {
    try {
      const orders = await Order.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.uid) } },
        {
          $lookup: {
            from: 'orderdetails',
            localField: '_id',
            foreignField: 'orderId',
            as: 'orderDetails',
          },
        },
        { $unwind: '$orderDetails' },
        {
          $lookup: {
            from: 'products',
            localField: 'orderDetails.productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            'user.password': 0,
            'orderDetails._id': 0,
            'orderDetails.orderId': 0,
          },
        },
      ]);

      res.send(orders);
    } catch (err) {
      errorHandle(err, next);
    }
  };

  uploadProfileImage = async (req, res, next) => {
    try {
      const userId = req.uid;
      const profileImage = req.file.path;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profileImage },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: 'Profile image updated successfully',
        profileImage: updatedUser.profileImage,
      });
    } catch (err) {
      errorHandle(err, next);
    }
  };
}

module.exports = new ProfileCtrl();
