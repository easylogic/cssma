/**
 * Toggle Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive toggle component set in Figma.
 * This type system supports:
 * - Multiple toggle states and variants
 * - Rich interaction states
 * - Flexible content structure
 * - Accessibility features
 * - Animation and transition effects
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ToggleSize = 'small' | 'medium' | 'large';
export type ToggleVariant = 'filled' | 'outlined' | 'ghost';
export type ToggleStatus = 'default' | 'success' | 'error' | 'warning';
export type ToggleState = 'default' | 'hover' | 'pressed' | 'disabled';
export type ToggleLayout = 'horizontal' | 'vertical';
export type ToggleAlign = 'start' | 'center' | 'end';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ToggleSizeConfig = {
  [key in ToggleSize]: {
    track: {
      width: string;
      height: string;
      borderRadius: string;
      borderWidth: string;
    };
    thumb: {
      size: string;
      borderRadius: string;
      borderWidth: string;
      offset: string;
    };
    icon: {
      size: string;
      padding: string;
    };
    label: {
      fontSize: string;
      lineHeight: string;
      spacing: string;
    };
    spacing: {
      icon: string;      // 아이콘과 텍스트 간격
      content: string;   // 콘텐츠 내부 간격
      group: string;     // 그룹 간격
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ToggleStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface ToggleTrackStyle {
  background: {
    off: ToggleStateStyle;
    on: ToggleStateStyle;
  };
  border: {
    off: ToggleStateStyle;
    on: ToggleStateStyle;
  };
  shadow?: {
    off: ToggleStateStyle;
    on: ToggleStateStyle;
  };
}

export interface ToggleThumbStyle {
  background: {
    off: ToggleStateStyle;
    on: ToggleStateStyle;
  };
  border: {
    off: ToggleStateStyle;
    on: ToggleStateStyle;
  };
  shadow: {
    off: ToggleStateStyle;
    on: ToggleStateStyle;
  };
  transform: {
    off: string;
    on: string;
  };
}

export interface ToggleIconStyle {
  color: {
    off: ToggleStateStyle;
    on: ToggleStateStyle;
  };
  opacity: {
    off: string;
    on: string;
  };
  transform: {
    off: string;
    on: string;
  };
}

export interface ToggleLabelStyle {
  color: ToggleStateStyle;
  opacity: {
    off: string;
    on: string;
  };
}

export interface ToggleStyle {
  track: ToggleTrackStyle;
  thumb: ToggleThumbStyle;
  icon: ToggleIconStyle;
  label: ToggleLabelStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type ToggleStyles = {
  [key in ToggleVariant]: {
    [key in ToggleStatus]: ToggleStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ToggleIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface ToggleLabelProps {
  on?: string;
  off?: string;
  placement?: 'start' | 'end';
}

export interface ToggleGroupProps {
  name: string;
  value?: boolean[];
  defaultValue?: boolean[];
  onChange?: (values: boolean[]) => void;
  layout?: ToggleLayout;
  align?: ToggleAlign;
  spacing?: 'default' | 'compact' | 'loose';
}

export interface ToggleAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface ToggleValidationProps {
  required?: boolean;
  customValidation?: (value: boolean) => boolean | string;
}

export interface ToggleVariantProps {
  size?: ToggleSize;
  variant?: ToggleVariant;
  status?: ToggleStatus;
  state?: ToggleState;
  checked?: boolean;
  defaultChecked?: boolean;
  icon?: ToggleIconProps;
  label?: ToggleLabelProps;
  group?: ToggleGroupProps;
  animation?: ToggleAnimationProps;
  validation?: ToggleValidationProps;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  ariaLabel?: string;
  role?: string;
}

export interface ToggleInstance {
  checked: boolean;
  status: ToggleStatus;
  state: ToggleState;
  label?: ToggleLabelProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateToggleOptions {
  variants?: ToggleVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface ToggleRef {
  toggle: () => void;
  check: () => void;
  uncheck: () => void;
  focus: () => void;
  blur: () => void;
  isChecked: () => boolean;
  validate: () => boolean;
}

export interface ToggleContextValue {
  size: ToggleSize;
  variant: ToggleVariant;
  status: ToggleStatus;
  state: ToggleState;
  checked: boolean;
  disabled: boolean;
  validation?: ToggleValidationProps;
}

export interface ToggleGroupContextValue {
  name: string;
  layout: ToggleLayout;
  align: ToggleAlign;
  spacing: string;
  disabled: boolean;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface ToggleChangeEvent {
  checked: boolean;
  source: 'click' | 'keyboard' | 'api';
}

export interface ToggleValidateEvent {
  checked: boolean;
  valid: boolean;
  error?: string;
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface ToggleComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface ToggleGroupComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface ToggleExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 