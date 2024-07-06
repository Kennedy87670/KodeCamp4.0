const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { checkIfLoggedIn } = require("../utils/checkIfLoggedIn");

router
  .route("/")
  .post(checkIfLoggedIn, productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getProductById)
  .put(checkIfLoggedIn, productController.updateProduct)
  .delete(checkIfLoggedIn, productController.deleteProduct);

module.exports = router;

// Products

// const { v4: uuidv4 } = require("uuid");

// let products = [];

// // Get all Products
// server.get("/products", (req, res) => {
//   res.send(products);
// });

// // add list of product
// server.post("/products", (req, res) => {
//   const productDetails = req.body;
//   const newProduct = {
//     id: uuidv4(),
//     name: productDetails.name,
//     price: productDetails.price,
//   };

//   products.push(newProduct);

//   res.status(201).json({
//     status: "success",
//     data: {
//       task: newTask,
//     },
//   });
// });

// //get to product by id
// server.get("/product/:id", (req, res) => {
//   const productId = req.params.id;
//   const productDetails = products.find((product) => (product.id = productId));
//   res.status(201).json({
//     status: "success",
//     data: {
//       data: productDetails,
//     },
//   });
// });

// //put change product
// server.put("/product/:id", (req, res) => {
//   const updatedProductDetails = req.body;
//   const productId = req.params.id;
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id == productId) {
//       products[i].name = updatedProductDetails.name;
//       products[i].price = updatedProductDetails.price;
//     }
//   }

//   res.status(201).json({
//     status: "Product updated sucessfully",
//     data: {
//       data: productDetails,
//     },
//   });
// });
// server.delete("/product/:id", (req, res) => {
//   const productId = req.params.id;
//   products = products.filter((product) => product.id != productId);

//   res.status(201).json({
//     status: "Product deleted successfully" + productId,
//     data: {
//       data: productDetails,
//     },
//   });
// });
