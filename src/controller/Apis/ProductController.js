const statuscode = require("../../utils/statuscode");
const productservice = require("../../service/crudservice");

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, category, price, stock } = req.body;

      if (!name || !price) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "place provide name ,email,and description field",
        });
      }
      const product = await productservice.createProduct({
        name,
        category,
        price,
        stock,
      });

      return res.status(statuscode.OK).json({
        status: true,
        message: "Product created succesfully",
        data: product,
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, category, price, stock } = req.body;

      const product = await productservice.updateProduct({
        id,
        name,
        category,
        price,
        stock,
      });

      return res.status(statuscode.OK).json({
        status: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      const { name, minprice, maxprice, page = 1, limit = 5 } = req.query;

      const result = await productservice.getAllProduct({
        name,
        minprice,
        maxprice,
        page,
        limit,
      });

      return res.status(statuscode.OK).json({
        success: true,
        ...result,
      });
    } catch (error) {
      return res.status(statuscode.NOT_FOUND).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await productservice.getProductById(id);

    return res.status(statuscode.OK).json({
      success: true,
      data: product,
    });

  } catch (error) {
    return res.status(statuscode.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
}

async deleteProduct(req, res) {
  try {
    const { id } = req.params;

    await productservice.deleteProduct(id);

    return res.status(statuscode.OK).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    return res.status(statuscode.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
}
}
module.exports = new ProductController();
