/**
 * Callout Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive callout component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type CalloutSize = 'small' | 'medium' | 'large';
export type CalloutVariant = 'filled' | 'outlined' | 'ghost';
export type CalloutStatus = 'default' | 'info' | 'success' | 'warning' | 'error' | 'tip';
export type CalloutState = 'default' | 'hover' | 'pressed' | 'disabled';
export type CalloutIconPlacement = 'start' | 'end';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type CalloutSizeConfig = {
  [key in CalloutSize]: {
    minHeight: string;
    fontSize: {
      title: string;
      description: string;
    };
    lineHeight: {
      title: string;
      description: string;
    };
    iconSize: string;
    spacing: {
      icon: string;       // 아이콘과 텍스트 간격
      title: string;      // 제목과 설명 간격
      content: string;    // 콘텐츠 내부 간격
      action: string;     // 액션 버튼 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    borderRadius: string;
    borderWidth: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface CalloutStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface CalloutContentStyle {
  background: CalloutStateStyle;
  text: {
    title: CalloutStateStyle;
    description: CalloutStateStyle;
  };
  icon: CalloutStateStyle;
  border: CalloutStateStyle;
  shadow?: CalloutStateStyle;
}

export interface CalloutActionStyle {
  background: CalloutStateStyle;
  text: CalloutStateStyle;
  icon: CalloutStateStyle;
  border: CalloutStateStyle;
}

export interface CalloutStyle {
  root: {
    background: CalloutStateStyle;
    border: CalloutStateStyle;
    shadow?: CalloutStateStyle;
  };
  content: {
    default: CalloutContentStyle;   // 기본 상태
    info: CalloutContentStyle;      // 정보 상태
    success: CalloutContentStyle;   // 성공 상태
    warning: CalloutContentStyle;   // 경고 상태
    error: CalloutContentStyle;     // 에러 상태
    tip: CalloutContentStyle;       // 팁 상태
  };
  action: CalloutActionStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type CalloutStyles = {
  [key in CalloutVariant]: CalloutStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface CalloutIconProps {
  name: string;
  size?: number;
  color?: string;
  placement?: CalloutIconPlacement;
}

export interface CalloutActionProps {
  label: string;
  icon?: CalloutIconProps;
  onClick?: () => void;
}

export interface CalloutContentProps {
  title?: string;
  description?: string;
  icon?: CalloutIconProps;
  html?: boolean;        // HTML 콘텐츠 허용 여부
  markdown?: boolean;    // 마크다운 콘텐츠 허용 여부
}

export interface CalloutAnimationProps {
  enabled?: boolean;
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface CalloutDismissProps {
  enabled?: boolean;
  persistent?: boolean;  // 새로고침해도 유지
  storageKey?: string;   // 로컬 스토리지 키
  onDismiss?: () => void;
}

export interface CalloutVariantProps {
  size?: CalloutSize;
  variant?: CalloutVariant;
  status?: CalloutStatus;
  state?: CalloutState;
  content?: CalloutContentProps;
  action?: CalloutActionProps;
  animation?: CalloutAnimationProps;
  dismiss?: CalloutDismissProps;
  closable?: boolean;
  expanded?: boolean;
  collapsible?: boolean;
  bordered?: boolean;
  elevated?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface CalloutInstance {
  status: CalloutStatus;
  state: CalloutState;
  content: CalloutContentProps;
  dismiss?: CalloutDismissProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateCalloutOptions {
  variants?: CalloutVariant[];
} 