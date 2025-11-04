import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import BarNav from "./components/BarNav";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Wishlist from "./components/Wishlist";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // Load cart items from localStorage or start with an empty array
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Load wishlist items from localStorage or start with an empty array
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // State to control if the cart modal is open
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State to control if the wishlist modal is open
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add a product to the cart, or increase quantity if it already exists
  const handleAddToCart = (product) => {
    const id = product.id || product._id;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, id, quantity: 1 }];
    });
  };

  // Update the quantity of a cart item
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all items from the cart and remove from localStorage
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Add/remove a product from the wishlist
  const handleToggleWishlist = (product) => {
    const id = product.id || product._id;
    if (cartItems.find((item) => item.id === id)) {
      alert("המוצר כבר בסל הקניות!"); // Product is already in cart
      return;
    }
    setWishlist((prev) => {
      if (prev.find((item) => item.id === id)) {
        return prev.filter((item) => item.id !== id);
      }
      return [...prev, { ...product, id }];
    });
  };

  // Remove an item from the wishlist
  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Move an item from wishlist to cart
  const handleAddWishlistToCart = (product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id || product._id);
  };

  const location = useLocation();

  return (
    <>
      {/* Top navigation bar */}
      <BarNav
        cartItems={cartItems}
        wishlist={wishlist}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />

      {/* Show cart only when not on the order page */}
      {location.pathname !== "/order" && (
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      )}

      {/* Wishlist modal */}
      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={handleAddWishlistToCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      {/* Routing between Home and Order pages */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          }
        />
        <Route
          path="/order"
          element={
            <Order
              cartItems={cartItems}
              onClearCart={handleClearCart}
            />
          }
        />
      </Routes>

      {/* Footer section */}
      <Footer />
    </>
  );
}

export default App;
