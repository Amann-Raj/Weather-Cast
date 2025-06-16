import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const WeatherInfo = () => {
  const {
    weather,
    unit,
    setShowHourly,
    setBeginSlice,
    setEndSlice,
    forecast,
    getWeatherIcon,
  } = useContext(WeatherContext);
  if (!weather || !forecast || !forecast.list) return null;

  const { name, main, wind, weather: condition } = weather;
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleHourly = () => {
    const midnightIndex = forecast.list.findIndex((item) => {
      const time = new Date(item.dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return time === "12:00 AM";
    });

    setEndSlice(midnightIndex !== -1 ? midnightIndex : 8);
    setShowHourly(true);
    setBeginSlice(0);
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start text-white/80 text-sm mb-2">
            <span>Current Weather</span>
            <div className="text-right">
              <div>{name}</div>
              <div>{currentTime}</div>
            </div>
          </div>

          {/* Weather Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-9xl">
                {getWeatherIcon(condition[0].icon)}
              </div>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="text-center mb-8">
          <div className="text-7xl font-thin text-white mb-2">
            {Math.round(main.temp)}°
          </div>
          <div className="text-white/80 text-lg">{condition[0].main}</div>
          <div className="text-white/60 text-sm">
            Feels like {Math.round(main.feels_like)}
            {tempUnit}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-6 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-light">{main.humidity}%</div>
            <div className="text-sm text-white/60">Humidity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light">
              {wind.speed} {speedUnit}
            </div>
            <div className="text-sm text-white/60">Wind Speed</div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition"
            onClick={handleHourly}
          >
            View Hourly Forecast
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
