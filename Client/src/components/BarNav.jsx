import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./BarNav.css";

// NavBar component displays the navigation bar with links to home, cart, and wishlist

// This function calculates the total number of items in the cart and the total price of those items
function BarNav({ cartItems, wishlist, onCartClick, onWishlistClick }) {
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce( (sum, item) => sum + item.price * item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="logo">
          <b>💻 Electro Shop</b>
        </a>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            דף הבית
          </Link>
          <button className="nav-link" onClick={onWishlistClick}>
            <FaHeart style={{ marginLeft: 6, color: "#e74c3c" }} />
            מועדפים
            {wishlist && wishlist.length > 0 && (
              <span className="cart-count">{wishlist.length}</span>
            )}
          </button>
          <button className="cart-button nav-link" onClick={onCartClick}>
            <FaShoppingCart style={{ marginLeft: 6 }} />
            {itemsCount > 0 && <span className="cart-count">{itemsCount}</span>}
            <span style={{ marginRight: 8 }}>
              {totalPrice.toLocaleString()} ₪
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default BarNav;