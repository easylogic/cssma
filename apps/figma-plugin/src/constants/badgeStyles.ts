import { BadgeSizeConfig, BadgeStyle, BadgeStyles, BadgeVariantProps } from '../types/badge';

export const BADGE_SIZES: BadgeSizeConfig = {
  small: { 
    height: 'component/base/height/xs',
    fontSize: 'text/body/2xs',
    lineHeight: 'text/body/2xs',
    iconSize: 'component/base/icon/xs',
    spacing: {
      content: 'component/base/gap/2xs',
      standalone: 'component/base/gap/xs'
    },
    padding: {
      horizontal: 'component/base/padding/xs',
      vertical: 'component/base/padding/2xs'
    },
    offset: {
      x: '-4',
      y: '4'
    },
    borderRadius: {
      rounded: 'component/base/radius/sm',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin',
    minWidth: '16',
    maxWidth: '120'
  },
  medium: { 
    height: 'component/base/height/sm',
    fontSize: 'text/body/xs',
    lineHeight: 'text/body/xs',
    iconSize: 'component/base/icon/sm',
    spacing: {
      content: 'component/base/gap/xs',
      standalone: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/xs'
    },
    offset: {
      x: '-6',
      y: '6'
    },
    borderRadius: {
      rounded: 'component/base/radius/md',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin',
    minWidth: '20',
    maxWidth: '160'
  },
  large: {
    height: 'component/base/height/md',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/md',
    spacing: {
      content: 'component/base/gap/sm',
      standalone: 'component/base/gap/md'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/sm'
    },
    offset: {
      x: '-8',
      y: '8'
    },
    borderRadius: {
      rounded: 'component/base/radius/lg',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin',
    minWidth: '24',
    maxWidth: '200'
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseContentStyle: BadgeStyle['content']['default'] = {
  background: baseStateStyle,
  text: {
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  icon: {
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: baseStateStyle
};

const baseStyle: BadgeStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle
  },
  content: {
    default: baseContentStyle,
    dot: {
      ...baseContentStyle,
      background: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    count: {
      ...baseContentStyle,
      background: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    text: baseContentStyle
  },
  wrapper: {
    spacing: {
      default: 'component/base/gap/sm',
      compact: 'component/base/gap/xs',
      loose: 'component/base/gap/md'
    },
    offset: {
      default: '4',
      custom: '0'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['background', 'border', 'color', 'transform', 'opacity']
  }
};

export const BADGE_STYLES: BadgeStyles = {
  filled: {
    default: {
      ...baseStyle,
      root: {
        background: baseStateStyle,
        border: baseStateStyle
      }
    },
    primary: {
      ...baseStyle,
      root: {
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
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    info: {
      ...baseStyle,
      root: {
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
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    success: {
      ...baseStyle,
      root: {
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
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseStyle,
      root: {
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
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseStyle,
      root: {
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
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/inverse',
            hover: 'text/color/inverse',
            pressed: 'text/color/inverse',
            disabled: 'text/color/disabled'
          }
        }
      }
    }
  },
  outlined: {
    default: {
      ...baseStyle,
      root: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        border: baseStateStyle
      }
    },
    primary: {
      ...baseStyle,
      root: {
        background: {
          default: 'surface/color/transparent',
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    info: {
      ...baseStyle,
      root: {
        background: {
          default: 'surface/color/transparent',
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    success: {
      ...baseStyle,
      root: {
        background: {
          default: 'surface/color/transparent',
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseStyle,
      root: {
        background: {
          default: 'surface/color/transparent',
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseStyle,
      root: {
        background: {
          default: 'surface/color/transparent',
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    }
  },
  ghost: {
    default: {
      ...baseStyle,
      root: {
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
    primary: {
      ...baseStyle,
      root: {
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    info: {
      ...baseStyle,
      root: {
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/info/default',
            hover: 'status/info/hover',
            pressed: 'status/info/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    success: {
      ...baseStyle,
      root: {
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseStyle,
      root: {
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseStyle,
      root: {
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
      },
      content: {
        ...baseStyle.content,
        default: {
          ...baseStyle.content.default,
          text: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    }
  }
} as const;

export const BADGE_VARIANTS: BadgeVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'large', variant: 'filled', status: 'default', shape: 'rounded' },

  // Variant styles
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'ghost', status: 'default', shape: 'rounded' },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'primary', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'info', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'success', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'warning', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'error', shape: 'rounded' },

  // Shape variants
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded' },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'circular' },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'square' },

  // Position variants
  { size: 'medium', variant: 'filled', status: 'default', position: 'top-right' },
  { size: 'medium', variant: 'filled', status: 'default', position: 'top-left' },
  { size: 'medium', variant: 'filled', status: 'default', position: 'bottom-right' },
  { size: 'medium', variant: 'filled', status: 'default', position: 'bottom-left' },

  // With icons
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'info', 
    shape: 'rounded',
    icon: { name: 'info' }
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'success', 
    shape: 'rounded',
    icon: { name: 'check' }
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'warning', 
    shape: 'rounded',
    icon: { name: 'warning' }
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'error', 
    shape: 'rounded',
    icon: { name: 'error' }
  },

  // With count
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'error',
    count: {
      value: 5,
      maxCount: 99,
      showZero: false
    }
  },

  // With text
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    text: {
      content: 'New',
      truncate: true,
      maxWidth: 100
    }
  },

  // Dot style
  { 
    size: 'small', 
    variant: 'filled', 
    status: 'error',
    dot: true,
    position: 'top-right'
  },

  // Standalone
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'success',
    standalone: true,
    text: {
      content: 'Published'
    }
  },

  // With wrapper
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    wrapper: {
      spacing: 'loose',
      offset: {
        x: 10,
        y: -10
      }
    }
  },

  // With animation
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    animation: {
      duration: 300,
      timing: 'ease-in-out',
      properties: ['transform', 'opacity']
    }
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'outlined',
    status: 'info',
    shape: 'circular',
    icon: { 
      name: 'notification',
      size: 16
    },
    count: {
      value: 99,
      maxCount: 99,
      overflowCount: 99,
      formatter: (value) => `${value}+`
    },
    position: 'top-right',
    wrapper: {
      spacing: 'default',
      offset: {
        x: -5,
        y: 5
      }
    },
    animation: {
      duration: 200,
      timing: 'ease-out',
      properties: ['transform', 'opacity', 'background']
    }
  }
] as const; 