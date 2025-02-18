import { TooltipSizeConfig, TooltipStyleConfig, TooltipVariantProps } from '../types/tooltip';

export const TOOLTIP_SIZES: TooltipSizeConfig = {
  small: {
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
    lineHeight: 16,
    maxWidth: 200,
    arrowSize: 6,
    distance: 4,
    offset: 4
  },
  medium: {
    padding: 12,
    borderRadius: 6,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 300,
    arrowSize: 8,
    distance: 6,
    offset: 6
  },
  large: {
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 400,
    arrowSize: 10,
    distance: 8,
    offset: 8
  }
} as const;

export const TOOLTIP_STYLES: TooltipStyleConfig = {
  light: {
    background: {
      default: 'semantic/bg/default',
      hover: 'semantic/bg/hover'
    },
    text: {
      default: 'semantic/text/default',
      muted: 'semantic/text/muted'
    },
    border: {
      default: 'semantic/border/default'
    },
    shadow: {
      default: 'semantic/shadow/sm'
    }
  },
  dark: {
    background: {
      default: 'semantic/bg/inverse',
      hover: 'semantic/bg/inverse/hover'
    },
    text: {
      default: 'semantic/text/inverse',
      muted: 'semantic/text/inverse/muted'
    },
    border: {
      default: 'semantic/border/inverse'
    },
    shadow: {
      default: 'semantic/shadow/lg'
    }
  },
  custom: {
    background: {
      default: 'semantic/bg/muted',
      hover: 'semantic/bg/muted/hover'
    },
    text: {
      default: 'semantic/text/default',
      muted: 'semantic/text/muted'
    },
    border: {
      default: 'semantic/border/muted'
    },
    shadow: {
      default: 'semantic/shadow/md'
    }
  }
} as const;

export const TOOLTIP_VARIANTS: TooltipVariantProps[] = [
  // Basic placements
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'right', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'bottom', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'left', theme: 'light', size: 'medium', hasArrow: true },

  // Start/End placements
  { placement: 'top-start', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'top-end', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'right-start', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'right-end', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'bottom-start', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'bottom-end', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'left-start', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'left-end', theme: 'light', size: 'medium', hasArrow: true },

  // Sizes
  { placement: 'top', theme: 'light', size: 'small', hasArrow: true },
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'top', theme: 'light', size: 'large', hasArrow: true },

  // Themes
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: true },
  { placement: 'top', theme: 'dark', size: 'medium', hasArrow: true },
  { placement: 'top', theme: 'custom', size: 'medium', hasArrow: true },

  // Without arrow
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: false },
  { placement: 'right', theme: 'light', size: 'medium', hasArrow: false },
  { placement: 'bottom', theme: 'light', size: 'medium', hasArrow: false },
  { placement: 'left', theme: 'light', size: 'medium', hasArrow: false },

  // Different triggers
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: true, trigger: 'hover' },
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: true, trigger: 'focus' },
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: true, trigger: 'click' },
  { placement: 'top', theme: 'light', size: 'medium', hasArrow: true, trigger: 'manual' }
] as const; 