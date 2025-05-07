import { WeatherData } from '@/types/weather';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const { current } = data;
  const [dateString, setDateString] = useState('');
  
  useEffect(() => {
    // Move date formatting to client-side only
    setDateString(new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }));
  }, []);
  
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <Image
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
          <div>
            <div className="text-6xl font-bold">{Math.round(current.temp_c)}°<span className="text-xl font-normal">C</span></div>
            <div className="text-lg text-gray-300 mt-1">{current.condition.text}</div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 text-right">
          <div className="text-xl font-semibold">Weather</div>
          <div className="text-gray-300">
            {dateString}
          </div>
          <div className="text-blue-300 mt-1">Light thunderstorms and rain</div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Precipitation</div>
          <div className="text-lg font-semibold">{current.precip_mm ? `${current.precip_mm}mm` : '0mm'}</div>
          <div className="text-sm text-gray-400">{current.humidity}%</div>
        </div>
        
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Humidity</div>
          <div className="text-lg font-semibold">{current.humidity}%</div>
        </div>
        
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Wind</div>
          <div className="text-lg font-semibold">{current.wind_kph} km/h</div>
          <div className="text-sm text-gray-400">{current.wind_dir}</div>
        </div>
      </div>
    </div>
  );
}