import { SwitchSizeConfig, SwitchStyle, SwitchStyles, SwitchVariantProps } from '../types/switch';

export const SWITCH_SIZES: SwitchSizeConfig = {
  small: {
    track: {
      width: 'component/base/height/lg',
      height: 'component/base/height/xs',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin'
    },
    thumb: {
      size: 'component/base/height/xs',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin',
      offset: 'component/base/gap/2xs'
    },
    icon: {
      size: 'component/base/icon/xs',
      spacing: 'component/base/gap/2xs'
    },
    label: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/body/sm',
      spacing: 'component/base/gap/xs'
    },
    spacing: {
      content: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    }
  },
  medium: {
    track: {
      width: 'component/base/height/xl',
      height: 'component/base/height/sm',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin'
    },
    thumb: {
      size: 'component/base/height/sm',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin',
      offset: 'component/base/gap/xs'
    },
    icon: {
      size: 'component/base/icon/sm',
      spacing: 'component/base/gap/xs'
    },
    label: {
      fontSize: 'text/body/md',
      lineHeight: 'text/body/md',
      spacing: 'component/base/gap/sm'
    },
    spacing: {
      content: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    }
  },
  large: {
    track: {
      width: 'component/base/height/2xl',
      height: 'component/base/height/md',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin'
    },
    thumb: {
      size: 'component/base/height/md',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin',
      offset: 'component/base/gap/sm'
    },
    icon: {
      size: 'component/base/icon/md',
      spacing: 'component/base/gap/sm'
    },
    label: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/body/lg',
      spacing: 'component/base/gap/md'
    },
    spacing: {
      content: 'component/base/gap/md',
      group: 'component/base/gap/lg'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseStyle: SwitchStyle = {
  track: {
    background: {
      unchecked: baseStateStyle,
      checked: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    border: {
      unchecked: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      checked: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      }
    }
  },
  thumb: {
    background: {
      unchecked: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        pressed: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      checked: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        pressed: 'surface/color/white',
        disabled: 'surface/color/disabled'
      }
    },
    border: {
      unchecked: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      checked: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    shadow: {
      unchecked: {
        default: 'component/base/shadow/sm',
        hover: 'component/base/shadow/md',
        pressed: 'component/base/shadow/sm',
        disabled: 'component/base/shadow/none'
      },
      checked: {
        default: 'component/base/shadow/sm',
        hover: 'component/base/shadow/md',
        pressed: 'component/base/shadow/sm',
        disabled: 'component/base/shadow/none'
      }
    },
    transform: {
      unchecked: 'translateX(0)',
      checked: 'translateX(100%)'
    }
  },
  icon: {
    color: {
      unchecked: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      checked: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    opacity: {
      unchecked: '0',
      checked: '1'
    },
    transform: {
      unchecked: 'scale(0.8)',
      checked: 'scale(1)'
    }
  },
  label: {
    color: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    opacity: {
      unchecked: '0.8',
      checked: '1'
    }
  },
  loading: {
    spinner: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      pressed: 'text/color/secondary',
      disabled: 'text/color/disabled'
    },
    overlay: {
      default: 'surface/color/overlay',
      hover: 'surface/color/overlay',
      pressed: 'surface/color/overlay',
      disabled: 'surface/color/overlay'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['transform', 'background', 'border', 'opacity', 'box-shadow']
  }
};

export const SWITCH_STYLES: SwitchStyles = {
  filled: {
    default: baseStyle,
    success: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          ...baseStyle.track.background,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.track.border,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          ...baseStyle.track.background,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.track.border,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          ...baseStyle.track.background,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.track.border,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    }
  },
  outlined: {
    default: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          unchecked: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          checked: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    success: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          unchecked: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          checked: {
            default: 'surface/color/transparent',
            hover: 'status/success/ghost/hover',
            pressed: 'status/success/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.track.border,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          unchecked: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          checked: {
            default: 'surface/color/transparent',
            hover: 'status/error/ghost/hover',
            pressed: 'status/error/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.track.border,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          unchecked: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          checked: {
            default: 'surface/color/transparent',
            hover: 'status/warning/ghost/hover',
            pressed: 'status/warning/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.track.border,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    }
  }
} as const;

export const SWITCH_VARIANTS: SwitchVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'large', variant: 'filled', status: 'default' },

  // Variant styles
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'outlined', status: 'default' },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'filled', status: 'success' },
  { size: 'medium', variant: 'filled', status: 'error' },
  { size: 'medium', variant: 'filled', status: 'warning' },

  // With icons
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    icon: { name: 'check' }
  },

  // With labels
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    label: {
      checked: 'ON',
      unchecked: 'OFF',
      placement: 'end'
    }
  },

  // Loading state
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    loading: {
      state: true,
      indicator: { name: 'spinner' }
    }
  },

  // Disabled state
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    disabled: true
  },

  // Complex combinations
  { 
    size: 'large',
    variant: 'outlined',
    status: 'success',
    icon: { name: 'check' },
    label: {
      checked: 'Enabled',
      unchecked: 'Disabled',
      placement: 'end'
    },
    animation: {
      duration: 300,
      timing: 'ease-in-out',
      properties: ['transform', 'opacity']
    }
  }
] as const; 