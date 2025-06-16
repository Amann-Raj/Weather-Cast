import React, { useContext, useState, useEffect, useRef } from "react";
import { WeatherContext } from "../context/WeatherContext";
import axios from "axios";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setCity, fetchWeather } = useContext(WeatherContext);
  const searchRef = useRef(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name);
    setCity(suggestion.name);
    fetchWeather(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCity(input);
    fetchWeather(input);
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-8" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter city"
          className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/30"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/40 rounded-full p-2 transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute w-full mt-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl overflow-hidden z-50">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-6 py-3 text-white hover:bg-white/30 cursor-pointer transition-colors duration-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center justify-between">
                  <span>{suggestion.name}</span>
                  <span className="text-white/60 text-sm">
                    {suggestion.country}
                  </span>
                </div>
                {suggestion.state && (
                  <span className="text-white/60 text-sm">{suggestion.state}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
