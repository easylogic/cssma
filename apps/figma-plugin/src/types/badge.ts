export interface BadgeSize {
  small: { height: number; fontSize: number; padding: number; dotSize: number };
  medium: { height: number; fontSize: number; padding: number; dotSize: number };
}

export interface BadgeStyle {
  background: string;
  text: string;
  border: string;
}

export interface BadgeStyles {
  [key: string]: BadgeStyle;
}

export interface BadgeVariant {
  size?: 'small' | 'medium';
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  shape?: 'text' | 'dot';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export interface CreateBadgeOptions {
  variants?: BadgeVariant[];
} 