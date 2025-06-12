import React from 'react';

interface CardPricingProps {
  title?: string;
  price?: string;
  period?: string;
  features?: string[];
  buttonText?: string;
  popular?: boolean;
  onSelect?: () => void;
}

export default function CardPricing({ 
  title = 'Pro Plan',
  price = '$29',
  period = '/month',
  features = ['Feature 1', 'Feature 2', 'Feature 3'],
  buttonText = 'Get Started',
  popular = false,
  onSelect
}: CardPricingProps) {
  return (
    <div className={`relative bg-white rounded-lg border-2 shadow-lg p-6 ${popular ? 'border-blue-600' : 'border-gray-200'}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500">{period}</span>
        </div>
      </div>
      
      <ul className="space-y-3 text-sm text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSelect}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          popular 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
} 