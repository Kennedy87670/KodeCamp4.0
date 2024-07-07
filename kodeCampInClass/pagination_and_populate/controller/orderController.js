const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.createOrder = async (req, res, next) => {
  try {
    const { product, itemCount, totalPrice } = req.body;

    const orderDetails = await Order.create({
      product,
      itemCount,
      totalPrice,
    });

    res.status(200).json({
      status: "Order successfully created",
      data: {
        order: orderDetails,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const { limit, page } = req.query;

    const options = {
      limit: parseInt(limit, 10) || 10,
      page: parseInt(page, 10) || 1,
      populate: "product",
    };

    const orders = await Order.paginate({}, options);

    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
