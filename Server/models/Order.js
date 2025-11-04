const mongoose = require("mongoose");

// Define the order schema
const orderSchema = new mongoose.Schema({
  name:     { type: String, required: true },         // Customer name
  email:    { type: String, required: true },         // Customer email
  phone:    { type: String, required: true },         // Customer phone number
  address:  { type: String, required: true },         // Shipping address
  shipping: { type: String, required: true },         // Shipping method

  // List of items in the cart
  cart: [
    {
      productId: { type: String, required: true },     // ID of the product
      name:      { type: String, required: true },     // Product name
      price:     { type: Number, required: true, min: 0 }, // Product price
      quantity:  { type: Number, required: true, min: 1 }, // Quantity ordered
    },
  ],

  total:       { type: Number, required: true, min: 0 },  // Total price
  createdAt:   { type: Date, default: Date.now },         // Order creation date
  orderNumber: { type: Number, required: true },          // Unique order number
});

// Export the Order model
module.exports = mongoose.model("Order", orderSchema);
