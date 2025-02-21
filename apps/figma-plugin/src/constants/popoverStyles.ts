import { PopoverSizeConfig, PopoverStyle, PopoverStyles, PopoverVariantProps } from '../types/popover';

export const POPOVER_SIZES: PopoverSizeConfig = {
  small: {
    minWidth: '160',
    maxWidth: '280',
    fontSize: {
      title: 'text/body/sm',
      content: 'text/body/xs'
    },
    lineHeight: {
      title: 'text/lineHeight/sm',
      content: 'text/lineHeight/xs'
    },
    iconSize: 'component/base/icon/sm',
    spacing: {
      icon: 'component/base/gap/xs',
      title: 'component/base/gap/2xs',
      content: 'component/base/gap/xs',
      arrow: 'component/base/gap/2xs'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/xs'
      },
      content: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/xs'
      },
      footer: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/xs'
      }
    },
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin',
    arrow: {
      size: '8',
      offset: '4'
    }
  },
  medium: {
    minWidth: '200',
    maxWidth: '320',
    fontSize: {
      title: 'text/body/md',
      content: 'text/body/sm'
    },
    lineHeight: {
      title: 'text/lineHeight/md',
      content: 'text/lineHeight/sm'
    },
    iconSize: 'component/base/icon/md',
    spacing: {
      icon: 'component/base/gap/sm',
      title: 'component/base/gap/xs',
      content: 'component/base/gap/sm',
      arrow: 'component/base/gap/xs'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      },
      content: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      },
      footer: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      }
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin',
    arrow: {
      size: '10',
      offset: '6'
    }
  },
  large: {
    minWidth: '240',
    maxWidth: '400',
    fontSize: {
      title: 'text/body/lg',
      content: 'text/body/md'
    },
    lineHeight: {
      title: 'text/lineHeight/lg',
      content: 'text/lineHeight/md'
    },
    iconSize: 'component/base/icon/lg',
    spacing: {
      icon: 'component/base/gap/md',
      title: 'component/base/gap/sm',
      content: 'component/base/gap/md',
      arrow: 'component/base/gap/sm'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/lg',
        vertical: 'component/base/padding/md'
      },
      content: {
        horizontal: 'component/base/padding/lg',
        vertical: 'component/base/padding/md'
      },
      footer: {
        horizontal: 'component/base/padding/lg',
        vertical: 'component/base/padding/md'
      }
    },
    borderRadius: 'component/base/radius/xl',
    borderWidth: 'component/base/border/width/thin',
    arrow: {
      size: '12',
      offset: '8'
    }
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
    content: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      pressed: 'text/color/secondary',
      disabled: 'text/color/disabled'
    }
  },
  icon: baseStateStyle,
  border: baseStateStyle
};

const baseStyle: PopoverStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/md',
      hover: 'component/base/shadow/lg',
      pressed: 'component/base/shadow/md',
      disabled: 'component/base/shadow/sm'
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
        content: {
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
        content: {
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
        content: {
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
        content: {
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
  arrow: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/sm',
      hover: 'component/base/shadow/md',
      pressed: 'component/base/shadow/sm',
      disabled: 'component/base/shadow/none'
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
      amount: '4px'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['opacity', 'transform']
  }
};

export const POPOVER_STYLES: PopoverStyles = {
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

export const POPOVER_VARIANTS: PopoverVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'large', variant: 'filled', status: 'default' },

  // Variant styles
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'outlined', status: 'default' },
  { size: 'medium', variant: 'ghost', status: 'default' },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'info' },
  { size: 'medium', variant: 'filled', status: 'success' },
  { size: 'medium', variant: 'filled', status: 'warning' },
  { size: 'medium', variant: 'filled', status: 'error' },

  // With title and icon
  {
    size: 'medium',
    variant: 'filled',
    status: 'info',
    content: {
      title: {
        text: 'Information',
        icon: { name: 'info' },
        align: 'start'
      },
      description: 'This is an informational popover.'
    }
  },

  // With placement
  {
    size: 'medium',
    variant: 'filled',
    status: 'default',
    content: {
      title: { text: 'Tooltip Position' },
      description: 'This popover appears on the right.'
    },
    position: {
      placement: 'right',
      offset: {
        mainAxis: 8,
        crossAxis: 0
      },
      arrow: {
        enabled: true,
        padding: 8
      }
    }
  },

  // With HTML content
  {
    size: 'medium',
    variant: 'filled',
    status: 'success',
    content: {
      title: { text: 'HTML Content' },
      description: 'You can use <strong>HTML</strong> in the description.',
      html: true
    }
  },

  // With interaction options
  {
    size: 'medium',
    variant: 'outlined',
    status: 'warning',
    content: {
      title: { text: 'Interactive Popover' },
      description: 'This popover has custom interaction settings.'
    },
    interaction: {
      trigger: 'hover',
      openDelay: 200,
      closeDelay: 400,
      hideOnLeave: true,
      preventOverflow: true,
      focusTrap: true
    }
  },

  // Complex combinations
  {
    size: 'large',
    variant: 'outlined',
    status: 'error',
    content: {
      title: {
        text: 'Important Notice',
        icon: { name: 'alert-triangle' },
        align: 'start'
      },
      description: 'Please review the following security concerns:',
      html: true
    },
    position: {
      placement: 'bottom-start',
      offset: {
        mainAxis: 12,
        crossAxis: 0,
        alignmentAxis: 0
      },
      flip: {
        enabled: true,
        fallbackPlacements: ['top-start', 'right-start'],
        padding: 8
      },
      shift: {
        enabled: true,
        padding: 8
      },
      arrow: {
        enabled: true,
        padding: 12
      }
    },
    animation: {
      enabled: true,
      duration: 300,
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['opacity', 'transform']
    },
    interaction: {
      trigger: 'click',
      openDelay: 0,
      closeDelay: 200,
      hideOnClick: true,
      hideOnEsc: true,
      hideOnLeave: false,
      preventOverflow: true,
      closeOnBlur: true,
      focusTrap: true,
      returnFocus: true
    },
    closable: true,
    backdrop: true,
    zIndex: 1000,
    ariaLabel: 'Security notification',
    role: 'dialog'
  }
] as const; 