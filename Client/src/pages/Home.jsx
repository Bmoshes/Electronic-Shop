import React, { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "../components/ProductCard";

// This file represents the home page of the ElectroShop.
// It fetches product data from the server and displays it in a grid format using the ProductCard component.
function Home({ onAddToCart, wishlist, onToggleWishlist }) {
  const [products, setProducts] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">
            <span role="img" aria-label="cart" className="logo-icon">
              💻
            </span>
            <span className="logo-text">
              ELECTRO<span style={{ color: "#52C4E5" }}>SHOP</span>
            </span>
          </div>
          <p className="hero-subtitle" dir="rtl">
            ברוכים הבאים ל־
            <strong style={{ color: "#52C4E5" }}>ELECTROSHOP</strong> – חנות
            האלקטרוניקה המובילה בישראל. אצלנו תמצאו את המוצרים החדישים ביותר,
            שירות אישי ומקצועי, ומשלוחים מהירים עד הבית. אנחנו כאן כדי להביא לכם
            את הטכנולוגיה המתקדמת ביותר בצורה נוחה, משתלמת ומהנה.
          </p>

          <a href="#products" className="hero-cta">
            קנה עכשיו
          </a>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="container">
          <h2 className="section-title">המוצרים שלנו</h2>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
                isFavorite={wishlist.some(
                  (item) => item.id === product._id || item.id === product.id
                )}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;