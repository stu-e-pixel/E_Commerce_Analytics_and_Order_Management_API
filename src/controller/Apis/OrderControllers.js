const orderService = require("../../service/orderservice");
const statuscode = require("../../utils/statuscode");

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    const order = await orderService.createOrder({
      userId,
      items,
    });

    return res.status(statuscode.OK).json({
      status: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    return res.status(statuscode.BAD_REQUEST).json({
      status: false,
      message: error.message,
    });
  }
};


const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderService.getMyOrders(userId);

    return res.status(statuscode.OK).json({
      status: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    return res.status(statuscode.SERVER_ERROR).json({
      status: false,
      message: error.message,
    });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
};