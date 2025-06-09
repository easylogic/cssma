import React from 'react';

interface ButtonOutlineProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function ButtonOutline({ children = 'Click me', onClick }: ButtonOutlineProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 w-[140px] h-[48px]"
    >
      {children}
    </button>
  );
} 