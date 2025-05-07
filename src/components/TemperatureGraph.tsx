import { HourForecast } from '@/types/weather';
import { useEffect, useRef } from 'react';

interface TemperatureGraphProps {
  data: HourForecast[];
}

export default function TemperatureGraph({ data }: TemperatureGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Filter data for the next 24 hours
    const currentHour = new Date().getHours();
    const filteredData = data.slice(currentHour, currentHour + 24);
    
    // Find min and max temperatures
    const temps = filteredData.map(hour => hour.temp_c);
    const minTemp = Math.min(...temps) - 2;
    const maxTemp = Math.max(...temps) + 2;
    const tempRange = maxTemp - minTemp;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw graph
    ctx.beginPath();
    ctx.strokeStyle = '#FFCC00';
    ctx.lineWidth = 3;
    
    filteredData.forEach((hour, index) => {
      const x = (index / (filteredData.length - 1)) * canvas.width;
      const y = canvas.height - ((hour.temp_c - minTemp) / tempRange) * (canvas.height - 40);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw temperature points and labels
    filteredData.forEach((hour, index) => {
      const x = (index / (filteredData.length - 1)) * canvas.width;
      const y = canvas.height - ((hour.temp_c - minTemp) / tempRange) * (canvas.height - 40);
      
      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFCC00';
      ctx.fill();
      
      // Draw temperature label
      if (index % 3 === 0) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(hour.temp_c)}°`, x, y - 10);
        
        // Draw time label
        const hourTime = new Date(hour.time).getHours();
        ctx.fillText(`${hourTime}:00`, x, canvas.height - 5);
      }
    });
  }, [data]);
  
  if (!data || data.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Temperature</h3>
        <div className="flex space-x-4">
          <button className="text-yellow-400 border-b-2 border-yellow-400 pb-1 text-sm font-medium">Precipitation</button>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Wind</button>
        </div>
      </div>
      <div className="h-64 w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
}