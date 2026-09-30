const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/Apis/AuthControllers');
const AuthMiddleware = require('../../middleware/authMiddleware');


router.post("/createuser",AuthController.createUser);
router.post("/verify",AuthController.verify);
router.post("/login",AuthController.login);
router.get("/refresh-token",AuthController.refreshToken)
router.get("/getprofile",AuthMiddleware,AuthController.profile);



module.exports=router