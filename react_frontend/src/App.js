import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Remedies from "./pages/Remedies";
import DoshaQuiz from "./pages/DoshaQuiz";
import Videos from "./pages/Videos";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import "./App.css";
import "./theme/fonts.css";

// PUBLIC_INTERFACE
function App() {
  // ThemeProvider manages light/herbal/dark toggling and global style
  return (
    <ThemeProvider>
      <div className="ayu-root-bg">
        <Router>
          <Navbar />
          <main className="ayu-main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/remedies" element={<Remedies />} />
              <Route path="/quiz" element={<DoshaQuiz />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
