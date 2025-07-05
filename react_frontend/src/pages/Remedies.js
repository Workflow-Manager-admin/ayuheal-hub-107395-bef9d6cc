import React, { useEffect, useState } from "react";
import RemedyCard from "../components/RemedyCard";
import { getAllRemedies, getCategories } from "../api/herbalism";

// PUBLIC_INTERFACE
function Remedies() {
  const [remedies, setRemedies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getAllRemedies().then(setRemedies);
    getCategories().then(setCategories);
  }, []);

  const filtered = selectedCategory === "All"
    ? remedies
    : remedies.filter(r => r.category === selectedCategory);

  return (
    <div className="ayu-remedies-page">
      <h1>Ayurvedic Remedies</h1>
      <div className="ayu-categories-bar">
        <button className={`ayu-category-btn${selectedCategory === "All" ? " selected" : ""}`} onClick={() => setSelectedCategory("All")}>All</button>
        {categories.map(cat =>
          <button
            key={cat}
            className={`ayu-category-btn${selectedCategory === cat ? " selected" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >{cat}</button>
        )}
      </div>
      <div className="ayu-remedy-list">
        {filtered.map(remedy => (
          <RemedyCard key={remedy.id} remedy={remedy} />
        ))}
        {filtered.length === 0 && <div>No remedies found for this category.</div>}
      </div>
    </div>
  );
}

export default Remedies;
