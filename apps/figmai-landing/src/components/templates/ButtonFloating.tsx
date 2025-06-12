import React from 'react';

interface ButtonFloatingProps {
  icon?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'w-12 h-12 text-sm',
  md: 'w-14 h-14 text-lg',
  lg: 'w-16 h-16 text-xl',
};

export default function ButtonFloating({ 
  icon = '+',
  onClick,
  size = 'md'
}: ButtonFloatingProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${sizeStyles[size]}`}
    >
      {icon}
    </button>
  );
} 