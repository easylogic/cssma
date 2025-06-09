'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TemplateSearch({ value, onChange, placeholder = "Search..." }: TemplateSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localValue, onChange]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative" suppressHydrationWarning>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
      
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  );
} 