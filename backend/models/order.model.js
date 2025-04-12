// models/order.model.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to the User model
      required: true,
    },

    // List of ordered products
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Links to the Product model
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 }, // Quantity of product
        price: { type: Number, required: true }, // Price at time of order
      },
    ],

    // Shipping details
    shippingAddress: {
      fullName: { type: String, required: true }, // Name of the recipient
      address: { type: String, required: true }, // Street address
      city: { type: String, required: true }, // City name
      postalCode: { type: String, required: true }, // ZIP/Postal Code
      country: { type: String, required: true }, // Country
    },

    // Payment details
    paymentMethod: { type: String, required: true }, // Payment type (e.g., Credit Card, PayPal)
    paymentStatus: { type: String, default: "Pending" }, // Payment status (Pending, Paid, Failed)

    // Order total price
    totalPrice: { type: Number, required: true },

    // Delivery status
    isDelivered: { type: Boolean, default: false }, // Whether the order has been delivered
    deliveredAt: { type: Date }, // Timestamp when the order was delivered
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
