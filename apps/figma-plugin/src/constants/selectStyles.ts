import { SelectSizeConfig, SelectStyleConfig, SelectVariantProps } from '../types/select';

export const SELECT_SIZES: SelectSizeConfig = {
  small: {
    height: 32,
    fontSize: 14,
    lineHeight: 20,
    padding: 8,
    borderRadius: 6,
    iconSize: 16,
    spacing: 8,
    labelSpacing: 4,
    optionHeight: 32,
    optionPadding: 8,
    menuMaxHeight: 200
  },
  medium: {
    height: 40,
    fontSize: 16,
    lineHeight: 24,
    padding: 12,
    borderRadius: 8,
    iconSize: 20,
    spacing: 12,
    labelSpacing: 6,
    optionHeight: 40,
    optionPadding: 12,
    menuMaxHeight: 280
  },
  large: {
    height: 48,
    fontSize: 18,
    lineHeight: 28,
    padding: 16,
    borderRadius: 10,
    iconSize: 24,
    spacing: 16,
    labelSpacing: 8,
    optionHeight: 48,
    optionPadding: 16,
    menuMaxHeight: 320
  }
} as const;

export const SELECT_STYLES: SelectStyleConfig = {
  outlined: {
    background: {
      default: 'semantic/bg/default',
      hover: 'semantic/bg/hover',
      focused: 'semantic/bg/default',
      disabled: 'semantic/bg/disabled',
      error: 'semantic/bg/error/subtle'
    },
    border: {
      default: 'semantic/border/default',
      hover: 'semantic/border/hover',
      focused: 'semantic/border/focused',
      disabled: 'semantic/border/disabled',
      error: 'semantic/border/error'
    },
    text: {
      default: 'semantic/text/default',
      hover: 'semantic/text/default',
      focused: 'semantic/text/default',
      placeholder: 'semantic/text/muted',
      disabled: 'semantic/text/disabled',
      error: 'semantic/text/error'
    },
    icon: {
      default: 'semantic/text/muted',
      hover: 'semantic/text/muted',
      focused: 'semantic/text/default',
      disabled: 'semantic/text/disabled',
      error: 'semantic/text/error'
    },
    label: {
      default: 'semantic/text/muted',
      hover: 'semantic/text/muted',
      focused: 'semantic/text/default',
      disabled: 'semantic/text/disabled',
      error: 'semantic/text/error'
    },
    helper: {
      default: 'semantic/text/muted',
      error: 'semantic/text/error'
    },
    menu: {
      background: 'semantic/bg/default',
      border: 'semantic/border/default',
      shadow: 'semantic/shadow/md',
      optionBackground: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/hover',
        selected: 'semantic/bg/selected',
        disabled: 'semantic/bg/disabled'
      },
      optionText: {
        default: 'semantic/text/default',
        selected: 'semantic/text/selected',
        disabled: 'semantic/text/disabled'
      },
      optionIcon: {
        default: 'semantic/text/muted',
        selected: 'semantic/text/selected',
        disabled: 'semantic/text/disabled'
      }
    }
  },
  filled: {
    background: {
      default: 'semantic/bg/muted',
      hover: 'semantic/bg/muted/hover',
      focused: 'semantic/bg/default',
      disabled: 'semantic/bg/disabled',
      error: 'semantic/bg/error/subtle'
    },
    border: {
      default: 'semantic/border/subtle',
      hover: 'semantic/border/hover',
      focused: 'semantic/border/focused',
      disabled: 'semantic/border/disabled',
      error: 'semantic/border/error'
    },
    text: {
      default: 'semantic/text/default',
      hover: 'semantic/text/default',
      focused: 'semantic/text/default',
      placeholder: 'semantic/text/muted',
      disabled: 'semantic/text/disabled',
      error: 'semantic/text/error'
    },
    icon: {
      default: 'semantic/text/muted',
      hover: 'semantic/text/muted',
      focused: 'semantic/text/default',
      disabled: 'semantic/text/disabled',
      error: 'semantic/text/error'
    },
    label: {
      default: 'semantic/text/muted',
      hover: 'semantic/text/muted',
      focused: 'semantic/text/default',
      disabled: 'semantic/text/disabled',
      error: 'semantic/text/error'
    },
    helper: {
      default: 'semantic/text/muted',
      error: 'semantic/text/error'
    },
    menu: {
      background: 'semantic/bg/default',
      border: 'semantic/border/default',
      shadow: 'semantic/shadow/md',
      optionBackground: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/hover',
        selected: 'semantic/bg/selected',
        disabled: 'semantic/bg/disabled'
      },
      optionText: {
        default: 'semantic/text/default',
        selected: 'semantic/text/selected',
        disabled: 'semantic/text/disabled'
      },
      optionIcon: {
        default: 'semantic/text/muted',
        selected: 'semantic/text/selected',
        disabled: 'semantic/text/disabled'
      }
    }
  }
} as const;

export const SELECT_VARIANTS: SelectVariantProps[] = [
  // Basic variants
  { size: 'small', variant: 'outlined', state: 'default' },
  { size: 'small', variant: 'filled', state: 'default' },
  { size: 'medium', variant: 'outlined', state: 'default' },
  { size: 'medium', variant: 'filled', state: 'default' },
  { size: 'large', variant: 'outlined', state: 'default' },
  { size: 'large', variant: 'filled', state: 'default' },

  // States
  { size: 'medium', variant: 'outlined', state: 'hover' },
  { size: 'medium', variant: 'outlined', state: 'focused' },
  { size: 'medium', variant: 'outlined', state: 'disabled' },
  { size: 'medium', variant: 'outlined', state: 'error' },
  { size: 'medium', variant: 'filled', state: 'hover' },
  { size: 'medium', variant: 'filled', state: 'focused' },
  { size: 'medium', variant: 'filled', state: 'disabled' },
  { size: 'medium', variant: 'filled', state: 'error' },

  // With label
  { size: 'medium', variant: 'outlined', state: 'default', label: 'Label' },
  { size: 'medium', variant: 'filled', state: 'default', label: 'Label' },
  { size: 'medium', variant: 'outlined', state: 'focused', label: 'Label' },
  { size: 'medium', variant: 'filled', state: 'focused', label: 'Label' },

  // With helper text
  { size: 'medium', variant: 'outlined', state: 'default', helperText: 'Helper text' },
  { size: 'medium', variant: 'filled', state: 'default', helperText: 'Helper text' },
  { size: 'medium', variant: 'outlined', state: 'error', errorText: 'Error message' },
  { size: 'medium', variant: 'filled', state: 'error', errorText: 'Error message' },

  // With placeholder
  { size: 'medium', variant: 'outlined', state: 'default', placeholder: 'Select an option' },
  { size: 'medium', variant: 'filled', state: 'default', placeholder: 'Select an option' },

  // Multiple selection
  { size: 'medium', variant: 'outlined', state: 'default', multiple: true },
  { size: 'medium', variant: 'filled', state: 'default', multiple: true },

  // Searchable
  { size: 'medium', variant: 'outlined', state: 'default', searchable: true },
  { size: 'medium', variant: 'filled', state: 'default', searchable: true },

  // Loading state
  { size: 'medium', variant: 'outlined', state: 'default', loading: true },
  { size: 'medium', variant: 'filled', state: 'default', loading: true },

  // Required
  { size: 'medium', variant: 'outlined', state: 'default', required: true, label: 'Required field' },
  { size: 'medium', variant: 'filled', state: 'default', required: true, label: 'Required field' },

  // Clearable
  { size: 'medium', variant: 'outlined', state: 'default', clearable: true },
  { size: 'medium', variant: 'filled', state: 'default', clearable: true },

  // Complex combinations
  { 
    size: 'medium', 
    variant: 'outlined', 
    state: 'default',
    label: 'Complex Select',
    helperText: 'With all features enabled',
    placeholder: 'Select options',
    multiple: true,
    searchable: true,
    clearable: true,
    required: true
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    state: 'default',
    label: 'Complex Select',
    helperText: 'With all features enabled',
    placeholder: 'Select options',
    multiple: true,
    searchable: true,
    clearable: true,
    required: true
  }
] as const; 