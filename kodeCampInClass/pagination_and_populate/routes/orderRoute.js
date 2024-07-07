const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create Order
router.post("/orders", orderController.createOrder);

// Get Orders with Pagination
router.get("/orders", orderController.getOrders);

module.exports = router;
