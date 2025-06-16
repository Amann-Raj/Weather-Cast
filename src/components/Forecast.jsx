import React, { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

const Forecast = () => {
  const {
    forecast,
    unit,
    setShowHourly,
    setBeginSlice,
    setEndSlice,
    beginSlice,
    endSlice,
    getWeatherIcon,
    activeCard,
    setActiveCard,
  } = useContext(WeatherContext);
  if (!forecast || !forecast.list) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const daily = forecast.list.filter((_, idx) => idx % 8 === 0);

  const handleHourly = (ind) => {
    setShowHourly(true);
    setActiveCard(ind);
    let midnightCount = -1;
    for (let i = 0; i < forecast.list.length; i++) {
      const time = new Date(forecast.list[i].dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      if (time === "12:00 AM") {
        midnightCount++;
      }
      if (midnightCount === ind) {
        setEndSlice(i + 1);
        if (i - 8 <= 0) {
          setBeginSlice(0);
        } else {
          setBeginSlice(i - 8);
        }
        break;
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h3 className="text-white text-xl font-light mb-8 text-center">
          5-Day Forecast
        </h3>
        <div className="overflow-x-auto custom-scrollbar scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/10">
          <div className="flex justify-between items-center space-x-4 min-w-[800px] px-1">
            {daily.map((item, index) => (
              <div
                key={index}
                className={`text-center flex-1 rounded-xl p-2 ${
                  activeCard === index
                    ? "border border-white/20 shadow-2xl"
                    : "border border-transparent"
                }`}
              >
                <p className="text-white/80 text-sm mb-3 font-medium">
                  {new Date(item.dt_txt).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p>
                  {new Date(item.dt_txt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="text-3xl mb-3">
                  {getWeatherIcon(item.weather[0].icon)}
                </div>
                <p className="text-white text-lg font-light">
                  {Math.round(item.main.temp)}
                  {tempUnit}
                </p>
                <p className="text-white/60 text-xs mt-1">
                  {item.weather[0].main}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-white/20 rounded-full text-white text-sm"
                  onClick={() => handleHourly(index)}
                >
                  View Hourly Forecast
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
