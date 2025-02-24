import { CardStyle } from '@/types/card';

export const CARD_MEDIA_STYLES: Record<string, CardStyle['media']> = {
  'filled': {
    aspectRatio: '16/9',
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'border/color/default',
      hover: 'border/color/hover',
      pressed: 'border/color/pressed',
      disabled: 'border/color/disabled'
    },
    overlay: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'outlined': {
    aspectRatio: '16/9',
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'border/color/default',
      hover: 'border/color/hover',
      pressed: 'border/color/pressed',
      disabled: 'border/color/disabled'
    },
    overlay: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'elevated': {
    aspectRatio: '16/9',
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'border/color/default',
      hover: 'border/color/hover',
      pressed: 'border/color/pressed',
      disabled: 'border/color/disabled'
    },
    overlay: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    }
  }
} as const; 