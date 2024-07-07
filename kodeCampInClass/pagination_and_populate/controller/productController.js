const Product = require("../models/productModel");

// Create a Product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "Product successfully created",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Get Products with pagination
exports.getProducts = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const products = await Product.find({})
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const productCount = await Product.countDocuments({});
    const totalPages = Math.ceil(productCount / limit);

    res.status(200).json({
      products,
      totalProducts: productCount,
      totalPages,
      currentPage: Number(page),
      hasPrevious: Number(page) > 1,
      hasNext: Number(page) < totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "Product not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Update a Product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({
        status: "Product not found",
      });
    }
    res.status(200).json({
      status: "Product successfully updated",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "Product not found",
      });
    }
    res.status(204).json({
      status: "Product successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
