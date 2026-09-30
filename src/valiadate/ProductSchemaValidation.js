const joi = require("joi");

class ProductSchemaValidation {
  static createProduct = joi.object({
    name: joi.string().trim().required().messages({
      "string.empty": "Product name is required",
      "string.required": "Product name is required",
      "any.required": "Product name is required",
    }),

    category: joi.string().trim().required().messages({
      "string.empty": "Category is required",
      "string.required": "Category is required",
      "any.required": "Category is required",
    }),

    price: joi.number().min(0).required().messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),

    stock: joi.number().integer().min(0).required().messages({
      "number.base": "Stock must be a number",
      "number.integer": "Stock must be an integer",
      "number.min": "Stock cannot be negative",
      "any.required": "Stock is required",
    }),

    isActive: joi.boolean().optional().messages({
      "boolean.base": "isActive must be true or false",
    }),
  });
}

module.exports = ProductSchemaValidation;