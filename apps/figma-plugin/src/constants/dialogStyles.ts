import { DialogSizeConfig, DialogStyle, DialogStyles, DialogVariantProps } from '../types/dialog';

export const DIALOG_SIZES: DialogSizeConfig = {
  small: {
    width: '400',
    minHeight: '200',
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
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin'
  },
  medium: {
    width: '600',
    minHeight: '300',
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
    borderRadius: 'component/base/radius/xl',
    borderWidth: 'component/base/border/width/thin'
  },
  large: {
    width: '800',
    minHeight: '400',
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
    borderRadius: 'component/base/radius/2xl',
    borderWidth: 'component/base/border/width/thin'
  },
  fullscreen: {
    width: '100vw',
    minHeight: '100vh',
    fontSize: {
      title: 'text/heading/lg',
      description: 'text/body/xl'
    },
    lineHeight: {
      title: 'text/lineHeight/3xl',
      description: 'text/lineHeight/xl'
    },
    iconSize: 'component/base/icon/2xl',
    spacing: {
      icon: 'component/base/gap/xl',
      title: 'component/base/gap/lg',
      content: 'component/base/gap/2xl',
      actions: 'component/base/gap/xl'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/2xl',
        vertical: 'component/base/padding/xl'
      },
      content: {
        horizontal: 'component/base/padding/2xl',
        vertical: 'component/base/padding/2xl'
      },
      footer: {
        horizontal: 'component/base/padding/2xl',
        vertical: 'component/base/padding/xl'
      }
    },
    borderRadius: 'component/base/radius/none',
    borderWidth: 'component/base/border/width/none'
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

const baseStyle: DialogStyle = {
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
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['opacity', 'transform']
  }
};

export const DIALOG_STYLES: DialogStyles = {
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

export const DIALOG_VARIANTS: DialogVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'large', variant: 'filled', status: 'default' },
  { size: 'fullscreen', variant: 'filled', status: 'default' },

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
      description: 'This is an informational dialog.'
    }
  },

  // With actions
  {
    size: 'medium',
    variant: 'filled',
    status: 'warning',
    content: {
      title: {
        text: 'Confirm Action',
        icon: { name: 'alert-triangle' }
      },
      description: 'Are you sure you want to proceed with this action?'
    },
    actions: [
      {
        label: 'Cancel',
        variant: 'secondary'
      },
      {
        label: 'Proceed',
        variant: 'primary',
        icon: { name: 'arrow-right' }
      }
    ]
  },

  // With HTML content
  {
    size: 'medium',
    variant: 'filled',
    status: 'success',
    content: {
      title: { text: 'HTML Content' },
      description: 'You can use <strong>HTML</strong> in the description.',
      html: true,
      scrollable: true,
      maxHeight: '400px'
    }
  },

  // With custom position
  {
    size: 'medium',
    variant: 'outlined',
    status: 'default',
    content: {
      title: { text: 'Custom Position' },
      description: 'This dialog appears at the top of the screen.'
    },
    position: {
      placement: 'top',
      offset: {
        y: 40
      }
    }
  },

  // Complex combinations
  {
    size: 'large',
    variant: 'outlined',
    status: 'error',
    content: {
      title: {
        text: 'Critical System Error',
        icon: { name: 'alert-circle' },
        align: 'start'
      },
      description: 'A critical system error has occurred. Please review the details below:',
      html: true,
      scrollable: true,
      maxHeight: '500px'
    },
    actions: [
      {
        label: 'Close',
        variant: 'secondary'
      },
      {
        label: 'Report Issue',
        variant: 'secondary',
        icon: { name: 'flag' }
      },
      {
        label: 'Try Again',
        variant: 'primary',
        icon: { name: 'refresh' },
        loading: true
      }
    ],
    position: {
      placement: 'center',
      fullWidth: false
    },
    animation: {
      enabled: true,
      duration: 300,
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['opacity', 'transform'],
      custom: {
        enter: 'scale(0.95)',
        exit: 'scale(1.05)'
      }
    },
    interaction: {
      closeOnEsc: true,
      closeOnOverlayClick: false,
      preventScroll: true,
      trapFocus: true,
      returnFocus: true,
      autoFocus: 'button[data-action="try-again"]'
    },
    closable: true,
    backdrop: true,
    persistent: true,
    destroyOnClose: false,
    zIndex: 1000,
    ariaLabel: 'System Error Dialog',
    role: 'alertdialog'
  }
] as const; 