import React from 'react';

interface CardDashboardProps {
  title?: string;
  actions?: string[];
  children?: React.ReactNode;
  onAction?: (action: string) => void;
}

export default function CardDashboard({ 
  title = 'Dashboard Widget',
  actions = ['View', 'Edit', 'Delete'],
  children,
  onAction
}: CardDashboardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => onAction?.(action)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        {children || (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl">📊</div>
            <p className="text-sm">Dashboard content goes here</p>
          </div>
        )}
      </div>
    </div>
  );
} 