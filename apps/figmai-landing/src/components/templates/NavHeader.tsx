import React from 'react';

interface NavHeaderProps {
  logo?: string;
  menuItems?: string[];
  ctaText?: string;
  onMenuClick?: (item: string) => void;
  onCtaClick?: () => void;
}

export default function NavHeader({ 
  logo = 'Brand',
  menuItems = ['Home', 'About', 'Services', 'Contact'],
  ctaText = 'Get Started',
  onMenuClick,
  onCtaClick
}: NavHeaderProps) {
  return (
    <nav className="flex flex-row items-center justify-between bg-white border-b border-gray-200 px-6 py-4 w-full h-[72px]">
      <div className="text-xl font-bold text-gray-900">
        {logo}
      </div>
      
      <div className="flex flex-row items-center gap-8">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onMenuClick?.(item)}
            className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
      
      <button
        onClick={onCtaClick}
        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white rounded-md transition-colors"
      >
        {ctaText}
      </button>
    </nav>
  );
} 