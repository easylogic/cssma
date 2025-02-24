import { CardStyle } from '@/types/card';

export const CARD_ROOT_STYLES: Record<string, CardStyle['root']> = {
  'filled': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    shadow: {
      default: 'component/base/shadow/sm',
      hover: 'component/base/shadow/lg',
      pressed: 'component/base/shadow/md',
      disabled: 'component/base/shadow/none'
    }
  },
  'outlined': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/subtle',
      pressed: 'surface/color/muted',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/border',
      hover: 'surface/color/border/hover',
      pressed: 'surface/color/border/pressed',
      disabled: 'surface/color/border/disabled'
    },
    shadow: {
      default: 'component/base/shadow/none',
      hover: 'component/base/shadow/sm',
      pressed: 'component/base/shadow/none',
      disabled: 'component/base/shadow/none'
    }
  },
  'elevated': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/subtle',
      pressed: 'surface/color/muted',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    },
    shadow: {
      default: 'component/base/shadow/lg',
      hover: 'component/base/shadow/xl',
      pressed: 'component/base/shadow/md',
      disabled: 'component/base/shadow/none'
    }
  }
} as const; 