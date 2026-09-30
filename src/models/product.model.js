const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbcon");

const Product = sequelize.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  },
);

module.exports = Product;
