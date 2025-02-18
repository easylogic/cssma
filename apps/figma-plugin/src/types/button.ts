export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'filled' | 'outlined' | 'ghost';
export type ButtonType = 'default' | 'primary' | 'neutral' | 'secondary' | 'danger';
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

export type ButtonSizeConfig = {
  [key in ButtonSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    paddingHorizontal: string;
    paddingVertical: string;
    iconSize: string;
    spacing: string;
    borderRadius: string;
  };
}

export interface ButtonStyle {
  background: {
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
  border: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export interface ButtonStyles {
  [key: string]: ButtonStyle;
}

export interface ButtonVariantProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  state?: ButtonState;
  icon?: string;
  label?: string;
}

export interface ButtonInstance {
  text?: string;
  icon?: string;
}

export interface CreateButtonOptions {
  variants?: ButtonVariant[];
} 