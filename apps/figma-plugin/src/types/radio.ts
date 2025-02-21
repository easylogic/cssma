/**
 * Radio Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive radio component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type RadioSize = 'small' | 'medium' | 'large';
export type RadioVariant = 'filled' | 'outlined';
export type RadioStatus = 'default' | 'success' | 'error' | 'warning';
export type RadioState = 'default' | 'hover' | 'pressed' | 'disabled';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type RadioSizeConfig = {
  [key in RadioSize]: {
    circle: {
      size: string;
      borderWidth: string;
      dotSize: string;
      dotOffset: string;
    };
    icon: {
      size: string;
      spacing: string;
    };
    label: {
      fontSize: string;
      lineHeight: string;
      spacing: string;
    };
    description: {
      fontSize: string;
      lineHeight: string;
      spacing: string;
    };
    spacing: {
      content: string;  // 아이콘/라벨 간격
      group: string;    // 그룹 간격
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface RadioStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface RadioCircleStyle {
  background: {
    unchecked: RadioStateStyle;
    checked: RadioStateStyle;
  };
  border: {
    unchecked: RadioStateStyle;
    checked: RadioStateStyle;
  };
  dot: {
    unchecked: RadioStateStyle;
    checked: RadioStateStyle;
  };
  shadow?: {
    unchecked: RadioStateStyle;
    checked: RadioStateStyle;
  };
}

export interface RadioIconStyle {
  color: {
    unchecked: RadioStateStyle;
    checked: RadioStateStyle;
  };
  opacity: {
    unchecked: string;
    checked: string;
  };
  transform: {
    unchecked: string;
    checked: string;
  };
}

export interface RadioLabelStyle {
  color: RadioStateStyle;
  opacity: {
    unchecked: string;
    checked: string;
  };
}

export interface RadioDescriptionStyle {
  color: RadioStateStyle;
  opacity: {
    unchecked: string;
    checked: string;
  };
}

export interface RadioStyle {
  circle: RadioCircleStyle;
  icon: RadioIconStyle;
  label: RadioLabelStyle;
  description: RadioDescriptionStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type RadioStyles = {
  [key in RadioVariant]: {
    [key in RadioStatus]: RadioStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface RadioIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface RadioLabelProps {
  text: string;
  description?: string;
  placement?: 'start' | 'end';
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  spacing?: 'default' | 'compact' | 'loose';
  direction?: 'horizontal' | 'vertical';
  buttonStyle?: boolean;  // 버튼 스타일로 표시할지 여부
}

export interface RadioAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface RadioValidationProps {
  required?: boolean;
  customValidation?: (value: string) => boolean | string;
}

export interface RadioVariantProps {
  size?: RadioSize;
  variant?: RadioVariant;
  status?: RadioStatus;
  state?: RadioState;
  value?: string;
  defaultChecked?: boolean;
  icon?: RadioIconProps;
  label?: RadioLabelProps;
  group?: RadioGroupProps;
  animation?: RadioAnimationProps;
  validation?: RadioValidationProps;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  onChange?: (checked: boolean) => void;
  ariaLabel?: string;
  role?: string;
}

export interface RadioInstance {
  value: string;
  checked: boolean;
  status: RadioStatus;
  state: RadioState;
  label?: RadioLabelProps;
  validation?: RadioValidationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateRadioOptions {
  variants?: RadioVariant[];
} 