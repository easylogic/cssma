/**
 * Dialog Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive dialog component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type DialogSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type DialogVariant = 'filled' | 'outlined' | 'ghost';
export type DialogStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type DialogState = 'default' | 'hover' | 'pressed' | 'disabled';
export type DialogPlacement = 'center' | 'top' | 'right' | 'bottom' | 'left';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type DialogSizeConfig = {
  [key in DialogSize]: {
    width: string;
    minHeight: string;
    maxHeight?: string;
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
      actions: string;    // 액션 버튼 간격
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
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface DialogStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface DialogContentStyle {
  background: DialogStateStyle;
  text: {
    title: DialogStateStyle;
    description: DialogStateStyle;
  };
  icon: DialogStateStyle;
  border: DialogStateStyle;
  shadow?: DialogStateStyle;
}

export interface DialogHeaderStyle {
  background: DialogStateStyle;
  text: DialogStateStyle;
  icon: DialogStateStyle;
  border: DialogStateStyle;
  closeButton?: {
    background: DialogStateStyle;
    icon: DialogStateStyle;
    border: DialogStateStyle;
  };
}

export interface DialogFooterStyle {
  background: DialogStateStyle;
  border: DialogStateStyle;
  button: {
    primary: DialogStateStyle;
    secondary: DialogStateStyle;
  };
}

export interface DialogStyle {
  root: {
    background: DialogStateStyle;
    border: DialogStateStyle;
    shadow: DialogStateStyle;
  };
  header: DialogHeaderStyle;
  content: {
    default: DialogContentStyle;   // 기본 상태
    info: DialogContentStyle;      // 정보 상태
    success: DialogContentStyle;   // 성공 상태
    warning: DialogContentStyle;   // 경고 상태
    error: DialogContentStyle;     // 에러 상태
  };
  footer: DialogFooterStyle;
  overlay: {
    background: DialogStateStyle;
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

export type DialogStyles = {
  [key in DialogVariant]: DialogStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface DialogIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface DialogTitleProps {
  text: string;
  icon?: DialogIconProps;
  align?: 'start' | 'center' | 'end';
}

export interface DialogContentProps {
  title?: DialogTitleProps;
  description?: string;
  html?: boolean;        // HTML 콘텐츠 허용 여부
  markdown?: boolean;    // 마크다운 콘텐츠 허용 여부
  scrollable?: boolean;  // 스크롤 가능 여부
  maxHeight?: string;    // 최대 높이
}

export interface DialogActionProps {
  label: string;
  variant?: 'primary' | 'secondary';
  icon?: DialogIconProps;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface DialogPositionProps {
  placement: DialogPlacement;
  offset?: {
    x?: number;
    y?: number;
  };
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export interface DialogAnimationProps {
  enabled?: boolean;
  duration?: number;
  timing?: string;
  properties?: string[];
  custom?: {
    enter?: string;
    exit?: string;
  };
}

export interface DialogInteractionProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnBlur?: boolean;
  preventScroll?: boolean;
  trapFocus?: boolean;
  returnFocus?: boolean;
  autoFocus?: boolean | string;
  preserveScrollBarGap?: boolean;
}

export interface DialogVariantProps {
  size?: DialogSize;
  variant?: DialogVariant;
  status?: DialogStatus;
  state?: DialogState;
  content?: DialogContentProps;
  actions?: DialogActionProps[];
  position?: DialogPositionProps;
  animation?: DialogAnimationProps;
  interaction?: DialogInteractionProps;
  closable?: boolean;
  backdrop?: boolean;
  persistent?: boolean;
  destroyOnClose?: boolean;
  zIndex?: number;
  ariaLabel?: string;
  role?: string;
}

export interface DialogInstance {
  status: DialogStatus;
  state: DialogState;
  content: DialogContentProps;
  actions: DialogActionProps[];
  position: DialogPositionProps;
  interaction: DialogInteractionProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateDialogOptions {
  variants?: DialogVariant[];
} 