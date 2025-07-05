import React, { useEffect, useState } from "react";
import RemedyCard from "../components/RemedyCard";
import WeatherWidget from "../components/WeatherWidget";
import Button from "../components/Button";
import { getFeaturedRemedies } from "../api/herbalism";

// PUBLIC_INTERFACE
function Home() {
  const [featuredRemedies, setFeaturedRemedies] = useState([]);
  useEffect(() => {
    // Demo fetch
    getFeaturedRemedies().then(data => setFeaturedRemedies(data.slice(0, 3)));
  }, []);

  return (
    <div className="ayu-home">
      <section className="ayu-hero">
        <h1>Welcome to AyuCare</h1>
        <p>Your companion for Ayurvedic healing, natural remedies, and wellness.</p>
        <Button to="/quiz">Take the Dosha Quiz</Button>
      </section>
      <WeatherWidget />
      <section className="ayu-section">
        <h2>Featured Remedies</h2>
        <div className="ayu-remedy-list">
          {featuredRemedies.map(remedy => (
            <RemedyCard key={remedy.id} remedy={remedy} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
