const express = require('express');
const router = express.Router();
const ProductController = require('../../controller/Apis/ProductController');
const AuthMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');
const Validation = require('../../valiadate');
const ProductSchemaValidation = require('../../valiadate/ProductSchemaValidation');
const OptionalAuthMiddleware = require('../../middleware/OptionalMidddleware');

router.post("/createproduct",AuthMiddleware,roleMiddleware("admin"),Validation.validate(ProductSchemaValidation.createProduct),ProductController.createProduct);
router.put("/updateproduct/:id",AuthMiddleware,roleMiddleware("admin"),Validation.validate(ProductSchemaValidation.createProduct),ProductController.updateProduct);
router.get("/getAllProduct",OptionalAuthMiddleware,ProductController.getAllProduct);
router.get("/products/:id",AuthMiddleware,ProductController.getProductById);
router.delete("/deleteproducts/:id",AuthMiddleware,roleMiddleware("admin"),ProductController.deleteProduct);

module.exports=router;