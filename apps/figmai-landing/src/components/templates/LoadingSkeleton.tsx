import React from 'react';

interface LoadingSkeletonProps {
  lines?: number;
  avatar?: boolean;
  actions?: boolean;
}

export default function LoadingSkeleton({ 
  lines = 3,
  avatar = true,
  actions = true
}: LoadingSkeletonProps) {
  return (
    <div className="animate-pulse p-4 bg-white rounded-lg border border-gray-200 w-80">
      {avatar && (
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>
      )}
      
      <div className="space-y-2 mb-4">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={`h-3 bg-gray-200 rounded ${
              i === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
      
      {actions && (
        <div className="flex gap-2 justify-end">
          <div className="w-16 h-8 bg-gray-200 rounded" />
          <div className="w-20 h-8 bg-gray-200 rounded" />
        </div>
      )}
    </div>
  );
} 