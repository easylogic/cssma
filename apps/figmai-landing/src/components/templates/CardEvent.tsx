import React from 'react';

interface CardEventProps {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
  attendees?: number;
  onJoin?: () => void;
}

export default function CardEvent({ 
  title = 'Tech Conference 2024',
  date = 'Jan 15, 2024',
  time = '9:00 AM',
  location = 'San Francisco, CA',
  description = 'Join us for an amazing tech conference with industry leaders.',
  attendees = 150,
  onJoin
}: CardEventProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">📅</span>
              <span>{date} at {time}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">👥</span>
              <span>{attendees} attending</span>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      <button
        onClick={onJoin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
      >
        Join Event
      </button>
    </div>
  );
} 