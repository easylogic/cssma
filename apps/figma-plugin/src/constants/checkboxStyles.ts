import { variables } from '@/variables';

export const CHECKBOX_SIZES = {
  small: {
    size: 16,
    spacing: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  medium: {
    size: 20,
    spacing: 8,
    fontSize: 16,
    lineHeight: 24,
  },
} as const;

export const CHECKBOX_STYLES = {
  default: {
    box: {
      background: 'semantic/bg/default',
      border: 'semantic/border/default',
      check: 'semantic/action/primary/default',
    },
    label: {
      color: 'semantic/text/default',
    },
  },
  hover: {
    box: {
      background: 'semantic/bg/subtle',
      border: 'semantic/border/emphasized',
      check: 'semantic/action/primary/hover',
    },
    label: {
      color: 'semantic/text/default',
    },
  },
  pressed: {
    box: {
      background: 'semantic/bg/muted',
      border: 'semantic/border/emphasized',
      check: 'semantic/action/primary/pressed',
    },
    label: {
      color: 'semantic/text/default',
    },
  },
  disabled: {
    box: {
      background: 'semantic/bg/muted',
      border: 'semantic/border/subtle',
      check: 'semantic/text/disabled',
    },
    label: {
      color: 'semantic/text/disabled',
    },
  },
} as const;

export const CHECKBOX_VARIANTS = [
  // Default state variants
  { size: 'small', state: 'default', checked: false },
  { size: 'small', state: 'default', checked: true },
  { size: 'small', state: 'default', indeterminate: true },
  { size: 'medium', state: 'default', checked: false },
  { size: 'medium', state: 'default', checked: true },
  { size: 'medium', state: 'default', indeterminate: true },

  // Hover state variants
  { size: 'small', state: 'hover', checked: false },
  { size: 'small', state: 'hover', checked: true },
  { size: 'small', state: 'hover', indeterminate: true },
  { size: 'medium', state: 'hover', checked: false },
  { size: 'medium', state: 'hover', checked: true },
  { size: 'medium', state: 'hover', indeterminate: true },

  // Pressed state variants
  { size: 'small', state: 'pressed', checked: false },
  { size: 'small', state: 'pressed', checked: true },
  { size: 'small', state: 'pressed', indeterminate: true },
  { size: 'medium', state: 'pressed', checked: false },
  { size: 'medium', state: 'pressed', checked: true },
  { size: 'medium', state: 'pressed', indeterminate: true },

  // Disabled state variants
  { size: 'small', state: 'disabled', checked: false },
  { size: 'small', state: 'disabled', checked: true },
  { size: 'small', state: 'disabled', indeterminate: true },
  { size: 'medium', state: 'disabled', checked: false },
  { size: 'medium', state: 'disabled', checked: true },
  { size: 'medium', state: 'disabled', indeterminate: true },
] as const; 