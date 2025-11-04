import React from "react";

import OrderForm from "../components/OrderForm";

import "./Order.css"; 

/**
 * Order page displays the items in the cart and allows the user to place an order using the OrderForm component.
 * It calculates the total price of the items in the cart and displays them.
 */

function Order({ cartItems, onClearCart }) {

  const calculateTotal = (shipping = 0) => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + shipping;
  };

  return (
    <div className="order-page">
      <div className="container">
        <h1 className="order-title">ביצוע הזמנה</h1>
        <div className="order-layout">
          <div className="order-summary">
            {cartItems.length === 0 ? (
              <p className="empty-cart">העגלה שלך ריקה</p>
            ) : (
              <>
                <div className="order-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={`http://localhost:3000${item.image}`} alt={item.name} />
                      </div>
                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>כמות: {item.quantity}</p>
                        <p className="item-price">{item.price * item.quantity} ₪</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="order-form-container">
            <OrderForm cartItems={cartItems} onClearCart={onClearCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
