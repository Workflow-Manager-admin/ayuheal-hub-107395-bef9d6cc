import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

// PUBLIC_INTERFACE
function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={`ayu-navbar ayu-navbar-${theme}`}>
      <div className="ayu-navbar-container">
        <Link className="ayu-brand" to="/">
          <span role="img" aria-label="leaf" style={{ marginRight: 6 }}>🌿</span>
          <span className="ayu-brand-name">AyuCare</span>
        </Link>
        <button className="ayu-navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? "✕" : "☰"}
        </button>
        <div className={`ayu-navbar-links${mobileOpen ? " open" : ""}`}>
          <NavLink to="/" end onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/remedies" onClick={() => setMobileOpen(false)}>Remedies</NavLink>
          <NavLink to="/quiz" onClick={() => setMobileOpen(false)}>Dosha Quiz</NavLink>
          <NavLink to="/videos" onClick={() => setMobileOpen(false)}>Videos</NavLink>
          <NavLink to="/blog" onClick={() => setMobileOpen(false)}>Blog</NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>
          <button className="ayu-theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

