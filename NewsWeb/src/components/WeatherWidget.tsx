import { useState, useEffect } from "react";
import { fetchWeatherData, WeatherDay } from "../services/api";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [city] = useState("İzmir");

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  // Weather condition icon mapping
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return "☀️";
      case 'partly-cloudy':
        return "⛅";
      case 'cloudy':
        return "☁️";
      case 'rainy':
        return "🌧️";
      case 'stormy':
        return "⛈️";
      case 'snowy':
        return "❄️";
      default:
        return "☁️";
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-200 rounded-lg p-4 animate-pulse h-40"></div>
    );
  }

  return (
    <div className="bg-gradient-to-l from-blue-600 to-blue-950 rounded-lg text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 pt-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold">{city}</h3>
          <p className="text-sm opacity-80">Hava Durumu</p>
        </div>
      </div>

      {/* Current weather */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <span className="text-4xl mr-2">
            {getWeatherIcon(weather[0].condition)}
          </span>
          <div>
            <span className="text-5xl font-light">{weather[0].temp}°</span>
          </div>
        </div>
        <div className="text-right">
          <span className="block">{"Sıcaklık aralığı"}</span>
          <span>
            {weather[0].lowTemp}° / {weather[0].highTemp}°
          </span>
        </div>
      </div>

      {/* 5-day forecast */}
      <div className="grid grid-cols-5 bg-black bg-opacity-20 mt-2 mb-2">
        {weather.map((day) => (
          <div key={day.id} className="text-center p-2">
            <p className="text-sm">{day.day}</p>
            <p className="text-xl my-1">{getWeatherIcon(day.condition)}</p>
            <p className="text-sm">{day.temp}°</p>
            <p className="text-xs opacity-75">
              {day.lowTemp}° / {day.highTemp}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
