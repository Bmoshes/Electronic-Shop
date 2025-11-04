### Project Structure

```
my-react-store/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Order.jsx
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── api.js
│   ├── package.json
│   └── vite.config.js
└── server/                # Node.js backend
    ├── models/
    │   └── Product.js
    ├── routes/
    │   └── productRoutes.js
    ├── controllers/
    │   └── productController.js
    ├── config/
    │   └── db.js
    ├── server.js
    └── package.json
```

### Step 1: Setting Up the React Frontend

1. **Create the React App**:
   ```bash
   npx create-vite@latest client --template react
   cd client
   npm install axios react-router-dom
   ```

2. **Create Components**:
   - **Navbar.jsx**:
     ```jsx
     import React from 'react';
     import { Link } from 'react-router-dom';

     const Navbar = () => {
       return (
         <nav>
           <Link to="/">Home</Link>
           <Link to="/cart">Cart</Link>
           <Link to="/order">Order</Link>
         </nav>
       );
     };

     export default Navbar;
     ```

   - **Home.jsx**:
     ```jsx
     import React, { useEffect, useState } from 'react';
     import axios from 'axios';
     import Product from './Product';

     const Home = () => {
       const [products, setProducts] = useState([]);

       useEffect(() => {
         const fetchProducts = async () => {
           const response = await axios.get('/api/products');
           setProducts(response.data);
         };
         fetchProducts();
       }, []);

       return (
         <div>
           <h1>Products</h1>
           <div>
             {products.map(product => (
               <Product key={product._id} product={product} />
             ))}
           </div>
         </div>
       );
     };

     export default Home;
     ```

   - **Product.jsx**:
     ```jsx
     import React from 'react';

     const Product = ({ product }) => {
       return (
         <div>
           <h2>{product.name}</h2>
           <p>{product.price}</p>
           <button>Add to Cart</button>
         </div>
       );
     };

     export default Product;
     ```

   - **Cart.jsx** and **Order.jsx** would be similar, handling cart state and order processing.

3. **App.jsx**:
   ```jsx
   import React from 'react';
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import Navbar from './components/Navbar';
   import Home from './components/Home';
   import Cart from './components/Cart';
   import Order from './components/Order';

   const App = () => {
     return (
       <Router>
         <Navbar />
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/order" element={<Order />} />
         </Routes>
       </Router>
     );
   };

   export default App;
   ```

4. **API Integration**:
   - Create an `api.js` file to handle API requests.

### Step 2: Setting Up the Node.js Backend

1. **Create the Server**:
   ```bash
   mkdir server
   cd server
   npm init -y
   npm install express mongoose cors
   ```

2. **Database Configuration** (`config/db.js`):
   ```javascript
   import mongoose from 'mongoose';

   const connectDB = async () => {
     try {
       await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log('MongoDB connected');
     } catch (error) {
       console.error(error.message);
       process.exit(1);
     }
   };

   export default connectDB;
   ```

3. **Product Model** (`models/Product.js`):
   ```javascript
   import mongoose from 'mongoose';

   const productSchema = new mongoose.Schema({
     name: { type: String, required: true },
     price: { type: Number, required: true },
   });

   const Product = mongoose.model('Product', productSchema);
   export default Product;
   ```

4. **Product Controller** (`controllers/productController.js`):
   ```javascript
   import Product from '../models/Product.js';

   export const getProducts = async (req, res) => {
     try {
       const products = await Product.find();
       res.json(products);
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
   };
   ```

5. **Product Routes** (`routes/productRoutes.js`):
   ```javascript
   import express from 'express';
   import { getProducts } from '../controllers/productController.js';

   const router = express.Router();

   router.get('/', getProducts);

   export default router;
   ```

6. **Server Setup** (`server.js`):
   ```javascript
   import express from 'express';
   import cors from 'cors';
   import connectDB from './config/db.js';
   import productRoutes from './routes/productRoutes.js';

   const app = express();
   connectDB();

   app.use(cors());
   app.use(express.json());
   app.use('/api/products', productRoutes);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

### Step 3: Connecting Frontend and Backend

1. **Set Up Environment Variables**:
   - Create a `.env` file in the `server` directory with your MongoDB connection string:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```

2. **Run the Applications**:
   - Start the backend server:
     ```bash
     cd server
     node server.js
     ```
   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```

### Conclusion

This setup provides a basic structure for an online store with a React frontend and a Node.js/MongoDB backend. You can expand upon this by adding features like user authentication, payment processing, and more sophisticated state management (e.g., using Redux or Context API). 

Make sure to handle error cases and improve the UI/UX as needed. Happy coding!