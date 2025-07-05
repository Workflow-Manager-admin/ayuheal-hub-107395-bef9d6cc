import React, { useEffect, useState } from "react";
import RemedyCard from "../components/RemedyCard";
import { getAllRemedies, getCategories } from "../api/herbalism";
import NutritionSidebar from "../components/NutritionSidebar";

/**
 * Remedies page now integrates Nutritionix API dynamically:
 * When user selects a remedy (clicks on a card), the NutritionSidebar
 * auto-fetches nutrition facts for the remedy's name.
 * NutritionSidebar handles API state, errors, and .env setup guidance.
 */
// PUBLIC_INTERFACE
function Remedies() {
  const [remedies, setRemedies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingCats, setLoadingCats] = useState(true);
  const [err, setErr] = useState(null);

  // Track which remedy is "active"/viewed for nutrition info
  const [activeRemedy, setActiveRemedy] = useState(null);

  useEffect(() => {
    setLoading(true);
    setLoadingCats(true);
    getAllRemedies()
      .then(remList => setRemedies(remList))
      .catch(e => setErr("Unable to load remedies."))
      .finally(() => setLoading(false));
    getCategories()
      .then(catList => setCategories(catList))
      .catch(() => setCategories([]))
      .finally(() => setLoadingCats(false));
  }, []);

  // If category or remedies change, clear current selection
  useEffect(() => {
    setActiveRemedy(null);
  }, [selectedCategory]);

  // Filter remedies for selected category
  const filtered =
    selectedCategory === "All"
      ? remedies
      : remedies.filter(r => r.category === selectedCategory);

  // Select a remedy to view nutrition (by click)
  function handleRemedyClick(remedy) {
    setActiveRemedy(remedy);
  }

  // Layout: remedies & dynamic nutrition sidebar
  return (
    <div className="ayu-remedies-page">
      <h1>Ayurvedic Remedies</h1>
      {err && <div style={{ color: "red", margin: "1em" }}>{err}</div>}
      <div style={{ display: "flex", gap: "2.2rem", alignItems: "flex-start" }}>
        <section style={{ flex: 3, minWidth: 0 }}>
          <div className="ayu-categories-bar">
            <button
              className={`ayu-category-btn${selectedCategory === "All" ? " selected" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {!loadingCats &&
              categories.map(cat => (
                <button
                  key={cat}
                  className={`ayu-category-btn${selectedCategory === cat ? " selected" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            {loadingCats && <span>Loading categories...</span>}
          </div>
          <div className="ayu-remedy-list">
            {loading && <div>Loading remedies...</div>}
            {!loading &&
              filtered.map(remedy => (
                <div
                  key={remedy.id}
                  style={{
                    border: activeRemedy && activeRemedy.id === remedy.id ? "2px solid var(--ayucare-primary)" : "none",
                    cursor: "pointer"
                  }}
                  tabIndex={0}
                  aria-label={`View nutrition facts for ${remedy.name}`}
                  onClick={() => handleRemedyClick(remedy)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") handleRemedyClick(remedy);
                  }}
                >
                  <RemedyCard remedy={remedy} />
                </div>
              ))}
            {!loading && filtered.length === 0 && (
              <div>No remedies found for this category.</div>
            )}
          </div>
        </section>
        <aside className="ayu-blog-sidebar" style={{ flex: 1, minWidth: 220, maxWidth: 320, paddingLeft: "1rem" }}>
          {/* NutritionSidebar now takes a `remedyName` prop for dynamic fetch */}
          <NutritionSidebar remedyName={activeRemedy ? activeRemedy.name : null} />
        </aside>
      </div>
    </div>
  );
}

export default Remedies;
