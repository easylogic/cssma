import React from 'react';

interface CardBlogProps {
  title?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readTime?: string;
  image?: string;
  category?: string;
  onRead?: () => void;
}

export default function CardBlog({ 
  title = 'How to Build Better UIs',
  excerpt = 'Learn the best practices for creating beautiful and functional user interfaces.',
  author = 'Jane Smith',
  date = 'Dec 15, 2023',
  readTime = '5 min read',
  image = '📰',
  category = 'Design',
  onRead
}: CardBlogProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
        {image}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {category}
          </span>
          <span className="text-sm text-gray-500">{readTime}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer" onClick={onRead}>
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By {author}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
} 