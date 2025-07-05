/*
  Weather API wrapper for AyuCare, using OpenWeatherMap.
  - API key in .env as REACT_APP_OPENWEATHERMAP_API_KEY
  - Use city name or lat/lon
  - Robust error handling, fallback logic for missing keys
*/

// Use environment variable for API key.
const OPENWEATHERMAP_API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY || "YOUR_OPENWEATHERMAP_API_KEY";

// PUBLIC_INTERFACE
/**
 * Get real-time weather for a city or lat/lon (preferred).
 * city: city name (ex: "Delhi")
 * coords: { lat, lon }, overrides city if present
 * Returns OpenWeatherMap .weather API data or an error/fallback object.
 */
export async function getWeather(city, coords) {
  if (
    !OPENWEATHERMAP_API_KEY ||
    OPENWEATHERMAP_API_KEY === "YOUR_OPENWEATHERMAP_API_KEY"
  ) {
    return {
      error: "OpenWeatherMap API key missing. Add REACT_APP_OPENWEATHERMAP_API_KEY to your .env.",
      name: "Delhi",
      sys: { country: "IN" },
      main: { temp: 35, humidity: 60 },
      weather: [{ description: "sunny" }]
    };
  }
  try {
    let url;
    if (coords && coords.lat && coords.lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      // OpenWeatherMap returns 404 if city not found, 401 if bad API key.
      const errText = await response.text();
      return {
        error: `OpenWeatherMap Error: ${response.status} ${response.statusText} - ${errText}`,
        name: city,
        sys: { country: "" },
        main: { temp: "?", humidity: "?" },
        weather: [{ description: "Data not available" }]
      };
    }
    const data = await response.json();
    return data;
  } catch (e) {
    // Network or unexpected error
    return {
      error: "Unable to connect to weather service.",
      name: city,
      sys: { country: "" },
      main: { temp: "?", humidity: "?" },
      weather: [{ description: "No data" }]
    };
  }
}
