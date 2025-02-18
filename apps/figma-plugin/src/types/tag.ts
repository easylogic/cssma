export type TagSize = 'small' | 'medium' | 'large';
export type TagVariant = 'filled' | 'outlined' | 'ghost';
export type TagStatus = 'default' | 'primary' | 'neutral' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
export type TagShape = 'rounded' | 'circular';

export interface TagVariantProps {
  size?: TagSize;
  variant?: TagVariant;
  status?: TagStatus;
  shape?: TagShape;
  icon?: string;
  label?: string;
  removable?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

// Value can be either a number or a reference to a variable
export type SizeValue = string | number;

export type TagSizeConfig = {
  [key in TagSize]: {
    height: SizeValue;
    fontSize: SizeValue;
    lineHeight: SizeValue;
    paddingHorizontal: SizeValue;
    paddingVertical: SizeValue;
    iconSize: SizeValue;
    spacing: SizeValue;
    borderRadius: {
      rounded: SizeValue;
      circular: SizeValue;
    };
  };
};

export type TagStyleConfig = {
  [key in TagVariant]: {
    [key in TagStatus]: {
      background: {
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
      text: {
        default: string;
        hover: string;
        pressed: string;
        disabled: string;
      };
      icon: {
        default: string;
        hover: string;
        pressed: string;
        disabled: string;
      };
    };
  };
}; 