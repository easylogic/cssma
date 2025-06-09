import { useState, useEffect, useCallback, useMemo } from 'react';
import { Template, TemplateFilter } from '@/types/template';

interface UseTemplatesParams {
  filter?: TemplateFilter;
  searchQuery?: string;
  page?: number;
  limit?: number;
  sortBy?: 'popular' | 'newest' | 'name' | 'complexity';
}

interface TemplatesResponse {
  templates: Template[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters?: Record<string, unknown>;
}

export function useTemplates(params: UseTemplatesParams = {}) {
  const [data, setData] = useState<TemplatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Serialize params to avoid dependency issues
  const serializedParams = useMemo(() => JSON.stringify(params), [params]);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      
      if (params.filter?.category) {
        searchParams.set('category', params.filter.category);
      }
      
      if (params.filter?.complexity) {
        searchParams.set('complexity', params.filter.complexity);
      }
      
      if (params.filter?.tags && params.filter.tags.length > 0) {
        searchParams.set('tags', params.filter.tags.join(','));
      }
      
      if (params.filter?.rating) {
        searchParams.set('rating', params.filter.rating.toString());
      }
      
      if (params.filter?.featured) {
        searchParams.set('featured', 'true');
      }
      
      if (params.filter?.favorites) {
        searchParams.set('favorites', 'true');
      }
      
      if (params.filter?.usageRange) {
        if (params.filter.usageRange.min) {
          searchParams.set('usageMin', params.filter.usageRange.min.toString());
        }
        if (params.filter.usageRange.max) {
          searchParams.set('usageMax', params.filter.usageRange.max.toString());
        }
      }
      
      if (params.searchQuery) {
        searchParams.set('search', params.searchQuery);
      }
      
      if (params.page) {
        searchParams.set('page', params.page.toString());
      }
      
      if (params.limit) {
        searchParams.set('limit', params.limit.toString());
      }
      
      if (params.sortBy) {
        searchParams.set('sortBy', params.sortBy);
      }

      const response = await fetch(`/api/templates?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [serializedParams]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const refetch = useCallback(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates: data?.templates || [],
    pagination: data?.pagination,
    loading,
    error,
    refetch
  };
}

export function useFeaturedTemplates() {
  const [featuredFilter] = useState({ featured: true });
  
  return useTemplates({
    filter: featuredFilter,
    limit: 6
  });
}

export function useTemplate(id: string) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [relatedTemplates, setRelatedTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplate() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/templates/${id}`);
        
        if (!response.ok) {
          throw new Error('Template not found');
        }

        const result = await response.json();
        setTemplate(result.template);
        setRelatedTemplates(result.relatedTemplates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTemplate();
    }
  }, [id]);

  const incrementUsage = useCallback(async () => {
    try {
      await fetch(`/api/templates/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'increment_usage' }),
      });
    } catch (err) {
      console.error('Failed to increment usage:', err);
    }
  }, [id]);

  return {
    template,
    relatedTemplates,
    loading,
    error,
    incrementUsage
  };
} 