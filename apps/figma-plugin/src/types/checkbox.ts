/**
 * Checkbox Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive checkbox component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxVariant = 'filled' | 'outlined';
export type CheckboxStatus = 'default' | 'success' | 'error' | 'warning';
export type CheckboxState = 'default' | 'hover' | 'pressed' | 'disabled';
export type CheckboxValue = 'checked' | 'unchecked' | 'indeterminate';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type CheckboxSizeConfig = {
  [key in CheckboxSize]: {
    box: {
      size: string;
      borderRadius: string;
      borderWidth: string;
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

export interface CheckboxStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface CheckboxBoxStyle {
  background: {
    unchecked: CheckboxStateStyle;
    checked: CheckboxStateStyle;
    indeterminate: CheckboxStateStyle;
  };
  border: {
    unchecked: CheckboxStateStyle;
    checked: CheckboxStateStyle;
    indeterminate: CheckboxStateStyle;
  };
  shadow?: {
    unchecked: CheckboxStateStyle;
    checked: CheckboxStateStyle;
    indeterminate: CheckboxStateStyle;
  };
}

export interface CheckboxIconStyle {
  color: {
    unchecked: CheckboxStateStyle;
    checked: CheckboxStateStyle;
    indeterminate: CheckboxStateStyle;
  };
  opacity: {
    unchecked: string;
    checked: string;
    indeterminate: string;
  };
  transform: {
    unchecked: string;
    checked: string;
    indeterminate: string;
  };
}

export interface CheckboxLabelStyle {
  color: CheckboxStateStyle;
  opacity: {
    unchecked: string;
    checked: string;
    indeterminate: string;
  };
}

export interface CheckboxDescriptionStyle {
  color: CheckboxStateStyle;
  opacity: {
    unchecked: string;
    checked: string;
    indeterminate: string;
  };
}

export interface CheckboxStyle {
  box: CheckboxBoxStyle;
  icon: CheckboxIconStyle;
  label: CheckboxLabelStyle;
  description: CheckboxDescriptionStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type CheckboxStyles = {
  [key in CheckboxVariant]: {
    [key in CheckboxStatus]: CheckboxStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface CheckboxIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface CheckboxLabelProps {
  text: string;
  description?: string;
  placement?: 'start' | 'end';
}

export interface CheckboxGroupProps {
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  spacing?: 'default' | 'compact' | 'loose';
  direction?: 'horizontal' | 'vertical';
}

export interface CheckboxAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface CheckboxValidationProps {
  required?: boolean;
  pattern?: string;
  minSelected?: number;
  maxSelected?: number;
  customValidation?: (value: boolean) => boolean | string;
}

export interface CheckboxVariantProps {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  status?: CheckboxStatus;
  state?: CheckboxState;
  value?: CheckboxValue;
  defaultValue?: CheckboxValue;
  icon?: CheckboxIconProps;
  label?: CheckboxLabelProps;
  group?: CheckboxGroupProps;
  animation?: CheckboxAnimationProps;
  validation?: CheckboxValidationProps;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  onChange?: (value: CheckboxValue) => void;
  ariaLabel?: string;
  role?: string;
}

export interface CheckboxInstance {
  value: CheckboxValue;
  status: CheckboxStatus;
  state: CheckboxState;
  label?: CheckboxLabelProps;
  validation?: CheckboxValidationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateCheckboxOptions {
  variants?: CheckboxVariant[];
} 