const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  name:        String,  // Product name
  price:       Number,  // Product price
  description: String,  // Product description
  image:       String,  // Image URL or path
});

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
