import { CardStyle } from '@/types/card';

export const CARD_MEDIA_STYLES: Record<string, CardStyle['media']> = {
  'filled': {
    aspectRatio: '16/9',
    overlay: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'outlined': {
    aspectRatio: '16/9',
    overlay: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'elevated': {
    aspectRatio: '16/9',
    overlay: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    }
  }
} as const; 