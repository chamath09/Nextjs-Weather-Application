import { ForecastDay } from '@/types/weather';
import { format, parseISO } from 'date-fns';
import Image from 'next/image'; // Add this import

interface ForecastSectionProps {
  data: ForecastDay[];
  days: number;
  onChangeDays: (days: number) => void;
}

export default function ForecastSection({ data, days, onChangeDays }: ForecastSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-[#222] rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Forecast</h3>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onChangeDays(3)}
            className={`px-3 py-1 rounded-full text-sm ${
              days === 3 ? 'bg-[#333]' : 'text-gray-400'
            }`}
          >
            3 days
          </button>
          <button 
            onClick={() => onChangeDays(10)}
            className={`px-3 py-1 rounded-full text-sm ${
              days === 10 ? 'bg-[#333]' : 'text-gray-400'
            }`}
          >
            10 days
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {data.slice(0, days).map((day, index) => {
          const date = parseISO(day.date);
          return (
            <div key={index} className="bg-[#2a2a2a] rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="text-lg font-medium">+{Math.round(day.day.maxtemp_c)}°</p>
                    <p className="text-sm text-gray-400">/ +{Math.round(day.day.mintemp_c)}°</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-medium">{index === 0 ? '16' : index === 1 ? '17' : '18'}</p>
                  <p className="text-sm text-gray-400">
                    {format(date, 'MMM')}, {format(date, 'EEE')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}