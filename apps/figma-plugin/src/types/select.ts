export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'outlined' | 'filled';
export type SelectState = 'default' | 'hover' | 'focused' | 'disabled' | 'error';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

export interface SelectVariantProps {
  size?: SelectSize;
  variant?: SelectVariant;
  state?: SelectState;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  loading?: boolean;
  options?: SelectOption[];
  ariaLabel?: string;
  role?: string;
}

export type SelectSizeConfig = {
  [key in SelectSize]: {
    height: number;
    fontSize: number;
    lineHeight: number;
    padding: number;
    borderRadius: number;
    iconSize: number;
    spacing: number;
    labelSpacing: number;
    optionHeight: number;
    optionPadding: number;
    menuMaxHeight: number;
  };
};

export type SelectStyleConfig = {
  [key in SelectVariant]: {
    background: {
      default: string;
      hover: string;
      focused: string;
      disabled: string;
      error: string;
    };
    border: {
      default: string;
      hover: string;
      focused: string;
      disabled: string;
      error: string;
    };
    text: {
      default: string;
      hover: string;
      focused: string;
      placeholder: string;
      disabled: string;
      error: string;
    };
    icon: {
      default: string;
      hover: string;
      focused: string;
      disabled: string;
      error: string;
    };
    label: {
      default: string;
      hover: string;
      focused: string;
      disabled: string;
      error: string;
    };
    helper: {
      default: string;
      error: string;
    };
    menu: {
      background: string;
      border: string;
      shadow: string;
      optionBackground: {
        default: string;
        hover: string;
        selected: string;
        disabled: string;
      };
      optionText: {
        default: string;
        selected: string;
        disabled: string;
      };
      optionIcon: {
        default: string;
        selected: string;
        disabled: string;
      };
    };
  };
}; 