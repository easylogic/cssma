import { DrawerSizeConfig, DrawerStyle, DrawerStyles, DrawerVariantProps } from '../types/drawer';

export const DRAWER_SIZES: DrawerSizeConfig = {
  small: {
    width: '320',
    height: '320',
    minSize: '240',
    maxSize: '480',
    fontSize: {
      title: 'text/body/lg',
      description: 'text/body/md'
    },
    lineHeight: {
      title: 'text/lineHeight/lg',
      description: 'text/lineHeight/md'
    },
    iconSize: 'component/base/icon/md',
    spacing: {
      icon: 'component/base/gap/sm',
      title: 'component/base/gap/xs',
      content: 'component/base/gap/md',
      actions: 'component/base/gap/sm'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      },
      content: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/md'
      },
      footer: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      }
    },
    borderRadius: {
      outer: 'component/base/radius/lg',
      inner: 'component/base/radius/md'
    },
    borderWidth: 'component/base/border/width/thin'
  },
  medium: {
    width: '480',
    height: '480',
    minSize: '320',
    maxSize: '640',
    fontSize: {
      title: 'text/body/xl',
      description: 'text/body/lg'
    },
    lineHeight: {
      title: 'text/lineHeight/xl',
      description: 'text/lineHeight/lg'
    },
    iconSize: 'component/base/icon/lg',
    spacing: {
      icon: 'component/base/gap/md',
      title: 'component/base/gap/sm',
      content: 'component/base/gap/lg',
      actions: 'component/base/gap/md'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/lg',
        vertical: 'component/base/padding/md'
      },
      content: {
        horizontal: 'component/base/padding/lg',
        vertical: 'component/base/padding/lg'
      },
      footer: {
        horizontal: 'component/base/padding/lg',
        vertical: 'component/base/padding/md'
      }
    },
    borderRadius: {
      outer: 'component/base/radius/xl',
      inner: 'component/base/radius/lg'
    },
    borderWidth: 'component/base/border/width/thin'
  },
  large: {
    width: '640',
    height: '640',
    minSize: '480',
    maxSize: '800',
    fontSize: {
      title: 'text/heading/md',
      description: 'text/body/xl'
    },
    lineHeight: {
      title: 'text/lineHeight/2xl',
      description: 'text/lineHeight/xl'
    },
    iconSize: 'component/base/icon/xl',
    spacing: {
      icon: 'component/base/gap/lg',
      title: 'component/base/gap/md',
      content: 'component/base/gap/xl',
      actions: 'component/base/gap/lg'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/xl',
        vertical: 'component/base/padding/lg'
      },
      content: {
        horizontal: 'component/base/padding/xl',
        vertical: 'component/base/padding/xl'
      },
      footer: {
        horizontal: 'component/base/padding/xl',
        vertical: 'component/base/padding/lg'
      }
    },
    borderRadius: {
      outer: 'component/base/radius/2xl',
      inner: 'component/base/radius/xl'
    },
    borderWidth: 'component/base/border/width/thin'
  },
  custom: {
    width: '100%',
    height: '100%',
    minSize: '240',
    fontSize: {
      title: 'text/body/lg',
      description: 'text/body/md'
    },
    lineHeight: {
      title: 'text/lineHeight/lg',
      description: 'text/lineHeight/md'
    },
    iconSize: 'component/base/icon/md',
    spacing: {
      icon: 'component/base/gap/sm',
      title: 'component/base/gap/xs',
      content: 'component/base/gap/md',
      actions: 'component/base/gap/sm'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      },
      content: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/md'
      },
      footer: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      }
    },
    borderRadius: {
      outer: 'component/base/radius/none',
      inner: 'component/base/radius/md'
    },
    borderWidth: 'component/base/border/width/thin'
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseContentStyle = {
  background: baseStateStyle,
  text: {
    title: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    description: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      pressed: 'text/color/secondary',
      disabled: 'text/color/disabled'
    }
  },
  icon: baseStateStyle,
  border: baseStateStyle
};

const baseStyle: DrawerStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/lg',
      hover: 'component/base/shadow/xl',
      pressed: 'component/base/shadow/lg',
      disabled: 'component/base/shadow/md'
    }
  },
  header: {
    background: baseStateStyle,
    text: baseStateStyle,
    icon: baseStateStyle,
    border: baseStateStyle,
    closeButton: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      icon: baseStateStyle,
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    }
  },
  content: {
    default: baseContentStyle,
    info: {
      ...baseContentStyle,
      background: {
        default: 'status/info/ghost/default',
        hover: 'status/info/ghost/hover',
        pressed: 'status/info/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        }
      },
      icon: {
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
    success: {
      ...baseContentStyle,
      background: {
        default: 'status/success/ghost/default',
        hover: 'status/success/ghost/hover',
        pressed: 'status/success/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        }
      },
      icon: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'text/color/disabled'
      },
      border: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    warning: {
      ...baseContentStyle,
      background: {
        default: 'status/warning/ghost/default',
        hover: 'status/warning/ghost/hover',
        pressed: 'status/warning/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        }
      },
      icon: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'text/color/disabled'
      },
      border: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    error: {
      ...baseContentStyle,
      background: {
        default: 'status/error/ghost/default',
        hover: 'status/error/ghost/hover',
        pressed: 'status/error/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        }
      },
      icon: {
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
    }
  },
  footer: {
    background: baseStateStyle,
    border: baseStateStyle,
    button: {
      primary: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      secondary: baseStateStyle
    }
  },
  overlay: {
    background: {
      default: 'surface/color/overlay',
      hover: 'surface/color/overlay',
      pressed: 'surface/color/overlay',
      disabled: 'surface/color/overlay'
    },
    blur: {
      enabled: true,
      amount: '8px'
    }
  },
  transition: {
    duration: '300ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['transform', 'opacity']
  }
};

export const DRAWER_STYLES: DrawerStyles = {
  filled: {
    ...baseStyle,
    root: {
      ...baseStyle.root,
      background: baseStateStyle,
      border: baseStateStyle
    }
  },
  outlined: {
    ...baseStyle,
    root: {
      ...baseStyle.root,
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: baseStateStyle
    }
  },
  ghost: {
    ...baseStyle,
    root: {
      ...baseStyle.root,
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    }
  }
} as const;

export const DRAWER_VARIANTS: DrawerVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'large', variant: 'filled', status: 'default' },
  { size: 'custom', variant: 'filled', status: 'default' },

  // Variant styles
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'outlined', status: 'default' },
  { size: 'medium', variant: 'ghost', status: 'default' },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'info' },
  { size: 'medium', variant: 'filled', status: 'success' },
  { size: 'medium', variant: 'filled', status: 'warning' },
  { size: 'medium', variant: 'filled', status: 'error' },

  // Placement variants
  {
    size: 'medium',
    variant: 'filled',
    status: 'default',
    position: {
      placement: 'right',
      level: 'root'
    }
  },

  // With resize
  {
    size: 'medium',
    variant: 'outlined',
    status: 'default',
    position: {
      placement: 'right',
      level: 'root'
    },
    resize: {
      enabled: true,
      minSize: 320,
      maxSize: 800,
      handles: ['left']
    }
  },

  // With push mode
  {
    size: 'medium',
    variant: 'filled',
    status: 'default',
    position: {
      placement: 'left',
      level: 'root',
      push: {
        enabled: true,
        distance: 320,
        elastic: true
      }
    }
  },

  // With nested drawers
  {
    size: 'medium',
    variant: 'outlined',
    status: 'default',
    position: {
      placement: 'right',
      level: 'floating'
    },
    interaction: {
      nested: {
        enabled: true,
        maxLevel: 3
      }
    }
  },

  // Complex combinations
  {
    size: 'large',
    variant: 'outlined',
    status: 'info',
    content: {
      title: {
        text: 'Settings Panel',
        icon: { name: 'settings' },
        align: 'start'
      },
      description: 'Configure your application settings',
      html: true,
      scrollable: true,
      maxHeight: '100vh'
    },
    actions: [
      {
        label: 'Cancel',
        variant: 'secondary'
      },
      {
        label: 'Apply',
        variant: 'primary',
        icon: { name: 'check' }
      }
    ],
    position: {
      placement: 'right',
      level: 'modal',
      push: {
        enabled: true,
        distance: 400,
        elastic: true
      }
    },
    resize: {
      enabled: true,
      minSize: 400,
      maxSize: 800,
      handles: ['left']
    },
    animation: {
      enabled: true,
      duration: 300,
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['transform', 'opacity'],
      custom: {
        enter: 'translateX(100%)',
        exit: 'translateX(0%)'
      }
    },
    interaction: {
      closeOnEsc: true,
      closeOnOverlayClick: true,
      preventScroll: true,
      trapFocus: true,
      returnFocus: true,
      autoFocus: 'button[data-action="apply"]',
      nested: {
        enabled: true,
        maxLevel: 2
      }
    },
    closable: true,
    backdrop: true,
    persistent: false,
    destroyOnClose: false,
    zIndex: 1000,
    ariaLabel: 'Settings Panel',
    role: 'dialog'
  }
] as const; 