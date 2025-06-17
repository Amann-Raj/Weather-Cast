import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import {
  Thermometer,
  Droplet,
  Wind,
  GaugeCircle,
} from "lucide-react";

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

  const { name, main, wind, weather: condition, sys } = weather;
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "km/h" : "mph";

  const now = new Date();
  const formattedDateTime = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
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
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">

        {/* Location and Time */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">
            {name}, {sys?.country}
          </h1>
          <p className="text-white/70 text-sm mt-2">{formattedDateTime}</p>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center mb-6">
          <div className="text-9xl">{getWeatherIcon(condition[0].icon)}</div>
        </div>

        {/* Temperature & Condition */}
        <div className="text-center mb-10">
          <div className="text-7xl font-semibold text-white mb-1">
            {Math.round(main.temp)}{tempUnit}
          </div>
          <div className="text-lg text-white/80">
            {condition[0].main}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-white text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          
          {/* Feels Like */}
          <div
            className="group p-3 hover:bg-white/10 rounded-xl transition-all duration-300 cursor-default"
            title="Temperature it feels like"
          >
            <div className="flex justify-center items-center gap-2 text-sm text-white/70 mb-1">
              <Thermometer
                size={20}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400"
              />
              Feels Like
            </div>
            <div className="text-lg font-semibold">
              {Math.round(main.feels_like)}{tempUnit}
            </div>
          </div>

          {/* Humidity */}
          <div
            className="group p-3 hover:bg-white/10 rounded-xl transition-all duration-300 cursor-default"
            title="Humidity level"
          >
            <div className="flex justify-center items-center gap-2 text-sm text-white/70 mb-1">
              <Droplet
                size={20}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400"
              />
              Humidity
            </div>
            <div className="text-lg font-semibold">{main.humidity}%</div>
          </div>

          {/* Wind Speed */}
          <div
            className="group p-3 hover:bg-white/10 rounded-xl transition-all duration-300 cursor-default"
            title="Wind speed"
          >
            <div className="flex justify-center items-center gap-2 text-sm text-white/70 mb-1">
              <Wind
                size={20}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400"
              />
              Wind
            </div>
            <div className="text-lg font-semibold">
              {wind.speed} {speedUnit}
            </div>
          </div>

          {/* Pressure */}
          <div
            className="group p-3 hover:bg-white/10 rounded-xl transition-all duration-300 cursor-default"
            title="Atmospheric pressure"
          >
            <div className="flex justify-center items-center gap-2 text-sm text-white/70 mb-1">
              <GaugeCircle
                size={20}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400"
              />
              Pressure
            </div>
            <div className="text-lg font-semibold">{main.pressure} hPa</div>
          </div>
        </div>

        {/* Hourly Forecast Button */}
        <div className="text-center">
          <button
            onClick={handleHourly}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition"
          >
            View Hourly Forecast
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
