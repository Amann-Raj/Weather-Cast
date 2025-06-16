# WeatherCast – Weather Dashboard

**WeatherCast** is a modern, React-based weather dashboard built with **React** and **Vite**. The app fetches real-time weather data from the **OpenWeatherMap API** to display current conditions, forecasts, and more. The interface is styled with **Tailwind CSS** for a beautiful, responsive design.

## Features

- **Smart City Search** with autocomplete suggestions
- **Current Weather Display** with temperature, conditions, and details
- **5-Day Forecast** with daily predictions
- **Hourly Forecast** breakdown for selected days
- **Unit Toggle** between Celsius and Fahrenheit
- **Responsive Design** with glassmorphism UI
- **Auto-Refresh** every 30 seconds
- **Error Handling** for invalid cities and API issues
- **Local Storage** for persisting preferences

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Weather-App
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your WeatherAPI key:
```
VITE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Technologies Used

- **React** – Frontend library for building user interfaces
- **Vite** – Fast build tool and development server
- **Tailwind CSS** – Utility-first CSS framework
- **OpenWeatherMap API** – Weather data provider
- **React Context** – State management
- **LocalStorage** – Browser storage

## Folder Structure

```
Weather-App/
├── public/
│   └── index.html
├── src/
│   ├── components/        # React components (SearchBar, WeatherDisplay, Forecast, etc.)
│   ├── context/           # React Context (e.g., WeatherContext.jsx)
│   ├── App.jsx
│   └── main.jsx
├── .env                   # Environment variables (API key)
├── vite.config.js
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 