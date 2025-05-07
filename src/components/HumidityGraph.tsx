import { useEffect, useRef } from 'react';

interface HumidityGraphProps {
  humidity: number;
}

export default function HumidityGraph({ humidity }: HumidityGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40; // Space for labels

    // Generate mock data for yearly humidity trend
    const months = 12;
    const data = Array.from({ length: months }, (_, i) => {
      // Create a bell curve centered around May (index 4)
      const distanceFromMay = Math.abs(i - 4);
      const baseHumidity = humidity;
      const variation = Math.max(0, 30 - distanceFromMay * 5);
      return Math.min(100, Math.max(20, baseHumidity + variation - 15));
    });

    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - padding * 2) * (1 - i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw the humidity line
    ctx.strokeStyle = '#3b82f6'; // Blue color
    ctx.lineWidth = 3;
    ctx.beginPath();

    // Move to the first point
    const startX = padding;
    const startY = padding + (height - padding * 2) * (1 - data[0] / 100);
    ctx.moveTo(startX, startY);

    // Draw line to each point
    for (let i = 1; i < months; i++) {
      const x = padding + (width - padding * 2) * (i / (months - 1));
      const y = padding + (height - padding * 2) * (1 - data[i] / 100);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill area under the line
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'; // Transparent blue
    ctx.fill();

    // Draw dots at each data point
    ctx.fillStyle = '#3b82f6';
    for (let i = 0; i < months; i++) {
      const x = padding + (width - padding * 2) * (i / (months - 1));
      const y = padding + (height - padding * 2) * (1 - data[i] / 100);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw the current humidity indicator
    const currentX = padding + (width - padding * 2) * (4 / (months - 1)); // May
    const currentY = padding + (height - padding * 2) * (1 - data[4] / 100);
    
    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [humidity]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={300} 
      className="w-full h-full"
    />
  );
}