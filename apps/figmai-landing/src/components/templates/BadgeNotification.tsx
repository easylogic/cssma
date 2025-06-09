import React from 'react';

interface BadgeNotificationProps {
  count?: number;
  icon?: string;
  maxCount?: number;
}

export default function BadgeNotification({ 
  count = 3,
  icon = '🔔',
  maxCount = 99
}: BadgeNotificationProps) {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  
  return (
    <div className="relative inline-flex">
      <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
        <span className="text-sm">{icon}</span>
      </div>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full px-1">
          {displayCount}
        </span>
      )}
    </div>
  );
} 