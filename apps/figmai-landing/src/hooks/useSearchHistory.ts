import { useState, useEffect, useCallback } from 'react';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  resultCount?: number;
}

const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load search history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('figmai-search-history');
      const historyData = stored ? JSON.parse(stored) : [];
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to load search history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save history to localStorage
  const saveHistory = useCallback((newHistory: SearchHistoryItem[]) => {
    try {
      localStorage.setItem('figmai-search-history', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }, []);

  // Add search query to history
  const addToHistory = useCallback((query: string, resultCount?: number) => {
    if (!query.trim()) return;

    setHistory(prev => {
      // Remove existing entry if it exists
      const filtered = prev.filter(item => item.query.toLowerCase() !== query.toLowerCase());
      
      // Add new entry at the beginning
      const newHistory = [
        { query: query.trim(), timestamp: Date.now(), resultCount },
        ...filtered
      ].slice(0, MAX_HISTORY_ITEMS); // Keep only the most recent items

      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  // Remove specific item from history
  const removeFromHistory = useCallback((query: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.query !== query);
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  // Clear all search history
  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  // Get recent searches (last 5)
  const getRecentSearches = useCallback(() => {
    return history.slice(0, 5);
  }, [history]);

  // Get popular searches (most frequent)
  const getPopularSearches = useCallback(() => {
    const queryCount = history.reduce((acc, item) => {
      acc[item.query] = (acc[item.query] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(queryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([query]) => query);
  }, [history]);

  return {
    history,
    loading,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentSearches,
    getPopularSearches
  };
} 