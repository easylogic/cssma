export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface TemplateAuthor {
  name: string;
  avatar?: string;
  url?: string;
}

export interface TemplateRating {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface TemplateReview {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  helpful?: number;
}

// CSSMa NodeData structure for template representation
export interface NodeData {
  type: string;
  id?: string;
  name?: string;
  styles?: string;
  text?: string;
  children?: NodeData[];
  props?: Record<string, any>;
  bind?: {
    text?: string;
    visible?: {
      property: string;
      value: string;
    };
    [key: string]: string | { property: string; value: string } | undefined;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  
  // CSSMa JSON structure for UI representation
  nodeData: NodeData;
  
  complexity: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
  author: TemplateAuthor;
  usageCount?: number;
  featured?: boolean;
  
  // Rating and review system
  rating?: TemplateRating;
  reviews?: TemplateReview[];
  
  // Additional metadata
  version?: string;
  license?: string;
  dependencies?: string[];
  preview?: {
    image?: string;
    thumbnail?: string;
  };
}

export interface TemplateFilter {
  category?: string;
  tags?: string[];
  complexity?: ('beginner' | 'intermediate' | 'advanced')[];
  featured?: boolean;
  rating?: {
    min: number;
    max: number;
  };
  usageRange?: {
    min: number;
    max: number;
  };
  author?: string;
  search?: string;
}

export interface TemplatePagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TemplateCollection {
  templates: Template[];
  categories: TemplateCategory[];
  totalCount: number;
  featuredTemplates: Template[];
} 