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
export type TagStatus = 'default' | 'primary' | 'neutral' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
export type TagShape = 'rounded' | 'circular';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type TagSizeConfig = {
  [key in TagSize]: {
    // 기본 크기
    height: string;
    fontSize: string;
    lineHeight: string;

    // 아이콘
    iconSize: string;

    // 간격
    paddingHorizontal: string;
    paddingVertical: string;
    spacing: string;

    // 테두리
    borderWidth: string;
    borderRadius: {
      rounded: string;
      circular: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface TagStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  border: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  icon: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type TagStyleConfig = {
  [key in TagVariant]: {
    [key in TagStatus]: TagStyle;
  };
};

export type TagStyles = {
  [key: string]: TagStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface TagVariantProps {
  size?: TagSize;
  variant?: TagVariant;
  status?: TagStatus;
  shape?: TagShape;
  icon?: string;
  label?: string;
  removable?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface TagInstance {
  text?: string;
  icon?: string;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateTagOptions {
  variants?: TagVariant[];
} 