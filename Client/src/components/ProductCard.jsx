import React from "react";
import "./ProductCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// This component represents a product card in the website.
// It displays product details such as name, description, price, and an image.
// It also includes a button to add the product to the cart and an optional wishlist button

function ProductCard({ product, onAddToCart, isFavorite, onToggleWishlist }) {
  return (
    <div className="product-card" style={{ position: "relative" }}>
      {onToggleWishlist && (
        <button
          className="wishlist-btn"
          onClick={() => onToggleWishlist(product)}
          aria-label={isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
        >
          {isFavorite ? (
            <FaHeart color="#e74c3c" size={22} />
          ) : (
            <FaRegHeart color="#7F8C8D" size={22} />
          )}
        </button>
      )}
      <div className="product-image">
        <img src={`http://localhost:3000${product.image}`} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price-row">
          <span className="product-price">
            {product.price.toLocaleString()} ₪
          </span>
          <button className="add-to-cart" onClick={() => onAddToCart(product)}>
            הוסף לעגלה
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
