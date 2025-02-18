import { AvatarSizeConfig, AvatarStyles, AvatarVariantProps } from '../types/avatar';

export const AVATAR_SIZES: AvatarSizeConfig = {
  'small': {
    size: 'avatar/size/small',
    fontSize: 'avatar/typography/small/size',
    borderRadius: 'avatar/radius/small',
    borderWidth: 'avatar/border/width/small',
    badgeSize: 'avatar/badge/size/small',
    badgeOffset: 4
  },
  'medium': {
    size: 'avatar/size/medium',
    fontSize: 'avatar/typography/medium/size',
    borderRadius: 'avatar/radius/medium',
    borderWidth: 'avatar/border/width/medium',
    badgeSize: 'avatar/badge/size/medium',
    badgeOffset: 4
  },
  'large': {
    size: 'avatar/size/large',
    fontSize: 'avatar/typography/large/size',
    borderRadius: 'avatar/radius/large',
    borderWidth: 'avatar/border/width/large',
    badgeSize: 'avatar/badge/size/large',
    badgeOffset: 4
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
  { size: 'small', type: 'image', state: 'default', shape: 'circle' },
  { size: 'medium', type: 'image', state: 'default', shape: 'circle' },
  { size: 'large', type: 'image', state: 'default', shape: 'circle' },

  // Type variants
  { size: 'medium', type: 'image', state: 'default', shape: 'circle' },
  { size: 'medium', type: 'initial', state: 'default', shape: 'circle', initials: 'JD' },
  { size: 'medium', type: 'icon', state: 'default', shape: 'circle', icon: 'user' },

  // Shape variants
  { size: 'medium', type: 'image', state: 'default', shape: 'circle' },
  { size: 'medium', type: 'image', state: 'default', shape: 'square' },

  // State variants
  { size: 'medium', type: 'image', state: 'default', shape: 'circle' },
  { size: 'medium', type: 'image', state: 'error', shape: 'circle' },

  // With badge
  { 
    size: 'medium', 
    type: 'image', 
    state: 'default', 
    shape: 'circle', 
    badge: { status: 'online' }, 
    badgeContent: '3' 
  },
  { 
    size: 'medium', 
    type: 'initial', 
    state: 'default', 
    shape: 'circle', 
    initials: 'JD', 
    badge: { status: 'online' } 
  },
  { 
    size: 'medium', 
    type: 'icon', 
    state: 'default', 
    shape: 'circle', 
    icon: 'user', 
    badge: { status: 'online' } 
  }
] as const; 