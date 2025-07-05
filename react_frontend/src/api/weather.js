// Weather API uses OpenWeatherMap. Replace API_KEY with real key.
const OPENWEATHERMAP_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // TODO: Store securely in .env

// PUBLIC_INTERFACE
export async function getWeather(city) {
  try {
    // TODO: Replace with real API in production & handle API key config
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (e) {
    // Fallback: Demo weather
    return {
      name: "Delhi",
      sys: { country: "IN" },
      main: { temp: 35, humidity: 60 },
      weather: [{ description: "sunny" }]
    };
  }
}
