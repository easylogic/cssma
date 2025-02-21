/**
 * Select Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive select component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'filled' | 'outlined';
export type SelectStatus = 'default' | 'error' | 'success' | 'warning';
export type SelectState = 'default' | 'hover' | 'focused' | 'disabled';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type SelectSizeConfig = {
  [key in SelectSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      item: string;      // 아이템 간격
      icon: string;      // 아이콘과 텍스트 간격
      tag: string;       // 다중 선택시 태그 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    borderRadius: string;
    borderWidth: string;
    menu: {
      maxHeight: string;
      itemHeight: string;
      padding: {
        horizontal: string;
        vertical: string;
      };
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface SelectStateStyle {
  default: string;
  hover: string;
  focused: string;
  disabled: string;
}

export interface SelectItemStyle {
  background: {
    default: string;
    hover: string;
    selected: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    selected: string;
    disabled: string;
  };
  icon: {
    default: string;
    hover: string;
    selected: string;
    disabled: string;
  };
  checkbox: {
    default: string;
    hover: string;
    selected: string;
    disabled: string;
  };
}

export interface SelectStyle {
  root: {
    background: SelectStateStyle;
    border: SelectStateStyle;
    text: SelectStateStyle;
  };
  trigger: {
    icon: SelectStateStyle;
    placeholder: SelectStateStyle;
    clearButton: SelectStateStyle;
  };
  menu: {
    background: string;
    border: string;
    shadow: string;
    item: SelectItemStyle;
    group: {
      header: {
        text: string;
        background: string;
      };
      divider: string;
    };
  };
  tag: {
    background: SelectStateStyle;
    text: SelectStateStyle;
    removeButton: SelectStateStyle;
  };
  loading: {
    spinner: SelectStateStyle;
    overlay: SelectStateStyle;
  };
}

export type SelectStyles = {
  [key in SelectStatus]: SelectStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface SelectIconProps {
  name: string;
  size?: number;
}

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: SelectIconProps;
  disabled?: boolean;
  group?: string;
}

export interface SelectGroupProps {
  label: string;
  options: SelectOption[];
}

export interface SelectSearchProps {
  enabled: boolean;
  placeholder?: string;
  filterOption?: (input: string, option: SelectOption) => boolean;
}

export interface SelectLoadingProps {
  state: boolean;
  text?: string;
  indicator?: SelectIconProps;
}

export interface SelectTagProps {
  maxCount?: number;
  showCount?: boolean;
  closable?: boolean;
}

export interface SelectVariantProps {
  size?: SelectSize;
  variant?: SelectVariant;
  status?: SelectStatus;
  placeholder?: string;
  options?: SelectOption[];
  groups?: SelectGroupProps[];
  defaultValue?: string | string[];
  value?: string | string[];
  multiple?: boolean;
  search?: SelectSearchProps;
  loading?: SelectLoadingProps;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  virtual?: boolean;
  tag?: SelectTagProps;
  ariaLabel?: string;
  role?: string;
}

export interface SelectInstance {
  value?: string | string[];
  options: SelectOption[];
  groups?: SelectGroupProps[];
  search?: SelectSearchProps;
  tag?: SelectTagProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateSelectOptions {
  variants?: SelectVariant[];
} 