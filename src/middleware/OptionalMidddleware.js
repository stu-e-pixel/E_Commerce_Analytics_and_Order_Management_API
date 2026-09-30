const User = require("../models/auth.model");
const jwt = require("jsonwebtoken");

const OptionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;
    if (!authHead) {
      return next();
    }

    if (!authHead.startsWith("Bearer ")) {
      return next();
    }

    const token = authHead.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    const user = await User.findByPk(decoded.id);

    if (user) {
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }

    next();

  } catch (error) {
    next();
  }
};

module.exports = OptionalAuthMiddleware;