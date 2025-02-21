import { AlertSizeConfig, AlertStyle, AlertStyles, AlertVariantProps } from '../types/alert';

export const ALERT_SIZES: AlertSizeConfig = {
  small: {
    root: {
      minWidth: '280',
      maxWidth: '320',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/sm',
      padding: 'component/base/padding/xs'
    },
    content: {
      title: {
        fontSize: 'text/body/sm',
        lineHeight: 'text/lineHeight/sm',
        fontWeight: 'text/weight/medium',
        marginBottom: 'component/base/gap/2xs'
      },
      description: {
        fontSize: 'text/body/xs',
        lineHeight: 'text/lineHeight/xs',
        fontWeight: 'text/weight/regular'
      },
      spacing: 'component/base/gap/xs'
    },
    action: {
      height: 'component/base/height/sm',
      minWidth: '64',
      fontSize: 'text/body/xs',
      padding: 'component/base/padding/xs',
      spacing: 'component/base/gap/xs',
      iconSize: 'component/base/icon/xs'
    },
    close: {
      size: 'component/base/icon/sm',
      padding: 'component/base/padding/xs',
      offset: '4'
    },
    spacing: {
      icon: 'component/base/gap/xs',
      content: 'component/base/gap/sm',
      action: 'component/base/gap/sm'
    },
    padding: {
      x: 'component/base/padding/md',
      y: 'component/base/padding/sm'
    }
  },
  medium: {
    root: {
      minWidth: '320',
      maxWidth: '480',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/md',
      padding: 'component/base/padding/sm'
    },
    content: {
      title: {
        fontSize: 'text/body/md',
        lineHeight: 'text/lineHeight/md',
        fontWeight: 'text/weight/medium',
        marginBottom: 'component/base/gap/xs'
      },
      description: {
        fontSize: 'text/body/sm',
        lineHeight: 'text/lineHeight/sm',
        fontWeight: 'text/weight/regular'
      },
      spacing: 'component/base/gap/sm'
    },
    action: {
      height: 'component/base/height/md',
      minWidth: '80',
      fontSize: 'text/body/sm',
      padding: 'component/base/padding/sm',
      spacing: 'component/base/gap/sm',
      iconSize: 'component/base/icon/sm'
    },
    close: {
      size: 'component/base/icon/md',
      padding: 'component/base/padding/sm',
      offset: '8'
    },
    spacing: {
      icon: 'component/base/gap/sm',
      content: 'component/base/gap/md',
      action: 'component/base/gap/md'
    },
    padding: {
      x: 'component/base/padding/lg',
      y: 'component/base/padding/md'
    }
  },
  large: {
    root: {
      minWidth: '480',
      maxWidth: '640',
      borderRadius: 'component/base/radius/xl',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/lg',
      padding: 'component/base/padding/md'
    },
    content: {
      title: {
        fontSize: 'text/body/lg',
        lineHeight: 'text/lineHeight/lg',
        fontWeight: 'text/weight/medium',
        marginBottom: 'component/base/gap/sm'
      },
      description: {
        fontSize: 'text/body/md',
        lineHeight: 'text/lineHeight/md',
        fontWeight: 'text/weight/regular'
      },
      spacing: 'component/base/gap/md'
    },
    action: {
      height: 'component/base/height/lg',
      minWidth: '96',
      fontSize: 'text/body/md',
      padding: 'component/base/padding/md',
      spacing: 'component/base/gap/md',
      iconSize: 'component/base/icon/md'
    },
    close: {
      size: 'component/base/icon/lg',
      padding: 'component/base/padding/md',
      offset: '12'
    },
    spacing: {
      icon: 'component/base/gap/md',
      content: 'component/base/gap/lg',
      action: 'component/base/gap/lg'
    },
    padding: {
      x: 'component/base/padding/xl',
      y: 'component/base/padding/lg'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  dismissed: 'surface/color/disabled'
};

const baseContentStyle: AlertContentStyle = {
  background: baseStateStyle,
  border: baseStateStyle,
  shadow: {
    default: 'component/base/shadow/sm',
    hover: 'component/base/shadow/md',
    pressed: 'component/base/shadow/sm',
    dismissed: 'component/base/shadow/none'
  },
  text: {
    title: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      dismissed: 'text/color/disabled'
    },
    description: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      pressed: 'text/color/secondary',
      dismissed: 'text/color/disabled'
    }
  },
  icon: baseStateStyle
};

const baseStyle: AlertStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/lg',
      hover: 'component/base/shadow/xl',
      pressed: 'component/base/shadow/lg',
      dismissed: 'component/base/shadow/none'
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
        dismissed: 'surface/color/disabled'
      },
      border: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        dismissed: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          dismissed: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          dismissed: 'text/color/disabled'
        }
      },
      icon: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        dismissed: 'text/color/disabled'
      }
    },
    success: {
      ...baseContentStyle,
      background: {
        default: 'status/success/ghost/default',
        hover: 'status/success/ghost/hover',
        pressed: 'status/success/ghost/pressed',
        dismissed: 'surface/color/disabled'
      },
      border: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        dismissed: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          dismissed: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          dismissed: 'text/color/disabled'
        }
      },
      icon: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        dismissed: 'text/color/disabled'
      }
    },
    warning: {
      ...baseContentStyle,
      background: {
        default: 'status/warning/ghost/default',
        hover: 'status/warning/ghost/hover',
        pressed: 'status/warning/ghost/pressed',
        dismissed: 'surface/color/disabled'
      },
      border: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        dismissed: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          dismissed: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          dismissed: 'text/color/disabled'
        }
      },
      icon: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        dismissed: 'text/color/disabled'
      }
    },
    error: {
      ...baseContentStyle,
      background: {
        default: 'status/error/ghost/default',
        hover: 'status/error/ghost/hover',
        pressed: 'status/error/ghost/pressed',
        dismissed: 'surface/color/disabled'
      },
      border: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        dismissed: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          dismissed: 'text/color/disabled'
        },
        description: {
          default: 'text/color/default',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          dismissed: 'text/color/disabled'
        }
      },
      icon: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        dismissed: 'text/color/disabled'
      }
    }
  },
  action: {
    primary: {
      background: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        dismissed: 'surface/color/disabled'
      },
      border: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        dismissed: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        dismissed: 'text/color/disabled'
      },
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        dismissed: 'text/color/disabled'
      }
    },
    secondary: {
      background: baseStateStyle,
      border: baseStateStyle,
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        dismissed: 'text/color/disabled'
      },
      icon: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        dismissed: 'text/color/disabled'
      }
    }
  },
  close: {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      dismissed: 'surface/color/disabled'
    },
    icon: {
      default: 'text/color/secondary',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      dismissed: 'text/color/disabled'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      dismissed: 'surface/color/transparent'
    }
  },
  transition: {
    enter: {
      duration: '200ms',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['transform', 'opacity']
    },
    exit: {
      duration: '150ms',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      properties: ['transform', 'opacity']
    }
  }
};

export const ALERT_STYLES: AlertStyles = {
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
        dismissed: 'surface/color/disabled'
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
        dismissed: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        dismissed: 'surface/color/transparent'
      }
    }
  }
} as const;

export const ALERT_VARIANTS: AlertVariantProps[] = [
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

  // With icon
  {
    size: 'medium',
    variant: 'filled',
    status: 'info',
    icon: { name: 'info' },
    title: { text: 'Information' },
    description: { text: 'This is an informational message.' }
  },

  // With actions
  {
    size: 'medium',
    variant: 'filled',
    status: 'warning',
    icon: { name: 'warning' },
    title: { text: 'Warning' },
    description: { text: 'Are you sure you want to proceed?' },
    actions: [
      { label: 'Cancel', variant: 'secondary' },
      { label: 'Proceed', variant: 'primary' }
    ]
  },

  // With auto-dismiss
  {
    size: 'medium',
    variant: 'filled',
    status: 'success',
    icon: { name: 'check-circle' },
    title: { text: 'Success' },
    description: { text: 'Operation completed successfully.' },
    dismiss: {
      auto: {
        delay: 5000,
        pauseOnHover: true
      }
    }
  },

  // With custom position
  {
    size: 'medium',
    variant: 'outlined',
    status: 'info',
    position: {
      placement: 'top-end',
      offset: {
        x: 20,
        y: 20
      }
    }
  },

  // With animation
  {
    size: 'medium',
    variant: 'ghost',
    status: 'default',
    animation: {
      enter: {
        duration: 300,
        timing: 'ease-out',
        properties: ['transform', 'opacity'],
        custom: 'translateY(-20px)'
      },
      exit: {
        duration: 200,
        timing: 'ease-in',
        properties: ['transform', 'opacity'],
        custom: 'translateY(20px)'
      }
    }
  },

  // Complex combinations
  {
    size: 'large',
    variant: 'outlined',
    status: 'warning',
    icon: { name: 'alert-triangle' },
    title: {
      text: 'Attention Required',
      icon: { name: 'warning' },
      align: 'start'
    },
    description: {
      text: 'Your account security needs attention. Please review your security settings.',
      html: true
    },
    actions: [
      { label: 'Dismiss', variant: 'secondary' },
      { 
        label: 'Review Settings',
        variant: 'primary',
        icon: { name: 'settings' }
      }
    ],
    position: {
      placement: 'top',
      offset: { y: 40 },
      fullWidth: true
    },
    animation: {
      enter: {
        duration: 400,
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        properties: ['transform', 'opacity']
      }
    },
    dismiss: {
      showCloseButton: true,
      closeIcon: { name: 'x' },
      persistent: false
    },
    accessibility: {
      role: 'alertdialog',
      live: 'assertive',
      atomic: true
    }
  }
] as const; 