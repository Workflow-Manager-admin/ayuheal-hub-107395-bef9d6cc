import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// AyuCare: wrap App with providers/contexts if needed here.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

