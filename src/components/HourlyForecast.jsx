import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const HourlyForecast = () => {
  const { forecast, unit, setShowHourly, beginSlice, endSlice, setActiveCard } =
    useContext(WeatherContext);
  if (!forecast) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const handleClose = () => {
    setShowHourly(false);
    setActiveCard(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 mb-6 px-2">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <button
          className="px-4 py-2 mb-4 bg-white/20 rounded-full text-white text-sm"
          onClick={handleClose}
        >
          ← Close
        </button>

        {/* Scrollable Container */}
        <div className="overflow-x-auto custom-scrollbar scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/10">
          <div className="flex space-x-4 min-w-[800px] px-1">
            {forecast.list.slice(beginSlice, endSlice).map((item, index) => (
              <div
                key={index}
                className="bg-white/10 min-w-[120px] p-4 rounded-xl text-white text-center backdrop-blur border border-white/20 flex-shrink-0"
              >
                <div className="text-sm mb-1">
                  <p>
                    {new Date(item.dt_txt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    {new Date(item.dt_txt).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="w-10 h-10 mx-auto"
                />
                <div className="text-lg font-light">
                  {Math.round(item.main.temp)}
                  {tempUnit}
                </div>
                <div className="text-xs text-white/60">
                  {item.weather[0].main}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
