/**
 * Nutrition API: Uses Nutritionix. Place API_KEY/ID in environment (.env).
 * Docs: https://developer.nutritionix.com/docs/v2
 * You need a Nutritionix developer account for API keys.
 * 
 * ====== .env setup ======
 * REACT_APP_NUTRITIONIX_APP_ID=your_nutritionix_app_id
 * REACT_APP_NUTRITIONIX_API_KEY=your_nutritionix_key
 * 
 * NEVER commit actual keys to source - always use env variables!
 * ========================
 */
/** 
 * These read your API key and App ID from process.env (.env file at project root, reloaded on app restart). 
 * Example: For a real Nutritionix account, sign up at https://developer.nutritionix.com/admin/api.
 */
const NUTRITIONIX_APP_ID = process.env.REACT_APP_NUTRITIONIX_APP_ID || "YOUR_APP_ID"; // API key is pulled from .env
const NUTRITIONIX_API_KEY = process.env.REACT_APP_NUTRITIONIX_API_KEY || "YOUR_API_KEY";

// PUBLIC_INTERFACE
export async function getNutrition(query) {
  /** Fetch nutrition facts for a food/herb using Nutritionix API. Returns nutrition summary or null/error object. */
  if (!query) return null;
  if (
    !NUTRITIONIX_APP_ID ||
    NUTRITIONIX_APP_ID === "YOUR_APP_ID" ||
    !NUTRITIONIX_API_KEY ||
    NUTRITIONIX_API_KEY === "YOUR_API_KEY"
  ) {
    // Defensive: Keys missing
    return {
      name: query,
      nutrition: {
        Notice: "Nutritionix API key/app_id missing. Update .env with Nutritionix credentials."
      }
    };
  }

  try {
    const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    // API keys are sent here via headers, never hard-code live credentials in repo
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-app-id": NUTRITIONIX_APP_ID, // <-- API App ID from .env
        "x-app-key": NUTRITIONIX_API_KEY, // <-- API Key from .env
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });
    if (!response.ok) {
      // API error (e.g. rate-limit)
      return {
        name: query,
        nutrition: {
          Error: `Nutritionix API error: ${response.statusText}`
        }
      };
    }
    const data = await response.json();
    if (!data.foods || !Array.isArray(data.foods) || data.foods.length === 0) {
      return {
        name: query,
        nutrition: {
          Notice: "No nutrition data found for this item."
        }
      };
    }
    // Map Nutritionix data to UI format (first matching result)
    const f = data.foods[0];
    return {
      name: f.food_name.charAt(0).toUpperCase() + f.food_name.slice(1),
      nutrition: {
        Calories: f.nf_calories ? `${Math.round(f.nf_calories)} kcal` : "—",
        Protein: f.nf_protein ? `${f.nf_protein}g` : "—",
        Carbs: f.nf_total_carbohydrate ? `${f.nf_total_carbohydrate}g` : "—",
        Fat: f.nf_total_fat ? `${f.nf_total_fat}g` : "—",
        ...(f.nf_vitamin_c_dv && { "Vitamin C (DV%)": `${f.nf_vitamin_c_dv}%` }),
        ...(f.nf_sugars && { Sugar: `${f.nf_sugars}g` }),
      }
    };
  } catch (err) {
    return {
      name: query,
      nutrition: {
        Error: "Error fetching nutrition info."
      }
    };
  }
}
