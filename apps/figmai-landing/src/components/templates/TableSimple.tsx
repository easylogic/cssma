import React from 'react';

interface TableData {
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
}

interface TableSimpleProps {
  data?: TableData[];
  headers?: string[];
}

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export default function TableSimple({ 
  headers = ['Name', 'Email', 'Status'],
  data = [
    { name: 'John Doe', email: 'john@example.com', status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'pending' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive' },
  ]
}: TableSimpleProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full max-w-2xl">
      {/* Header */}
      <div className="flex flex-row bg-gray-50 border-b border-gray-200">
        {headers.map((header, index) => (
          <div 
            key={index}
            className={`flex items-center px-4 py-3 flex-1 ${
              index < headers.length - 1 ? 'border-r border-gray-200' : ''
            }`}
          >
            <span className="text-sm font-semibold text-gray-900">
              {header}
            </span>
          </div>
        ))}
      </div>
      
      {/* Body */}
      <div className="flex flex-col">
        {data.map((row, index) => (
          <div 
            key={index}
            className="flex flex-row border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center px-4 py-3 flex-1 border-r border-gray-200">
              <span className="text-sm text-gray-900">{row.name}</span>
            </div>
            <div className="flex items-center px-4 py-3 flex-1 border-r border-gray-200">
              <span className="text-sm text-gray-600">{row.email}</span>
            </div>
            <div className="flex items-center px-4 py-3 flex-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
                {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 