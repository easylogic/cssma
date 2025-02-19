export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'filled' | 'outlined' | 'elevated';
export type CardStatus = 'default' | 'error';

export type CardSizeConfig = {
  [key in CardSize]: {
    padding: string;
    borderRadius: string;
    borderWidth: string;
    elevation: string;
    spacing: string;
  };
};

export interface CardStyle {
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
  shadow: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type CardStyles = {
  [key: string]: CardStyle;
};

export interface CardVariantProps {
  size?: CardSize;
  variant?: CardVariant;
  status?: CardStatus;
  interactive?: boolean;
  disabled?: boolean;
  header?: boolean;
  footer?: boolean;
  media?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface CardInstance {
  header?: boolean;
  footer?: boolean;
  media?: boolean;
}

export interface CreateCardOptions {
  variants?: CardVariant[];
} 