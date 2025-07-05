import React, { useEffect, useState } from "react";
import { getWeather } from "../api/weather";

// Helper: Contextual skincare tip based on weather
function getSkincareTip(weather) {
  if (!weather || !weather.main) return "Hydrate and take gentle care of your skin.";
  const { temp, humidity } = weather.main;
  const desc = weather.weather && weather.weather[0]?.description?.toLowerCase() || "";

  if (humidity > 85) return "High humidity: Use a light, water-based moisturizer and avoid heavy creams.";
  if (/rain|storm|monsoon|shower/.test(desc)) return "Rainy: Cleanse gently and keep skin dry—prefer mild toner or anti-fungal powder.";
  if (/dry|arid/.test(desc) || humidity < 35) return "Very dry air: Apply rich moisturizer and drink extra water.";
  if (temp > 32) return "Hot: Use broad-spectrum sunscreen (SPF 30+), cooling herbal sprays, and avoid too much sun.";
  if (temp < 10) return "Cold: Use a heavier moisturizer and protect exposed skin from wind.";
  if (/cloud/.test(desc)) return "Cloudy: Gentle hydration and light sunscreen are still important.";
  return "Hydrate and nourish your skin according to the weather.";
}

// PUBLIC_INTERFACE
function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locErr, setLocErr] = useState("");
  const [hasAutoLocated, setHasAutoLocated] = useState(false);

  // Try to get geolocation on first load
  useEffect(() => {
    if (!hasAutoLocated && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
          setHasAutoLocated(true);
        },
        err => {
          setLocErr("Couldn't detect your location. Showing weather for default city.");
          setCoords(null);
          setHasAutoLocated(true);
        }
      );
    } else {
      setLoading(false); // manually setting city from input
    }
  // eslint-disable-next-line
  }, []);

  // Fetch weather on coords or city change
  useEffect(() => {
    setLoading(true);
    getWeather(city, coords)
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => {
        setWeather(null);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [city, coords]);

  // If user edits city, clear coords so weather refetches for new city
  const handleCityInput = e => {
    setCity(e.target.value);
    setCoords(null);
  };

  let tip = getSkincareTip(weather);
  let hasError = weather && (weather.error || weather.main?.temp === "?");

  return (
    <div className="ayu-weather-widget">
      <h3>Weather-based Skin Tip</h3>
      {locErr && <div style={{ color: "#c04a3d", fontSize: "13px", marginBottom: "4px" }}>{locErr}</div>}
      <div>
        <label htmlFor="city">City:</label>
        <input
          name="city"
          id="city"
          value={city}
          onChange={handleCityInput}
          placeholder="Enter city"
          style={{ marginLeft: 8 }}
        />
        <span style={{ marginLeft: 10, fontSize: 12, color: "#777" }}>
          {coords && !hasError ? "Using your location" : ""}
        </span>
      </div>
      {loading ? (
        <span>Loading weather...</span>
      ) : (weather ? (
        <div className="ayu-weather-info">
          <span>
            <b>{weather.name}{weather.sys?.country ? `, ${weather.sys.country}` : ""}:</b>{" "}
          </span>
          <span>
            {weather.weather && weather.weather[0]?.description ? weather.weather[0].description : "—"},{" "}
            {typeof weather.main?.temp === "number" ? `${Math.round(weather.main.temp)}°C` : "?"}
            {typeof weather.main?.humidity === "number" ? `, ${weather.main.humidity}% humidity` : ""}
          </span>
          <div className="ayu-skincare-tip">
            <em>{tip}</em>
          </div>
          {hasError && (
            <div style={{ color: "#c04a3d", marginTop: 8, fontSize: 13 }}>
              {weather.error ? (
                <span>{weather.error}</span>
              ) : (
                <span>Weather unavailable for this city or your location.</span>
              )}
            </div>
          )}
        </div>
      ) : (
        <span style={{ color: "red" }}>Weather unavailable.</span>
      ))}
      <div style={{ fontSize: 11, color: "#998", marginTop: 4 }}>
        Powered by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>
      </div>
    </div>
  );
}

export default WeatherWidget;
