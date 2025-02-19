export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxVariant = 'filled' | 'outlined';
export type CheckboxStatus = 'default' | 'error';

export type CheckboxSizeConfig = {
  [key in CheckboxSize]: {
    size: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    iconSize: string;
    spacing: string;
  };
};

export interface CheckboxStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    checked: string;
    indeterminate: string;
  };
  border: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    checked: string;
    indeterminate: string;
  };
  icon: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type CheckboxStyles = {
  [key: string]: CheckboxStyle;
};

export interface CheckboxVariantProps {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  status?: CheckboxStatus;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  ariaLabel?: string;
  role?: string;
}

export interface CheckboxInstance {
  checked: boolean;
  indeterminate: boolean;
  label?: string;
}

export interface CreateCheckboxOptions {
  variants?: CheckboxVariant[];
} 