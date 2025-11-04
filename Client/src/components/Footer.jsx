import React from "react";
import "./Footer.css";

// Footer component displays the footer of the ElectroShop website
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <b>אודותינו:</b> ElectroShop - החנות המובילה לאלקטרוניקה בישראל. אנו מתחייבים לשירות מקצועי, מוצרים איכותיים ומשלוחים מהירים.
        </div>
        <div>
          <b>מייל:</b> <a href="mailto:info@electroshop.co.il">info@electroshop.co.il</a>
        </div>
        <div>
          <b>טלפון:</b> 03-1234567
        </div>
        <div>
          <b>כתובת:</b> רחוב החשמל 10, תל אביב
        </div>
      </div>
      <div className="footer-copyright">
        אלקטרו-בר טכנולוגיות בע"מ © 2025
      </div>
    </footer>
  );
}

export default Footer;