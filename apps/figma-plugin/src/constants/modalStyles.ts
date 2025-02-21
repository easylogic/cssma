import { ModalSizeConfig, ModalStyle, ModalStyles, ModalVariantProps } from '../types/modal';

export const MODAL_SIZES: ModalSizeConfig = {
  small: {
    width: '400',
    minHeight: '200',
    maxHeight: '80vh',
    spacing: {
      header: 'component/base/gap/sm',
      content: 'component/base/gap/md',
      footer: 'component/base/gap/sm',
      section: 'component/base/gap/md'
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
    borderWidth: 'component/base/border/width/thin',
    elevation: 'component/base/shadow/lg'
  },
  medium: {
    width: '600',
    minHeight: '300',
    maxHeight: '80vh',
    spacing: {
      header: 'component/base/gap/md',
      content: 'component/base/gap/lg',
      footer: 'component/base/gap/md',
      section: 'component/base/gap/lg'
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
    borderWidth: 'component/base/border/width/thin',
    elevation: 'component/base/shadow/xl'
  },
  large: {
    width: '800',
    minHeight: '400',
    maxHeight: '90vh',
    spacing: {
      header: 'component/base/gap/lg',
      content: 'component/base/gap/xl',
      footer: 'component/base/gap/lg',
      section: 'component/base/gap/xl'
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
    borderWidth: 'component/base/border/width/thin',
    elevation: 'component/base/shadow/2xl'
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
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: baseStateStyle
};

const baseStyle: ModalStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/lg',
      hover: 'component/base/shadow/xl',
      pressed: 'component/base/shadow/lg',
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
  header: {
    ...baseContentStyle,
    title: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    subtitle: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      pressed: 'text/color/secondary',
      disabled: 'text/color/disabled'
    },
    close: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      icon: {
        default: 'text/color/secondary',
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
    }
  },
  content: baseContentStyle,
  footer: {
    ...baseContentStyle,
    divider: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    button: {
      primary: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      secondary: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      }
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['opacity', 'transform']
  }
};

export const MODAL_STYLES: ModalStyles = {
  filled: {
    default: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: baseStateStyle,
        border: baseStateStyle
      }
    },
    info: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      },
      header: {
        ...baseStyle.header,
        title: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        },
        subtitle: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        }
      }
    },
    success: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      },
      header: {
        ...baseStyle.header,
        title: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        },
        subtitle: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        }
      }
    },
    warning: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      },
      header: {
        ...baseStyle.header,
        title: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        },
        subtitle: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        }
      }
    },
    error: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      },
      header: {
        ...baseStyle.header,
        title: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        },
        subtitle: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        }
      }
    }
  },
  outlined: {
    default: {
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
    info: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'status/info/ghost/hover',
          pressed: 'status/info/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        }
      }
    },
    success: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'status/success/ghost/hover',
          pressed: 'status/success/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'surface/color/disabled'
        }
      }
    },
    warning: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'status/warning/ghost/hover',
          pressed: 'status/warning/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'surface/color/disabled'
        }
      }
    },
    error: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'surface/color/disabled'
        }
      }
    }
  },
  ghost: {
    default: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      }
    },
    info: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      }
    },
    success: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      }
    },
    warning: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      }
    },
    error: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
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
        }
      }
    }
  }
} as const;

export const MODAL_VARIANTS: ModalVariantProps[] = [
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
  { size: 'medium', variant: 'filled', status: 'default', position: { type: 'center' } },
  { size: 'medium', variant: 'filled', status: 'default', position: { type: 'top', align: 'center' } },
  { size: 'medium', variant: 'filled', status: 'default', position: { type: 'right', align: 'center' } },
  { size: 'medium', variant: 'filled', status: 'default', position: { type: 'bottom', align: 'center' } },
  { size: 'medium', variant: 'filled', status: 'default', position: { type: 'left', align: 'center' } },

  // With header
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    header: {
      title: 'Modal Title',
      subtitle: 'Modal Subtitle',
      icon: { name: 'info' },
      divider: true,
      closeButton: true
    }
  },

  // With footer
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    footer: {
      divider: true,
      actions: ['Cancel', 'Submit'],
      align: 'end'
    }
  },

  // With overlay
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    overlay: {
      blur: true,
      blurAmount: 4,
      opacity: 0.5
    }
  },

  // With animation
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    animation: {
      enabled: true,
      duration: 200,
      timing: 'ease-in-out',
      properties: ['opacity', 'transform'],
      custom: {
        enter: 'fade-in-up',
        exit: 'fade-out-down'
      }
    }
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'outlined',
    status: 'info',
    header: {
      title: 'Confirmation',
      subtitle: 'Please confirm your action',
      icon: { name: 'question', size: 24 },
      divider: true,
      closeButton: true,
      closeIcon: { name: 'close' }
    },
    footer: {
      divider: true,
      actions: ['Cancel', 'Confirm'],
      align: 'end'
    },
    overlay: {
      blur: true,
      blurAmount: 4,
      opacity: 0.5
    },
    position: {
      type: 'center',
      offset: { y: -50 }
    },
    animation: {
      enabled: true,
      duration: 300,
      timing: 'ease-out',
      properties: ['opacity', 'transform', 'blur'],
      custom: {
        enter: 'zoom-in',
        exit: 'zoom-out'
      }
    },
    closeOnEsc: true,
    closeOnOverlayClick: true,
    destroyOnClose: true,
    focusTrap: true,
    scrollable: true
  }
] as const; 