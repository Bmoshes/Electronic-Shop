import React from "react";

import { useNavigate } from "react-router-dom";

import "./Cart.css";

// Cart component displays the shopping cart with items, total price, and checkout button
// It allows users to update item quantities, remove items, and proceed to checkout by navigating to the order page

function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) {

  const navigate = useNavigate();

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/order');
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
      <div className="cart-content">
        <div className="cart-header">
          <h2>עגלת קניות</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>העגלה שלך ריקה</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={`http://localhost:3000${item.image}`} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price} ₪</p>
                    <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>סה"כ:</span>
                <span>{calculateTotal().toLocaleString()} ₪</span>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>
                לתשלום
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
