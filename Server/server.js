const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// API routes
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// Serve static files from the "public" folder
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Admin route to fetch all orders (for dashboard, maybe?)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed default products if DB is empty
async function seedDB() {
  try {
    const sum = await Product.countDocuments();
    if (sum === 0) {
      const products = [
        {
          name: "אוזניות אלחוטיות",
          description: "איכות שמע מעולה, סוללה ל-24 שעות.",
          price: 199,
          image: "/images/img1.jpg",
        },
        {
          name: "שעון חכם",
          description: "עמיד במים, מסך מגע צבעוני.",
          price: 349,
          image: "/images/img2.jpeg",
        },
        {
          name: "רמקול Bluetooth",
          description: "עוצמתי, קטן ונייד.",
          price: 129,
          image: "/images/img5.jpg",
        },
        {
          name: "פעמון דלת חכם",
          description: "וידאו FHD, חיבור Wi-Fi.",
          price: 499,
          image: "/images/img9.jpg",
        },
        {
          name: "מקלדת גיימינג",
          description: "תאורת RGB, מקשים שקטים.",
          price: 179,
          image: "/images/img4.jpg",
        },
        {
          name: "עכבר אלחוטי",
          description: "דיוק גבוה, נוח לאחיזה.",
          price: 89,
          image: "/images/img3.jpg",
        },
        {
          name: "מטען נייד",
          description: "10,000mAh, טעינה מהירה.",
          price: 99,
          image: "/images/img8.jpg",
        },
        {
          name: "טאבלט 10 אינץ'",
          description: "מסך HD, סוללה חזקה.",
          price: 799,
          image: "/images/img6.jpg",
        },
        {
          name: "מצלמת רשת",
          description: "1080p, מיקרופון מובנה.",
          price: 149,
          image: "/images/img7.jpg",
        },
      ];

      await Product.insertMany(products);
      console.log("✅ Products seeded successfully!");
    }
  } catch (err) {
    console.error("❌ Error seeding products:", err.message);
    process.exit(1);
  }
}

// Connect to DB and seed if needed
connectDB();
seedDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
