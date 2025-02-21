/**
 * Switch Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive switch component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchVariant = 'filled' | 'outlined';
export type SwitchStatus = 'default' | 'success' | 'error' | 'warning';
export type SwitchState = 'default' | 'hover' | 'pressed' | 'disabled';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type SwitchSizeConfig = {
  [key in SwitchSize]: {
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
      spacing: string;
    };
    label: {
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

export interface SwitchStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface SwitchTrackStyle {
  background: {
    unchecked: SwitchStateStyle;
    checked: SwitchStateStyle;
  };
  border: {
    unchecked: SwitchStateStyle;
    checked: SwitchStateStyle;
  };
  shadow?: {
    unchecked: SwitchStateStyle;
    checked: SwitchStateStyle;
  };
}

export interface SwitchThumbStyle {
  background: {
    unchecked: SwitchStateStyle;
    checked: SwitchStateStyle;
  };
  border: {
    unchecked: SwitchStateStyle;
    checked: SwitchStateStyle;
  };
  shadow: {
    unchecked: SwitchStateStyle;
    checked: SwitchStateStyle;
  };
  transform: {
    unchecked: string;
    checked: string;
  };
}

export interface SwitchIconStyle {
  color: {
    unchecked: SwitchStateStyle;
    checked: SwitchStateStyle;
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

export interface SwitchLabelStyle {
  color: SwitchStateStyle;
  opacity: {
    unchecked: string;
    checked: string;
  };
}

export interface SwitchLoadingStyle {
  spinner: SwitchStateStyle;
  overlay: SwitchStateStyle;
}

export interface SwitchStyle {
  track: SwitchTrackStyle;
  thumb: SwitchThumbStyle;
  icon: SwitchIconStyle;
  label: SwitchLabelStyle;
  loading: SwitchLoadingStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type SwitchStyles = {
  [key in SwitchVariant]: {
    [key in SwitchStatus]: SwitchStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface SwitchIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface SwitchLabelProps {
  checked?: string;
  unchecked?: string;
  placement?: 'start' | 'end';
}

export interface SwitchLoadingProps {
  state: boolean;
  indicator?: SwitchIconProps;
}

export interface SwitchAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface SwitchGroupProps {
  spacing?: 'default' | 'compact' | 'loose';
  direction?: 'horizontal' | 'vertical';
}

export interface SwitchVariantProps {
  size?: SwitchSize;
  variant?: SwitchVariant;
  status?: SwitchStatus;
  state?: SwitchState;
  checked?: boolean;
  defaultChecked?: boolean;
  icon?: SwitchIconProps;
  label?: SwitchLabelProps;
  loading?: SwitchLoadingProps;
  animation?: SwitchAnimationProps;
  group?: SwitchGroupProps;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  ariaLabel?: string;
  role?: string;
}

export interface SwitchInstance {
  checked: boolean;
  status: SwitchStatus;
  state: SwitchState;
  label?: SwitchLabelProps;
  loading?: SwitchLoadingProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateSwitchOptions {
  variants?: SwitchVariant[];
} 