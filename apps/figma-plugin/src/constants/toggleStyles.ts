import { ToggleSizeConfig, ToggleStyle, ToggleStyles, ToggleVariantProps } from '../types/toggle';

export const TOGGLE_SIZES: ToggleSizeConfig = {
  small: {
    track: {
      width: '32',
      height: '16',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin'
    },
    thumb: {
      size: '12',
      borderRadius: 'component/base/radius/circle',
      borderWidth: 'component/base/border/width/thin',
      offset: '2'
    },
    icon: {
      size: 'component/base/icon/2xs',
      padding: 'component/base/gap/2xs'
    },
    label: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      spacing: 'component/base/gap/xs'
    },
    spacing: {
      icon: 'component/base/gap/2xs',
      content: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    }
  },
  medium: {
    track: {
      width: '40',
      height: '20',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin'
    },
    thumb: {
      size: '16',
      borderRadius: 'component/base/radius/circle',
      borderWidth: 'component/base/border/width/thin',
      offset: '2'
    },
    icon: {
      size: 'component/base/icon/xs',
      padding: 'component/base/gap/xs'
    },
    label: {
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      spacing: 'component/base/gap/sm'
    },
    spacing: {
      icon: 'component/base/gap/xs',
      content: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    }
  },
  large: {
    track: {
      width: '48',
      height: '24',
      borderRadius: 'component/base/radius/pill',
      borderWidth: 'component/base/border/width/thin'
    },
    thumb: {
      size: '20',
      borderRadius: 'component/base/radius/circle',
      borderWidth: 'component/base/border/width/thin',
      offset: '2'
    },
    icon: {
      size: 'component/base/icon/sm',
      padding: 'component/base/gap/sm'
    },
    label: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      spacing: 'component/base/gap/md'
    },
    spacing: {
      icon: 'component/base/gap/sm',
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

const baseToggleStyle: ToggleStyle = {
  track: {
    background: {
      off: baseStateStyle,
      on: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    border: {
      off: baseStateStyle,
      on: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      }
    }
  },
  thumb: {
    background: {
      off: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        pressed: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      on: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        pressed: 'surface/color/white',
        disabled: 'surface/color/disabled'
      }
    },
    border: {
      off: baseStateStyle,
      on: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    shadow: {
      off: {
        default: 'component/base/shadow/sm',
        hover: 'component/base/shadow/sm',
        pressed: 'component/base/shadow/sm',
        disabled: 'component/base/shadow/none'
      },
      on: {
        default: 'component/base/shadow/sm',
        hover: 'component/base/shadow/sm',
        pressed: 'component/base/shadow/sm',
        disabled: 'component/base/shadow/none'
      }
    },
    transform: {
      off: 'translateX(2px)',
      on: 'translateX(calc(100% - 2px))'
    }
  },
  icon: {
    color: {
      off: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      on: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    opacity: {
      off: '0.8',
      on: '1'
    },
    transform: {
      off: 'scale(0.8)',
      on: 'scale(1)'
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
      off: '0.8',
      on: '1'
    }
  },
  transition: {
    duration: '150ms',
    timing: 'ease-in-out',
    properties: ['background', 'border', 'transform', 'opacity', 'color']
  }
};

export const TOGGLE_STYLES: ToggleStyles = {
  filled: {
    default: baseToggleStyle,
    success: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          ...baseToggleStyle.track.background,
          on: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseToggleStyle.track.border,
          on: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      },
      thumb: {
        ...baseToggleStyle.thumb,
        border: {
          ...baseToggleStyle.thumb.border,
          on: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          ...baseToggleStyle.track.background,
          on: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseToggleStyle.track.border,
          on: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      },
      thumb: {
        ...baseToggleStyle.thumb,
        border: {
          ...baseToggleStyle.thumb.border,
          on: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          ...baseToggleStyle.track.background,
          on: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseToggleStyle.track.border,
          on: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      },
      thumb: {
        ...baseToggleStyle.thumb,
        border: {
          ...baseToggleStyle.thumb.border,
          on: {
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
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/white',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'surface/color/white',
            hover: 'status/info/ghost/hover',
            pressed: 'status/info/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    success: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/white',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'surface/color/white',
            hover: 'status/success/ghost/hover',
            pressed: 'status/success/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/white',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'surface/color/white',
            hover: 'status/error/ghost/hover',
            pressed: 'status/error/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/white',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'surface/color/white',
            hover: 'status/warning/ghost/hover',
            pressed: 'status/warning/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    }
  },
  ghost: {
    default: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'status/info/ghost/hover',
            hover: 'status/info/ghost/pressed',
            pressed: 'status/info/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          },
          on: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      },
      thumb: {
        ...baseToggleStyle.thumb,
        border: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          },
          on: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      }
    },
    success: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'status/success/ghost/hover',
            hover: 'status/success/ghost/pressed',
            pressed: 'status/success/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          },
          on: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      }
    },
    error: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'status/error/ghost/hover',
            hover: 'status/error/ghost/pressed',
            pressed: 'status/error/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          },
          on: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      }
    },
    warning: {
      ...baseToggleStyle,
      track: {
        ...baseToggleStyle.track,
        background: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          on: {
            default: 'status/warning/ghost/hover',
            hover: 'status/warning/ghost/pressed',
            pressed: 'status/warning/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          off: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          },
          on: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      }
    }
  }
} as const;

export const TOGGLE_VARIANTS: ToggleVariantProps[] = [
  // Size variants
  {
    size: 'small',
    variant: 'filled',
    checked: false
  },
  {
    size: 'medium',
    variant: 'filled',
    checked: false
  },
  {
    size: 'large',
    variant: 'filled',
    checked: false
  },

  // Variant styles
  {
    size: 'medium',
    variant: 'filled',
    checked: false
  },
  {
    size: 'medium',
    variant: 'outlined',
    checked: false
  },
  {
    size: 'medium',
    variant: 'ghost',
    checked: false
  },

  // Status variants
  {
    size: 'medium',
    variant: 'filled',
    status: 'success',
    checked: true
  },
  {
    size: 'medium',
    variant: 'filled',
    status: 'error',
    checked: true
  },
  {
    size: 'medium',
    variant: 'filled',
    status: 'warning',
    checked: true
  },

  // With icons
  {
    size: 'medium',
    variant: 'filled',
    checked: false,
    icon: {
      name: 'check'
    }
  },

  // With labels
  {
    size: 'medium',
    variant: 'filled',
    checked: false,
    label: {
      on: 'On',
      off: 'Off',
      placement: 'end'
    }
  },

  // Disabled state
  {
    size: 'medium',
    variant: 'filled',
    checked: false,
    disabled: true
  },

  // Full featured
  {
    size: 'medium',
    variant: 'filled',
    checked: true,
    icon: {
      name: 'check'
    },
    label: {
      on: 'Active',
      off: 'Inactive',
      placement: 'end'
    },
    validation: {
      required: true
    },
    animation: {
      duration: 200,
      timing: 'ease-in-out'
    }
  }
] as const; 