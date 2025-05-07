import { HourForecast } from '@/types/weather';
import { format, parseISO } from 'date-fns';
import Image from 'next/image'; // Add this import

interface HourlyForecastProps {
  data: HourForecast[];
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  // Filter data to show only future hours
  const currentHour = new Date().getHours();
  const filteredData = data.filter((hour) => {
    const hourTime = new Date(hour.time);
    return hourTime.getHours() >= currentHour || hourTime.getDate() > new Date().getDate();
  }).slice(0, 10); // Limit to 10 hours
  
  return (
    <div className="bg-[#222] rounded-3xl p-4 overflow-x-auto">
      <div className="flex space-x-2 min-w-max">
        {filteredData.map((hour, index) => {
          const hourTime = new Date(hour.time);
          return (
            <div 
              key={index} 
              className={`flex flex-col items-center p-3 rounded-2xl min-w-[70px] ${
                index === 0 ? 'bg-[#333]' : ''
              }`}
            >
              <p className="text-sm text-gray-400">{format(hourTime, 'HH')} {format(hourTime, 'a').toLowerCase()}</p>
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
          );
        })}
      </div>
    </div>
  );
}