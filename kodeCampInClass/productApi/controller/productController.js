const Product = require("../model/productModel");

exports.createProduct = async (req, res) => {
  try {
    const productDetails = req.body;
    const product = await Product.create({
      productName: productDetails.productName,
      productPrice: productDetails.productPrice,
    });
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        productName: productDetails.productName,
        productPrice: productDetails.productPrice,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(204).json({
      status: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
