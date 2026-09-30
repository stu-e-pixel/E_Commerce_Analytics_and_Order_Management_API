const {User,Product,Order,OrderItem}= require('../association/oneToMany.association')

const createOrder = async ({ userId, items }) => {
  if (!items || items.length === 0) {
    throw new Error("Order must contain at least one product");
  }

  let totalAmount = 0;

  const orderItems = [];

  for (const item of items) {
    const { product, quantity } = item;

    if (!product || !quantity) {
      throw new Error("Product and quantity are required");
    }

    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    const productData = await Product.findByPk(product);

    if (!productData) {
      throw new Error("Product not found");
    }

    if (!productData.isActive) {
      throw new Error("Product is not available");
    }

    if (productData.stock < quantity) {
      throw new Error(
        `Only ${productData.stock} items available for ${productData.name}`
      );
    }
    const price = Number(productData.price);

    totalAmount += price * quantity;

    orderItems.push({
      productId: productData.id,
      quantity,
      price,
    });
  }
  const order = await Order.create({
    userId,
    totalAmount,
    status: "pending",
  });
  for (const item of orderItems) {
    await OrderItem.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    });

    const product = await Product.findByPk(item.productId);

    await product.update({
      stock: product.stock - item.quantity,
    });
  }

  return order;
};


const getMyOrders = async (userId) => {
  const orders = await Order.findAll({
    where: {
      userId,
    },

    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },

      {
        model: OrderItem,
        as: "items",

        include: [
          {
            model: Product,
            as: "product",
            attributes: [
              "id",
              "name",
              "category",
              "price",
            ],
          },
        ],
      },
    ],

    order: [["createdAt", "DESC"]],
  });

  return orders;
};


module.exports = {
  createOrder,
  getMyOrders,
};