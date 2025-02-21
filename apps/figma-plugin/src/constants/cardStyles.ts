import { CardSizeConfig, CardStyle, CardStyles, CardVariantProps } from '../types/card';

export const CARD_SIZES: CardSizeConfig = {
  small: {
    padding: 'component/base/padding/xs',
    borderRadius: 'component/base/radius/sm',
    borderWidth: 'component/base/border/width/thin',
    elevation: 'component/base/shadow/sm',
    spacing: 'component/base/gap/xs'
  },
  medium: {
    padding: 'component/base/padding/sm',
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin',
    elevation: 'component/base/shadow/md',
    spacing: 'component/base/gap/sm'
  },
  large: {
    padding: 'component/base/padding/md',
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin',
    elevation: 'component/base/shadow/lg',
    spacing: 'component/base/gap/md'
  }
} as const;

export const CARD_STYLES: CardStyles = {
  'filled': {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      shadow: {
        default: 'component/base/shadow/md',
        hover: 'component/base/shadow/lg',
        pressed: 'component/base/shadow/sm',
        disabled: 'component/base/shadow/none'
      }
    },
    header: {
      background: {
        default: 'surface/color/white',
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
      padding: 'component/base/padding/md'
    },
    content: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      padding: 'component/base/padding/md'
    },
    footer: {
      background: {
        default: 'surface/color/subtle',
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
      padding: 'component/base/padding/sm'
    },
    media: {
      aspectRatio: '16/9',
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay/hover',
        pressed: 'surface/color/overlay/pressed',
        disabled: 'surface/color/overlay/disabled'
      }
    }
  },
  'outlined': {
    root: {
      background: {
        default: 'surface/color/white',
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
      shadow: {
        default: 'component/base/shadow/none',
        hover: 'component/base/shadow/sm',
        pressed: 'component/base/shadow/none',
        disabled: 'component/base/shadow/none'
      }
    },
    header: {
      background: {
        default: 'surface/color/white',
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
      padding: 'component/base/padding/md'
    },
    content: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      padding: 'component/base/padding/md'
    },
    footer: {
      background: {
        default: 'surface/color/subtle',
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
      padding: 'component/base/padding/sm'
    },
    media: {
      aspectRatio: '16/9',
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay/hover',
        pressed: 'surface/color/overlay/pressed',
        disabled: 'surface/color/overlay/disabled'
      }
    }
  },
  'elevated': {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      shadow: {
        default: 'component/base/shadow/lg',
        hover: 'component/base/shadow/xl',
        pressed: 'component/base/shadow/md',
        disabled: 'component/base/shadow/none'
      }
    },
    header: {
      background: {
        default: 'surface/color/white',
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
      padding: 'component/base/padding/md'
    },
    content: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      padding: 'component/base/padding/md'
    },
    footer: {
      background: {
        default: 'surface/color/subtle',
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
      padding: 'component/base/padding/sm'
    },
    media: {
      aspectRatio: '16/9',
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay/hover',
        pressed: 'surface/color/overlay/pressed',
        disabled: 'surface/color/overlay/disabled'
      }
    }
  }
} as const;

export const CARD_VARIANTS: CardVariantProps[] = [
  // Size variants
  { 
    size: 'small', 
    variant: 'filled',
    content: {
      title: 'Small Card',
      description: 'This is a small card'
    }
  },
  { 
    size: 'medium', 
    variant: 'filled',
    content: {
      title: 'Medium Card',
      description: 'This is a medium card'
    }
  },
  { 
    size: 'large', 
    variant: 'filled',
    content: {
      title: 'Large Card',
      description: 'This is a large card'
    }
  },

  // Variant styles
  { 
    size: 'medium', 
    variant: 'filled',
    content: {
      title: 'Filled Card',
      description: 'This is a filled card'
    }
  },
  { 
    size: 'medium', 
    variant: 'outlined',
    content: {
      title: 'Outlined Card',
      description: 'This is an outlined card'
    }
  },
  { 
    size: 'medium', 
    variant: 'elevated',
    content: {
      title: 'Elevated Card',
      description: 'This is an elevated card'
    }
  },

  // With header
  { 
    size: 'medium', 
    variant: 'filled',
    header: {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      avatar: 'user-avatar',
      extra: 'More'
    },
    content: {
      description: 'Card with header'
    }
  },

  // With footer
  { 
    size: 'medium', 
    variant: 'filled',
    content: {
      description: 'Card with footer'
    },
    footer: {
      actions: ['Action 1', 'Action 2'],
      extra: 'Footer extra'
    }
  },

  // With media
  { 
    size: 'medium', 
    variant: 'filled',
    media: {
      image: 'card-image.jpg',
      aspectRatio: '16/9',
      overlay: true
    },
    content: {
      description: 'Card with media'
    }
  },

  // Interactive
  { 
    size: 'medium', 
    variant: 'filled',
    interactive: true,
    content: {
      title: 'Interactive Card',
      description: 'Click me!'
    }
  },

  // Loading
  { 
    size: 'medium', 
    variant: 'filled',
    loading: true,
    content: {
      title: 'Loading Card',
      description: 'Please wait...'
    }
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'elevated',
    header: {
      title: 'Featured Article',
      subtitle: 'By John Doe',
      avatar: 'author-avatar',
      extra: 'Share'
    },
    media: {
      image: 'article-image.jpg',
      aspectRatio: '16/9',
      overlay: true
    },
    content: {
      title: 'Amazing Discovery',
      description: 'Scientists have made an incredible breakthrough...',
      children: 'Full article content goes here'
    },
    footer: {
      actions: ['Like', 'Comment', 'Save'],
      extra: '5 min read'
    },
    interactive: true
  }
] as const; 