import React from 'react';

interface CardProfileProps {
  name?: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
}

export default function CardProfile({ 
  name = 'John Doe', 
  title = 'Senior Designer',
  bio = 'Passionate about creating beautiful and functional user experiences.',
  avatarUrl = 'https://via.placeholder.com/80x80?text=JD'
}: CardProfileProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[300px] h-auto items-center text-center">
      <div className="w-[80px] h-[80px] rounded-full bg-gray-300 overflow-hidden">
        <img 
          src={avatarUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {name}
        </h3>
        <p className="text-sm text-gray-600">
          {title}
        </p>
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          {bio}
        </p>
      </div>
      <div className="flex flex-row gap-3 w-full">
        <button className="flex items-center justify-center flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
          <span className="text-sm font-medium text-white">
            Follow
          </span>
        </button>
        <button className="flex items-center justify-center flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-sm font-medium text-gray-700">
            Message
          </span>
        </button>
      </div>
    </div>
  );
} 