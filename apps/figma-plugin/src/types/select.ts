export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'filled' | 'outlined';
export type SelectStatus = 'default' | 'error' | 'success' | 'warning';

export type SelectSizeConfig = {
  [key in SelectSize]: {
    height: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    iconSize: string;
    spacing: string;
    padding: string;
    menuItemHeight: string;
    menuMaxHeight: string;
  };
};

export interface SelectStyle {
  background: {
    default: string;
    hover: string;
    focused: string;
    disabled: string;
  };
  border: {
    default: string;
    hover: string;
    focused: string;
    disabled: string;
  };
  text: {
    default: string;
    placeholder: string;
    disabled: string;
  };
  icon: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  menu: {
    background: string;
    border: string;
    shadow: string;
    item: {
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
    };
  };
}

export type SelectStyles = {
  [key: string]: SelectStyle;
};

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
  group?: string;
}

export interface SelectVariantProps {
  size?: SelectSize;
  variant?: SelectVariant;
  status?: SelectStatus;
  placeholder?: string;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxTagCount?: number;
  showArrow?: boolean;
  showSearch?: boolean;
  virtual?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface SelectInstance {
  value?: string | string[];
  placeholder?: string;
  options: SelectOption[];
}

export interface CreateSelectOptions {
  variants?: SelectVariant[];
} 