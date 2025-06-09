import React from 'react';

interface CardFeatureProps {
  icon?: string;
  title?: string;
  description?: string;
  iconBg?: string;
}

export default function CardFeature({ 
  icon = '🚀',
  title = 'Feature Title',
  description = 'Feature description goes here. This explains what this feature does.',
  iconBg = 'bg-blue-100'
}: CardFeatureProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${iconBg} text-2xl`}>
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
} 