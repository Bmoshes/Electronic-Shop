const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Extract order details from the request body
    const { name, email, phone, address, shipping, cart, total } = req.body;

    // Check if all required fields are provided and valid
    if (
      !name || !email || !phone || !address ||
      !shipping || !cart || !Array.isArray(cart) || cart.length === 0 || !total
    ) {
      return res.status(400).json({ message: "נא למלא את כל השדות הנדרשים." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "כתובת אימייל לא תקינה." });
    }

    // Generate a random 6-digit order number
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);

    // Create a new order document
    const order = new Order({
      ...req.body,
      orderNumber: randomOrderNumber,
    });

    // Save the order to the database
    await order.save();

    // Send success response
    res.status(201).json(order);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
};
