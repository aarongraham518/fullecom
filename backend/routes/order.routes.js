// routes/order.routes.js
const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require("../controllers/order.controller");

// Create new order
router.post("/create", createOrder);

// Get all orders for a user (admin or customer)
router.get("/:userId", getOrders);

// Get an order by ID
router.get("/:userId/:orderId", getOrderById);

module.exports = router;
