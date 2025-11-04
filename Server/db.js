const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/my-online-storeDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process on failure
  }
};

// Export the connection function
module.exports = connectDB;
