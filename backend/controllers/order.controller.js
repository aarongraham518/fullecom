// controllers/order.controller.js
const Order = require("../models/order.model");
const Product = require("../models/product.model");

const createOrder = async (req, res) => {
  const { userId, orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  try {
    // Validate if products in order exist
    const products = await Product.find({ '_id': { $in: orderItems.map(item => item.product) } });
    if (products.length !== orderItems.length) {
      return res.status(400).json({ message: "Some products do not exist" });
    }

       // Calculate totalPrice based on quantity * price for each item
       const totalPrice = orderItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
      
    // Create a new order
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isDelivered: false,
    });

    // Save the order to the database
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

// Get all orders (admin, or user can get their own orders)
const getOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user: userId })
      .populate("orderItems.product") // Populate product details
      .exec();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId)
      .populate("orderItems.product") // Populate product details
      .exec();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
