import { TooltipSizeConfig, TooltipStyle, TooltipStyles, TooltipVariantProps } from '../types/tooltip';

export const TOOLTIP_SIZES: TooltipSizeConfig = {
  small: {
    padding: 'component/base/padding/xs',
    borderRadius: 'component/base/radius/sm',
    borderWidth: 'component/base/border/width/thin',
    fontSize: 'text/body/sm',
    maxWidth: '200',
    arrowSize: 'component/base/gap/xs',
    spacing: 'component/base/gap/xs'
  },
  medium: {
    padding: 'component/base/padding/sm',
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin',
    fontSize: 'text/body/md',
    maxWidth: '300',
    arrowSize: 'component/base/gap/sm',
    spacing: 'component/base/gap/sm'
  },
  large: {
    padding: 'component/base/padding/md',
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin',
    fontSize: 'text/body/lg',
    maxWidth: '400',
    arrowSize: 'component/base/gap/md',
    spacing: 'component/base/gap/md'
  }
} as const;

export const TOOLTIP_STYLES: TooltipStyles = {
  light: {
    background: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    },
    border: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    },
    text: {
      default: 'text/color/default',
      error: 'text/color/inverse',
      success: 'text/color/inverse',
      warning: 'text/color/inverse'
    },
    arrow: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    }
  },
  dark: {
    background: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    },
    border: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    },
    text: {
      default: 'text/color/inverse',
      error: 'text/color/inverse',
      success: 'text/color/inverse',
      warning: 'text/color/inverse'
    },
    arrow: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    }
  },
  custom: {
    background: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    },
    border: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    },
    text: {
      default: 'text/color/default',
      error: 'text/color/inverse',
      success: 'text/color/inverse',
      warning: 'text/color/inverse'
    },
    arrow: {
      default: 'surface/color/default',
      error: 'status/error/default',
      success: 'status/success/default',
      warning: 'status/warning/default'
    }
  }
} as const;

export const TOOLTIP_VARIANTS: TooltipVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', placement: 'top', title: 'Small tooltip' },
  { size: 'medium', variant: 'filled', placement: 'top', title: 'Medium tooltip' },
  { size: 'large', variant: 'filled', placement: 'top', title: 'Large tooltip' },

  // Variant styles
  { size: 'medium', variant: 'filled', placement: 'top', title: 'Filled tooltip' },
  { size: 'medium', variant: 'outlined', placement: 'top', title: 'Outlined tooltip' },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'default', placement: 'top', title: 'Default tooltip' },
  { size: 'medium', variant: 'filled', status: 'error', placement: 'top', title: 'Error tooltip' },
  { size: 'medium', variant: 'filled', status: 'success', placement: 'top', title: 'Success tooltip' },
  { size: 'medium', variant: 'filled', status: 'warning', placement: 'top', title: 'Warning tooltip' },

  // Placement variants
  { size: 'medium', variant: 'filled', placement: 'top', title: 'Top tooltip' },
  { size: 'medium', variant: 'filled', placement: 'right', title: 'Right tooltip' },
  { size: 'medium', variant: 'filled', placement: 'bottom', title: 'Bottom tooltip' },
  { size: 'medium', variant: 'filled', placement: 'left', title: 'Left tooltip' },
  { size: 'medium', variant: 'filled', placement: 'topLeft', title: 'Top Left tooltip' },
  { size: 'medium', variant: 'filled', placement: 'topRight', title: 'Top Right tooltip' },
  { size: 'medium', variant: 'filled', placement: 'bottomLeft', title: 'Bottom Left tooltip' },
  { size: 'medium', variant: 'filled', placement: 'bottomRight', title: 'Bottom Right tooltip' },
  { size: 'medium', variant: 'filled', placement: 'leftTop', title: 'Left Top tooltip' },
  { size: 'medium', variant: 'filled', placement: 'leftBottom', title: 'Left Bottom tooltip' },
  { size: 'medium', variant: 'filled', placement: 'rightTop', title: 'Right Top tooltip' },
  { size: 'medium', variant: 'filled', placement: 'rightBottom', title: 'Right Bottom tooltip' },

  // With arrow
  { size: 'medium', variant: 'filled', placement: 'top', title: 'Tooltip with arrow', arrow: true },

  // With content
  { 
    size: 'medium', 
    variant: 'filled', 
    placement: 'top', 
    title: 'Tooltip with content',
    content: 'This is additional content for the tooltip'
  },

  // With trigger
  { 
    size: 'medium', 
    variant: 'filled', 
    placement: 'top', 
    title: 'Hover tooltip',
    trigger: 'hover'
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    placement: 'top', 
    title: 'Click tooltip',
    trigger: 'click'
  },

  // With delay
  { 
    size: 'medium', 
    variant: 'filled', 
    placement: 'top', 
    title: 'Delayed tooltip',
    mouseEnterDelay: 0.5,
    mouseLeaveDelay: 0.1
  }
] as const; 