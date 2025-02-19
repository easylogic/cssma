import { AvatarSizeConfig, AvatarStyles, AvatarVariantProps } from '../types/avatar';

export const AVATAR_SIZES: AvatarSizeConfig = {
  'small': {
    size: 'component/base/height/xs',
    fontSize: 'text/body/xs',
    borderRadius: 'component/base/radius/pill',
    borderWidth: 'component/base/border/width/thin',
    iconSize: 'component/base/icon/xs',
    spacing: 'component/base/gap/xs'
  },
  'medium': {
    size: 'component/base/height/sm',
    fontSize: 'text/body/sm',
    borderRadius: 'component/base/radius/pill',
    borderWidth: 'component/base/border/width/thin',
    iconSize: 'component/base/icon/sm',
    spacing: 'component/base/gap/sm'
  },
  'large': {
    size: 'component/base/height/md',
    fontSize: 'text/body/md',
    borderRadius: 'component/base/radius/pill',
    borderWidth: 'component/base/border/width/thin',
    iconSize: 'component/base/icon/md',
    spacing: 'component/base/gap/md'
  }
} as const;

export const AVATAR_STYLES: AvatarStyles = {
  'default': {
    background: {
      default: 'surface/color/default',
      error: 'status/error/default'
    },
    text: {
      default: 'text/color/default',
      error: 'text/color/inverse'
    },
    border: {
      default: 'surface/color/default',
      error: 'status/error/default'
    }
  }
} as const;

export const AVATAR_VARIANTS: AvatarVariantProps[] = [
  // Size variants
  { size: 'small', type: 'image', status: 'default', shape: 'circle' },
  { size: 'medium', type: 'image', status: 'default', shape: 'circle' },
  { size: 'large', type: 'image', status: 'default', shape: 'circle' },

  // Type variants
  { size: 'medium', type: 'image', status: 'default', shape: 'circle' },
  { size: 'medium', type: 'initial', status: 'default', shape: 'circle', initials: 'JD' },
  { size: 'medium', type: 'icon', status: 'default', shape: 'circle', icon: 'user' },

  // Shape variants
  { size: 'medium', type: 'image', status: 'default', shape: 'circle' },
  { size: 'medium', type: 'image', status: 'default', shape: 'square' },

  // Status variants
  { size: 'medium', type: 'image', status: 'default', shape: 'circle' },
  { size: 'medium', type: 'image', status: 'error', shape: 'circle' },

  // With badge
  { 
    size: 'medium', 
    type: 'image', 
    status: 'default', 
    shape: 'circle', 
    badge: { status: 'online' }, 
    badgeContent: '3' 
  },
  { 
    size: 'medium', 
    type: 'initial', 
    status: 'default', 
    shape: 'circle', 
    initials: 'JD', 
    badge: { status: 'online' } 
  },
  { 
    size: 'medium', 
    type: 'icon', 
    status: 'default', 
    shape: 'circle', 
    icon: 'user', 
    badge: { status: 'online' } 
  }
] as const; 