'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Clock, X, TrendingUp } from 'lucide-react';
import { useSearchHistory } from '@/hooks/useSearchHistory';

interface TemplateSearchWithHistoryProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function TemplateSearchWithHistory({
  value,
  onChange,
  placeholder = "Search templates...",
  onSearch
}: TemplateSearchWithHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions] = useState([
    'button', 'card', 'form', 'navigation', 'modal', 'dropdown', 'table', 'sidebar'
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const {
    getRecentSearches,
    getPopularSearches,
    addToHistory,
    removeFromHistory
  } = useSearchHistory();

  const recentSearches = getRecentSearches();
  const popularSearches = getPopularSearches();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      addToHistory(query.trim());
      onSearch?.(query.trim());
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(value);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    handleSearch(suggestion);
  };

  const handleRemoveFromHistory = (query: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromHistory(query);
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(value.toLowerCase()) &&
      suggestion.toLowerCase() !== value.toLowerCase()
  );

  const showDropdown = isOpen && (
    value.length > 0 ? filteredSuggestions.length > 0 : 
    (recentSearches.length > 0 || popularSearches.length > 0)
  );

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {value.length > 0 ? (
            /* Search Suggestions */
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md flex items-center space-x-2"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Recent</span>
                  </div>
                  {recentSearches.map((search) => (
                    <div
                      key={search.query}
                      className="flex items-center justify-between group"
                    >
                      <button
                        onClick={() => handleSuggestionClick(search.query)}
                        className="flex-1 text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md flex items-center space-x-2"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{search.query}</span>
                        {search.resultCount !== undefined && (
                          <span className="text-xs text-gray-400">
                            ({search.resultCount} results)
                          </span>
                        )}
                      </button>
                      <button
                        onClick={(e) => handleRemoveFromHistory(search.query, e)}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded transition-opacity"
                      >
                        <X className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {popularSearches.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1 flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Popular</span>
                  </div>
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md flex items-center space-x-2"
                    >
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 