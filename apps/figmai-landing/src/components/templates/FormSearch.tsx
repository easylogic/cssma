import React, { useState } from 'react';

interface FormSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  showFilters?: boolean;
}

export default function FormSearch({ 
  placeholder = 'Search...',
  onSearch,
  showFilters = false
}: FormSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'relevance'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>
        
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Search
        </button>
      </div>
      
      {showFilters && (
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">All Categories</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      )}
    </form>
  );
}