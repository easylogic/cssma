import { RadioSize, RadioStyles } from '../types/radio';

export const RADIO_SIZES: RadioSize = {
  small: {
    size: 16,
    fontSize: 14,
    spacing: 8,
    dotSize: 6
  },
  medium: {
    size: 20,
    fontSize: 16,
    spacing: 10,
    dotSize: 8
  }
};

export const RADIO_STYLES: RadioStyles = {
  'default': {
    circle: {
      background: 'semantic/bg/default',
      border: 'semantic/border/default',
      dot: 'semantic/action/primary/default'
    },
    text: 'semantic/text/default'
  },
  'hover': {
    circle: {
      background: 'semantic/bg/subtle',
      border: 'semantic/border/emphasized',
      dot: 'semantic/action/primary/default'
    },
    text: 'semantic/text/default'
  },
  'pressed': {
    circle: {
      background: 'semantic/bg/muted',
      border: 'semantic/border/emphasized',
      dot: 'semantic/action/primary/pressed'
    },
    text: 'semantic/text/default'
  },
  'disabled': {
    circle: {
      background: 'semantic/bg/muted',
      border: 'semantic/border/subtle',
      dot: 'semantic/text/disabled'
    },
    text: 'semantic/text/disabled'
  }
};

export const RADIO_VARIANTS = [
  // Basic variants
  { size: 'small', state: 'default', checked: false },
  { size: 'medium', state: 'default', checked: false },

  // States - Unchecked
  { size: 'medium', state: 'hover', checked: false },
  { size: 'medium', state: 'pressed', checked: false },
  { size: 'medium', state: 'disabled', checked: false },

  // States - Checked
  { size: 'medium', state: 'default', checked: true },
  { size: 'medium', state: 'hover', checked: true },
  { size: 'medium', state: 'pressed', checked: true },
  { size: 'medium', state: 'disabled', checked: true }
] as const; 