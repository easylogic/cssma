import { useState, useEffect, useCallback } from 'react';

interface FavoritesState {
  favorites: string[];
  loading: boolean;
}

export function useFavorites() {
  const [state, setState] = useState<FavoritesState>({
    favorites: [],
    loading: true
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('figmai-favorites');
      const favorites = stored ? JSON.parse(stored) : [];
      setState({ favorites, loading: false });
    } catch (error) {
      console.error('Failed to load favorites:', error);
      setState({ favorites: [], loading: false });
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((favorites: string[]) => {
    try {
      localStorage.setItem('figmai-favorites', JSON.stringify(favorites));
      setState(prev => ({ ...prev, favorites }));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, []);

  // Add template to favorites
  const addFavorite = useCallback((templateId: string) => {
    setState(prev => {
      if (prev.favorites.includes(templateId)) {
        return prev; // Already in favorites
      }
      const newFavorites = [...prev.favorites, templateId];
      saveFavorites(newFavorites);
      return { ...prev, favorites: newFavorites };
    });
  }, [saveFavorites]);

  // Remove template from favorites
  const removeFavorite = useCallback((templateId: string) => {
    setState(prev => {
      const newFavorites = prev.favorites.filter(id => id !== templateId);
      saveFavorites(newFavorites);
      return { ...prev, favorites: newFavorites };
    });
  }, [saveFavorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback((templateId: string) => {
    setState(prev => {
      const isFavorite = prev.favorites.includes(templateId);
      const newFavorites = isFavorite
        ? prev.favorites.filter(id => id !== templateId)
        : [...prev.favorites, templateId];
      
      saveFavorites(newFavorites);
      return { ...prev, favorites: newFavorites };
    });
  }, [saveFavorites]);

  // Check if template is favorite
  const isFavorite = useCallback((templateId: string) => {
    return state.favorites.includes(templateId);
  }, [state.favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites: state.favorites,
    loading: state.loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoriteCount: state.favorites.length
  };
} 