import { CardSizeConfig, CardStyleConfig, CardVariantProps } from '../types/card';

export const CARD_SIZES: CardSizeConfig = {
  small: {
    padding: 16,
    spacing: 12,
    borderRadius: 8,
    mediaHeight: 160,
    headerSpacing: 12,
    footerSpacing: 12,
    actionSpacing: 8,
  },
  medium: {
    padding: 24,
    spacing: 16,
    borderRadius: 12,
    mediaHeight: 200,
    headerSpacing: 16,
    footerSpacing: 16,
    actionSpacing: 12,
  },
  large: {
    padding: 32,
    spacing: 24,
    borderRadius: 16,
    mediaHeight: 240,
    headerSpacing: 20,
    footerSpacing: 20,
    actionSpacing: 16,
  },
} as const;

export const CARD_STYLES: CardStyleConfig = {
  elevated: {
    background: {
      default: 'semantic/bg/default',
      hover: 'semantic/bg/hover',
      pressed: 'semantic/bg/pressed',
    },
    border: {
      default: 'semantic/border/default',
      hover: 'semantic/border/hover',
      pressed: 'semantic/border/pressed',
    },
    shadow: {
      default: 'semantic/shadow/sm',
      hover: 'semantic/shadow/md',
      pressed: 'semantic/shadow/lg',
    },
  },
  outlined: {
    background: {
      default: 'semantic/bg/default',
      hover: 'semantic/bg/hover',
      pressed: 'semantic/bg/pressed',
    },
    border: {
      default: 'semantic/border/default',
      hover: 'semantic/border/hover',
      pressed: 'semantic/border/pressed',
    },
    shadow: {
      default: 'none',
      hover: 'none',
      pressed: 'none',
    },
  },
  filled: {
    background: {
      default: 'semantic/bg/muted',
      hover: 'semantic/bg/hover',
      pressed: 'semantic/bg/pressed',
    },
    border: {
      default: 'semantic/border/subtle',
      hover: 'semantic/border/hover',
      pressed: 'semantic/border/pressed',
    },
    shadow: {
      default: 'none',
      hover: 'none',
      pressed: 'none',
    },
  },
} as const;

export const CARD_VARIANTS: CardVariantProps[] = [
  // Basic variants without interaction
  { size: 'small', variant: 'elevated', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'small', variant: 'outlined', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'small', variant: 'filled', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'elevated', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'outlined', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'filled', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'large', variant: 'elevated', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'large', variant: 'outlined', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'large', variant: 'filled', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },

  // Interactive variants
  { size: 'small', variant: 'elevated', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'small', variant: 'outlined', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'small', variant: 'filled', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'elevated', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'outlined', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'filled', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'large', variant: 'elevated', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'large', variant: 'outlined', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'large', variant: 'filled', interaction: 'clickable', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: false },

  // With header
  { size: 'medium', variant: 'elevated', interaction: 'none', hasHeader: true, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'outlined', interaction: 'none', hasHeader: true, hasMedia: false, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'filled', interaction: 'none', hasHeader: true, hasMedia: false, hasFooter: false, hasActions: false },

  // With media
  { size: 'medium', variant: 'elevated', interaction: 'none', hasHeader: false, hasMedia: true, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'outlined', interaction: 'none', hasHeader: false, hasMedia: true, hasFooter: false, hasActions: false },
  { size: 'medium', variant: 'filled', interaction: 'none', hasHeader: false, hasMedia: true, hasFooter: false, hasActions: false },

  // With footer
  { size: 'medium', variant: 'elevated', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: true, hasActions: false },
  { size: 'medium', variant: 'outlined', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: true, hasActions: false },
  { size: 'medium', variant: 'filled', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: true, hasActions: false },

  // With actions
  { size: 'medium', variant: 'elevated', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: true },
  { size: 'medium', variant: 'outlined', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: true },
  { size: 'medium', variant: 'filled', interaction: 'none', hasHeader: false, hasMedia: false, hasFooter: false, hasActions: true },

  // Complex combinations
  { size: 'medium', variant: 'elevated', interaction: 'clickable', hasHeader: true, hasMedia: true, hasFooter: true, hasActions: true },
  { size: 'medium', variant: 'outlined', interaction: 'clickable', hasHeader: true, hasMedia: true, hasFooter: true, hasActions: true },
  { size: 'medium', variant: 'filled', interaction: 'clickable', hasHeader: true, hasMedia: true, hasFooter: true, hasActions: true },
] as const; 