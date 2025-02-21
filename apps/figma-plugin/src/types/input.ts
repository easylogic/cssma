/**
 * Input Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive input component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'filled' | 'outlined' | 'ghost';
export type InputStatus = 'default' | 'success' | 'error' | 'warning';
export type InputState = 'default' | 'hover' | 'focused' | 'disabled';
export type InputType = 'text' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'email';
export type InputAlign = 'left' | 'center' | 'right';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type InputSizeConfig = {
  [key in InputSize]: {
  height: string;
  fontSize: string;
  lineHeight: string;
  iconSize: string;
    spacing: {
      addon: string;      // 애드온 간격
      icon: string;       // 아이콘과 텍스트 간격
      clear: string;      // 클리어 버튼 간격
      action: string;     // 액션 버튼 간격
      group: string;      // 그룹 간격
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

export interface InputStateStyle {
  default: string;
  hover: string;
  focused: string;
  disabled: string;
}

export interface InputIconStyle {
  background: InputStateStyle;
  text: InputStateStyle;
  border: InputStateStyle;
}

export interface InputAddonStyle {
  background: InputStateStyle;
  text: InputStateStyle;
  border: InputStateStyle;
}

export interface InputActionStyle {
  background: InputStateStyle;
  text: InputStateStyle;
  icon: InputStateStyle;
  border: InputStateStyle;
}

export interface InputStyle {
  root: {
    background: InputStateStyle;
    border: InputStateStyle;
    shadow?: InputStateStyle;
  };
  input: {
    text: InputStateStyle;
    placeholder: InputStateStyle;
    selection: {
      background: InputStateStyle;
      text: InputStateStyle;
    };
  };
  prefix: InputAddonStyle;
  suffix: InputAddonStyle;
  leftIcon: InputIconStyle;
  rightIcon: InputIconStyle;
  clearButton: InputActionStyle;
  actionButton: InputActionStyle;
  counter: {
    text: InputStateStyle;
    warning: InputStateStyle;
    error: InputStateStyle;
  };
  group: {
    separator: InputStateStyle;
    spacing: {
      default: string;
      compact: string;
      loose: string;
    };
  };
}

export type InputStyles = {
  [key in InputVariant]: {
    [key in InputStatus]: InputStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface InputIconProps {
  name: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

export interface InputAddonProps {
  content: string | React.ReactNode;
  icon?: InputIconProps;
}

export interface InputActionProps {
  icon?: InputIconProps;
  tooltip?: string;
  onClick?: () => void;
}

export interface InputCounterProps {
  show?: boolean;
  max?: number;
  showMax?: boolean;
  formatter?: (current: number, max?: number) => string;
}

export interface InputGroupProps {
  compact?: boolean;
  spacing?: 'default' | 'compact' | 'loose';
}

export interface InputValidationProps {
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  validate?: (value: string) => boolean | string;
}

export interface InputTransformProps {
  trim?: boolean;
  normalize?: (value: string) => string;
  format?: (value: string) => string;
  parse?: (value: string) => string;
}

export interface InputVariantProps {
  size?: InputSize;
  variant?: InputVariant;
  status?: InputStatus;
  state?: InputState;
  type?: InputType;
  align?: InputAlign;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  prefix?: InputAddonProps;
  suffix?: InputAddonProps;
  leftIcon?: InputIconProps;
  rightIcon?: InputIconProps;
  clearable?: boolean;
  clearIcon?: InputIconProps;
  action?: InputActionProps;
  counter?: InputCounterProps;
  group?: InputGroupProps;
  validation?: InputValidationProps;
  transform?: InputTransformProps;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  autoCapitalize?: string;
  spellCheck?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPressEnter?: () => void;
  onClear?: () => void;
  ariaLabel?: string;
  role?: string;
}

export interface InputInstance {
  value: string;
  status: InputStatus;
  state: InputState;
  validation?: InputValidationProps;
  transform?: InputTransformProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateInputOptions {
  variants?: InputVariant[];
} 