/**
 * Popover Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive popover component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type PopoverSize = 'small' | 'medium' | 'large';
export type PopoverVariant = 'filled' | 'outlined' | 'ghost';
export type PopoverStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type PopoverState = 'default' | 'hover' | 'pressed' | 'disabled';
export type PopoverPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type PopoverSizeConfig = {
  [key in PopoverSize]: {
    minWidth: string;
    maxWidth: string;
    fontSize: {
      title: string;
      content: string;
    };
    lineHeight: {
      title: string;
      content: string;
    };
    iconSize: string;
    spacing: {
      icon: string;       // 아이콘과 텍스트 간격
      title: string;      // 제목과 콘텐츠 간격
      content: string;    // 콘텐츠 내부 간격
      arrow: string;      // 화살표 간격
    };
    padding: {
      header: {
        horizontal: string;
        vertical: string;
      };
      content: {
        horizontal: string;
        vertical: string;
      };
      footer: {
        horizontal: string;
        vertical: string;
      };
    };
    borderRadius: string;
    borderWidth: string;
    arrow: {
      size: string;
      offset: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface PopoverStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface PopoverContentStyle {
  background: PopoverStateStyle;
  text: {
    title: PopoverStateStyle;
    content: PopoverStateStyle;
  };
  icon: PopoverStateStyle;
  border: PopoverStateStyle;
  shadow?: PopoverStateStyle;
}

export interface PopoverArrowStyle {
  background: PopoverStateStyle;
  border: PopoverStateStyle;
  shadow?: PopoverStateStyle;
}

export interface PopoverStyle {
  root: {
    background: PopoverStateStyle;
    border: PopoverStateStyle;
    shadow: PopoverStateStyle;
  };
  content: {
    default: PopoverContentStyle;   // 기본 상태
    info: PopoverContentStyle;      // 정보 상태
    success: PopoverContentStyle;   // 성공 상태
    warning: PopoverContentStyle;   // 경고 상태
    error: PopoverContentStyle;     // 에러 상태
  };
  arrow: PopoverArrowStyle;
  overlay: {
    background: PopoverStateStyle;
    blur?: {
      enabled: boolean;
      amount: string;
    };
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type PopoverStyles = {
  [key in PopoverVariant]: PopoverStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface PopoverIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface PopoverTitleProps {
  text: string;
  icon?: PopoverIconProps;
  align?: 'start' | 'center' | 'end';
}

export interface PopoverContentProps {
  title?: PopoverTitleProps;
  description?: string;
  html?: boolean;        // HTML 콘텐츠 허용 여부
  markdown?: boolean;    // 마크다운 콘텐츠 허용 여부
}

export interface PopoverPositionProps {
  placement: PopoverPlacement;
  offset?: {
    mainAxis?: number;  // 주축 오프셋
    crossAxis?: number; // 교차축 오프셋
    alignmentAxis?: number; // 정렬축 오프셋
  };
  flip?: {
    enabled?: boolean;
    fallbackPlacements?: PopoverPlacement[];
    boundary?: 'clippingParents' | 'viewport' | Element;
    padding?: number;
  };
  shift?: {
    enabled?: boolean;
    padding?: number;
  };
  arrow?: {
    enabled?: boolean;
    padding?: number;
  };
}

export interface PopoverAnimationProps {
  enabled?: boolean;
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface PopoverInteractionProps {
  trigger?: PopoverTrigger;
  openDelay?: number;
  closeDelay?: number;
  hideOnClick?: boolean;
  hideOnEsc?: boolean;
  hideOnLeave?: boolean;
  preventOverflow?: boolean;
  closeOnBlur?: boolean;
  focusTrap?: boolean;
  returnFocus?: boolean;
}

export interface PopoverVariantProps {
  size?: PopoverSize;
  variant?: PopoverVariant;
  status?: PopoverStatus;
  state?: PopoverState;
  content?: PopoverContentProps;
  position?: PopoverPositionProps;
  animation?: PopoverAnimationProps;
  interaction?: PopoverInteractionProps;
  closable?: boolean;
  backdrop?: boolean;
  zIndex?: number;
  ariaLabel?: string;
  role?: string;
}

export interface PopoverInstance {
  status: PopoverStatus;
  state: PopoverState;
  content: PopoverContentProps;
  position: PopoverPositionProps;
  interaction: PopoverInteractionProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreatePopoverOptions {
  variants?: PopoverVariant[];
} 