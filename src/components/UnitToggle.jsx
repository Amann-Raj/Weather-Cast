import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const UnitToggle = () => {
  const { unit, setUnit } = useContext(WeatherContext);

  return (
    <div className="mb-8 flex justify-center">
      <div className="bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30">
        <button
          onClick={() => setUnit("metric")}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            unit === "metric"
              ? "bg-white text-blue-600 font-semibold shadow-lg"
              : "text-white/80 hover:text-white"
          }`}
        >
          °C
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            unit === "imperial"
              ? "bg-white text-blue-600 font-semibold shadow-lg"
              : "text-white/80 hover:text-white"
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;
