import React from 'react';

interface CardTestimonialProps {
  quote?: string;
  author?: string;
  title?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export default function CardTestimonial({ 
  quote = "This product has transformed our workflow completely. Highly recommended!",
  author = 'John Doe',
  title = 'CEO',
  company = 'TechCorp',
  avatar = '👤',
  rating = 5
}: CardTestimonialProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
      
      <blockquote className="text-gray-700 italic">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center">
        <div className="text-2xl mr-3">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">{title} at {company}</p>
        </div>
      </div>
    </div>
  );
} 