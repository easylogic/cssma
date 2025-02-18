import { ProgressSizeConfig, ProgressStyleConfig, ProgressVariantProps } from '../types/progress';

export const PROGRESS_SIZES: ProgressSizeConfig = {
  small: {
    fontSize: 12,
    lineHeight: 16,
    spacing: 8,
    labelSpacing: 4,
    descriptionFontSize: 11,
    descriptionLineHeight: 14,
    linear: {
      height: 4,
      borderRadius: 2
    },
    circular: {
      size: 16,
      thickness: 2,
      gap: 2
    }
  },
  medium: {
    fontSize: 14,
    lineHeight: 20,
    spacing: 12,
    labelSpacing: 6,
    descriptionFontSize: 12,
    descriptionLineHeight: 16,
    linear: {
      height: 6,
      borderRadius: 3
    },
    circular: {
      size: 24,
      thickness: 3,
      gap: 3
    }
  },
  large: {
    fontSize: 16,
    lineHeight: 24,
    spacing: 16,
    labelSpacing: 8,
    descriptionFontSize: 14,
    descriptionLineHeight: 20,
    linear: {
      height: 8,
      borderRadius: 4
    },
    circular: {
      size: 32,
      thickness: 4,
      gap: 4
    }
  }
} as const;

export const PROGRESS_STYLES: ProgressStyleConfig = {
  default: {
    track: {
      default: 'semantic/bg/muted',
      disabled: 'semantic/bg/disabled'
    },
    indicator: {
      default: 'semantic/action/primary/default',
      disabled: 'semantic/action/primary/disabled'
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
      default: 'semantic/bg/muted',
      disabled: 'semantic/bg/disabled'
    },
    indicator: {
      default: 'semantic/status/success/default',
      disabled: 'semantic/status/success/disabled'
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
  warning: {
    track: {
      default: 'semantic/bg/muted',
      disabled: 'semantic/bg/disabled'
    },
    indicator: {
      default: 'semantic/status/warning/default',
      disabled: 'semantic/status/warning/disabled'
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
      default: 'semantic/bg/muted',
      disabled: 'semantic/bg/disabled'
    },
    indicator: {
      default: 'semantic/status/error/default',
      disabled: 'semantic/status/error/disabled'
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

export const PROGRESS_VARIANTS: ProgressVariantProps[] = [
  // Linear variants - Basic
  { variant: 'linear', size: 'small', value: 50 },
  { variant: 'linear', size: 'medium', value: 50 },
  { variant: 'linear', size: 'large', value: 50 },

  // Circular variants - Basic
  { variant: 'circular', size: 'small', value: 50 },
  { variant: 'circular', size: 'medium', value: 50 },
  { variant: 'circular', size: 'large', value: 50 },

  // Status variants - Linear
  { variant: 'linear', size: 'medium', status: 'default', value: 50 },
  { variant: 'linear', size: 'medium', status: 'success', value: 100 },
  { variant: 'linear', size: 'medium', status: 'warning', value: 70 },
  { variant: 'linear', size: 'medium', status: 'error', value: 30 },

  // Status variants - Circular
  { variant: 'circular', size: 'medium', status: 'default', value: 50 },
  { variant: 'circular', size: 'medium', status: 'success', value: 100 },
  { variant: 'circular', size: 'medium', status: 'warning', value: 70 },
  { variant: 'circular', size: 'medium', status: 'error', value: 30 },

  // Indeterminate variants
  { variant: 'linear', size: 'medium', indeterminate: true },
  { variant: 'circular', size: 'medium', indeterminate: true },

  // With label
  { variant: 'linear', size: 'medium', value: 50, label: 'Loading...' },
  { variant: 'circular', size: 'medium', value: 50, label: 'Loading...' },

  // With description
  { 
    variant: 'linear',
    size: 'medium',
    value: 50,
    label: 'Uploading files',
    description: '3 of 6 files uploaded'
  },
  { 
    variant: 'circular',
    size: 'medium',
    value: 50,
    label: 'Processing data',
    description: 'This may take a few minutes'
  },

  // With value display
  { variant: 'linear', size: 'medium', value: 50, showValue: true },
  { variant: 'circular', size: 'medium', value: 50, showValue: true },

  // Complex combinations
  { 
    variant: 'linear',
    size: 'large',
    status: 'success',
    value: 100,
    label: 'Upload complete',
    description: 'All files have been successfully uploaded',
    showValue: true
  },
  { 
    variant: 'circular',
    size: 'large',
    status: 'error',
    value: 30,
    label: 'Upload failed',
    description: 'Please check your connection and try again',
    showValue: true
  }
] as const; 