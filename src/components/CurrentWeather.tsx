import { WeatherData } from '@/types/weather';
import Image from 'next/image'; // Keep this import

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const { location, current } = data;
  
  return (
    <div className="bg-[#222]/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start w-full">
          <div className="mb-2 sm:mb-0 sm:mr-6">
            <Image
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
          
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">{location.name}</h2>
            <p className="text-gray-400">{location.country}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 w-full md:w-auto mt-2 md:mt-0">
          <div className="text-center min-w-[80px]">
            <p className="text-3xl sm:text-4xl font-bold">+{Math.round(current.temp_c)}°</p>
            <p className="text-xs sm:text-sm text-gray-400">Temperature</p>
          </div>
          
          <div className="text-center min-w-[80px]">
            <p className="text-3xl sm:text-4xl font-bold">{current.humidity}%</p>
            <p className="text-xs sm:text-sm text-gray-400">Humidity</p>
          </div>
          
          <div className="text-center min-w-[80px]">
            <p className="text-3xl sm:text-4xl font-bold">{current.wind_kph}<span className="text-sm sm:text-lg">km/h</span></p>
            <p className="text-xs sm:text-sm text-gray-400">Wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}