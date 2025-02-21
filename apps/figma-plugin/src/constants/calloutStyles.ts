import { CalloutSizeConfig, CalloutStyle, CalloutStyles, CalloutVariantProps } from '../types/callout';

export const CALLOUT_SIZES: CalloutSizeConfig = {
  small: {
    minHeight: '48',
    fontSize: {
      title: 'text/body/sm',
      description: 'text/body/xs'
    },
    lineHeight: {
      title: 'text/lineHeight/sm',
      description: 'text/lineHeight/xs'
    },
    iconSize: 'component/base/icon/sm',
    spacing: {
      icon: 'component/base/gap/xs',
      title: 'component/base/gap/2xs',
      content: 'component/base/gap/xs',
      action: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/xs'
    },
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin'
  },
  medium: {
    minHeight: '64',
    fontSize: {
      title: 'text/body/md',
      description: 'text/body/sm'
    },
    lineHeight: {
      title: 'text/lineHeight/md',
      description: 'text/lineHeight/sm'
    },
    iconSize: 'component/base/icon/md',
    spacing: {
      icon: 'component/base/gap/sm',
      title: 'component/base/gap/xs',
      content: 'component/base/gap/sm',
      action: 'component/base/gap/md'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/sm'
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin'
  },
  large: {
    minHeight: '80',
    fontSize: {
      title: 'text/body/lg',
      description: 'text/body/md'
    },
    lineHeight: {
      title: 'text/lineHeight/lg',
      description: 'text/lineHeight/md'
    },
    iconSize: 'component/base/icon/lg',
    spacing: {
      icon: 'component/base/gap/md',
      title: 'component/base/gap/sm',
      content: 'component/base/gap/md',
      action: 'component/base/gap/lg'
    },
    padding: {
      horizontal: 'component/base/padding/lg',
      vertical: 'component/base/padding/md'
    },
    borderRadius: 'component/base/radius/xl',
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

const baseStyle: CalloutStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/sm',
      hover: 'component/base/shadow/md',
      pressed: 'component/base/shadow/sm',
      disabled: 'component/base/shadow/none'
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
    },
    tip: {
      ...baseContentStyle,
      background: {
        default: 'status/secondary/ghost/default',
        hover: 'status/secondary/ghost/hover',
        pressed: 'status/secondary/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        title: {
          default: 'status/secondary/default',
          hover: 'status/secondary/hover',
          pressed: 'status/secondary/pressed',
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
    }
  },
  action: {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    text: baseStateStyle,
    icon: baseStateStyle,
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['opacity', 'transform', 'background', 'border']
  }
};

export const CALLOUT_STYLES: CalloutStyles = {
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

export const CALLOUT_VARIANTS: CalloutVariantProps[] = [
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
  { size: 'medium', variant: 'filled', status: 'tip' },

  // With icon
  {
    size: 'medium',
    variant: 'filled',
    status: 'info',
    content: {
      icon: { name: 'info', placement: 'start' },
      title: 'Information',
      description: 'This is an informational callout.'
    }
  },

  // With action
  {
    size: 'medium',
    variant: 'filled',
    status: 'warning',
    content: {
      icon: { name: 'warning' },
      title: 'Warning',
      description: 'This action cannot be undone.'
    },
    action: {
      label: 'Learn More',
      icon: { name: 'external-link' }
    }
  },

  // With HTML content
  {
    size: 'medium',
    variant: 'filled',
    status: 'tip',
    content: {
      icon: { name: 'lightbulb' },
      title: 'Pro Tip',
      description: 'You can use <strong>HTML</strong> in the description.',
      html: true
    }
  },

  // Collapsible
  {
    size: 'medium',
    variant: 'outlined',
    status: 'info',
    content: {
      icon: { name: 'info' },
      title: 'Expandable Content',
      description: 'Click to see more details.'
    },
    collapsible: true,
    expanded: false
  },

  // Dismissible
  {
    size: 'medium',
    variant: 'filled',
    status: 'success',
    content: {
      icon: { name: 'check-circle' },
      title: 'Dismissible Notice',
      description: 'You can dismiss this message.'
    },
    dismiss: {
      enabled: true,
      persistent: true,
      storageKey: 'success-notice-dismissed'
    },
    closable: true
  },

  // Complex combinations
  {
    size: 'large',
    variant: 'outlined',
    status: 'warning',
    content: {
      icon: { name: 'alert-triangle', placement: 'start' },
      title: 'Important Security Notice',
      description: 'Your account security needs attention. Please review the following items:',
      html: true
    },
    action: {
      label: 'Review Settings',
      icon: { name: 'settings' }
    },
    animation: {
      enabled: true,
      duration: 300,
      timing: 'ease-in-out',
      properties: ['opacity', 'height']
    },
    dismiss: {
      enabled: true,
      persistent: true,
      storageKey: 'security-notice-dismissed'
    },
    closable: true,
    collapsible: true,
    expanded: true,
    bordered: true,
    elevated: true,
    fullWidth: true,
    ariaLabel: 'Security notification',
    role: 'alert'
  }
] as const; 