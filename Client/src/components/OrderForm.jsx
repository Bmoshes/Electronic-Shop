import React, { useState } from 'react';

import './OrderForm.css';

/**
 * OrderForm component allows users to place an order by filling out their details
 * and selecting shipping options. It calculates the total price including shipping
 * and submits the order to the server.
 */
function OrderForm({ cartItems, onClearCart }) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shipping: 'standard'
  });

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState('');

  const [orderDetails, setOrderDetails] = useState(null);

  const getShippingCost = (shippingType) => {
    switch (shippingType) {
      case 'express':
        return 29.9;
      case 'pickup':
        return 0;
      default:
        return 0;
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = getShippingCost(formData.shipping);

  const totalWithShipping = total + shippingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) {
      setError('העגלה ריקה');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setError('כתובת אימייל לא תקינה');
    return;
  }

    setError('');
    try {
      const orderData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        shipping: formData.shipping,
        cart: cartItems.map((item) => ({
          productId: item._id || item.id || null,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: totalWithShipping
      };

      // Send order data to the server
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) throw new Error('שגיאה בשליחת ההזמנה');
      const order = await res.json();
      setOrderDetails(order);
      setSuccess(true);
      onClearCart && onClearCart();
    } catch (err) {
      setError(err.message);
    }
  };

  // If the order was successful and we have order details, render the summary
  if (success && orderDetails) return (
    <div className="order-summary">
      <h2>ההזמנה התקבלה!</h2>
      <p>מספר הזמנה: <strong>{orderDetails.orderNumber}</strong></p>
      <h3>סיכום הזמנה:</h3>
      <ul>
        {orderDetails.cart.map(item => (
          <li key={item.productId}>
            {item.name} × {item.quantity} — {item.price} ₪
          </li>
        ))}
      </ul>
      <p>סך הכל: <strong>{orderDetails.total} ₪</strong></p>
      <p>משלוח: {orderDetails.shipping === 'express'
        ? 'אקספרס'
        : orderDetails.shipping === 'pickup'
          ? 'איסוף עצמי'
          : 'רגיל'}
      </p>
    </div>
  );

  // Render the order form
  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>שם מלא</label>
        <input
          type="text"
          name = "name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>אימייל</label>
        <input
          type="email"
          name = "email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>טלפון</label>
        <input
          type="tel"
          name = "phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>כתובת למשלוח</label>
        <textarea
          name="address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>אפשרות משלוח</label>
        <select
          value={formData.shipping}
          onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
        >
          <option value="standard">משלוח רגיל - חינם (עד 14 ימי עסקים)</option>
          <option value="express">משלוח מהיר - 29.90 ₪ (עד 3 ימי עסקים)</option>
          <option value="pickup">איסוף עצמי - חינם</option>
        </select>
      </div>

      <div className="form-group">
        <strong>סכום מוצרים: {total.toFixed(2)} ₪</strong>
      </div>
      <div className="form-group">
        <strong>עלות משלוח: {shippingCost.toFixed(2)} ₪</strong>
      </div>
      <div className="form-group">
        <strong>סך הכל לתשלום: {totalWithShipping.toFixed(2)} ₪</strong>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-button">
        שלח הזמנה
      </button>
    </form>
  );
}

export default OrderForm;
