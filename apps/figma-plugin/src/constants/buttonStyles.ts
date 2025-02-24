import { ButtonSizeConfig, ButtonStyles, ButtonVariantProps } from '../types/button';

export const BUTTON_SIZES: ButtonSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    paddingHorizontal: 'component/base/padding/md',
    paddingVertical: 'component/base/padding/sm',
    iconSize: 'component/base/icon/xs',
    spacing: 'component/base/gap/xs',
    borderRadius: 'component/base/radius/sm'
  },
  medium: {
    height: 'component/base/height/sm',
    fontSize: 'text/body/md',
    lineHeight: 'text/body/md',
    paddingHorizontal: 'component/base/padding/lg',
    paddingVertical: 'component/base/padding/md',
    iconSize: 'component/base/icon/sm',
    spacing: 'component/base/gap/sm',
    borderRadius: 'component/base/radius/md'
  },
  large: {
    height: 'component/base/height/md',
    fontSize: 'text/body/lg',
    lineHeight: 'text/body/lg',
    paddingHorizontal: 'component/base/padding/xl',
    paddingVertical: 'component/base/padding/lg',
    iconSize: 'component/base/icon/md',
    spacing: 'component/base/gap/md',
    borderRadius: 'component/base/radius/lg'
  }
} as const;

export const BUTTON_STYLES: ButtonStyles = {
  'default-filled': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'primary-filled': {
    background: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/inverse',
      hover: 'text/color/inverse',
      pressed: 'text/color/inverse',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'neutral-filled': {
    background: {
      default: 'status/neutral/default',
      hover: 'status/neutral/hover',
      pressed: 'status/neutral/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/inverse',
      hover: 'text/color/inverse',
      pressed: 'text/color/inverse',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/neutral/default',
      hover: 'status/neutral/hover',
      pressed: 'status/neutral/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'secondary-filled': {
    background: {
      default: 'status/secondary/default',
      hover: 'status/secondary/hover',
      pressed: 'status/secondary/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/inverse',
      hover: 'text/color/inverse',
      pressed: 'text/color/inverse',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/secondary/default',
      hover: 'status/secondary/hover',
      pressed: 'status/secondary/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'danger-filled': {
    background: {
      default: 'status/error/default',
      hover: 'status/error/hover',
      pressed: 'status/error/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/inverse',
      hover: 'text/color/inverse',
      pressed: 'text/color/inverse',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/error/default',
      hover: 'status/error/hover',
      pressed: 'status/error/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'default-outlined': {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'surface/color/disabled'
    }
  },
  'primary-outlined': {
    background: {
      default: 'surface/color/transparent',
      hover: 'status/info/ghost/hover',
      pressed: 'status/info/ghost/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/pressed',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'neutral-outlined': {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/neutral/default',
      hover: 'status/neutral/hover',
      pressed: 'status/neutral/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'secondary-outlined': {
    background: {
      default: 'surface/color/transparent',
      hover: 'status/secondary/ghost/hover',
      pressed: 'status/secondary/ghost/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'status/secondary/default',
      hover: 'status/secondary/hover',
      pressed: 'status/secondary/pressed',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/secondary/default',
      hover: 'status/secondary/hover',
      pressed: 'status/secondary/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'danger-outlined': {
    background: {
      default: 'surface/color/transparent',
      hover: 'status/error/ghost/hover',
      pressed: 'status/error/ghost/pressed',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'status/error/default',
      hover: 'status/error/hover',
      pressed: 'status/error/pressed',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'status/error/default',
      hover: 'status/error/hover',
      pressed: 'status/error/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  'default-ghost': {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    }
  },
  'primary-ghost': {
    background: {
      default: 'surface/color/transparent',
      hover: 'status/info/ghost/hover',
      pressed: 'status/info/ghost/pressed',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/pressed',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    }
  },
  'neutral-ghost': {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    }
  },
  'secondary-ghost': {
    background: {
      default: 'surface/color/transparent',
      hover: 'status/secondary/ghost/hover',
      pressed: 'status/secondary/ghost/pressed',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    }
  },
  'danger-ghost': {
    background: {
      default: 'surface/color/transparent',
      hover: 'status/error/ghost/hover',
      pressed: 'status/error/ghost/pressed',
      disabled: 'surface/color/transparent'
    },
    text: {
      default: 'status/error/default',
      hover: 'status/error/hover',
      pressed: 'status/error/pressed',
      disabled: 'text/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    }
  }
} as const;

export const BUTTON_SHAPES = {
  'square': {
    small: 'component/base/radius/none',
    medium: 'component/base/radius/none',
    large: 'component/base/radius/none'
  },
  'rounded': {
    small: 'component/base/radius/sm',
    medium: 'component/base/radius/md',
    large: 'component/base/radius/lg'
  },
  'pill': {
    small: 'component/base/radius/pill',
    medium: 'component/base/radius/pill',
    large: 'component/base/radius/pill'
  }
} as const;

export const BUTTON_VARIANTS: ButtonVariantProps[] = [

  // Large size variants with all states
  { size: 'large', variant: 'filled', type: 'default', state: 'default' },
  { size: 'large', variant: 'filled', type: 'default', state: 'hover' },
  { size: 'large', variant: 'filled', type: 'default', state: 'pressed' },
  { size: 'large', variant: 'filled', type: 'default', state: 'disabled' },
  { size: 'large', variant: 'outlined', type: 'default', state: 'default' },
  { size: 'large', variant: 'outlined', type: 'default', state: 'hover' },
  { size: 'large', variant: 'outlined', type: 'default', state: 'pressed' },
  { size: 'large', variant: 'outlined', type: 'default', state: 'disabled' },
  { size: 'large', variant: 'ghost', type: 'default', state: 'default' },
  { size: 'large', variant: 'ghost', type: 'default', state: 'hover' },
  { size: 'large', variant: 'ghost', type: 'default', state: 'pressed' },
  { size: 'large', variant: 'ghost', type: 'default', state: 'disabled' },

  // Large size Primary variants with all states
  { size: 'large', variant: 'filled', type: 'primary', state: 'default' },
  { size: 'large', variant: 'filled', type: 'primary', state: 'hover' },
  { size: 'large', variant: 'filled', type: 'primary', state: 'pressed' },
  { size: 'large', variant: 'filled', type: 'primary', state: 'disabled' },
  { size: 'large', variant: 'outlined', type: 'primary', state: 'default' },
  { size: 'large', variant: 'outlined', type: 'primary', state: 'hover' },
  { size: 'large', variant: 'outlined', type: 'primary', state: 'pressed' },
  { size: 'large', variant: 'outlined', type: 'primary', state: 'disabled' },
  { size: 'large', variant: 'ghost', type: 'primary', state: 'default' },
  { size: 'large', variant: 'ghost', type: 'primary', state: 'hover' },
  { size: 'large', variant: 'ghost', type: 'primary', state: 'pressed' },
  { size: 'large', variant: 'ghost', type: 'primary', state: 'disabled' },

  // Large size Neutral variants with all states
  { size: 'large', variant: 'filled', type: 'neutral', state: 'default' },
  { size: 'large', variant: 'filled', type: 'neutral', state: 'hover' },
  { size: 'large', variant: 'filled', type: 'neutral', state: 'pressed' },
  { size: 'large', variant: 'filled', type: 'neutral', state: 'disabled' },
  { size: 'large', variant: 'outlined', type: 'neutral', state: 'default' },
  { size: 'large', variant: 'outlined', type: 'neutral', state: 'hover' },
  { size: 'large', variant: 'outlined', type: 'neutral', state: 'pressed' },
  { size: 'large', variant: 'outlined', type: 'neutral', state: 'disabled' },
  { size: 'large', variant: 'ghost', type: 'neutral', state: 'default' },
  { size: 'large', variant: 'ghost', type: 'neutral', state: 'hover' },
  { size: 'large', variant: 'ghost', type: 'neutral', state: 'pressed' },
  { size: 'large', variant: 'ghost', type: 'neutral', state: 'disabled' },
  

  // Large size Secondary variants with all states
  { size: 'large', variant: 'filled', type: 'secondary', state: 'default' },
  { size: 'large', variant: 'filled', type: 'secondary', state: 'hover' },
  { size: 'large', variant: 'filled', type: 'secondary', state: 'pressed' },
  { size: 'large', variant: 'filled', type: 'secondary', state: 'disabled' },
  { size: 'large', variant: 'outlined', type: 'secondary', state: 'default' },
  { size: 'large', variant: 'outlined', type: 'secondary', state: 'hover' },
  { size: 'large', variant: 'outlined', type: 'secondary', state: 'pressed' },
  { size: 'large', variant: 'outlined', type: 'secondary', state: 'disabled' },
  { size: 'large', variant: 'ghost', type: 'secondary', state: 'default' },
  { size: 'large', variant: 'ghost', type: 'secondary', state: 'hover' },
  { size: 'large', variant: 'ghost', type: 'secondary', state: 'pressed' },
  { size: 'large', variant: 'ghost', type: 'secondary', state: 'disabled' },
    
  // Large size Danger variants with all states
  { size: 'large', variant: 'filled', type: 'danger', state: 'default' },
  { size: 'large', variant: 'filled', type: 'danger', state: 'hover' },
  { size: 'large', variant: 'filled', type: 'danger', state: 'pressed' },
  { size: 'large', variant: 'filled', type: 'danger', state: 'disabled' },
  { size: 'large', variant: 'outlined', type: 'danger', state: 'default' },
  { size: 'large', variant: 'outlined', type: 'danger', state: 'hover' },
  { size: 'large', variant: 'outlined', type: 'danger', state: 'pressed' },
  { size: 'large', variant: 'outlined', type: 'danger', state: 'disabled' },
  { size: 'large', variant: 'ghost', type: 'danger', state: 'default' },
  { size: 'large', variant: 'ghost', type: 'danger', state: 'hover' },
  { size: 'large', variant: 'ghost', type: 'danger', state: 'pressed' },
  { size: 'large', variant: 'ghost', type: 'danger', state: 'disabled' },

  // Medium size variants with all states
  { size: 'medium', variant: 'filled', type: 'default', state: 'default' },
  { size: 'medium', variant: 'filled', type: 'default', state: 'hover' },
  { size: 'medium', variant: 'filled', type: 'default', state: 'pressed' },
  { size: 'medium', variant: 'filled', type: 'default', state: 'disabled' },
  { size: 'medium', variant: 'outlined', type: 'default', state: 'default' },
  { size: 'medium', variant: 'outlined', type: 'default', state: 'hover' },
  { size: 'medium', variant: 'outlined', type: 'default', state: 'pressed' },
  { size: 'medium', variant: 'outlined', type: 'default', state: 'disabled' },
  { size: 'medium', variant: 'ghost', type: 'default', state: 'default' },
  { size: 'medium', variant: 'ghost', type: 'default', state: 'hover' },
  { size: 'medium', variant: 'ghost', type: 'default', state: 'pressed' },
  { size: 'medium', variant: 'ghost', type: 'default', state: 'disabled' },



  // Primary variants with all states
  { size: 'medium', variant: 'filled', type: 'primary', state: 'default' },
  { size: 'medium', variant: 'filled', type: 'primary', state: 'hover' },
  { size: 'medium', variant: 'filled', type: 'primary', state: 'pressed' },
  { size: 'medium', variant: 'filled', type: 'primary', state: 'disabled' },
  { size: 'medium', variant: 'outlined', type: 'primary', state: 'default' },
  { size: 'medium', variant: 'outlined', type: 'primary', state: 'hover' },
  { size: 'medium', variant: 'outlined', type: 'primary', state: 'pressed' },
  { size: 'medium', variant: 'outlined', type: 'primary', state: 'disabled' },
  { size: 'medium', variant: 'ghost', type: 'primary', state: 'default' },
  { size: 'medium', variant: 'ghost', type: 'primary', state: 'hover' },
  { size: 'medium', variant: 'ghost', type: 'primary', state: 'pressed' },
  { size: 'medium', variant: 'ghost', type: 'primary', state: 'disabled' },

  // Secondary variants with all states
  { size: 'medium', variant: 'filled', type: 'neutral', state: 'default' },
  { size: 'medium', variant: 'filled', type: 'neutral', state: 'hover' },
  { size: 'medium', variant: 'filled', type: 'neutral', state: 'pressed' },
  { size: 'medium', variant: 'filled', type: 'neutral', state: 'disabled' },
  { size: 'medium', variant: 'outlined', type: 'neutral', state: 'default' },
  { size: 'medium', variant: 'outlined', type: 'neutral', state: 'hover' },
  { size: 'medium', variant: 'outlined', type: 'neutral', state: 'pressed' },
  { size: 'medium', variant: 'outlined', type: 'neutral', state: 'disabled' },
  { size: 'medium', variant: 'ghost', type: 'neutral', state: 'default' },
  { size: 'medium', variant: 'ghost', type: 'neutral', state: 'hover' },
  { size: 'medium', variant: 'ghost', type: 'neutral', state: 'pressed' },
  { size: 'medium', variant: 'ghost', type: 'neutral', state: 'disabled' },

  // Secondary variants with all states
  { size: 'medium', variant: 'filled', type: 'secondary', state: 'default' },
  { size: 'medium', variant: 'filled', type: 'secondary', state: 'hover' },
  { size: 'medium', variant: 'filled', type: 'secondary', state: 'pressed' },
  { size: 'medium', variant: 'filled', type: 'secondary', state: 'disabled' },
  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'default' },
  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'hover' },
  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'pressed' },
  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'disabled' },
  { size: 'medium', variant: 'ghost', type: 'secondary', state: 'default' },
  { size: 'medium', variant: 'ghost', type: 'secondary', state: 'hover' },
  { size: 'medium', variant: 'ghost', type: 'secondary', state: 'pressed' },
  { size: 'medium', variant: 'ghost', type: 'secondary', state: 'disabled' },

  // Danger variants with all states
  { size: 'medium', variant: 'filled', type: 'danger', state: 'default' },
  { size: 'medium', variant: 'filled', type: 'danger', state: 'hover' },
  { size: 'medium', variant: 'filled', type: 'danger', state: 'pressed' },
  { size: 'medium', variant: 'filled', type: 'danger', state: 'disabled' },
  { size: 'medium', variant: 'outlined', type: 'danger', state: 'default' },
  { size: 'medium', variant: 'outlined', type: 'danger', state: 'hover' },
  { size: 'medium', variant: 'outlined', type: 'danger', state: 'pressed' },
  { size: 'medium', variant: 'outlined', type: 'danger', state: 'disabled' },
  { size: 'medium', variant: 'ghost', type: 'danger', state: 'default' },
  { size: 'medium', variant: 'ghost', type: 'danger', state: 'hover' },
  { size: 'medium', variant: 'ghost', type: 'danger', state: 'pressed' },
  { size: 'medium', variant: 'ghost', type: 'danger', state: 'disabled' },

 // Shape variants
 { size: 'large', variant: 'filled', type: 'primary', state: 'default', shape: 'square' },
 { size: 'large', variant: 'filled', type: 'primary', state: 'default', shape: 'rounded' },
 { size: 'large', variant: 'filled', type: 'primary', state: 'default', shape: 'pill' },

 // Shape + Icon combinations
 { size: 'large', variant: 'filled', type: 'primary', state: 'default', shape: 'pill', icon: { name: 'add' } },
 { size: 'large', variant: 'filled', type: 'primary', state: 'default', shape: 'rounded', icon: { name: 'add' } },  

  // With icons in different states
  { size: 'large', variant: 'filled', type: 'primary', state: 'default', icon: { name: 'add' } },
  { size: 'large', variant: 'filled', type: 'primary', state: 'hover', icon: { name: 'add' } },
  { size: 'large', variant: 'filled', type: 'primary', state: 'pressed', icon: { name: 'add' } },
  { size: 'large', variant: 'filled', type: 'primary', state: 'disabled', icon: { name: 'add' } },

  { size: 'large', variant: 'outlined', type: 'secondary', state: 'default', icon: { name: 'edit' } },
  { size: 'large', variant: 'outlined', type: 'secondary', state: 'hover', icon: { name: 'edit' } },
  { size: 'large', variant: 'outlined', type: 'secondary', state: 'pressed', icon: { name: 'edit' } },
  { size: 'large', variant: 'outlined', type: 'secondary', state: 'disabled', icon: { name: 'edit' } },

  { size: 'large', variant: 'ghost', type: 'danger', state: 'default', icon: { name: 'delete' } },
  { size: 'large', variant: 'ghost', type: 'danger', state: 'hover', icon: { name: 'delete' } },
  { size: 'large', variant: 'ghost', type: 'danger', state: 'pressed', icon: { name: 'delete' } },
  { size: 'large', variant: 'ghost', type: 'danger', state: 'disabled', icon: { name: 'delete' } },


  // Default variants with all states
  { size: 'small', variant: 'filled', type: 'default', state: 'default' },
  { size: 'small', variant: 'filled', type: 'default', state: 'hover' },
  { size: 'small', variant: 'filled', type: 'default', state: 'pressed' },
  { size: 'small', variant: 'filled', type: 'default', state: 'disabled' },
  { size: 'small', variant: 'outlined', type: 'default', state: 'default' },
  { size: 'small', variant: 'outlined', type: 'default', state: 'hover' },
  { size: 'small', variant: 'outlined', type: 'default', state: 'pressed' },
  { size: 'small', variant: 'outlined', type: 'default', state: 'disabled' },
  { size: 'small', variant: 'ghost', type: 'default', state: 'default' },
  { size: 'small', variant: 'ghost', type: 'default', state: 'hover' },
  { size: 'small', variant: 'ghost', type: 'default', state: 'pressed' },
  { size: 'small', variant: 'ghost', type: 'default', state: 'disabled' },

  // Primary variants with all states
  { size: 'small', variant: 'filled', type: 'primary', state: 'default' },
  { size: 'small', variant: 'filled', type: 'primary', state: 'hover' },
  { size: 'small', variant: 'filled', type: 'primary', state: 'pressed' },
  { size: 'small', variant: 'filled', type: 'primary', state: 'disabled' },
  { size: 'small', variant: 'outlined', type: 'primary', state: 'default' },
  { size: 'small', variant: 'outlined', type: 'primary', state: 'hover' },
  { size: 'small', variant: 'outlined', type: 'primary', state: 'pressed' },
  { size: 'small', variant: 'outlined', type: 'primary', state: 'disabled' },
  { size: 'small', variant: 'ghost', type: 'primary', state: 'default' },
  { size: 'small', variant: 'ghost', type: 'primary', state: 'hover' },
  { size: 'small', variant: 'ghost', type: 'primary', state: 'pressed' },
  { size: 'small', variant: 'ghost', type: 'primary', state: 'disabled' },

  // Neutral variants with all states
  { size: 'small', variant: 'filled', type: 'neutral', state: 'default' },
  { size: 'small', variant: 'filled', type: 'neutral', state: 'hover' },
  { size: 'small', variant: 'filled', type: 'neutral', state: 'pressed' },
  { size: 'small', variant: 'filled', type: 'neutral', state: 'disabled' },
  { size: 'small', variant: 'outlined', type: 'neutral', state: 'default' },
  { size: 'small', variant: 'outlined', type: 'neutral', state: 'hover' },
  { size: 'small', variant: 'outlined', type: 'neutral', state: 'pressed' },
  { size: 'small', variant: 'outlined', type: 'neutral', state: 'disabled' },
  { size: 'small', variant: 'ghost', type: 'neutral', state: 'default' },
  { size: 'small', variant: 'ghost', type: 'neutral', state: 'hover' },
  { size: 'small', variant: 'ghost', type: 'neutral', state: 'pressed' },
  { size: 'small', variant: 'ghost', type: 'neutral', state: 'disabled' },

  // Secondary variants with all states
  { size: 'small', variant: 'filled', type: 'secondary', state: 'default' },
  { size: 'small', variant: 'filled', type: 'secondary', state: 'hover' },
  { size: 'small', variant: 'filled', type: 'secondary', state: 'pressed' },
  { size: 'small', variant: 'filled', type: 'secondary', state: 'disabled' },
  { size: 'small', variant: 'outlined', type: 'secondary', state: 'default' },
  { size: 'small', variant: 'outlined', type: 'secondary', state: 'hover' },
  { size: 'small', variant: 'outlined', type: 'secondary', state: 'pressed' },
  { size: 'small', variant: 'outlined', type: 'secondary', state: 'disabled' },
  { size: 'small', variant: 'ghost', type: 'secondary', state: 'default' },
  { size: 'small', variant: 'ghost', type: 'secondary', state: 'hover' },
  { size: 'small', variant: 'ghost', type: 'secondary', state: 'pressed' },
  { size: 'small', variant: 'ghost', type: 'secondary', state: 'disabled' },

  // Danger variants with all states
  { size: 'small', variant: 'filled', type: 'danger', state: 'default' },
  { size: 'small', variant: 'filled', type: 'danger', state: 'hover' },
  { size: 'small', variant: 'filled', type: 'danger', state: 'pressed' },
  { size: 'small', variant: 'filled', type: 'danger', state: 'disabled' },
  { size: 'small', variant: 'outlined', type: 'danger', state: 'default' },
  { size: 'small', variant: 'outlined', type: 'danger', state: 'hover' },
  { size: 'small', variant: 'outlined', type: 'danger', state: 'pressed' },
  { size: 'small', variant: 'outlined', type: 'danger', state: 'disabled' },
  { size: 'small', variant: 'ghost', type: 'danger', state: 'default' },
  { size: 'small', variant: 'ghost', type: 'danger', state: 'hover' },
  { size: 'small', variant: 'ghost', type: 'danger', state: 'pressed' },
  { size: 'small', variant: 'ghost', type: 'danger', state: 'disabled' },

  
  


] as const; 