import { HourForecast } from '@/types/weather';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HourlyForecastProps {
  data: HourForecast[];
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  const [filteredData, setFilteredData] = useState<HourForecast[]>([]);
  
  useEffect(() => {
    // Move time-dependent filtering to client-side only
    const currentHour = new Date().getHours();
    const filtered = data.filter((hour) => {
      const hourTime = new Date(hour.time);
      return hourTime.getHours() >= currentHour || hourTime.getDate() > new Date().getDate();
    }).slice(0, 10); // Limit to 10 hours
    
    setFilteredData(filtered);
  }, [data]);
  
  // Simple format function to avoid date-fns dependency
  const formatHour = (dateStr: string) => {
    const date = new Date(dateStr);
    const hours = date.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12;
    return `${hour12 < 10 ? '0' : ''}${hour12} ${ampm}`;
  };
  
  return (
    <div className="bg-[#222] rounded-3xl p-4 overflow-x-auto">
      <div className="flex space-x-2 min-w-max">
        {filteredData.map((hour, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center p-3 rounded-2xl min-w-[70px] ${
              index === 0 ? 'bg-[#333]' : ''
            }`}
          >
            <p className="text-sm text-gray-400">{formatHour(hour.time)}</p>
            <div className="my-2">
              <Image
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <p className="text-lg font-medium">{Math.round(hour.temp_c)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}