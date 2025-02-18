import { SwitchSizeConfig, SwitchStyleConfig, SwitchVariantProps } from '../types/switch';

export const SWITCH_SIZES: SwitchSizeConfig = {
  small: {
    height: 16,
    width: 28,
    thumbSize: 12,
    thumbOffset: 2,
    fontSize: 14,
    lineHeight: 20,
    spacing: 8,
    labelSpacing: 8,
    descriptionFontSize: 12,
    descriptionLineHeight: 16
  },
  medium: {
    height: 20,
    width: 36,
    thumbSize: 16,
    thumbOffset: 2,
    fontSize: 16,
    lineHeight: 24,
    spacing: 12,
    labelSpacing: 12,
    descriptionFontSize: 14,
    descriptionLineHeight: 20
  },
  large: {
    height: 24,
    width: 44,
    thumbSize: 20,
    thumbOffset: 2,
    fontSize: 18,
    lineHeight: 28,
    spacing: 16,
    labelSpacing: 16,
    descriptionFontSize: 16,
    descriptionLineHeight: 24
  }
} as const;

export const SWITCH_STYLES: SwitchStyleConfig = {
  default: {
    track: {
      unchecked: {
        default: 'semantic/bg/muted',
        hover: 'semantic/bg/muted/hover',
        pressed: 'semantic/bg/muted/pressed',
        disabled: 'semantic/bg/disabled'
      },
      checked: {
        default: 'semantic/action/primary/default',
        hover: 'semantic/action/primary/hover',
        pressed: 'semantic/action/primary/pressed',
        disabled: 'semantic/action/primary/disabled'
      }
    },
    thumb: {
      unchecked: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/default',
        pressed: 'semantic/bg/default',
        disabled: 'semantic/bg/disabled'
      },
      checked: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/default',
        pressed: 'semantic/bg/default',
        disabled: 'semantic/bg/disabled'
      }
    },
    text: {
      default: 'semantic/text/default',
      disabled: 'semantic/text/disabled'
    },
    description: {
      default: 'semantic/text/muted',
      disabled: 'semantic/text/disabled'
    }
  },
  success: {
    track: {
      unchecked: {
        default: 'semantic/bg/muted',
        hover: 'semantic/bg/muted/hover',
        pressed: 'semantic/bg/muted/pressed',
        disabled: 'semantic/bg/disabled'
      },
      checked: {
        default: 'semantic/status/success/default',
        hover: 'semantic/status/success/hover',
        pressed: 'semantic/status/success/pressed',
        disabled: 'semantic/status/success/disabled'
      }
    },
    thumb: {
      unchecked: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/default',
        pressed: 'semantic/bg/default',
        disabled: 'semantic/bg/disabled'
      },
      checked: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/default',
        pressed: 'semantic/bg/default',
        disabled: 'semantic/bg/disabled'
      }
    },
    text: {
      default: 'semantic/text/default',
      disabled: 'semantic/text/disabled'
    },
    description: {
      default: 'semantic/text/muted',
      disabled: 'semantic/text/disabled'
    }
  },
  error: {
    track: {
      unchecked: {
        default: 'semantic/bg/muted',
        hover: 'semantic/bg/muted/hover',
        pressed: 'semantic/bg/muted/pressed',
        disabled: 'semantic/bg/disabled'
      },
      checked: {
        default: 'semantic/status/error/default',
        hover: 'semantic/status/error/hover',
        pressed: 'semantic/status/error/pressed',
        disabled: 'semantic/status/error/disabled'
      }
    },
    thumb: {
      unchecked: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/default',
        pressed: 'semantic/bg/default',
        disabled: 'semantic/bg/disabled'
      },
      checked: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/default',
        pressed: 'semantic/bg/default',
        disabled: 'semantic/bg/disabled'
      }
    },
    text: {
      default: 'semantic/text/default',
      disabled: 'semantic/text/disabled'
    },
    description: {
      default: 'semantic/text/muted',
      disabled: 'semantic/text/disabled'
    }
  }
} as const;

export const SWITCH_VARIANTS: SwitchVariantProps[] = [
  // Basic variants
  { size: 'small', state: 'default', status: 'default', checked: false },
  { size: 'small', state: 'default', status: 'default', checked: true },
  { size: 'medium', state: 'default', status: 'default', checked: false },
  { size: 'medium', state: 'default', status: 'default', checked: true },
  { size: 'large', state: 'default', status: 'default', checked: false },
  { size: 'large', state: 'default', status: 'default', checked: true },

  // States
  { size: 'medium', state: 'hover', status: 'default', checked: false },
  { size: 'medium', state: 'hover', status: 'default', checked: true },
  { size: 'medium', state: 'pressed', status: 'default', checked: false },
  { size: 'medium', state: 'pressed', status: 'default', checked: true },
  { size: 'medium', state: 'disabled', status: 'default', checked: false },
  { size: 'medium', state: 'disabled', status: 'default', checked: true },

  // Status variants
  { size: 'medium', state: 'default', status: 'success', checked: true },
  { size: 'medium', state: 'default', status: 'error', checked: true },

  // With label
  { size: 'medium', state: 'default', status: 'default', checked: false, label: 'Switch label' },
  { size: 'medium', state: 'default', status: 'default', checked: true, label: 'Switch label' },
  { size: 'medium', state: 'default', status: 'default', checked: false, label: 'Switch label', labelPosition: 'left' },
  { size: 'medium', state: 'default', status: 'default', checked: true, label: 'Switch label', labelPosition: 'left' },

  // With description
  { size: 'medium', state: 'default', status: 'default', checked: false, label: 'Switch label', description: 'Additional description text' },
  { size: 'medium', state: 'default', status: 'default', checked: true, label: 'Switch label', description: 'Additional description text' },

  // Required
  { size: 'medium', state: 'default', status: 'default', checked: false, label: 'Required switch', required: true },
  { size: 'medium', state: 'default', status: 'default', checked: true, label: 'Required switch', required: true },

  // Loading
  { size: 'medium', state: 'default', status: 'default', checked: false, loading: true },
  { size: 'medium', state: 'default', status: 'default', checked: true, loading: true },

  // Complex combinations
  { 
    size: 'medium',
    state: 'default',
    status: 'success',
    checked: true,
    label: 'Feature enabled',
    description: 'This feature is now active and working correctly',
    required: true
  },
  { 
    size: 'medium',
    state: 'default',
    status: 'error',
    checked: false,
    label: 'Feature disabled',
    description: 'There was an error enabling this feature',
    required: true
  }
] as const; 