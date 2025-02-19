export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchVariant = 'filled' | 'outlined';
export type SwitchStatus = 'default' | 'error' | 'success' | 'warning';

export type SwitchSizeConfig = {
  [key in SwitchSize]: {
    width: string;
    height: string;
    thumbSize: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    spacing: string;
  };
};

export interface SwitchStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    checked: string;
  };
  thumb: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    checked: string;
  };
  text: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type SwitchStyles = {
  [key: string]: SwitchStyle;
};

export interface SwitchVariantProps {
  size?: SwitchSize;
  variant?: SwitchVariant;
  status?: SwitchStatus;
  checked?: boolean;
  loading?: boolean;
  disabled?: boolean;
  checkedChildren?: string;
  unCheckedChildren?: string;
  ariaLabel?: string;
  role?: string;
}

export interface SwitchInstance {
  checked: boolean;
  checkedChildren?: string;
  unCheckedChildren?: string;
}

export interface CreateSwitchOptions {
  variants?: SwitchVariant[];
} 