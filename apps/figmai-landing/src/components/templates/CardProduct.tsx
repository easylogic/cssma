import React from 'react';

interface CardProductProps {
  title?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
}

export default function CardProduct({ 
  title = 'Product Name', 
  description = 'Brief product description goes here',
  price = '$99.99',
  imageUrl = 'https://via.placeholder.com/280x200?text=Product'
}: CardProductProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-[280px] h-auto">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-[200px] object-cover bg-gray-200"
      />
      <div className="flex flex-col p-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {description}
        </p>
        <div className="flex flex-row justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            {price}
          </span>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
            <span className="text-sm font-medium text-white">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 