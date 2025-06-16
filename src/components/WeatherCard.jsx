import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/30">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{weather.name}</h2>
        <p className="text-white/80 mb-4">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="flex items-center justify-center mb-6">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-24 h-24 transform transition-transform duration-300 hover:scale-110"
          />
          <div className="text-5xl font-bold text-white ml-4">
            {Math.round(weather.main.temp)}°C
          </div>
        </div>
        <p className="text-xl text-white capitalize mb-6">
          {weather.weather[0].description}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/30">
            <p className="text-white/80">Feels Like</p>
            <p className="text-2xl font-semibold text-white">
              {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/30">
            <p className="text-white/80">Humidity</p>
            <p className="text-2xl font-semibold text-white">
              {weather.main.humidity}%
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/30">
            <p className="text-white/80">Wind Speed</p>
            <p className="text-2xl font-semibold text-white">
              {weather.wind.speed} m/s
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/30">
            <p className="text-white/80">Pressure</p>
            <p className="text-2xl font-semibold text-white">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 