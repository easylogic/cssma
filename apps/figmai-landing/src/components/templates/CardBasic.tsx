import React from 'react';

interface CardBasicProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function CardBasic({ 
  title = 'Card Title', 
  description = 'This is a basic card component with title and description.',
  imageUrl = 'https://via.placeholder.com/300x200?text=Image'
}: CardBasicProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[300px] h-[320px]">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-[160px] object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
} 