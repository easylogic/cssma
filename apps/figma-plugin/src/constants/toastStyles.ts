import { ToastSizeConfig, ToastStyle, ToastStyles, ToastVariantProps } from '../types/toast';

export const TOAST_SIZES: ToastSizeConfig = {
  small: {
    height: '32',
    fontSize: 'text/size/sm',
    lineHeight: 'text/lineHeight/sm',
    iconSize: '16',
    spacing: {
      icon: 'component/base/gap/xs',
      action: 'component/base/gap/sm',
      group: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/xs'
    },
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin',
    minWidth: '240',
    maxWidth: '320'
  },
  medium: {
    height: '40',
    fontSize: 'text/size/md',
    lineHeight: 'text/lineHeight/md',
    iconSize: '20',
    spacing: {
      icon: 'component/base/gap/sm',
      action: 'component/base/gap/md',
      group: 'component/base/gap/md'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/sm'
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin',
    minWidth: '280',
    maxWidth: '400'
  },
  large: {
    height: '48',
    fontSize: 'text/size/lg',
    lineHeight: 'text/lineHeight/lg',
    iconSize: '24',
    spacing: {
      icon: 'component/base/gap/md',
      action: 'component/base/gap/lg',
      group: 'component/base/gap/lg'
    },
    padding: {
      horizontal: 'component/base/padding/lg',
      vertical: 'component/base/padding/md'
    },
    borderRadius: 'component/base/radius/xl',
    borderWidth: 'component/base/border/width/thin',
    minWidth: '320',
    maxWidth: '480'
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed'
};

const baseContentStyle = {
  background: baseStateStyle,
  text: {
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default'
  },
  icon: {
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default'
  },
  border: baseStateStyle
};

const baseStyle: ToastStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/md',
      hover: 'component/base/shadow/lg',
      pressed: 'component/base/shadow/md'
    }
  },
  content: {
    default: baseContentStyle,
    info: {
      ...baseContentStyle,
      background: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      },
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      }
    },
    success: {
      ...baseContentStyle,
      background: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      },
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      }
    },
    warning: {
      ...baseContentStyle,
      background: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      },
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      }
    },
    error: {
      ...baseContentStyle,
      background: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      },
      icon: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse'
      }
    }
  },
  action: {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default'
    },
    icon: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default'
    },
    border: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['opacity', 'transform']
  }
};

export const TOAST_STYLES: ToastStyles = {
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
        pressed: 'surface/color/pressed'
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
        pressed: 'surface/color/pressed'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent'
      }
    }
  }
} as const;

export const TOAST_VARIANTS: ToastVariantProps[] = [
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

  // Position variants
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    position: {
      position: 'top-right',
      offset: { x: 16, y: 16 },
      gap: 8
    }
  },

  // With icon
  {
    size: 'medium',
    variant: 'filled',
    status: 'info',
    icon: { name: 'info', size: 20 }
  },

  // With action
  {
    size: 'medium',
    variant: 'filled',
    status: 'default',
    action: {
      label: 'Undo',
      icon: { name: 'undo' }
    }
  },

  // With duration and progress
  {
    size: 'medium',
    variant: 'filled',
    status: 'default',
    duration: {
      duration: 5000,
      pauseOnHover: true,
      resumeOnLeave: true
    },
    progress: {
      show: true,
      position: 'bottom',
      color: 'status/info/default',
      height: 2
    }
  },

  // With animation
  {
    size: 'medium',
    variant: 'filled',
    status: 'default',
    animation: {
      enter: {
        duration: 200,
        timing: 'ease-out',
        properties: ['opacity', 'transform']
      },
      exit: {
        duration: 150,
        timing: 'ease-in',
        properties: ['opacity', 'transform']
      }
    }
  },

  // Complex combinations
  {
    size: 'medium',
    variant: 'filled',
    status: 'success',
    title: 'Success',
    description: 'Operation completed successfully',
    icon: { name: 'check-circle', size: 20 },
    action: {
      label: 'View',
      icon: { name: 'external-link' }
    },
    position: {
      position: 'bottom-right',
      offset: { x: 16, y: 16 },
      gap: 8,
      zIndex: 1000
    },
    animation: {
      enter: {
        duration: 300,
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        properties: ['opacity', 'transform']
      },
      exit: {
        duration: 200,
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        properties: ['opacity', 'transform']
      }
    },
    duration: {
      duration: 5000,
      pauseOnHover: true,
      resumeOnLeave: true
    },
    progress: {
      show: true,
      position: 'bottom',
      color: 'status/success/default',
      height: 2
    },
    closable: true,
    closeOnClick: false,
    preserveOnHover: true,
    maxCount: 5,
    ariaLabel: 'Success notification',
    role: 'alert'
  }
] as const; 