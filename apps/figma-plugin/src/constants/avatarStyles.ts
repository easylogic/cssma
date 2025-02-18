import { AvatarSizeConfig, AvatarStyleConfig, AvatarVariantProps } from '../types/avatar';

export const AVATAR_SIZES: AvatarSizeConfig = {
  xsmall: {
    size: 24,
    fontSize: 12,
    lineHeight: 16,
    borderRadius: 12,
    statusSize: 8,
    statusOffset: 2,
  },
  small: {
    size: 32,
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 16,
    statusSize: 8,
    statusOffset: 2,
  },
  medium: {
    size: 40,
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 20,
    statusSize: 10,
    statusOffset: 2,
  },
  large: {
    size: 48,
    fontSize: 20,
    lineHeight: 28,
    borderRadius: 24,
    statusSize: 12,
    statusOffset: 3,
  },
  xlarge: {
    size: 64,
    fontSize: 24,
    lineHeight: 32,
    borderRadius: 32,
    statusSize: 14,
    statusOffset: 3,
  },
} as const;

export const AVATAR_STYLES: AvatarStyleConfig = {
  background: {
    default: 'semantic/bg/default',
    placeholder: 'semantic/bg/muted',
  },
  text: {
    default: 'semantic/text/default',
  },
  status: {
    online: {
      background: 'semantic/status/success/default',
      border: 'semantic/bg/default',
    },
    offline: {
      background: 'semantic/text/disabled',
      border: 'semantic/bg/default',
    },
    away: {
      background: 'semantic/status/warning/default',
      border: 'semantic/bg/default',
    },
    busy: {
      background: 'semantic/status/error/default',
      border: 'semantic/bg/default',
    },
  },
  border: {
    default: 'semantic/border/default',
  },
} as const;

export const AVATAR_VARIANTS: AvatarVariantProps[] = [
  // Circle variants without status
  { size: 'xsmall', variant: 'circle', hasImage: true },
  { size: 'xsmall', variant: 'circle', hasImage: false },
  { size: 'small', variant: 'circle', hasImage: true },
  { size: 'small', variant: 'circle', hasImage: false },
  { size: 'medium', variant: 'circle', hasImage: true },
  { size: 'medium', variant: 'circle', hasImage: false },
  { size: 'large', variant: 'circle', hasImage: true },
  { size: 'large', variant: 'circle', hasImage: false },
  { size: 'xlarge', variant: 'circle', hasImage: true },
  { size: 'xlarge', variant: 'circle', hasImage: false },

  // Square variants without status
  { size: 'xsmall', variant: 'square', hasImage: true },
  { size: 'xsmall', variant: 'square', hasImage: false },
  { size: 'small', variant: 'square', hasImage: true },
  { size: 'small', variant: 'square', hasImage: false },
  { size: 'medium', variant: 'square', hasImage: true },
  { size: 'medium', variant: 'square', hasImage: false },
  { size: 'large', variant: 'square', hasImage: true },
  { size: 'large', variant: 'square', hasImage: false },
  { size: 'xlarge', variant: 'square', hasImage: true },
  { size: 'xlarge', variant: 'square', hasImage: false },

  // Circle variants with status
  { size: 'small', variant: 'circle', hasImage: true, status: 'online' },
  { size: 'small', variant: 'circle', hasImage: true, status: 'offline' },
  { size: 'small', variant: 'circle', hasImage: true, status: 'away' },
  { size: 'small', variant: 'circle', hasImage: true, status: 'busy' },
  { size: 'medium', variant: 'circle', hasImage: true, status: 'online' },
  { size: 'medium', variant: 'circle', hasImage: true, status: 'offline' },
  { size: 'medium', variant: 'circle', hasImage: true, status: 'away' },
  { size: 'medium', variant: 'circle', hasImage: true, status: 'busy' },
  { size: 'large', variant: 'circle', hasImage: true, status: 'online' },
  { size: 'large', variant: 'circle', hasImage: true, status: 'offline' },
  { size: 'large', variant: 'circle', hasImage: true, status: 'away' },
  { size: 'large', variant: 'circle', hasImage: true, status: 'busy' },

  // Square variants with status
  { size: 'small', variant: 'square', hasImage: true, status: 'online' },
  { size: 'small', variant: 'square', hasImage: true, status: 'offline' },
  { size: 'small', variant: 'square', hasImage: true, status: 'away' },
  { size: 'small', variant: 'square', hasImage: true, status: 'busy' },
  { size: 'medium', variant: 'square', hasImage: true, status: 'online' },
  { size: 'medium', variant: 'square', hasImage: true, status: 'offline' },
  { size: 'medium', variant: 'square', hasImage: true, status: 'away' },
  { size: 'medium', variant: 'square', hasImage: true, status: 'busy' },
  { size: 'large', variant: 'square', hasImage: true, status: 'online' },
  { size: 'large', variant: 'square', hasImage: true, status: 'offline' },
  { size: 'large', variant: 'square', hasImage: true, status: 'away' },
  { size: 'large', variant: 'square', hasImage: true, status: 'busy' },
] as const; 