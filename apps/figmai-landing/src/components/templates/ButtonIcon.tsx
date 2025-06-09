import React from 'react';

interface ButtonIconProps {
  icon?: string;
  text?: string;
  onClick?: () => void;
}

export default function ButtonIcon({ 
  icon = '★',
  text = 'Button',
  onClick
}: ButtonIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-200 w-[140px] h-[40px]"
    >
      <span className="text-sm">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
} 