import { useState, useEffect } from 'react';
import { TemplateCategory } from '@/types/template';

interface CategoryWithCount extends TemplateCategory {
  templateCount: number;
}

interface CategoriesResponse {
  categories: CategoryWithCount[];
  totalCategories: number;
}

export function useCategories() {
  const [data, setData] = useState<CategoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/templates/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    categories: data?.categories || [],
    totalCategories: data?.totalCategories || 0,
    loading,
    error
  };
} 