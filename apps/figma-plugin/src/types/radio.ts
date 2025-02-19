export type RadioSize = 'small' | 'medium' | 'large';
export type RadioVariant = 'filled' | 'outlined';
export type RadioStatus = 'default' | 'error';

export type RadioSizeConfig = {
  [key in RadioSize]: {
    size: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    dotSize: string;
    spacing: string;
  };
};

export interface RadioStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    checked: string;
  };
  border: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    checked: string;
  };
  dot: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type RadioStyles = {
  [key: string]: RadioStyle;
};

export interface RadioVariantProps {
  size?: RadioSize;
  variant?: RadioVariant;
  status?: RadioStatus;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  role?: string;
}

export interface RadioInstance {
  checked: boolean;
  label?: string;
  value?: string;
}

export interface CreateRadioOptions {
  variants?: RadioVariant[];
} 