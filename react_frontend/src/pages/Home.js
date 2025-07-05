import React from "react";

// PUBLIC_INTERFACE
/**
 * Home page for AyuCare.
 * Minimalist welcome screen: introduces the AyuCare site, purpose, and audience.
 * No widgets, remedies, hero, or demo content.
 */
function Home() {
  return (
    <div className="ayu-home" style={{ minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <section
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "28px",
          padding: "2.5em 2em",
          maxWidth: 540,
          boxShadow: "0 2px 18px #4e944f0c",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "var(--ayucare-primary)", fontWeight: 700, fontSize: "2.25rem", marginBottom: "0.7em" }}>
          Welcome to AyuCare
        </h1>
        <p style={{ fontSize: "1.18rem", color: "var(--text-secondary)", marginBottom: "1em", lineHeight: "1.65" }}>
          <strong>AyuCare</strong> offers simple, accessible Ayurvedic remedies,
          holistic skincare tips, and natural healing advice for everyone. Our goal is to empower you
          with science-backed, traditional wisdom—making well-being easy, comforting, and sustainable.
        </p>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)" }}>
          Explore gentle, natural solutions for body, mind, and skin through
          Ayurveda. Perfect for anyone seeking balance, wellness, or a caring guide on their healing journey.<br /><br />
          <span style={{ color: "var(--ayucare-primary)", fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            🌿 Breathe easy, heal naturally, feel welcome!
          </span>
        </p>
      </section>
    </div>
  );
}

export default Home;
