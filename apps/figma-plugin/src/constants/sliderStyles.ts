import { SliderSizeConfig, SliderStyle, SliderStyles, SliderVariantProps } from '../types/slider';

export const SLIDER_SIZES: SliderSizeConfig = {
  small: {
    track: {
      width: 'component/base/height/2xs',
      radius: 'component/base/radius/pill',
      minLength: '120'
    },
    thumb: {
      size: 'component/base/height/sm',
      radius: 'component/base/radius/pill',
      border: 'component/base/border/width/thin',
      ripple: {
        size: 'component/base/height/lg',
        opacity: '0.12'
      }
    },
    mark: {
      size: 'component/base/height/2xs',
      fontSize: 'text/body/xs',
      spacing: 'component/base/gap/xs'
    },
    tooltip: {
      fontSize: 'text/body/xs',
      padding: 'component/base/padding/xs',
      offset: 'component/base/gap/xs',
      arrow: 'component/base/gap/2xs'
    }
  },
  medium: {
    track: {
      width: 'component/base/height/xs',
      radius: 'component/base/radius/pill',
      minLength: '160'
    },
    thumb: {
      size: 'component/base/height/md',
      radius: 'component/base/radius/pill',
      border: 'component/base/border/width/thin',
      ripple: {
        size: 'component/base/height/xl',
        opacity: '0.12'
      }
    },
    mark: {
      size: 'component/base/height/xs',
      fontSize: 'text/body/sm',
      spacing: 'component/base/gap/sm'
    },
    tooltip: {
      fontSize: 'text/body/sm',
      padding: 'component/base/padding/sm',
      offset: 'component/base/gap/sm',
      arrow: 'component/base/gap/xs'
    }
  },
  large: {
    track: {
      width: 'component/base/height/sm',
      radius: 'component/base/radius/pill',
      minLength: '200'
    },
    thumb: {
      size: 'component/base/height/lg',
      radius: 'component/base/radius/pill',
      border: 'component/base/border/width/thin',
      ripple: {
        size: 'component/base/height/2xl',
        opacity: '0.12'
      }
    },
    mark: {
      size: 'component/base/height/sm',
      fontSize: 'text/body/md',
      spacing: 'component/base/gap/md'
    },
    tooltip: {
      fontSize: 'text/body/md',
      padding: 'component/base/padding/md',
      offset: 'component/base/gap/md',
      arrow: 'component/base/gap/sm'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  focused: 'surface/color/hover',
  dragging: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseStyle: SliderStyle = {
  track: {
    background: {
      filled: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        focused: 'status/info/hover',
        dragging: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      unfilled: baseStateStyle
    },
    border: baseStateStyle
  },
  thumb: {
    background: {
      default: 'surface/color/white',
      hover: 'surface/color/white',
      focused: 'surface/color/white',
      dragging: 'surface/color/white',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      focused: 'status/info/hover',
      dragging: 'status/info/pressed',
      disabled: 'surface/color/disabled'
    },
    shadow: {
      default: 'component/base/shadow/sm',
      hover: 'component/base/shadow/md',
      focused: 'component/base/shadow/md',
      dragging: 'component/base/shadow/lg',
      disabled: 'component/base/shadow/none'
    },
    ripple: {
      color: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        focused: 'status/info/hover',
        dragging: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      opacity: {
        default: 'opacity/0',
        hover: 'opacity/10',
        focused: 'opacity/20',
        dragging: 'opacity/30',
        disabled: 'opacity/0'
      }
    }
  },
  mark: {
    dot: {
      background: baseStateStyle,
      border: baseStateStyle
    },
    text: {
      color: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        focused: 'text/color/default',
        dragging: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      active: {
        default: 'text/color/default',
        hover: 'text/color/default',
        focused: 'text/color/default',
        dragging: 'text/color/default',
        disabled: 'text/color/disabled'
      }
    }
  },
  tooltip: {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/default',
      focused: 'surface/color/default',
      dragging: 'surface/color/default',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      focused: 'text/color/default',
      dragging: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    border: baseStateStyle,
    arrow: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/sm',
      hover: 'component/base/shadow/sm',
      focused: 'component/base/shadow/sm',
      dragging: 'component/base/shadow/sm',
      disabled: 'component/base/shadow/none'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['transform', 'opacity', 'background', 'border-color', 'box-shadow']
  }
};

export const SLIDER_STYLES: SliderStyles = {
  filled: {
    default: baseStyle,
    success: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          filled: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            focused: 'status/success/hover',
            dragging: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: baseStateStyle
        }
      },
      thumb: {
        ...baseStyle.thumb,
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/hover',
          dragging: 'status/success/pressed',
          disabled: 'surface/color/disabled'
        },
        ripple: {
          ...baseStyle.thumb.ripple,
          color: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            focused: 'status/success/hover',
            dragging: 'status/success/pressed',
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
          filled: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            focused: 'status/error/hover',
            dragging: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: baseStateStyle
        }
      },
      thumb: {
        ...baseStyle.thumb,
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/hover',
          dragging: 'status/error/pressed',
          disabled: 'surface/color/disabled'
        },
        ripple: {
          ...baseStyle.thumb.ripple,
          color: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            focused: 'status/error/hover',
            dragging: 'status/error/pressed',
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
          filled: {
            default: 'status/info/ghost/default',
            hover: 'status/info/ghost/hover',
            focused: 'status/info/ghost/hover',
            dragging: 'status/info/ghost/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: {
            default: 'surface/color/white',
            hover: 'surface/color/hover',
            focused: 'surface/color/hover',
            dragging: 'surface/color/pressed',
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
          filled: {
            default: 'status/success/ghost/default',
            hover: 'status/success/ghost/hover',
            focused: 'status/success/ghost/hover',
            dragging: 'status/success/ghost/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: {
            default: 'surface/color/white',
            hover: 'surface/color/hover',
            focused: 'surface/color/hover',
            dragging: 'surface/color/pressed',
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
          filled: {
            default: 'status/error/ghost/default',
            hover: 'status/error/ghost/hover',
            focused: 'status/error/ghost/hover',
            dragging: 'status/error/ghost/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: {
            default: 'surface/color/white',
            hover: 'surface/color/hover',
            focused: 'surface/color/hover',
            dragging: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      }
    }
  },
  minimal: {
    default: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          filled: {
            default: 'status/info/ghost/default',
            hover: 'status/info/ghost/hover',
            focused: 'status/info/ghost/hover',
            dragging: 'status/info/ghost/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            focused: 'surface/color/hover',
            dragging: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          dragging: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      thumb: {
        ...baseStyle.thumb,
        shadow: {
          default: 'component/base/shadow/none',
          hover: 'component/base/shadow/sm',
          focused: 'component/base/shadow/sm',
          dragging: 'component/base/shadow/md',
          disabled: 'component/base/shadow/none'
        }
      }
    },
    success: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          filled: {
            default: 'status/success/ghost/default',
            hover: 'status/success/ghost/hover',
            focused: 'status/success/ghost/hover',
            dragging: 'status/success/ghost/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            focused: 'surface/color/hover',
            dragging: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          dragging: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    error: {
      ...baseStyle,
      track: {
        ...baseStyle.track,
        background: {
          filled: {
            default: 'status/error/ghost/default',
            hover: 'status/error/ghost/hover',
            focused: 'status/error/ghost/hover',
            dragging: 'status/error/ghost/pressed',
            disabled: 'surface/color/disabled'
          },
          unfilled: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            focused: 'surface/color/hover',
            dragging: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          dragging: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    }
  }
} as const;

export const SLIDER_VARIANTS: SliderVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', min: 0, max: 100, step: 1 },
  { size: 'medium', variant: 'filled', min: 0, max: 100, step: 1 },
  { size: 'large', variant: 'filled', min: 0, max: 100, step: 1 },

  // Variant styles
  { size: 'medium', variant: 'filled', min: 0, max: 100, step: 1 },
  { size: 'medium', variant: 'outlined', min: 0, max: 100, step: 1 },
  { size: 'medium', variant: 'minimal', min: 0, max: 100, step: 1 },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'default', min: 0, max: 100, step: 1 },
  { size: 'medium', variant: 'filled', status: 'success', min: 0, max: 100, step: 1 },
  { size: 'medium', variant: 'filled', status: 'error', min: 0, max: 100, step: 1 },

  // With marks
  {
    size: 'medium',
    variant: 'filled',
    min: 0,
    max: 100,
    step: 20,
    marks: [
      { value: 0, label: '0%' },
      { value: 20, label: '20%' },
      { value: 40, label: '40%' },
      { value: 60, label: '60%' },
      { value: 80, label: '80%' },
      { value: 100, label: '100%' }
    ]
  },

  // Range slider
  {
    size: 'medium',
    variant: 'filled',
    range: true,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [20, 80]
  },

  // With tooltip
  {
    size: 'medium',
    variant: 'filled',
    min: 0,
    max: 100,
    step: 1,
    tooltip: {
      visible: 'always',
      placement: 'top',
      formatter: (value) => `${value}%`
    }
  },

  // Vertical orientation
  {
    size: 'medium',
    variant: 'filled',
    min: 0,
    max: 100,
    step: 1,
    orientation: 'vertical'
  },

  // Complex combinations
  {
    size: 'medium',
    variant: 'outlined',
    range: true,
    min: 0,
    max: 1000,
    step: 100,
    defaultValue: [200, 800],
    marks: [
      { value: 0, label: '$0' },
      { value: 200, label: '$200' },
      { value: 400, label: '$400' },
      { value: 600, label: '$600' },
      { value: 800, label: '$800' },
      { value: 1000, label: '$1000' }
    ],
    tooltip: {
      visible: 'always',
      placement: 'top',
      formatter: (value) => `$${value}`
    },
    keyboard: {
      enabled: true,
      step: 100,
      page: 200
    },
    accessibility: {
      ariaLabel: 'Price Range Slider',
      getAriaValueText: (value) => `$${value}`
    }
  }
] as const; 