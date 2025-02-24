import { CardStyle } from '@/types/card';

export const CARD_CONTENT_STYLES: Record<string, CardStyle['content']> = {
  'filled': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    padding: 'component/base/padding/md'
  },
  'outlined': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    padding: 'component/base/padding/md'
  },
  'elevated': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    padding: 'component/base/padding/md'
  }
} as const; 