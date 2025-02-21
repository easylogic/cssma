/**
 * Badge Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive badge component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeVariant = 'filled' | 'outlined' | 'ghost';
export type BadgeStatus = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
export type BadgeState = 'default' | 'hover' | 'pressed' | 'disabled';
export type BadgeShape = 'rounded' | 'circular' | 'square';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type BadgeSizeConfig = {
  [key in BadgeSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      content: string;  // 아이콘/텍스트 간격
      standalone: string; // 독립형 뱃지 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    offset: {
      x: string;
      y: string;
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

export interface BadgeStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface BadgeContentStyle {
  background: BadgeStateStyle;
  text: BadgeStateStyle;
  icon: BadgeStateStyle;
  border: BadgeStateStyle;
  shadow?: BadgeStateStyle;
}

export interface BadgeStyle {
  root: {
    background: BadgeStateStyle;
    border: BadgeStateStyle;
    shadow?: BadgeStateStyle;
  };
  content: {
    default: BadgeContentStyle;   // 기본 상태
    dot: BadgeContentStyle;       // 점 형태
    count: BadgeContentStyle;     // 숫자 형태
    text: BadgeContentStyle;      // 텍스트 형태
  };
  wrapper: {
    spacing: {
      default: string;
      compact: string;
      loose: string;
    };
    offset: {
      default: string;
      custom: string;
    };
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type BadgeStyles = {
  [key in BadgeVariant]: {
    [key in BadgeStatus]: BadgeStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface BadgeIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface BadgeCountProps {
  value: number;
  maxCount?: number;
  showZero?: boolean;
  overflowCount?: number;
  formatter?: (value: number) => string;
}

export interface BadgeTextProps {
  content: string;
  truncate?: boolean;
  maxWidth?: number;
}

export interface BadgeOffsetProps {
  x?: number;
  y?: number;
}

export interface BadgeAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface BadgeWrapperProps {
  spacing?: 'default' | 'compact' | 'loose';
  offset?: BadgeOffsetProps;
}

export interface BadgeVariantProps {
  size?: BadgeSize;
  variant?: BadgeVariant;
  status?: BadgeStatus;
  state?: BadgeState;
  shape?: BadgeShape;
  position?: BadgePosition;
  icon?: BadgeIconProps;
  count?: BadgeCountProps;
  text?: BadgeTextProps;
  dot?: boolean;
  standalone?: boolean;
  wrapper?: BadgeWrapperProps;
  animation?: BadgeAnimationProps;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface BadgeInstance {
  status: BadgeStatus;
  state: BadgeState;
  count?: BadgeCountProps;
  text?: BadgeTextProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateBadgeOptions {
  variants?: BadgeVariant[];
} 