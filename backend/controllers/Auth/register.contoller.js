const bcrypt = require("bcryptjs");
const { User } = require("@/models");
const { errorHandle } = require("@/lib");

class RegisterCtrl {
  register = async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, phone, address } = req.body;
      console.log('Received data:', req.body);
      const phoneStr = String(phone);
      if (phoneStr.length < 10 || phoneStr.length > 15) {
        return next({
          message: "Validation error",
          errors: {
            phone: "The phone number must be a string between 10 and 15 characters long.",
          },
          status: 422,
        });
      }

      if (password !== confirmPassword) {
        return next({
          message: "Validation error",
          errors: {
            password: "The passwords do not match.",
          },
          status: 422,
        });
      }

      const hash = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email,
        password: hash,
        phone: phoneStr,
        address,
      });

      res.status(201).json({
        message: "Thank you for registering. Please proceed to login.",
      });
    } catch (err) {
      errorHandle(err, next);
    }
  };
}

module.exports = new RegisterCtrl();
