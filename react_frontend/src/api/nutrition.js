// Nutrition API: Uses Nutritionix. Replace API_KEY/ID with project config (.env).

const NUTRITIONIX_APP_ID = "YOUR_APP_ID"; // TODO: Store securely in .env
const NUTRITIONIX_API_KEY = "YOUR_API_KEY"; // TODO: Store securely in .env

// PUBLIC_INTERFACE
export async function getNutrition(query) {
  if (!query) return null;
  // TODO: Replace with real Nutritionix fetch.
  // Fallback demo:
  return {
    name: query,
    nutrition: {
      Calories: "40/100g",
      Protein: "1.35g",
      "Vitamin C": "2mg"
    }
  };
}
