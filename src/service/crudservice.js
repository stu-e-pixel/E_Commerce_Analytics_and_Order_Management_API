const Product = require("../models/product.model");
const { Op } = require("sequelize");


const createProduct = async ({ name, category, price, stock }) => {
  const ExistingProduct = await Product.findOne({
    where: {
      name,
    },
  });

  if (ExistingProduct) {
    throw new Error("Name already exist");
  }

  const product = await Product.create({
    name,
    category,
    price,
    stock,
    isActive: true,
  });
  return product;
};

const updateProduct = async ({ id, name, category, price, stock }) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }
  if (name && name !== product.name) {
    const existingProduct = await Product.findOne({
      where: {
        name,
      },
    });

    if (existingProduct) {
      throw new Error("Product name already exists");
    }
  }

  await product.update({
    name,
    category,
    price,
    stock,
  });

  return product;
};

const getAllProduct = async ({
  name,
  minprice,
  maxprice,
  page = 1,
  limit = 5,
}) => {
  const where = {
    isActive: true,
  };

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }
  if (minprice || maxprice) {
    where.price = {};

    if (minprice) {
      where.price[Op.gte] = Number(minprice);
    }

    if (maxprice) {
      where.price[Op.lte] = Number(maxprice);
    }
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Product.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit: Number(limit),
    offset,
  });

  if (rows.length === 0) {
    throw new Error("No product found");
  }

  return {
    totalproduct: count,
    data: rows,
    currentpage: Number(page),
    totalpage: Math.ceil(count / limit),
  };
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.destroy();

  return product;
};

module.exports = { createProduct, updateProduct ,getAllProduct,getProductById,deleteProduct};
