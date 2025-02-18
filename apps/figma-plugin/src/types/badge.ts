export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeVariant = 'filled' | 'outlined';
export type BadgeStatus = 'default' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'secondary';
export type BadgeShape = 'rounded' | 'pill' | 'square';

export type BadgeSizeConfig = {
  [key in BadgeSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    paddingHorizontal: string;
    paddingVertical: string;
    iconSize: string;
    spacing: string;
    borderRadius: {
      rounded: string;
      pill: string;
      square: string;
    };
  };
}

export interface BadgeStyle {
  background: string;
  text: string;
  border: string;
}

export interface BadgeStyles {
  [key: string]: BadgeStyle;
}

export interface BadgeVariantProps {
  size?: BadgeSize;
  variant?: BadgeVariant;
  status?: BadgeStatus;
  shape?: BadgeShape;
  icon?: string;
  label?: string;
}

export interface BadgeInstance {
  text?: string;
  icon?: string;
}

export interface CreateBadgeOptions {
  variants?: BadgeVariant[];
} 