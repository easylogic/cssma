import React from 'react';

interface BadgeStatusProps {
  status?: 'active' | 'inactive' | 'pending' | 'success' | 'error';
  text?: string;
}

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  success: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

export default function BadgeStatus({ 
  status = 'active',
  text
}: BadgeStatusProps) {
  const displayText = text || status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {displayText}
    </span>
  );
} 