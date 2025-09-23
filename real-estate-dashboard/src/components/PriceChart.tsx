import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Property } from '../types/Property';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceChartProps {
  property: Property;
}

const PriceChart: React.FC<PriceChartProps> = ({ property }) => {
  // Generate mock historical data for demonstration
  const generatePriceHistory = (currentPrice: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const prices = [];
    let basePrice = currentPrice * 0.85; // Start 15% lower
    
    for (let i = 0; i < months.length; i++) {
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      basePrice = basePrice * (1 + variation);
      prices.push(Math.round(basePrice));
    }
    
    // Ensure the last price matches current price
    prices[prices.length - 1] = currentPrice;
    
    return { months, prices };
  };

  const { months, prices } = generatePriceHistory(property.price);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Price History',
        data: prices,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `Price: $${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PriceChart;
