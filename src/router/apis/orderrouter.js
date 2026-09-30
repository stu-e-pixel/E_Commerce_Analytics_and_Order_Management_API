const express = require('express');
const AuthMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const OrderController = require('../../controller/Apis/OrderControllers')

router.post("/createOrder",AuthMiddleware,OrderController.createOrder);
router.get("/getMyOrder",AuthMiddleware,OrderController.getMyOrders);



module.exports = router