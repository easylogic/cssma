import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray' | 'white';
}

const sizeStyles = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-4', 
  lg: 'w-12 h-12 border-4',
};

const colorStyles = {
  blue: 'border-gray-200 border-t-blue-600',
  gray: 'border-gray-200 border-t-gray-600',
  white: 'border-gray-400 border-t-white',
};

export default function LoadingSpinner({ 
  size = 'md',
  color = 'blue'
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full animate-spin`} />
    </div>
  );
} 