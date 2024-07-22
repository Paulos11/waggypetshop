const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("@/models");
const { errorHandle } = require("@/lib");

class LoginCtrl {
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next({
          message: "Auth Error: User not found.",
          status: 401,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next({
          message: "Authentication error",
          errors: {
            password: "Incorrect password",
          },
          status: 401,
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          role: user.role,
          email: user.email,
          name: user.name,
        },
      });
    } catch (err) {
      errorHandle(err, next);
    }
  };
}

module.exports = new LoginCtrl();
