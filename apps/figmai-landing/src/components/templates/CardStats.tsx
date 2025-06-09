import React from 'react';

interface CardStatsProps {
  value?: string;
  label?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export default function CardStats({ 
  value = '2,543',
  label = 'Total Users',
  change = '+12.5%',
  changeType = 'positive',
  icon = '👥'
}: CardStatsProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm font-medium ${changeColor[changeType]}`}>
            {change}
          </p>
        </div>
        <div className="text-3xl opacity-50">
          {icon}
        </div>
      </div>
    </div>
  );
} 