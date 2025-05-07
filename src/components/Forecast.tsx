import { ForecastDay } from '@/types/weather';
import Image from 'next/image'; // Add this import

interface ForecastProps {
  data: ForecastDay[] | null | undefined;
}

export default function Forecast({ data }: ForecastProps) {
  // Check if data exists and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">Forecast</h3>
        <p className="text-gray-400">No forecast data available</p>
      </div>
    );
  }

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Wed';
    }
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 divide-x divide-y sm:divide-y-0 divide-gray-700">
        {data.slice(0, 7).map((day, index) => (
          <div key={index} className="p-3 sm:p-4 text-center">
            <p className="font-medium text-xs sm:text-sm mb-1 sm:mb-2">
              {getDayName(day.date)}
            </p>
            <div className="flex justify-center mb-1 sm:mb-2">
              <Image
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <p className="text-xs text-gray-400 mb-1 line-clamp-1">
              {day.day.condition.text}
            </p>
            <div className="flex justify-between text-xs sm:text-sm px-1">
              <span className="text-blue-300 font-semibold">{Math.round(day.day.mintemp_c)}°</span>
              <span className="text-white font-semibold">{Math.round(day.day.maxtemp_c)}°</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Rain: {day.day.daily_chance_of_rain}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}