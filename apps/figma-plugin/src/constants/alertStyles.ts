import { AlertSizeConfig, AlertStyleConfig } from '../types/alert';

export const ALERT_SIZES: AlertSizeConfig = {
  small: {
    padding: 12,
    iconSize: 16,
    fontSize: 14,
    spacing: 8,
    lineHeight: 20,
    borderRadius: 4,
  },
  medium: {
    padding: 16,
    iconSize: 20,
    fontSize: 16,
    spacing: 12,
    lineHeight: 24,
    borderRadius: 6,
  },
  large: {
    padding: 20,
    iconSize: 24,
    fontSize: 18,
    spacing: 16,
    lineHeight: 28,
    borderRadius: 8,
  },
} as const;

export const ALERT_STYLES: AlertStyleConfig = {
  info: {
    filled: {
      background: 'semantic/status/info/default',
      backgroundHover: 'semantic/status/info/hover',
      text: 'semantic/text/inverse',
      border: 'semantic/status/info/default',
      icon: 'semantic/text/inverse',
    },
    outlined: {
      background: 'semantic/bg/default',
      backgroundHover: 'semantic/status/info/ghost/hover',
      text: 'semantic/status/info/default',
      border: 'semantic/status/info/default',
      icon: 'semantic/status/info/default',
    },
  },
  success: {
    filled: {
      background: 'semantic/status/success/default',
      backgroundHover: 'semantic/status/success/hover',
      text: 'semantic/text/inverse',
      border: 'semantic/status/success/default',
      icon: 'semantic/text/inverse',
    },
    outlined: {
      background: 'semantic/bg/default',
      backgroundHover: 'semantic/status/success/ghost/hover',
      text: 'semantic/status/success/default',
      border: 'semantic/status/success/default',
      icon: 'semantic/status/success/default',
    },
  },
  warning: {
    filled: {
      background: 'semantic/status/warning/default',
      backgroundHover: 'semantic/status/warning/hover',
      text: 'semantic/text/inverse',
      border: 'semantic/status/warning/default',
      icon: 'semantic/text/inverse',
    },
    outlined: {
      background: 'semantic/bg/default',
      backgroundHover: 'semantic/status/warning/ghost/hover',
      text: 'semantic/status/warning/default',
      border: 'semantic/status/warning/default',
      icon: 'semantic/status/warning/default',
    },
  },
  error: {
    filled: {
      background: 'semantic/status/error/default',
      backgroundHover: 'semantic/status/error/hover',
      text: 'semantic/text/inverse',
      border: 'semantic/status/error/default',
      icon: 'semantic/text/inverse',
    },
    outlined: {
      background: 'semantic/bg/default',
      backgroundHover: 'semantic/status/error/ghost/hover',
      text: 'semantic/status/error/default',
      border: 'semantic/status/error/default',
      icon: 'semantic/status/error/default',
    },
  },
} as const;

export const ALERT_VARIANTS = [
  // Info variants
  { size: 'small', type: 'info', variant: 'filled', hasIcon: true, hasTitle: false, closable: false },
  { size: 'small', type: 'info', variant: 'outlined', hasIcon: true, hasTitle: false, closable: false },
  { size: 'medium', type: 'info', variant: 'filled', hasIcon: true, hasTitle: true, closable: true },
  { size: 'medium', type: 'info', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true },
  { size: 'large', type: 'info', variant: 'filled', hasIcon: true, hasTitle: true, closable: true, action: true },
  { size: 'large', type: 'info', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true, action: true },

  // Success variants
  { size: 'small', type: 'success', variant: 'filled', hasIcon: true, hasTitle: false, closable: false },
  { size: 'small', type: 'success', variant: 'outlined', hasIcon: true, hasTitle: false, closable: false },
  { size: 'medium', type: 'success', variant: 'filled', hasIcon: true, hasTitle: true, closable: true },
  { size: 'medium', type: 'success', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true },
  { size: 'large', type: 'success', variant: 'filled', hasIcon: true, hasTitle: true, closable: true, action: true },
  { size: 'large', type: 'success', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true, action: true },

  // Warning variants
  { size: 'small', type: 'warning', variant: 'filled', hasIcon: true, hasTitle: false, closable: false },
  { size: 'small', type: 'warning', variant: 'outlined', hasIcon: true, hasTitle: false, closable: false },
  { size: 'medium', type: 'warning', variant: 'filled', hasIcon: true, hasTitle: true, closable: true },
  { size: 'medium', type: 'warning', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true },
  { size: 'large', type: 'warning', variant: 'filled', hasIcon: true, hasTitle: true, closable: true, action: true },
  { size: 'large', type: 'warning', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true, action: true },

  // Error variants
  { size: 'small', type: 'error', variant: 'filled', hasIcon: true, hasTitle: false, closable: false },
  { size: 'small', type: 'error', variant: 'outlined', hasIcon: true, hasTitle: false, closable: false },
  { size: 'medium', type: 'error', variant: 'filled', hasIcon: true, hasTitle: true, closable: true },
  { size: 'medium', type: 'error', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true },
  { size: 'large', type: 'error', variant: 'filled', hasIcon: true, hasTitle: true, closable: true, action: true },
  { size: 'large', type: 'error', variant: 'outlined', hasIcon: true, hasTitle: true, closable: true, action: true },
] as const; 