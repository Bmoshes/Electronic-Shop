import React from "react";
import "./Wishlist.css";
import { FaTimes } from "react-icons/fa";

// Wishlist component displays a list of favorite products
// It allows users to add products to the cart or remove them from the wishlist

function Wishlist({ isOpen, onClose, wishlist, onAddToCart, onRemoveFromWishlist }) {
  if (!isOpen) return null;

  return (
    <div className="wishlist-container">
      <div className="wishlist-products-grid">
        <button className="close-btn" onClick={onClose}>
          <FaTimes size={16} />
        </button>
        <h2 className="wishlist-title">המועדפים שלי</h2>
        {wishlist.length === 0 ? (
          <p className="wishlist-empty">אין מוצרים במועדפים.</p>
        ) : (
          wishlist.map((product) => (
            <div className="wishlist-product-item" key={product.id}>
              <img
                className="wishlist-product-img"
                src={`http://localhost:3000${product.image}`}
                alt={product.name}
              />
              <div className="wishlist-product-info">
                <div>{product.name}</div>
                <div>{product.price} ₪</div>
                <button onClick={() => onAddToCart(product)}>
                  הוסף לסל
                </button>
                <button onClick={() => onRemoveFromWishlist(product.id)}>
                  הסר ממועדפים
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;