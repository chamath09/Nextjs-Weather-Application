import { WeatherData } from '@/types/weather';
import { useState } from 'react';
import HumidityGraph from './HumidityGraph';

interface WeatherOverviewProps {
  data: WeatherData;
}

export default function WeatherOverview({ data }: WeatherOverviewProps) {
  const [activeTab, setActiveTab] = useState<'humidity' | 'uv' | 'rainfall' | 'pressure'>('humidity');
  
  return (
    <div className="bg-[#222] rounded-3xl p-6">
      <h3 className="text-xl font-bold mb-4">Overview</h3>
      
      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setActiveTab('humidity')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'humidity' ? 'bg-[#333]' : 'text-gray-400'
          }`}
        >
          Humidity
        </button>
        <button 
          onClick={() => setActiveTab('uv')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'uv' ? 'bg-[#333]' : 'text-gray-400'
          }`}
        >
          UV Index
        </button>
        <button 
          onClick={() => setActiveTab('rainfall')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'rainfall' ? 'bg-[#333]' : 'text-gray-400'
          }`}
        >
          Rainfall
        </button>
        <button 
          onClick={() => setActiveTab('pressure')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'pressure' ? 'bg-[#333]' : 'text-gray-400'
          }`}
        >
          Pressure
        </button>
      </div>
      
      {activeTab === 'humidity' && (
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-[#333] rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-400">Average {data.current.humidity}%</p>
          </div>
          
          <div className="h-64 relative">
            {/* Replace placeholder with actual graph */}
            <HumidityGraph humidity={data.current.humidity} />
            
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 pointer-events-none">
              <span>100%</span>
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
              <span>20%</span>
              <span>0%</span>
            </div>
            
            <div className="absolute left-6 right-0 bottom-0 flex justify-between text-xs text-gray-400 pointer-events-none">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      )}
      
      {activeTab !== 'humidity' && (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">This tab is not implemented in the demo</p>
        </div>
      )}
    </div>
  );
}