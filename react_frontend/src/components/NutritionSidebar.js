import React, { useState } from "react";
import { getNutrition } from "../api/nutrition";

// PUBLIC_INTERFACE
function NutritionSidebar() {
  const [query, setQuery] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await getNutrition(query);
    setInfo(res);
    setLoading(false);
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
        <button type="submit" className="ayu-btn-sm" disabled={loading || !query.trim()}>Search</button>
      </form>
      {loading && <div style={{ fontSize: 12 }}>Loading nutrition...</div>}
      {info ? (
        <div className="ayu-nutrition-facts" style={{ marginTop: 8 }}>
          <strong>{info.name}</strong>
          <ul style={{ paddingLeft: 18 }}>
            {Object.entries(info.nutrition).map(([k, v]) => (
              <li key={k} style={{ color: /error|notice/i.test(k) ? "#9d2121" : undefined }}>{k}: {v}</li>
            ))}
          </ul>
          {info.nutrition && (info.nutrition.Error || info.nutrition.Notice) && (
            <div style={{ color: "#b45715", marginTop: 8, fontSize: 13 }}>
              <span>
                For real Nutritionix data, add <b>REACT_APP_NUTRITIONIX_APP_ID</b> and <b>REACT_APP_NUTRITIONIX_API_KEY</b> to your <b>.env</b> file and restart the app.
              </span>
            </div>
          )}
        </div>
      ) : (
        <div style={{ fontSize: 12 }}>Try exploring herb/diet nutrition!</div>
      )}
    </div>
  );
}
export default NutritionSidebar;
