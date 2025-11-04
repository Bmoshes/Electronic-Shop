const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');

// Handle POST request to create a new order
router.post('/', createOrder);

// Export the router
module.exports = router;
