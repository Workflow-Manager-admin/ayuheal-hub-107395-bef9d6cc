import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer className="ayu-footer">
      <div className="ayu-footer-content">
        <div>
          <span role="img" aria-label="leaf">🌿</span>
          <span className="ayu-brand-name">AyuCare</span>
        </div>
        <div>
          <Link to="/contact">Contact</Link> | <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} AyuCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

