import React from 'react';

interface ButtonGradientProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function ButtonGradient({ children = 'Click me', onClick }: ButtonGradientProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-[140px] h-[48px]"
    >
      {children}
    </button>
  );
} 