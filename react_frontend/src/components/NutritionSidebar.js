import React, { useState } from "react";
import { getNutrition } from "../api/nutrition";

// PUBLIC_INTERFACE
function NutritionSidebar() {
  const [query, setQuery] = useState("");
  const [info, setInfo] = useState(null);

  const handleSearch = e => {
    e.preventDefault();
    getNutrition(query).then(setInfo);
  };

  return (
    <div className="ayu-nutrition-sidebar">
      <h4>Nutrition Facts</h4>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="eg. turmeric, honey"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="ayu-btn-sm">Search</button>
      </form>
      {info ? (
        <div className="ayu-nutrition-facts">
          <strong>{info.name}</strong>
          <ul>
            {Object.entries(info.nutrition).map(([k, v]) => <li key={k}>{k}: {v}</li>)}
          </ul>
        </div>
      ) : <div style={{ fontSize: 12 }}>Try exploring herb/diet nutrition!</div>}
    </div>
  );
}
export default NutritionSidebar;
