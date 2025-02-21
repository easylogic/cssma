/**
 * Breadcrumb Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive breadcrumb component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type BreadcrumbSize = 'small' | 'medium' | 'large';
export type BreadcrumbVariant = 'filled' | 'outlined';
export type BreadcrumbStatus = 'default' | 'error';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type BreadcrumbSizeConfig = {
  [key in BreadcrumbSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      item: string;      // 아이템 간격
      icon: string;      // 아이콘과 텍스트 간격
      separator: string; // 구분자 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface BreadcrumbStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface BreadcrumbItemStyle {
  background: BreadcrumbStateStyle;
  text: BreadcrumbStateStyle;
  icon: BreadcrumbStateStyle;
  border: BreadcrumbStateStyle;
}

export interface BreadcrumbStyle {
  root: {
    background: BreadcrumbStateStyle;
    border: BreadcrumbStateStyle;
  };
  item: {
    default: BreadcrumbItemStyle;   // 일반 아이템
    current: BreadcrumbItemStyle;   // 현재 활성화된 아이템
    collapsed: BreadcrumbItemStyle; // 축소된 아이템 (...)
  };
  separator: {
    icon: BreadcrumbStateStyle;
    text: BreadcrumbStateStyle;
  };
}

export type BreadcrumbStyles = {
  [key in BreadcrumbStatus]: BreadcrumbStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface BreadcrumbIconProps {
  name: string;
  size?: number;
}

export interface BreadcrumbItem {
  text: string;
  href?: string;
  icon?: BreadcrumbIconProps;
  disabled?: boolean;
  onClick?: () => void;
}

export interface BreadcrumbSeparatorProps {
  type: 'text' | 'icon';
  content: string;
}

export interface BreadcrumbCollapseProps {
  enabled: boolean;
  maxItems?: number;
  itemsBefore?: number;
  itemsAfter?: number;
}

export interface BreadcrumbVariantProps {
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
  status?: BreadcrumbStatus;
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparatorProps;
  collapse?: BreadcrumbCollapseProps;
  ariaLabel?: string;
  role?: string;
}

export interface BreadcrumbInstance {
  items: BreadcrumbItem[];
  separator: BreadcrumbSeparatorProps;
  collapse?: BreadcrumbCollapseProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateBreadcrumbOptions {
  variants?: BreadcrumbVariant[];
} 