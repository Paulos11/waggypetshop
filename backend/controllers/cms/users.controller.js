const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { errorHandle } = require("../../lib");

class UsersController {
  index = async (req, res, next) => {
    try {
      const users = await User.find({}, '-password');
      res.send(users);
    } catch (err) {
      errorHandle(err, next);
    }
  };
  store = async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, phone, address, status } =
        req.body;

      const phoneStr = String(phone);
      if (phoneStr.length < 10 || phoneStr.length > 15) {
        return next({
          message: "Validation error",
          errors: {
            phone:
              "The phone number must be a string between 7 and 15 characters long.",
          },
          status: 422,
        });
      }

      if (password === confirmPassword) {
        const hash = await bcrypt.hash(password, 10);

        await User.create({
          name,
          email,
          password: hash,
          phone: phoneStr,
          address,
          status,
          role: "Staff",
        });
        res.status(201).json({
          message: "Staff Added Successfully",
        });
      } else {
        return next({
          message: "Validation error",
          errors: {
            password: "The passwords do not match.",
          },
          status: 422,
        });
      }
    } catch (err) {
      errorHandle(err, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user && user.role === "Staff") {
        res.send(user);
      } else {
        return next({
          message: "Staff not Found",
          status: 404,
        });
      }
    } catch (err) {
      errorHandle(err, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name, email, phone, address, status, role } = req.body;
      const userId = req.params.id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          phone,
          address,
          status,
          role,
        },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return next({
          message: "User not found",
          status: 404,
        });
      }

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      errorHandle(err, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return next({
          message: "User not found",
          status: 404,
        });
      }

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (err) {
      errorHandle(err, next);
    }
  };
}
module.exports = new UsersController();
