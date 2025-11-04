const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/productController");

// Handle GET request to fetch all products
router.get("/", getProducts);

// Export the router
module.exports = router;
