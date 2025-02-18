import { BadgeSize, BadgeSizeConfig, BadgeStyles, BadgeVariant, BadgeVariantProps } from '../types/badge';

export const BADGE_SIZES: BadgeSizeConfig = {
  small: {
    height: 'badge/height/small',
    fontSize: 'badge/typography/small/size',
    lineHeight: 'badge/typography/small/lineHeight',
    paddingHorizontal: 'badge/spacing/small/horizontal',
    paddingVertical: 'badge/spacing/small/vertical',
    iconSize: 'badge/icon/small',
    spacing: 'badge/spacing/small/gap',
    borderRadius: {
      rounded: 'badge/radius/small/rounded',
      pill: 'badge/radius/small/pill',
      square: 'badge/radius/small/square'
    }
  },
  medium: {
    height: 'badge/height/medium',
    fontSize: 'badge/typography/medium/size',
    lineHeight: 'badge/typography/medium/lineHeight',
    paddingHorizontal: 'badge/spacing/medium/horizontal',
    paddingVertical: 'badge/spacing/medium/vertical',
    iconSize: 'badge/icon/medium',
    spacing: 'badge/spacing/medium/gap',
    borderRadius: {
      rounded: 'badge/radius/medium/rounded',
      pill: 'badge/radius/medium/pill',
      square: 'badge/radius/medium/square'
    }
  },
  large: {
    height: 'badge/height/large',
    fontSize: 'badge/typography/large/size',
    lineHeight: 'badge/typography/large/lineHeight',
    paddingHorizontal: 'badge/spacing/large/horizontal',
    paddingVertical: 'badge/spacing/large/vertical',
    iconSize: 'badge/icon/large',
    spacing: 'badge/spacing/large/gap',
    borderRadius: {
      rounded: 'badge/radius/large/rounded',
      pill: 'badge/radius/large/pill',
      square: 'badge/radius/large/square'
    }
  }
} as const;

export const BADGE_STYLES: BadgeStyles = {
  'default-filled': {
    background: 'surface/color/default',
    text: 'text/color/default',
    border: 'surface/color/default'
  },
  'neutral-filled': {
    background: 'status/neutral/default',
    text: 'text/color/inverse',
    border: 'status/neutral/default'
  },
  'secondary-filled': {
    background: 'status/secondary/default',
    text: 'text/color/default',
    border: 'status/secondary/default'
  },
  'info-filled': {
    background: 'status/info/default',
    text: 'text/color/inverse',
    border: 'status/info/default'
  },
  'success-filled': {
    background: 'status/success/default',
    text: 'text/color/inverse',
    border: 'status/success/default'
  },
  'warning-filled': {
    background: 'status/warning/default',
    text: 'text/color/inverse',
    border: 'status/warning/default'
  },
  'error-filled': {
    background: 'status/error/default',
    text: 'text/color/inverse',
    border: 'status/error/default'
  },
  'default-outlined': {
    background: 'surface/color/transparent',
    text: 'text/color/default',
    border: 'surface/color/default'
  },
  'neutral-outlined': {
    background: 'surface/color/transparent',
    text: 'status/neutral/default',
    border: 'status/neutral/default'
  },
  'secondary-outlined': {
    background: 'surface/color/transparent',
    text: 'text/color/default',
    border: 'status/secondary/default'
  },
  'info-outlined': {
    background: 'surface/color/transparent',
    text: 'status/info/default',
    border: 'status/info/default'
  },
  'success-outlined': {
    background: 'surface/color/transparent',
    text: 'status/success/default',
    border: 'status/success/default'
  },
  'warning-outlined': {
    background: 'surface/color/transparent',
    text: 'status/warning/default',
    border: 'status/warning/default'
  },
  'error-outlined': {
    background: 'surface/color/transparent',
    text: 'status/error/default',
    border: 'status/error/default'
  }
} as const;

export const BADGE_VARIANTS: BadgeVariantProps[] = [
  // Default variants with different shapes
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'pill' },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'square' },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'pill' },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'square' },

  // Neutral variants
  { size: 'medium', variant: 'filled', status: 'neutral', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'neutral', shape: 'pill' },
  { size: 'medium', variant: 'filled', status: 'neutral', shape: 'square' },
  { size: 'medium', variant: 'outlined', status: 'neutral', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'neutral', shape: 'pill' },
  { size: 'medium', variant: 'outlined', status: 'neutral', shape: 'square' },

  // Secondary variants
  { size: 'medium', variant: 'filled', status: 'secondary', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'secondary', shape: 'pill' },
  { size: 'medium', variant: 'filled', status: 'secondary', shape: 'square' },
  { size: 'medium', variant: 'outlined', status: 'secondary', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'secondary', shape: 'pill' },
  { size: 'medium', variant: 'outlined', status: 'secondary', shape: 'square' },

  // Status variants with different shapes
  { size: 'medium', variant: 'filled', status: 'info', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'info', shape: 'pill' },
  { size: 'medium', variant: 'filled', status: 'info', shape: 'square' },
  { size: 'medium', variant: 'outlined', status: 'info', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'info', shape: 'pill' },
  { size: 'medium', variant: 'outlined', status: 'info', shape: 'square' },

  { size: 'medium', variant: 'filled', status: 'success', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'success', shape: 'pill' },
  { size: 'medium', variant: 'filled', status: 'success', shape: 'square' },
  { size: 'medium', variant: 'outlined', status: 'success', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'success', shape: 'pill' },
  { size: 'medium', variant: 'outlined', status: 'success', shape: 'square' },

  { size: 'medium', variant: 'filled', status: 'warning', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'warning', shape: 'pill' },
  { size: 'medium', variant: 'filled', status: 'warning', shape: 'square' },
  { size: 'medium', variant: 'outlined', status: 'warning', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'warning', shape: 'pill' },
  { size: 'medium', variant: 'outlined', status: 'warning', shape: 'square' },

  { size: 'medium', variant: 'filled', status: 'error', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'error', shape: 'pill' },
  { size: 'medium', variant: 'filled', status: 'error', shape: 'square' },
  { size: 'medium', variant: 'outlined', status: 'error', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'error', shape: 'pill' },
  { size: 'medium', variant: 'outlined', status: 'error', shape: 'square' },

  // With icons
  { size: 'small', variant: 'filled', status: 'info', shape: 'rounded', icon: 'info' },
  { size: 'medium', variant: 'filled', status: 'success', shape: 'pill', icon: 'check' },
  { size: 'large', variant: 'filled', status: 'warning', shape: 'square', icon: 'warning' },
  { size: 'small', variant: 'outlined', status: 'error', shape: 'rounded', icon: 'error' }
] as const; 