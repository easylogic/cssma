/**
 * Tag Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive tag component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type TagSize = 'small' | 'medium' | 'large';
export type TagVariant = 'filled' | 'outlined' | 'ghost';
export type TagStatus = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
export type TagState = 'default' | 'hover' | 'pressed' | 'disabled';
export type TagShape = 'rounded' | 'circular' | 'square';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type TagSizeConfig = {
  [key in TagSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      content: string;  // 아이콘/텍스트 간격
      group: string;    // 태그 그룹 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    borderRadius: {
      rounded: string;
      circular: string;
      square: string;
    };
    borderWidth: string;
    minWidth: string;
    maxWidth: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface TagStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface TagContentStyle {
  background: TagStateStyle;
  text: TagStateStyle;
  icon: TagStateStyle;
  border: TagStateStyle;
  shadow?: TagStateStyle;
}

export interface TagRemoveButtonStyle {
  background: TagStateStyle;
  icon: TagStateStyle;
  border: TagStateStyle;
}

export interface TagStyle {
  root: {
    background: TagStateStyle;
    border: TagStateStyle;
    shadow?: TagStateStyle;
  };
  content: {
    default: TagContentStyle;   // 기본 상태
    selected: TagContentStyle;  // 선택된 상태
    active: TagContentStyle;    // 활성화된 상태
  };
  removeButton: TagRemoveButtonStyle;
  group: {
    spacing: {
      default: string;
      compact: string;
      loose: string;
    };
    wrap: {
      enabled: boolean;
      spacing: string;
    };
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type TagStyles = {
  [key in TagVariant]: {
    [key in TagStatus]: TagStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface TagIconProps {
  name: string;
  size?: number;
  color?: string;
  position?: 'start' | 'end';
}

export interface TagRemoveButtonProps {
  icon?: TagIconProps;
  tooltip?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

export interface TagGroupProps {
  spacing?: 'default' | 'compact' | 'loose';
  wrap?: boolean;
  wrapSpacing?: string;
  maxItems?: number;
  overflow?: 'hidden' | 'scroll' | 'ellipsis';
  direction?: 'horizontal' | 'vertical';
}

export interface TagAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface TagValidationProps {
  required?: boolean;
  pattern?: string;
  minSelected?: number;
  maxSelected?: number;
  customValidation?: (value: string) => boolean | string;
}

export interface TagVariantProps {
  size?: TagSize;
  variant?: TagVariant;
  status?: TagStatus;
  state?: TagState;
  shape?: TagShape;
  icon?: TagIconProps;
  label?: string;
  selected?: boolean;
  active?: boolean;
  removable?: boolean;
  removeButton?: TagRemoveButtonProps;
  group?: TagGroupProps;
  animation?: TagAnimationProps;
  validation?: TagValidationProps;
  interactive?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  ariaLabel?: string;
  role?: string;
}

export interface TagInstance {
  label: string;
  status: TagStatus;
  state: TagState;
  selected?: boolean;
  active?: boolean;
  validation?: TagValidationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateTagOptions {
  variants?: TagVariant[];
} 