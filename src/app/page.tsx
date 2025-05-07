'use client';

import React, { useState, useEffect } from 'react';
// We'll use native Date methods instead of date-fns until it's installed
// Remove or comment out the unused import
// import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherOverview from '@/components/WeatherOverview';
import ForecastSection from '@/components/ForecastSection';
import OtherCities from '@/components/OtherCities';
import SubscribeCard from '@/components/SubscribeCard';
import VideoBackground from '@/components/VideoBackground';
import { WeatherData } from '@/types/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [forecastDays, setForecastDays] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  // Change this line to directly use rain.mp4
  const [backgroundVideo, setBackgroundVideo] = useState<string>('/videos/rain.mp4');

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  useEffect(() => {
    // Default location on first load
    handleSearch('Berlin');
    
    // Set up clock
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };
    
    // Update clock immediately and then every second
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    // Update background video based on weather condition
    if (weatherData?.current?.condition?.text) {
      const condition = weatherData.current.condition.text.toLowerCase();
      const isDay = weatherData.current.is_day === 1;
      
      if (condition.includes('rain') || condition.includes('drizzle')) {
        setBackgroundVideo('/videos/rainy.mp4');
      } else if (condition.includes('snow')) {
        setBackgroundVideo('/videos/snowy.mp4');
      } else if (condition.includes('cloud')) {
        setBackgroundVideo(isDay ? '/videos/cloudy-day.mp4' : '/videos/cloudy-night.mp4');
      } else if (condition.includes('thunder') || condition.includes('storm')) {
        setBackgroundVideo('/videos/stormy.mp4');
      } else {
        setBackgroundVideo(isDay ? '/videos/clear-day.mp4' : '/videos/clear-night.mp4');
      }
    }
  }, [weatherData]);

  return (
    <div className="min-h-screen text-white p-4 md:p-6">
      <VideoBackground videoSrc={backgroundVideo} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center">
            <div className="mr-3 bg-blue-500 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">WeatherNow</h1>
              <div className="flex items-center">
                <p className="text-lg font-medium text-blue-400">{currentTime}</p>
                <p className="ml-3 text-gray-400">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Search city or postcode" 
                className="bg-[#2a2a2a] rounded-full py-2 px-4 pl-10 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button type="submit" className="hidden">Search</button>
            </form>
            
            <div className="flex items-center space-x-2">
              <button className="bg-[#2a2a2a] rounded-full py-1 px-3 text-sm">ENG</button>
              <button className="bg-[#2a2a2a] rounded-full py-1 px-3 text-sm">°C</button>
              <button className="bg-[#2a2a2a] rounded-full py-1 px-3 text-sm">°F</button>
            </div>
          </div>
        </div>
        
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-lg my-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeather data={weatherData} />
              <HourlyForecast data={weatherData.forecast?.forecastday[0]?.hour || []} />
              <WeatherOverview data={weatherData} />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <ForecastSection 
                data={weatherData.forecast?.forecastday || []} 
                days={forecastDays}
                onChangeDays={setForecastDays}
              />
              <OtherCities />
              <SubscribeCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}