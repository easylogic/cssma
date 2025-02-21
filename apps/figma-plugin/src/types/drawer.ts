/**
 * Drawer Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive drawer component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type DrawerSize = 'small' | 'medium' | 'large' | 'custom';
export type DrawerVariant = 'filled' | 'outlined' | 'ghost';
export type DrawerStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type DrawerState = 'default' | 'hover' | 'pressed' | 'disabled';
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerLevel = 'root' | 'floating' | 'modal';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type DrawerSizeConfig = {
  [key in DrawerSize]: {
    width: string;        // left/right 배치시 사용
    height: string;       // top/bottom 배치시 사용
    minSize: string;      // 최소 크기
    maxSize?: string;     // 최대 크기
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
    borderRadius: {
      outer: string;     // 외부 테두리
      inner: string;     // 내부 요소
    };
    borderWidth: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface DrawerStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface DrawerContentStyle {
  background: DrawerStateStyle;
  text: {
    title: DrawerStateStyle;
    description: DrawerStateStyle;
  };
  icon: DrawerStateStyle;
  border: DrawerStateStyle;
  shadow?: DrawerStateStyle;
}

export interface DrawerHeaderStyle {
  background: DrawerStateStyle;
  text: DrawerStateStyle;
  icon: DrawerStateStyle;
  border: DrawerStateStyle;
  closeButton?: {
    background: DrawerStateStyle;
    icon: DrawerStateStyle;
    border: DrawerStateStyle;
  };
}

export interface DrawerFooterStyle {
  background: DrawerStateStyle;
  border: DrawerStateStyle;
  button: {
    primary: DrawerStateStyle;
    secondary: DrawerStateStyle;
  };
}

export interface DrawerStyle {
  root: {
    background: DrawerStateStyle;
    border: DrawerStateStyle;
    shadow: DrawerStateStyle;
  };
  header: DrawerHeaderStyle;
  content: {
    default: DrawerContentStyle;   // 기본 상태
    info: DrawerContentStyle;      // 정보 상태
    success: DrawerContentStyle;   // 성공 상태
    warning: DrawerContentStyle;   // 경고 상태
    error: DrawerContentStyle;     // 에러 상태
  };
  footer: DrawerFooterStyle;
  overlay: {
    background: DrawerStateStyle;
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

export type DrawerStyles = {
  [key in DrawerVariant]: DrawerStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface DrawerIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface DrawerTitleProps {
  text: string;
  icon?: DrawerIconProps;
  align?: 'start' | 'center' | 'end';
}

export interface DrawerContentProps {
  title?: DrawerTitleProps;
  description?: string;
  html?: boolean;        // HTML 콘텐츠 허용 여부
  markdown?: boolean;    // 마크다운 콘텐츠 허용 여부
  scrollable?: boolean;  // 스크롤 가능 여부
  maxHeight?: string;    // 최대 높이
}

export interface DrawerActionProps {
  label: string;
  variant?: 'primary' | 'secondary';
  icon?: DrawerIconProps;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface DrawerPositionProps {
  placement: DrawerPlacement;
  level: DrawerLevel;
  offset?: {
    x?: number;
    y?: number;
  };
  push?: {
    enabled?: boolean;   // 푸시 모드 활성화
    distance?: number;   // 푸시할 거리
    elastic?: boolean;   // 탄성 효과
  };
}

export interface DrawerResizeProps {
  enabled?: boolean;
  minSize?: number;
  maxSize?: number;
  handles?: ('left' | 'right' | 'top' | 'bottom')[];
  preserveAspectRatio?: boolean;
}

export interface DrawerAnimationProps {
  enabled?: boolean;
  duration?: number;
  timing?: string;
  properties?: string[];
  custom?: {
    enter?: string;
    exit?: string;
  };
}

export interface DrawerInteractionProps {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnBlur?: boolean;
  preventScroll?: boolean;
  trapFocus?: boolean;
  returnFocus?: boolean;
  autoFocus?: boolean | string;
  preserveScrollBarGap?: boolean;
  nested?: {
    enabled?: boolean;   // 중첩 드로어 허용
    maxLevel?: number;   // 최대 중첩 레벨
  };
}

export interface DrawerVariantProps {
  size?: DrawerSize;
  variant?: DrawerVariant;
  status?: DrawerStatus;
  state?: DrawerState;
  content?: DrawerContentProps;
  actions?: DrawerActionProps[];
  position?: DrawerPositionProps;
  resize?: DrawerResizeProps;
  animation?: DrawerAnimationProps;
  interaction?: DrawerInteractionProps;
  closable?: boolean;
  backdrop?: boolean;
  persistent?: boolean;
  destroyOnClose?: boolean;
  zIndex?: number;
  ariaLabel?: string;
  role?: string;
}

export interface DrawerInstance {
  status: DrawerStatus;
  state: DrawerState;
  content: DrawerContentProps;
  actions: DrawerActionProps[];
  position: DrawerPositionProps;
  resize: DrawerResizeProps;
  interaction: DrawerInteractionProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateDrawerOptions {
  variants?: DrawerVariant[];
} 