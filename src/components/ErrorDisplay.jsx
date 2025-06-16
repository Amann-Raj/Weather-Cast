import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const ErrorDisplay = () => {
  const { error } = useContext(WeatherContext);
  return (
    error && (
      <div className="max-w-md mx-auto mt-4">
        <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 text-red-100">
          {error}
        </div>
      </div>
    )
  );
};

export default ErrorDisplay;
