import { BreadcrumbSize, BreadcrumbStyles } from '../types/breadcrumb';

export const BREADCRUMB_SIZES: BreadcrumbSize = {
  small: {
    height: 20,
    fontSize: 12,
    spacing: 8
  },
  medium: {
    height: 24,
    fontSize: 14,
    spacing: 12
  }
};

export const BREADCRUMB_STYLES: BreadcrumbStyles = {
  'default-default': {
    text: 'semantic/text/subtle',
    separator: 'semantic/text/muted',
    hover: 'semantic/text/default',
    active: 'semantic/action/primary/default'
  },
  'default-hover': {
    text: 'semantic/text/default',
    separator: 'semantic/text/muted',
    hover: 'semantic/text/default',
    active: 'semantic/action/primary/default'
  },
  'default-pressed': {
    text: 'semantic/text/muted',
    separator: 'semantic/text/muted',
    hover: 'semantic/text/default',
    active: 'semantic/action/primary/pressed'
  },
  'default-disabled': {
    text: 'semantic/text/disabled',
    separator: 'semantic/text/disabled',
    hover: 'semantic/text/disabled',
    active: 'semantic/text/disabled'
  }
};

export const BREADCRUMB_VARIANTS = [
  { size: 'small', state: 'default' },
  { size: 'small', state: 'hover' },
  { size: 'small', state: 'pressed' },
  { size: 'small', state: 'disabled' },
  { size: 'medium', state: 'default' },
  { size: 'medium', state: 'hover' },
  { size: 'medium', state: 'pressed' },
  { size: 'medium', state: 'disabled' }
] as const; 