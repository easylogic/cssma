export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'filled' | 'outlined';
export type InputStatus = 'default' | 'error' | 'success' | 'warning';

export type InputSizeConfig = {
  [key in InputSize]: {
    height: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    iconSize: string;
    spacing: string;
    padding: string;
  };
};

export interface InputStyle {
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
}

export type InputStyles = {
  [key: string]: InputStyle;
};

export interface InputVariantProps {
  size?: InputSize;
  variant?: InputVariant;
  status?: InputStatus;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  leftIcon?: string;
  rightIcon?: string;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface InputInstance {
  value?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

export interface CreateInputOptions {
  variants?: InputVariant[];
} 