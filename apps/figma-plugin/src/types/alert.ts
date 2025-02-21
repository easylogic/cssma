/**
 * Alert Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive alert component set in Figma.
 * This type system supports:
 * - Multiple alert types and variants
 * - Rich interaction states
 * - Flexible content structure
 * - Accessibility features
 * - Animation and transition effects
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type AlertSize = 'small' | 'medium' | 'large';
export type AlertVariant = 'filled' | 'outlined' | 'ghost';
export type AlertStatus = 'info' | 'success' | 'warning' | 'error' | 'default';
export type AlertState = 'default' | 'hover' | 'pressed' | 'dismissed';
export type AlertPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'inline';
export type AlertTrigger = 'manual' | 'auto';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type AlertSizeConfig = {
  [key in AlertSize]: {
    root: {
      minWidth: string;
      maxWidth: string;
      borderRadius: string;
      borderWidth: string;
    };
    icon: {
      size: string;
      padding: string;
    };
    content: {
      title: {
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
        marginBottom: string;
      };
      description: {
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
      };
      spacing: string;
    };
    action: {
      height: string;
      minWidth: string;
      fontSize: string;
      padding: string;
      spacing: string;
      iconSize: string;
    };
    close: {
      size: string;
      padding: string;
      offset: string;
    };
    spacing: {
      icon: string;      // 아이콘과 콘텐츠 간격
      content: string;   // 콘텐츠 내부 간격
      action: string;    // 액션 버튼 간격
    };
    padding: {
      x: string;
      y: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface AlertStateStyle {
  default: string;
  hover: string;
  pressed: string;
  dismissed: string;
}

export interface AlertContentStyle {
  background: AlertStateStyle;
  border: AlertStateStyle;
  shadow?: AlertStateStyle;
  text: {
    title: AlertStateStyle;
    description: AlertStateStyle;
  };
  icon: AlertStateStyle;
}

export interface AlertActionStyle {
  background: AlertStateStyle;
  border: AlertStateStyle;
  text: AlertStateStyle;
  icon: AlertStateStyle;
}

export interface AlertStyle {
  root: {
    background: AlertStateStyle;
    border: AlertStateStyle;
    shadow?: AlertStateStyle;
  };
  content: {
    default: AlertContentStyle;
    info: AlertContentStyle;
    success: AlertContentStyle;
    warning: AlertContentStyle;
    error: AlertContentStyle;
  };
  action: {
    primary: AlertActionStyle;
    secondary: AlertActionStyle;
  };
  close: {
    background: AlertStateStyle;
    icon: AlertStateStyle;
    border: AlertStateStyle;
  };
  transition: {
    enter: {
      duration: string;
      timing: string;
      properties: string[];
    };
    exit: {
      duration: string;
      timing: string;
      properties: string[];
    };
  };
}

export type AlertStyles = {
  [key in AlertVariant]: AlertStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface AlertIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface AlertTitleProps {
  text: string;
  icon?: AlertIconProps;
  align?: 'start' | 'center' | 'end';
}

export interface AlertDescriptionProps {
  text: string;
  html?: boolean;
  markdown?: boolean;
}

export interface AlertActionProps {
  label: string;
  variant?: 'primary' | 'secondary';
  icon?: AlertIconProps;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface AlertPositionProps {
  placement: AlertPlacement;
  offset?: {
    x?: number;
    y?: number;
  };
  zIndex?: number;
  fullWidth?: boolean;
}

export interface AlertAnimationProps {
  enter?: {
    duration?: number;
    timing?: string;
    properties?: string[];
    custom?: string;
  };
  exit?: {
    duration?: number;
    timing?: string;
    properties?: string[];
    custom?: string;
  };
}

export interface AlertDismissProps {
  auto?: {
    delay: number;
    pauseOnHover?: boolean;
    resumeOnLeave?: boolean;
  };
  showCloseButton?: boolean;
  closeIcon?: AlertIconProps;
  onDismiss?: () => void;
  persistent?: boolean;
}

export interface AlertAccessibilityProps {
  role?: 'alert' | 'alertdialog' | 'status';
  live?: 'off' | 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'all' | 'additions' | 'removals' | 'text';
  ariaLabel?: string;
}

export interface AlertVariantProps {
  size?: AlertSize;
  variant?: AlertVariant;
  status?: AlertStatus;
  state?: AlertState;
  title?: string | AlertTitleProps;
  description?: string | AlertDescriptionProps;
  icon?: AlertIconProps;
  actions?: AlertActionProps[];
  position?: AlertPositionProps;
  animation?: AlertAnimationProps;
  dismiss?: AlertDismissProps;
  accessibility?: AlertAccessibilityProps;
  trigger?: AlertTrigger;
  closable?: boolean;
  elevated?: boolean;
}

export interface AlertInstance {
  id: string;
  status: AlertStatus;
  state: AlertState;
  title?: AlertTitleProps;
  description?: AlertDescriptionProps;
  position: AlertPositionProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateAlertOptions {
  variants?: AlertVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface AlertRef {
  show: () => void;
  hide: () => void;
  update: (props: Partial<AlertVariantProps>) => void;
}

export interface AlertContextValue {
  size: AlertSize;
  variant: AlertVariant;
  status: AlertStatus;
  state: AlertState;
  position: AlertPositionProps;
  dismiss?: AlertDismissProps;
}

export interface AlertGroupContextValue {
  placement: AlertPlacement;
  maxVisible?: number;
  spacing?: number;
  reverse?: boolean;
  container?: HTMLElement;
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface AlertComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface AlertGroupComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface AlertExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 