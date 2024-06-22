const { errorHandler } = require("../../lib");
const User = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  register = async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Passwords do not match",
        });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          message: "User already exists with that email",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        password: hash,
        email,
      });

      const userRes = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };

      res.status(201).json({
        message: "User registered successfully",
        user: userRes,
      });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const userRes = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.status(200).json({
        message: "Login successful",
        user: userRes,
        token,
      });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
}

module.exports = new AuthController();
