const statuscode = require("../utils/statuscode");

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(statuscode.NOT_FOUND).json({
        status: false,
        message: "user is not defined",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(statuscode.NOT_FOUND).json({
        status: false,
        message: "Access denied",
      });
    };

    next();
  };
};

module.exports=roleMiddleware
