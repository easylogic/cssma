export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  tailwindClasses: string;
  figmaStyles: FigmaStyleConfig;
  previewImage?: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
  usageCount?: number;
  featured?: boolean;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface FigmaStyleConfig {
  layout?: {
    layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE';
    primaryAxisSizingMode?: 'FIXED' | 'AUTO';
    counterAxisSizingMode?: 'FIXED' | 'AUTO';
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    itemSpacing?: number;
    width?: number;
    height?: number;
  };
  appearance?: {
    fills?: Array<{
      type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL';
      color?: { r: number; g: number; b: number };
      opacity?: number;
      gradientStops?: Array<{
        position: number;
        color: { r: number; g: number; b: number };
      }>;
    }>;
    cornerRadius?: number;
    strokeWeight?: number;
    strokes?: Array<{
      type: 'SOLID';
      color: { r: number; g: number; b: number };
      opacity?: number;
    }>;
  };
  effects?: Array<{
    type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR';
    color?: { r: number; g: number; b: number };
    offset?: { x: number; y: number };
    radius?: number;
    spread?: number;
    visible?: boolean;
  }>;
  typography?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    lineHeight?: number;
    letterSpacing?: number;
    textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT';
    textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  };
}

export interface TemplateFilter {
  category?: string;
  tags?: string[];
  complexity?: string;
  search?: string;
}

export interface TemplateCollection {
  templates: Template[];
  categories: TemplateCategory[];
  totalCount: number;
  featuredTemplates: Template[];
} 