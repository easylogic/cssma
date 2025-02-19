export type TooltipSize = 'small' | 'medium' | 'large';
export type TooltipVariant = 'filled' | 'outlined';
export type TooltipStatus = 'default' | 'error' | 'success' | 'warning';
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left' | 
  'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 
  'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export type TooltipTheme = 'light' | 'dark' | 'custom';
export type TooltipDimension = 'small' | 'medium' | 'large';
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

export interface TooltipVariantProps {
  size?: TooltipSize;
  variant?: TooltipVariant;
  status?: TooltipStatus;
  placement?: TooltipPlacement;
  title?: string;
  content?: string;
  arrow?: boolean;
  trigger?: 'hover' | 'click' | 'focus' | 'contextMenu';
  open?: boolean;
  defaultOpen?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  ariaLabel?: string;
  role?: string;
}

export type TooltipSizeConfig = {
  [key in TooltipSize]: {
    padding: string;
    borderRadius: string;
    borderWidth: string;
    fontSize: string;
    maxWidth: string;
    arrowSize: string;
    spacing: string;
  };
};

export interface TooltipStyle {
  background: {
    default: string;
    error: string;
    success: string;
    warning: string;
  };
  border: {
    default: string;
    error: string;
    success: string;
    warning: string;
  };
  text: {
    default: string;
    error: string;
    success: string;
    warning: string;
  };
  arrow: {
    default: string;
    error: string;
    success: string;
    warning: string;
  };
}

export type TooltipStyles = {
  [key: string]: TooltipStyle;
};

export interface TooltipInstance {
  title: string;
  content?: string;
  placement: TooltipPlacement;
}

export interface CreateTooltipOptions {
  variants?: TooltipVariant[];
} 