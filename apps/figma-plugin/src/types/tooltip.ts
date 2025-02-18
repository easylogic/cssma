export type TooltipPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';

export type TooltipTheme = 'light' | 'dark' | 'custom';
export type TooltipDimension = 'small' | 'medium' | 'large';
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

export interface TooltipVariantProps {
  placement?: TooltipPlacement;
  theme?: TooltipTheme;
  size?: TooltipDimension;
  hasArrow?: boolean;
  trigger?: TooltipTrigger;
  isOpen?: boolean;
  maxWidth?: number;
  ariaLabel?: string;
  role?: string;
  delay?: {
    show?: number;
    hide?: number;
  };
}

export type TooltipSizeConfig = {
  [key in TooltipDimension]: {
    padding: number;
    borderRadius: number;
    fontSize: number;
    lineHeight: number;
    maxWidth: number;
    arrowSize: number;
    distance: number;
    offset: number;
  };
};

export type TooltipStyleConfig = {
  [key in TooltipTheme]: {
    background: {
      default: string;
      hover: string;
    };
    text: {
      default: string;
      muted: string;
    };
    border: {
      default: string;
    };
    shadow: {
      default: string;
    };
  };
};

export interface TooltipSize {
  small: { 
    height: number; 
    fontSize: number; 
    padding: number;
    arrowSize: number;
  };
  medium: { 
    height: number; 
    fontSize: number; 
    padding: number;
    arrowSize: number;
  };
}

export interface TooltipStyle {
  background: string;
  text: string;
  border: string;
}

export interface TooltipStyles {
  [key: string]: TooltipStyle;
}

export interface TooltipVariant {
  size?: 'small' | 'medium';
  position?: 'top' | 'right' | 'bottom' | 'left';
  state?: 'default' | 'hover';
}

export interface CreateTooltipOptions {
  variants?: TooltipVariant[];
} 