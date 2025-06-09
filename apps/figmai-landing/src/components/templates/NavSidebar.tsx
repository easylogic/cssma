import React from 'react';

interface NavSidebarProps {
  items?: Array<{
    id: string;
    label: string;
    icon?: string;
    children?: Array<{ id: string; label: string }>;
  }>;
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

export default function NavSidebar({ 
  items = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ],
  activeItem = 'dashboard',
  onItemClick
}: NavSidebarProps) {
  return (
    <nav className="bg-gray-900 text-white w-64 h-screen p-4">
      <div className="text-xl font-bold text-center pb-6 border-b border-gray-700">
        FigmaikR
      </div>
      
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onItemClick?.(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeItem === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
            
            {item.children && activeItem === item.id && (
              <ul className="pl-8 pt-2 space-y-1">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <button
                      onClick={() => onItemClick?.(child.id)}
                      className="w-full text-left text-gray-400 hover:text-white py-1 text-sm"
                    >
                      {child.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
} 