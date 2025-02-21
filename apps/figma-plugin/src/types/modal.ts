/**
 * Modal Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive modal component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ModalSize = 'small' | 'medium' | 'large';
export type ModalVariant = 'filled' | 'outlined' | 'ghost';
export type ModalStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type ModalState = 'default' | 'hover' | 'pressed' | 'disabled';
export type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ModalSizeConfig = {
  [key in ModalSize]: {
    width: string;
    minHeight: string;
    maxHeight?: string;
    spacing: {
      header: string;    // 헤더 내부 간격
      content: string;   // 콘텐츠 내부 간격
      footer: string;    // 푸터 내부 간격
      section: string;   // 섹션 간 간격
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
    borderRadius: {
      outer: string;     // 모달 전체 테두리
      inner: string;     // 내부 요소 테두리
    };
    borderWidth: string;
    elevation: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ModalStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface ModalContentStyle {
  background: ModalStateStyle;
  text: ModalStateStyle;
  border: ModalStateStyle;
  shadow?: ModalStateStyle;
}

export interface ModalHeaderStyle extends ModalContentStyle {
  title: ModalStateStyle;
  subtitle?: ModalStateStyle;
  close: {
    background: ModalStateStyle;
    icon: ModalStateStyle;
    border: ModalStateStyle;
  };
}

export interface ModalFooterStyle extends ModalContentStyle {
  divider: ModalStateStyle;
  button: {
    primary: ModalStateStyle;
    secondary: ModalStateStyle;
  };
}

export interface ModalOverlayStyle {
  background: ModalStateStyle;
  blur?: {
    enabled: boolean;
    amount: string;
  };
}

export interface ModalStyle {
  root: {
    background: ModalStateStyle;
    border: ModalStateStyle;
    shadow: ModalStateStyle;
  };
  overlay: ModalOverlayStyle;
  header: ModalHeaderStyle;
  content: ModalContentStyle;
  footer: ModalFooterStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type ModalStyles = {
  [key in ModalVariant]: {
    [key in ModalStatus]: ModalStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ModalIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: ModalIconProps;
  extra?: React.ReactNode;
  divider?: boolean;
  closeButton?: boolean;
  closeIcon?: ModalIconProps;
}

export interface ModalFooterProps {
  divider?: boolean;
  actions?: React.ReactNode[];
  extra?: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'space-between';
}

export interface ModalOverlayProps {
  visible?: boolean;
  blur?: boolean;
  blurAmount?: number;
  color?: string;
  opacity?: number;
  onClick?: () => void;
}

export interface ModalAnimationProps {
  enabled?: boolean;
  duration?: number;
  timing?: string;
  properties?: string[];
  custom?: {
    enter?: string;
    exit?: string;
  };
}

export interface ModalPositionProps {
  type: ModalPosition;
  offset?: {
    x?: number;
    y?: number;
  };
  align?: 'start' | 'center' | 'end';
}

export interface ModalVariantProps {
  size?: ModalSize;
  variant?: ModalVariant;
  status?: ModalStatus;
  state?: ModalState;
  header?: ModalHeaderProps;
  footer?: ModalFooterProps;
  overlay?: ModalOverlayProps;
  position?: ModalPositionProps;
  animation?: ModalAnimationProps;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  closable?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  destroyOnClose?: boolean;
  focusTrap?: boolean;
  keyboard?: boolean;
  zIndex?: number;
  disabled?: boolean;
  loading?: boolean;
  centered?: boolean;
  scrollable?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  ariaLabel?: string;
  role?: string;
}

export interface ModalInstance {
  visible: boolean;
  status: ModalStatus;
  state: ModalState;
  position?: ModalPositionProps;
  animation?: ModalAnimationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateModalOptions {
  variants?: ModalVariant[];
} 