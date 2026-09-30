const express = require('express');
const router = express.Router();
const authrouter = require('../router/apis/authrouter')
const productrouter = require('../router/apis/productrouter');
const orderrouter = require('../router/apis/orderrouter')

router.use("/v1/api",authrouter);
router.use("/v2/api",productrouter);
router.use("/v3/api",orderrouter)

module.exports = router