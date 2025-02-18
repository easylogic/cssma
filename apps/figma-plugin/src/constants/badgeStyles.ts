import { BadgeSize, BadgeStyles } from '../types/badge';

export const BADGE_SIZES: BadgeSize = {
  small: { 
    height: 16, 
    fontSize: 12, 
    padding: 4,
    dotSize: 6
  },
  medium: { 
    height: 20, 
    fontSize: 14, 
    padding: 6,
    dotSize: 8
  }
};

export const BADGE_STYLES: BadgeStyles = {
  'default-filled-default': {
    background: 'semantic/bg/muted',
    text: 'semantic/text/default',
    border: 'semantic/border/default'
  },
  'default-filled-hover': {
    background: 'semantic/bg/emphasized',
    text: 'semantic/text/default',
    border: 'semantic/border/default'
  },
  'default-filled-pressed': {
    background: 'semantic/bg/subtle',
    text: 'semantic/text/default',
    border: 'semantic/border/default'
  },
  'primary-filled-default': {
    background: 'semantic/action/primary/default',
    text: 'semantic/text/onAccent',
    border: 'semantic/action/primary/default'
  },
  'primary-filled-hover': {
    background: 'semantic/action/primary/hover',
    text: 'semantic/text/onAccent',
    border: 'semantic/action/primary/hover'
  },
  'primary-filled-pressed': {
    background: 'semantic/action/primary/pressed',
    text: 'semantic/text/onAccent',
    border: 'semantic/action/primary/pressed'
  },
  'success-filled-default': {
    background: 'semantic/status/success/default',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/success/default'
  },
  'success-filled-hover': {
    background: 'semantic/status/success/hover',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/success/hover'
  },
  'success-filled-pressed': {
    background: 'semantic/status/success/pressed',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/success/pressed'
  },
  'warning-filled-default': {
    background: 'semantic/status/warning/default',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/warning/default'
  },
  'warning-filled-hover': {
    background: 'semantic/status/warning/hover',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/warning/hover'
  },
  'warning-filled-pressed': {
    background: 'semantic/status/warning/pressed',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/warning/pressed'
  },
  'danger-filled-default': {
    background: 'semantic/status/error/default',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/error/default'
  },
  'danger-filled-hover': {
    background: 'semantic/status/error/hover',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/error/hover'
  },
  'danger-filled-pressed': {
    background: 'semantic/status/error/pressed',
    text: 'semantic/text/onAccent',
    border: 'semantic/status/error/pressed'
  }
};

export const BADGE_VARIANTS = [
  // Text variants - Small
  { size: 'small', type: 'default', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'small', type: 'primary', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'small', type: 'success', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'small', type: 'warning', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'small', type: 'danger', variant: 'filled', shape: 'text', state: 'default' },

  // Dot variants - Small
  { size: 'small', type: 'default', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'small', type: 'primary', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'small', type: 'success', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'small', type: 'warning', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'small', type: 'danger', variant: 'filled', shape: 'dot', state: 'default' },

  // Text variants - Medium
  { size: 'medium', type: 'default', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'medium', type: 'primary', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'medium', type: 'success', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'medium', type: 'warning', variant: 'filled', shape: 'text', state: 'default' },
  { size: 'medium', type: 'danger', variant: 'filled', shape: 'text', state: 'default' },

  // Dot variants - Medium
  { size: 'medium', type: 'default', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'medium', type: 'primary', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'medium', type: 'success', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'medium', type: 'warning', variant: 'filled', shape: 'dot', state: 'default' },
  { size: 'medium', type: 'danger', variant: 'filled', shape: 'dot', state: 'default' }
] as const; 