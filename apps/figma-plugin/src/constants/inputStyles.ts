import { InputSize, InputStyles } from '../types/input';

export const INPUT_SIZES: InputSize = {
  small: {
    height: 32,
    fontSize: 14,
    padding: 12,
    iconSize: 16,
    helperTextSize: 12
  },
  medium: {
    height: 40,
    fontSize: 16,
    padding: 16,
    iconSize: 20,
    helperTextSize: 14
  }
};

export const INPUT_STYLES: InputStyles = {
  'default': {
    background: 'semantic/bg/default',
    text: 'semantic/text/default',
    border: 'semantic/border/default',
    placeholder: 'semantic/text/muted',
    helper: 'semantic/text/subtle'
  },
  'hover': {
    background: 'semantic/bg/subtle',
    text: 'semantic/text/default',
    border: 'semantic/border/emphasized',
    placeholder: 'semantic/text/muted',
    helper: 'semantic/text/subtle'
  },
  'focused': {
    background: 'semantic/bg/default',
    text: 'semantic/text/default',
    border: 'semantic/action/primary/default',
    placeholder: 'semantic/text/muted',
    helper: 'semantic/text/subtle'
  },
  'disabled': {
    background: 'semantic/bg/muted',
    text: 'semantic/text/disabled',
    border: 'semantic/border/subtle',
    placeholder: 'semantic/text/disabled',
    helper: 'semantic/text/disabled'
  },
  'error': {
    background: 'semantic/bg/default',
    text: 'semantic/text/default',
    border: 'semantic/status/error/default',
    placeholder: 'semantic/text/muted',
    helper: 'semantic/status/error/default'
  }
};

export const INPUT_VARIANTS = [
  // Basic variants
  { size: 'small', state: 'default', hasIcon: false, hasHelper: false },
  { size: 'medium', state: 'default', hasIcon: false, hasHelper: false },

  // States
  { size: 'medium', state: 'hover', hasIcon: false, hasHelper: false },
  { size: 'medium', state: 'focused', hasIcon: false, hasHelper: false },
  { size: 'medium', state: 'disabled', hasIcon: false, hasHelper: false },
  { size: 'medium', state: 'error', hasIcon: false, hasHelper: true },

  // With icons
  { size: 'medium', state: 'default', hasIcon: true, iconPosition: 'left', hasHelper: false },
  { size: 'medium', state: 'default', hasIcon: true, iconPosition: 'right', hasHelper: false },
  { size: 'medium', state: 'error', hasIcon: true, iconPosition: 'right', hasHelper: true }
] as const; 