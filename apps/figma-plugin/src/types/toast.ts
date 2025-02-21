/**
 * Toast Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive toast component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ToastSize = 'small' | 'medium' | 'large';
export type ToastVariant = 'filled' | 'outlined' | 'ghost';
export type ToastStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type ToastState = 'default' | 'hover' | 'pressed';
export type ToastPosition = 
  | 'top-left' | 'top' | 'top-right'
  | 'bottom-left' | 'bottom' | 'bottom-right';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ToastSizeConfig = {
  [key in ToastSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      icon: string;       // 아이콘과 텍스트 간격
      action: string;     // 액션 버튼 간격
      group: string;      // 토스트 그룹 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    borderRadius: string;
    borderWidth: string;
    minWidth: string;
    maxWidth: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ToastStateStyle {
  default: string;
  hover: string;
  pressed: string;
}

export interface ToastContentStyle {
  background: ToastStateStyle;
  text: ToastStateStyle;
  icon: ToastStateStyle;
  border: ToastStateStyle;
  shadow?: ToastStateStyle;
}

export interface ToastActionStyle {
  background: ToastStateStyle;
  text: ToastStateStyle;
  icon: ToastStateStyle;
  border: ToastStateStyle;
}

export interface ToastStyle {
  root: {
    background: ToastStateStyle;
    border: ToastStateStyle;
    shadow: ToastStateStyle;
  };
  content: {
    default: ToastContentStyle;   // 기본 상태
    info: ToastContentStyle;      // 정보 상태
    success: ToastContentStyle;   // 성공 상태
    warning: ToastContentStyle;   // 경고 상태
    error: ToastContentStyle;     // 에러 상태
  };
  action: ToastActionStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type ToastStyles = {
  [key in ToastVariant]: ToastStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ToastIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface ToastActionProps {
  label: string;
  icon?: ToastIconProps;
  onClick?: () => void;
}

export interface ToastPositionProps {
  position: ToastPosition;
  offset?: {
    x?: number;
    y?: number;
  };
  gap?: number;
  zIndex?: number;
}

export interface ToastAnimationProps {
  enter?: {
    duration?: number;
    timing?: string;
    properties?: string[];
  };
  exit?: {
    duration?: number;
    timing?: string;
    properties?: string[];
  };
}

export interface ToastDurationProps {
  duration?: number;        // 자동 닫힘 시간 (ms)
  pauseOnHover?: boolean;  // 호버시 타이머 일시정지
  resumeOnLeave?: boolean; // 호버 해제시 타이머 재개
}

export interface ToastProgressProps {
  show?: boolean;
  position?: 'top' | 'bottom';
  color?: string;
  height?: number;
}

export interface ToastVariantProps {
  size?: ToastSize;
  variant?: ToastVariant;
  status?: ToastStatus;
  state?: ToastState;
  title?: string;
  description?: string;
  icon?: ToastIconProps;
  action?: ToastActionProps;
  position?: ToastPositionProps;
  animation?: ToastAnimationProps;
  duration?: ToastDurationProps;
  progress?: ToastProgressProps;
  closable?: boolean;
  closeOnClick?: boolean;
  preserveOnHover?: boolean;
  maxCount?: number;
  ariaLabel?: string;
  role?: string;
}

export interface ToastInstance {
  id: string;
  status: ToastStatus;
  state: ToastState;
  position: ToastPosition;
  duration?: ToastDurationProps;
  progress?: ToastProgressProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateToastOptions {
  variants?: ToastVariant[];
} 