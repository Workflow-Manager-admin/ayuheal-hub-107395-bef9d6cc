import React, { useEffect, useState } from "react";
import { getWeather } from "../api/weather";

// PUBLIC_INTERFACE
function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Delhi");

  useEffect(() => {
    getWeather(city).then(setWeather);
  }, [city]);

  return (
    <div className="ayu-weather-widget">
      <h3>Weather-based Skin Tip</h3>
      <div>
        <label htmlFor="city">City:</label>
        <input name="city" id="city" value={city} onChange={e => setCity(e.target.value)} />
      </div>
      {weather ? (
        <div className="ayu-weather-info">
          <span>{weather.name}, {weather.sys.country}:</span>
          <span>{weather.weather[0].description}, {Math.round(weather.main.temp)}°C</span>
          <div className="ayu-skincare-tip">
            <em>
              {/* Dummy logic: humid => moisturizer, dry => hydrate, hot => sunscreen */}
              {weather.main.humidity > 70
                ? "Tip: Use light, non-greasy moisturizer."
                : weather.main.temp > 30
                ? "Tip: Don't forget sunscreen and cooling herbs!"
                : "Tip: Hydrate and nourish your skin."}
            </em>
          </div>
        </div>
      ) : (
        <span>Loading weather...</span>
      )}
    </div>
  );
}

export default WeatherWidget;
