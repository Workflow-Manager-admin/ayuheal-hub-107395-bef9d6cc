import React, { useState, useEffect } from "react";
import { getNutrition } from "../api/nutrition";

/**
 * NutritionSidebar
 * Usage:
 *   - If a `remedyName` prop is given, fetch and show nutrition for that item immediately.
 *   - Also allows manual search for other foods/herbs if desired.
 *   - Shows error/notice if missing API keys (see .env setup below).
 *
 * .env setup needed for real Nutritionix data (store in project root and NEVER hard-code):
 *   REACT_APP_NUTRITIONIX_APP_ID=your_app_id_here
 *   REACT_APP_NUTRITIONIX_API_KEY=your_nutritionix_key_here
 * Get both from https://developer.nutritionix.com/admin/api
 * Then restart the React app to use live nutrition data!
 */
// PUBLIC_INTERFACE
function NutritionSidebar({ remedyName }) {
  const [query, setQuery] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Effect: fetch nutrition when remedyName changes
  useEffect(() => {
    // Don't trigger on mount with empty remedyName
    if (remedyName) {
      setLoading(true);
      setQuery(""); // Clear manual search on remedy click
      getNutrition(remedyName)
        .then(res => setInfo(res))
        .catch(() => setInfo({ name: remedyName, nutrition: { Error: "Error fetching nutrition info." } }))
        .finally(() => setLoading(false));
    }
    // If no remedyName, just clear panel
    else {
      setInfo(null);
    }
  }, [remedyName]);

  // Standard user text search (legacy, also allows correcting/trying alternates)
  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    // Always search latest input, not remedyName override
    const res = await getNutrition(query);
    setInfo(res);
    setLoading(false);
  };

  // Which data to show? If typing, or showing for current remedy?
  const showName = remedyName || (info && info.name) || "";
  const hasNutrition = info && info.nutrition;

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
      {remedyName && (
        <div style={{ fontSize: 12, color: "#574", margin: "2px 0 6px" }}>
          Showing nutrition for: <b>{remedyName}</b>
        </div>
      )}
      {loading && <div style={{ fontSize: 12 }}>Loading nutrition...</div>}
      {hasNutrition ? (
        <div className="ayu-nutrition-facts" style={{ marginTop: 8 }}>
          <strong>{showName}</strong>
          <ul style={{ paddingLeft: 18 }}>
            {Object.entries(info.nutrition).map(([k, v]) => (
              <li key={k} style={{ color: /error|notice/i.test(k) ? "#9d2121" : undefined }}>{k}: {v}</li>
            ))}
          </ul>
          {info.nutrition && (info.nutrition.Error || info.nutrition.Notice) && (
            <div style={{ color: "#b45715", marginTop: 8, fontSize: 13 }}>
              <span>
                {/* API key setup instructions for user, DO NOT hard-code keys */}
                For real Nutritionix data, add <b>REACT_APP_NUTRITIONIX_APP_ID</b> and <b>REACT_APP_NUTRITIONIX_API_KEY</b> to your <b>.env</b> file at project root and restart the app.
              </span>
            </div>
          )}
        </div>
      ) : (
        !loading &&
        <div style={{ fontSize: 12 }}>Try exploring nutrition facts for any herb, fruit, or home remedy!</div>
      )}
    </div>
  );
}
export default NutritionSidebar;
