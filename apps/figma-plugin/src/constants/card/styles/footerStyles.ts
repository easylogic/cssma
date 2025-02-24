import { CardStyle } from '@/types/card';

export const CARD_FOOTER_STYLES: Record<string, CardStyle['footer']> = {
  'filled': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/border',
      hover: 'surface/color/border/hover',
      pressed: 'surface/color/border/pressed',
      disabled: 'surface/color/border/disabled'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    padding: 'component/base/padding/sm'
  },
  'outlined': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/border',
      hover: 'surface/color/border/hover',
      pressed: 'surface/color/border/pressed',
      disabled: 'surface/color/border/disabled'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    padding: 'component/base/padding/sm'
  },
  'elevated': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/border',
      hover: 'surface/color/border/hover',
      pressed: 'surface/color/border/pressed',
      disabled: 'surface/color/border/disabled'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    padding: 'component/base/padding/sm'
  }
} as const; 