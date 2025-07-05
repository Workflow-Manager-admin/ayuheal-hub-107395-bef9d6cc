import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function Button({ children, to, as, ...props }) {
  if (to) {
    return (
      <Link className="ayu-btn" to={to} {...props}>
        {children}
      </Link>
    );
  }
  if (as === "a") {
    return (
      <a className="ayu-btn" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className="ayu-btn" {...props}>
      {children}
    </button>
  );
}

export default Button;
