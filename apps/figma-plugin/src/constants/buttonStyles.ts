import { ButtonSize, ButtonStyles, ButtonVariant } from '../types/button';

export const BUTTON_SIZES: ButtonSize = {
  small: {
    height: 'button/height/small',
    fontSize: 'button/typography/small/size',
    lineHeight: 'button/typography/small/lineHeight',
    paddingHorizontal: 'button/spacing/small/horizontal',
    paddingVertical: 'button/spacing/small/vertical',
    iconSize: 'button/icon/small',
    spacing: 'button/spacing/small/gap',
    borderRadius: 'button/radius/small'
  },
  medium: {
    height: 'button/height/medium',
    fontSize: 'button/typography/medium/size',
    lineHeight: 'button/typography/medium/lineHeight',
    paddingHorizontal: 'button/spacing/medium/horizontal',
    paddingVertical: 'button/spacing/medium/vertical',
    iconSize: 'button/icon/medium',
    spacing: 'button/spacing/medium/gap',
    borderRadius: 'button/radius/medium'
  },
  large: {
    height: 'button/height/large',
    fontSize: 'button/typography/large/size',
    lineHeight: 'button/typography/large/lineHeight',
    paddingHorizontal: 'button/spacing/large/horizontal',
    paddingVertical: 'button/spacing/large/vertical',
    iconSize: 'button/icon/large',
    spacing: 'button/spacing/large/gap',
    borderRadius: 'button/radius/large'
  }
} as const;

export const BUTTON_STYLES: ButtonStyles = {
  'primary-filled-default': {
    background: 'status/info/default',
    text: 'text/color/inverse',
    border: 'status/info/default'
  },
  'primary-filled-hover': {
    background: 'status/info/hover',
    text: 'text/color/inverse',
    border: 'status/info/hover'
  },
  'primary-filled-pressed': {
    background: 'status/info/pressed',
    text: 'text/color/inverse',
    border: 'status/info/pressed'
  },
  'primary-filled-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/disabled'
  },
  'primary-outlined-default': {
    background: 'surface/color/transparent',
    text: 'status/info/default',
    border: 'status/info/default'
  },
  'primary-outlined-hover': {
    background: 'status/info/ghost/hover',
    text: 'status/info/hover',
    border: 'status/info/hover'
  },
  'primary-outlined-pressed': {
    background: 'status/info/ghost/pressed',
    text: 'status/info/pressed',
    border: 'status/info/pressed'
  },
  'primary-outlined-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/disabled'
  },
  'primary-ghost-default': {
    background: 'surface/color/transparent',
    text: 'status/info/default',
    border: 'surface/color/transparent'
  },
  'primary-ghost-hover': {
    background: 'status/info/ghost/hover',
    text: 'status/info/hover',
    border: 'surface/color/transparent'
  },
  'primary-ghost-pressed': {
    background: 'status/info/ghost/pressed',
    text: 'status/info/pressed',
    border: 'surface/color/transparent'
  },
  'primary-ghost-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/transparent'
  },
  'secondary-filled-default': {
    background: 'surface/color/default',
    text: 'text/color/default',
    border: 'surface/color/default'
  },
  'secondary-filled-hover': {
    background: 'surface/color/hover',
    text: 'text/color/default',
    border: 'surface/color/hover'
  },
  'secondary-filled-pressed': {
    background: 'surface/color/pressed',
    text: 'text/color/default',
    border: 'surface/color/pressed'
  },
  'secondary-filled-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/disabled'
  },
  'secondary-outlined-default': {
    background: 'surface/color/transparent',
    text: 'text/color/default',
    border: 'surface/color/default'
  },
  'secondary-outlined-hover': {
    background: 'surface/color/hover',
    text: 'text/color/default',
    border: 'surface/color/hover'
  },
  'secondary-outlined-pressed': {
    background: 'surface/color/pressed',
    text: 'text/color/default',
    border: 'surface/color/pressed'
  },
  'secondary-outlined-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/disabled'
  },
  'secondary-ghost-default': {
    background: 'surface/color/transparent',
    text: 'text/color/default',
    border: 'surface/color/transparent'
  },
  'secondary-ghost-hover': {
    background: 'surface/color/hover',
    text: 'text/color/default',
    border: 'surface/color/transparent'
  },
  'secondary-ghost-pressed': {
    background: 'surface/color/pressed',
    text: 'text/color/default',
    border: 'surface/color/transparent'
  },
  'secondary-ghost-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/transparent'
  },
  'danger-filled-default': {
    background: 'status/error/default',
    text: 'text/color/inverse',
    border: 'status/error/default'
  },
  'danger-filled-hover': {
    background: 'status/error/hover',
    text: 'text/color/inverse',
    border: 'status/error/hover'
  },
  'danger-filled-pressed': {
    background: 'status/error/pressed',
    text: 'text/color/inverse',
    border: 'status/error/pressed'
  },
  'danger-filled-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/disabled'
  },
  'danger-outlined-default': {
    background: 'surface/color/transparent',
    text: 'status/error/default',
    border: 'status/error/default'
  },
  'danger-outlined-hover': {
    background: 'status/error/ghost/hover',
    text: 'status/error/hover',
    border: 'status/error/hover'
  },
  'danger-outlined-pressed': {
    background: 'status/error/ghost/pressed',
    text: 'status/error/pressed',
    border: 'status/error/pressed'
  },
  'danger-outlined-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/disabled'
  },
  'danger-ghost-default': {
    background: 'surface/color/transparent',
    text: 'status/error/default',
    border: 'surface/color/transparent'
  },
  'danger-ghost-hover': {
    background: 'status/error/ghost/hover',
    text: 'status/error/hover',
    border: 'surface/color/transparent'
  },
  'danger-ghost-pressed': {
    background: 'status/error/ghost/pressed',
    text: 'status/error/pressed',
    border: 'surface/color/transparent'
  },
  'danger-ghost-disabled': {
    background: 'surface/color/disabled',
    text: 'text/color/disabled',
    border: 'surface/color/transparent'
  }
} as const;

// 버튼 variants 상수도 추가
export const BUTTON_VARIANTS = [
  // Primary Buttons - Filled
  { size: 'small', type: 'primary', variant: 'filled', state: 'default' },
  { size: 'small', type: 'primary', variant: 'filled', state: 'hover' },
  { size: 'small', type: 'primary', variant: 'filled', state: 'pressed' },
  { size: 'small', type: 'primary', variant: 'filled', state: 'disabled' },
  { size: 'medium', type: 'primary', variant: 'filled', state: 'default' },
  { size: 'medium', type: 'primary', variant: 'filled', state: 'hover' },
  { size: 'medium', type: 'primary', variant: 'filled', state: 'pressed' },
  { size: 'medium', type: 'primary', variant: 'filled', state: 'disabled' },
  { size: 'large', type: 'primary', variant: 'filled', state: 'default' },
  { size: 'large', type: 'primary', variant: 'filled', state: 'hover' },
  { size: 'large', type: 'primary', variant: 'filled', state: 'pressed' },
  { size: 'large', type: 'primary', variant: 'filled', state: 'disabled' },

  // Primary Buttons - Outlined
  { size: 'small', type: 'primary', variant: 'outlined', state: 'default' },
  { size: 'small', type: 'primary', variant: 'outlined', state: 'hover' },
  { size: 'small', type: 'primary', variant: 'outlined', state: 'pressed' },
  { size: 'small', type: 'primary', variant: 'outlined', state: 'disabled' },
  { size: 'medium', type: 'primary', variant: 'outlined', state: 'default' },
  { size: 'medium', type: 'primary', variant: 'outlined', state: 'hover' },
  { size: 'medium', type: 'primary', variant: 'outlined', state: 'pressed' },
  { size: 'medium', type: 'primary', variant: 'outlined', state: 'disabled' },
  { size: 'large', type: 'primary', variant: 'outlined', state: 'default' },
  { size: 'large', type: 'primary', variant: 'outlined', state: 'hover' },
  { size: 'large', type: 'primary', variant: 'outlined', state: 'pressed' },
  { size: 'large', type: 'primary', variant: 'outlined', state: 'disabled' },

  // Primary Buttons - Ghost
  { size: 'small', type: 'primary', variant: 'ghost', state: 'default' },
  { size: 'small', type: 'primary', variant: 'ghost', state: 'hover' },
  { size: 'small', type: 'primary', variant: 'ghost', state: 'pressed' },
  { size: 'small', type: 'primary', variant: 'ghost', state: 'disabled' },
  { size: 'medium', type: 'primary', variant: 'ghost', state: 'default' },
  { size: 'medium', type: 'primary', variant: 'ghost', state: 'hover' },
  { size: 'medium', type: 'primary', variant: 'ghost', state: 'pressed' },
  { size: 'medium', type: 'primary', variant: 'ghost', state: 'disabled' },
  { size: 'large', type: 'primary', variant: 'ghost', state: 'default' },
  { size: 'large', type: 'primary', variant: 'ghost', state: 'hover' },
  { size: 'large', type: 'primary', variant: 'ghost', state: 'pressed' },
  { size: 'large', type: 'primary', variant: 'ghost', state: 'disabled' },

  // Secondary Buttons - Filled
  { size: 'small', type: 'secondary', variant: 'filled', state: 'default' },
  { size: 'small', type: 'secondary', variant: 'filled', state: 'hover' },
  { size: 'small', type: 'secondary', variant: 'filled', state: 'pressed' },
  { size: 'small', type: 'secondary', variant: 'filled', state: 'disabled' },
  { size: 'medium', type: 'secondary', variant: 'filled', state: 'default' },
  { size: 'medium', type: 'secondary', variant: 'filled', state: 'hover' },
  { size: 'medium', type: 'secondary', variant: 'filled', state: 'pressed' },
  { size: 'medium', type: 'secondary', variant: 'filled', state: 'disabled' },
  { size: 'large', type: 'secondary', variant: 'filled', state: 'default' },
  { size: 'large', type: 'secondary', variant: 'filled', state: 'hover' },
  { size: 'large', type: 'secondary', variant: 'filled', state: 'pressed' },
  { size: 'large', type: 'secondary', variant: 'filled', state: 'disabled' },

  // Secondary Buttons - Outlined
  { size: 'small', type: 'secondary', variant: 'outlined', state: 'default' },
  { size: 'small', type: 'secondary', variant: 'outlined', state: 'hover' },
  { size: 'small', type: 'secondary', variant: 'outlined', state: 'pressed' },
  { size: 'small', type: 'secondary', variant: 'outlined', state: 'disabled' },
  { size: 'medium', type: 'secondary', variant: 'outlined', state: 'default' },
  { size: 'medium', type: 'secondary', variant: 'outlined', state: 'hover' },
  { size: 'medium', type: 'secondary', variant: 'outlined', state: 'pressed' },
  { size: 'medium', type: 'secondary', variant: 'outlined', state: 'disabled' },
  { size: 'large', type: 'secondary', variant: 'outlined', state: 'default' },
  { size: 'large', type: 'secondary', variant: 'outlined', state: 'hover' },
  { size: 'large', type: 'secondary', variant: 'outlined', state: 'pressed' },
  { size: 'large', type: 'secondary', variant: 'outlined', state: 'disabled' },

  // Secondary Buttons - Ghost
  { size: 'small', type: 'secondary', variant: 'ghost', state: 'default' },
  { size: 'small', type: 'secondary', variant: 'ghost', state: 'hover' },
  { size: 'small', type: 'secondary', variant: 'ghost', state: 'pressed' },
  { size: 'small', type: 'secondary', variant: 'ghost', state: 'disabled' },
  { size: 'medium', type: 'secondary', variant: 'ghost', state: 'default' },
  { size: 'medium', type: 'secondary', variant: 'ghost', state: 'hover' },
  { size: 'medium', type: 'secondary', variant: 'ghost', state: 'pressed' },
  { size: 'medium', type: 'secondary', variant: 'ghost', state: 'disabled' },
  { size: 'large', type: 'secondary', variant: 'ghost', state: 'default' },
  { size: 'large', type: 'secondary', variant: 'ghost', state: 'hover' },
  { size: 'large', type: 'secondary', variant: 'ghost', state: 'pressed' },
  { size: 'large', type: 'secondary', variant: 'ghost', state: 'disabled' },

  // Danger Buttons - Filled
  { size: 'small', type: 'danger', variant: 'filled', state: 'default' },
  { size: 'small', type: 'danger', variant: 'filled', state: 'hover' },
  { size: 'small', type: 'danger', variant: 'filled', state: 'pressed' },
  { size: 'small', type: 'danger', variant: 'filled', state: 'disabled' },
  { size: 'medium', type: 'danger', variant: 'filled', state: 'default' },
  { size: 'medium', type: 'danger', variant: 'filled', state: 'hover' },
  { size: 'medium', type: 'danger', variant: 'filled', state: 'pressed' },
  { size: 'medium', type: 'danger', variant: 'filled', state: 'disabled' },
  { size: 'large', type: 'danger', variant: 'filled', state: 'default' },
  { size: 'large', type: 'danger', variant: 'filled', state: 'hover' },
  { size: 'large', type: 'danger', variant: 'filled', state: 'pressed' },
  { size: 'large', type: 'danger', variant: 'filled', state: 'disabled' },

  // Danger Buttons - Outlined
  { size: 'small', type: 'danger', variant: 'outlined', state: 'default' },
  { size: 'small', type: 'danger', variant: 'outlined', state: 'hover' },
  { size: 'small', type: 'danger', variant: 'outlined', state: 'pressed' },
  { size: 'small', type: 'danger', variant: 'outlined', state: 'disabled' },
  { size: 'medium', type: 'danger', variant: 'outlined', state: 'default' },
  { size: 'medium', type: 'danger', variant: 'outlined', state: 'hover' },
  { size: 'medium', type: 'danger', variant: 'outlined', state: 'pressed' },
  { size: 'medium', type: 'danger', variant: 'outlined', state: 'disabled' },
  { size: 'large', type: 'danger', variant: 'outlined', state: 'default' },
  { size: 'large', type: 'danger', variant: 'outlined', state: 'hover' },
  { size: 'large', type: 'danger', variant: 'outlined', state: 'pressed' },
  { size: 'large', type: 'danger', variant: 'outlined', state: 'disabled' },

  // Danger Buttons - Ghost
  { size: 'small', type: 'danger', variant: 'ghost', state: 'default' },
  { size: 'small', type: 'danger', variant: 'ghost', state: 'hover' },
  { size: 'small', type: 'danger', variant: 'ghost', state: 'pressed' },
  { size: 'small', type: 'danger', variant: 'ghost', state: 'disabled' },
  { size: 'medium', type: 'danger', variant: 'ghost', state: 'default' },
  { size: 'medium', type: 'danger', variant: 'ghost', state: 'hover' },
  { size: 'medium', type: 'danger', variant: 'ghost', state: 'pressed' },
  { size: 'medium', type: 'danger', variant: 'ghost', state: 'disabled' },
  { size: 'large', type: 'danger', variant: 'ghost', state: 'default' },
  { size: 'large', type: 'danger', variant: 'ghost', state: 'hover' },
  { size: 'large', type: 'danger', variant: 'ghost', state: 'pressed' },
  { size: 'large', type: 'danger', variant: 'ghost', state: 'disabled' }
] as const; 