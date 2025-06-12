import React from 'react';

interface CardSocialProps {
  author?: string;
  handle?: string;
  content?: string;
  timestamp?: string;
  likes?: number;
  shares?: number;
  avatar?: string;
  onLike?: () => void;
  onShare?: () => void;
}

export default function CardSocial({ 
  author = 'John Doe',
  handle = '@johndoe',
  content = 'Just shipped a new feature! Excited to see how users respond to it.',
  timestamp = '2h ago',
  likes = 42,
  shares = 8,
  avatar = '👤',
  onLike,
  onShare
}: CardSocialProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{avatar}</div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{author}</span>
            <span className="text-gray-500 text-sm">{handle}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 text-sm">{timestamp}</span>
          </div>
          
          <p className="text-gray-800 leading-relaxed">
            {content}
          </p>
          
          <div className="flex items-center space-x-6 text-gray-500 text-sm">
            <button 
              onClick={onLike}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <span>❤️</span>
              <span>{likes}</span>
            </button>
            
            <button 
              onClick={onShare}
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
            >
              <span>🔄</span>
              <span>{shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 