import { TagSizeConfig, TagStyleConfig, TagVariantProps } from '../types/tag';

export const TAG_SIZES: TagSizeConfig = {
  small: {
    height: 'tag/height/small',
    fontSize: 'tag/typography/small/size',
    lineHeight: 'tag/typography/small/lineHeight',
    paddingHorizontal: 'tag/spacing/small/horizontal',
    paddingVertical: 'tag/spacing/small/vertical',
    iconSize: 'tag/icon/small',
    spacing: 'tag/spacing/small/gap',
    borderRadius: {
      rounded: 'tag/radius/small/rounded',
      circular: 'tag/radius/small/circular'
    }
  },
  medium: {
    height: 'tag/height/medium',
    fontSize: 'tag/typography/medium/size',
    lineHeight: 'tag/typography/medium/lineHeight',
    paddingHorizontal: 'tag/spacing/medium/horizontal',
    paddingVertical: 'tag/spacing/medium/vertical',
    iconSize: 'tag/icon/medium',
    spacing: 'tag/spacing/medium/gap',
    borderRadius: {
      rounded: 'tag/radius/medium/rounded',
      circular: 'tag/radius/medium/circular'
    }
  },
  large: {
    height: 'tag/height/large',
    fontSize: 'tag/typography/large/size',
    lineHeight: 'tag/typography/large/lineHeight',
    paddingHorizontal: 'tag/spacing/large/horizontal',
    paddingVertical: 'tag/spacing/large/vertical',
    iconSize: 'tag/icon/large',
    spacing: 'tag/spacing/large/gap',
    borderRadius: {
      rounded: 'tag/radius/large/rounded',
      circular: 'tag/radius/large/circular'
    }
  }
} as const;

export const TAG_STYLES: TagStyleConfig = {
  filled: {
    default: {
      background: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
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
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    primary: {
      background: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
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
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    neutral: {
      background: {
        default: 'status/neutral/default',
        hover: 'status/neutral/hover',
        pressed: 'status/neutral/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
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
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    secondary: {
      background: {
        default: 'status/secondary/default',
        hover: 'status/secondary/hover',
        pressed: 'status/secondary/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
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
      icon: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      }
    },
    info: {
      background: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
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
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    success: {
      background: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    warning: {
      background: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    error: {
      background: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
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
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    }
  },
  outlined: {
    default: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    primary: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/info/ghost/hover',
        pressed: 'status/info/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      }
    },
    neutral: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/neutral/ghost/hover',
        pressed: 'status/neutral/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/neutral/default',
        hover: 'status/neutral/hover',
        pressed: 'status/neutral/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'status/neutral/default',
        hover: 'status/neutral/hover',
        pressed: 'status/neutral/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/neutral/default',
        hover: 'status/neutral/hover',
        pressed: 'status/neutral/pressed',
        disabled: 'text/color/disabled'
      }
    },
    secondary: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/secondary/ghost/hover',
        pressed: 'status/secondary/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/secondary/default',
        hover: 'status/secondary/hover',
        pressed: 'status/secondary/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'status/secondary/default',
        hover: 'status/secondary/hover',
        pressed: 'status/secondary/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/secondary/default',
        hover: 'status/secondary/hover',
        pressed: 'status/secondary/pressed',
        disabled: 'text/color/disabled'
      }
    },
    info: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/info/ghost/hover',
        pressed: 'status/info/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      }
    },
    success: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/success/ghost/hover',
        pressed: 'status/success/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'text/color/disabled'
      }
    },
    warning: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/warning/ghost/hover',
        pressed: 'status/warning/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'text/color/disabled'
      }
    },
    error: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/error/ghost/hover',
        pressed: 'status/error/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'text/color/disabled'
      }
    }
  },
  ghost: {
    default: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    primary: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/info/ghost/hover',
        pressed: 'status/info/ghost/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      }
    },
    neutral: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/neutral/ghost/hover',
        pressed: 'status/neutral/ghost/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'status/neutral/default',
        hover: 'status/neutral/hover',
        pressed: 'status/neutral/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/neutral/default',
        hover: 'status/neutral/hover',
        pressed: 'status/neutral/pressed',
        disabled: 'text/color/disabled'
      }
    },
    secondary: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/secondary/ghost/hover',
        pressed: 'status/secondary/ghost/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'status/secondary/default',
        hover: 'status/secondary/hover',
        pressed: 'status/secondary/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/secondary/default',
        hover: 'status/secondary/hover',
        pressed: 'status/secondary/pressed',
        disabled: 'text/color/disabled'
      }
    },
    info: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/info/ghost/hover',
        pressed: 'status/info/ghost/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      }
    },
    success: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/success/ghost/hover',
        pressed: 'status/success/ghost/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'text/color/disabled'
      }
    },
    warning: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/warning/ghost/hover',
        pressed: 'status/warning/ghost/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'text/color/disabled'
      }
    },
    error: {
      background: {
        default: 'surface/color/transparent',
        hover: 'status/error/ghost/hover',
        pressed: 'status/error/ghost/pressed',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'text/color/disabled'
      },
      icon: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'text/color/disabled'
      }
    }
  }
} as const;

export const TAG_VARIANTS: TagVariantProps[] = [
  // Basic variants
  { size: 'small', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'small', variant: 'outlined', status: 'default', shape: 'rounded' },
  { size: 'small', variant: 'ghost', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'default', shape: 'rounded' },
  { size: 'large', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'large', variant: 'outlined', status: 'default', shape: 'rounded' },
  { size: 'large', variant: 'ghost', status: 'default', shape: 'rounded' },

  // Primary variants
  { size: 'medium', variant: 'filled', status: 'primary', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'primary', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'primary', shape: 'rounded' },

  // Neutral variants
  { size: 'medium', variant: 'filled', status: 'neutral', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'neutral', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'neutral', shape: 'rounded' },

  // Secondary variants
  { size: 'medium', variant: 'filled', status: 'secondary', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'secondary', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'secondary', shape: 'rounded' },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'info', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'info', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'info', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'success', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'success', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'success', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'warning', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'warning', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'warning', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'error', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'error', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'error', shape: 'rounded' },

  // Shape variants
  { size: 'medium', variant: 'filled', status: 'default', shape: 'circular' },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'circular' },
  { size: 'medium', variant: 'ghost', status: 'default', shape: 'circular' },

  // With icon
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', icon: 'info' },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded', icon: 'info' },
  { size: 'medium', variant: 'ghost', status: 'default', shape: 'rounded', icon: 'info' },

  // Removable
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', removable: true },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded', removable: true },
  { size: 'medium', variant: 'ghost', status: 'default', shape: 'rounded', removable: true },

  // Interactive
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', interactive: true },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded', interactive: true },
  { size: 'medium', variant: 'ghost', status: 'default', shape: 'rounded', interactive: true },

  // Disabled
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', disabled: true },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded', disabled: true },
  { size: 'medium', variant: 'ghost', status: 'default', shape: 'rounded', disabled: true },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'filled',
    status: 'success',
    shape: 'rounded',
    icon: 'check',
    removable: true,
    interactive: true
  },
  { 
    size: 'medium',
    variant: 'outlined',
    status: 'error',
    shape: 'rounded',
    icon: 'error',
    removable: true,
    interactive: true
  }
] as const; 