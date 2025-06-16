import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WeatherContext = createContext();

const API_KEY = import.meta.env.VITE_API_KEY;

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(null);
  const [showHourly, setShowHourly] = useState(false);
  const [beginSlice, setBeginSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(12);
  const [activeCard, setActiveCard] = useState(null);

  const fetchWeather = async (cityName = city, selectedUnit = unit) => {
    try {
      setError(null);
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${selectedUnit}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${selectedUnit}`
      );
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
      localStorage.setItem("lastCity", cityName);
    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError("City not found or API error.");
    }
  };
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "☀️";
  };

  useEffect(() => {
    if (city) fetchWeather();
    const interval = setInterval(() => {
      if (city) fetchWeather();
    }, 30000);
    return () => clearInterval(interval);
  }, [city, unit]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weather,
        forecast,
        unit,
        setUnit,
        fetchWeather,
        error,
        showHourly,
        setShowHourly,
        beginSlice,
        setBeginSlice,
        endSlice,
        setEndSlice,
        getWeatherIcon,
        activeCard,
        setActiveCard,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
