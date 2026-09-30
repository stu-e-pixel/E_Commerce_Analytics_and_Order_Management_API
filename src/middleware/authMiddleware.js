const User = require("../models/auth.model");
const statuscode = require("../utils/statuscode");
const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;

    if (!authHead) {
      return res.status(statuscode.UNAUTHORIZED).json({
        status: false,
        message: "Authorization token is required",
      });
    }

    if (!authHead.startsWith("Bearer ")) {
      return res.status(statuscode.UNAUTHORIZED).json({
        status: false,
        message: "Invalid authorization format",
      });
    }

    const token = authHead.split(" ")[1];

    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET_KEY
);

console.log("Decoded token:", decoded);

const user = await User.findByPk(decoded.id);

console.log("User ID from token:", decoded.id);
console.log("User from database:", user);

    if (!user) {
      return res.status(statuscode.NOT_FOUND).json({
        status: false,
        message: "User is not found",
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();

  } catch (error) {
    return res.status(statuscode.UNAUTHORIZED).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = AuthMiddleware;