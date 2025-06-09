import React from 'react';

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}

interface NavBreadcrumbProps {
  items?: BreadcrumbItem[];
  onItemClick?: (item: BreadcrumbItem) => void;
}

export default function NavBreadcrumb({ 
  items = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'current', label: 'Current Project' }
  ],
  onItemClick
}: NavBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 && (
            <span className="text-gray-400">
              →
            </span>
          )}
          
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => onItemClick?.(item)}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
} 