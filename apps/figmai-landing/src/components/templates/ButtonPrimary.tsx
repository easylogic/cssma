import React from 'react';

interface ButtonPrimaryProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function ButtonPrimary({ children = 'Click me', onClick }: ButtonPrimaryProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-[140px] h-[48px]"
    >
      {children}
    </button>
  );
} 