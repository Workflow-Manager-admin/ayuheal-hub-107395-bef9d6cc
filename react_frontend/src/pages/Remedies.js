import React, { useEffect, useState } from "react";
import RemedyCard from "../components/RemedyCard";
import { getAllRemedies, getCategories } from "../api/herbalism";

// PUBLIC_INTERFACE
function Remedies() {
  const [remedies, setRemedies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingCats, setLoadingCats] = useState(true);
  const [err, setErr] = useState(null);

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

  const filtered =
    selectedCategory === "All"
      ? remedies
      : remedies.filter(r => r.category === selectedCategory);

  return (
    <div className="ayu-remedies-page">
      <h1>Ayurvedic Remedies</h1>
      {err && <div style={{ color: "red", margin: "1em" }}>{err}</div>}
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
          filtered.map(remedy => <RemedyCard key={remedy.id} remedy={remedy} />)}
        {!loading && filtered.length === 0 && (
          <div>No remedies found for this category.</div>
        )}
      </div>
    </div>
  );
}

export default Remedies;
