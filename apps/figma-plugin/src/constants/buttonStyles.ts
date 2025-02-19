import { ButtonSizeConfig, ButtonStyles, ButtonVariantProps } from '../types/button';

export const BUTTON_SIZES: ButtonSizeConfig = {
  small: {
    height: 'button/height/small',
    fontSize: 'button/typography/small/size',
    lineHeight: 'button/typography/small/lineHeight',
    paddingHorizontal: 'button/spacing/small/horizontal',
    paddingVertical: 'button/spacing/small/vertical',
    iconSize: 'button/icon/small',
    spacing: 'button/spacing/small/gap',
    borderRadius: 'button/radius/small'
  },
  medium: {
    height: 'button/height/medium',
    fontSize: 'button/typography/medium/size',
    lineHeight: 'button/typography/medium/lineHeight',
    paddingHorizontal: 'button/spacing/medium/horizontal',
    paddingVertical: 'button/spacing/medium/vertical',
    iconSize: 'button/icon/medium',
    spacing: 'button/spacing/medium/gap',
    borderRadius: 'button/radius/medium'
  },
  large: {
    height: 'button/height/large',
    fontSize: 'button/typography/large/size',
    lineHeight: 'button/typography/large/lineHeight',
    paddingHorizontal: 'button/spacing/large/horizontal',
    paddingVertical: 'button/spacing/large/vertical',
    iconSize: 'button/icon/large',
    spacing: 'button/spacing/large/gap',
    borderRadius: 'button/radius/large'
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
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
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
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
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
      hover: 'status/neutral/ghost/hover',
      pressed: 'status/neutral/ghost/pressed',
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
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
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
      hover: 'status/neutral/ghost/hover',
      pressed: 'status/neutral/ghost/pressed',
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

export const BUTTON_VARIANTS: ButtonVariantProps[] = [
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

  // Neutral variants with all states
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

  // With icons in different states
  { size: 'medium', variant: 'filled', type: 'primary', state: 'default', icon: 'add' },
  { size: 'medium', variant: 'filled', type: 'primary', state: 'hover', icon: 'add' },
  { size: 'medium', variant: 'filled', type: 'primary', state: 'pressed', icon: 'add' },
  { size: 'medium', variant: 'filled', type: 'primary', state: 'disabled', icon: 'add' },

  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'default', icon: 'edit' },
  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'hover', icon: 'edit' },
  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'pressed', icon: 'edit' },
  { size: 'medium', variant: 'outlined', type: 'secondary', state: 'disabled', icon: 'edit' },

  { size: 'medium', variant: 'ghost', type: 'danger', state: 'default', icon: 'delete' },
  { size: 'medium', variant: 'ghost', type: 'danger', state: 'hover', icon: 'delete' },
  { size: 'medium', variant: 'ghost', type: 'danger', state: 'pressed', icon: 'delete' },
  { size: 'medium', variant: 'ghost', type: 'danger', state: 'disabled', icon: 'delete' }
] as const; 