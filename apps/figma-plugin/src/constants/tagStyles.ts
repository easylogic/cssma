import { TagSizeConfig, TagStyle, TagStyles, TagVariantProps } from '../types/tag';

export const TAG_SIZES: TagSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/xs',
    lineHeight: 'text/body/xs',
    iconSize: 'component/base/icon/xs',
    spacing: {
      content: 'component/base/gap/2xs',
      group: 'component/base/gap/xs'
    },
    padding: {
      horizontal: 'component/base/padding/xs',
      vertical: 'component/base/padding/2xs'
    },
    borderRadius: {
      rounded: 'component/base/radius/sm',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin',
    minWidth: '60',
    maxWidth: '160'
  },
  medium: {
    height: 'component/base/height/sm',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/sm',
    spacing: {
      content: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/xs'
    },
    borderRadius: {
      rounded: 'component/base/radius/md',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin',
    minWidth: '80',
    maxWidth: '200'
  },
  large: {
    height: 'component/base/height/md',
    fontSize: 'text/body/md',
    lineHeight: 'text/body/md',
    iconSize: 'component/base/icon/md',
    spacing: {
      content: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/sm'
    },
    borderRadius: {
      rounded: 'component/base/radius/lg',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin',
    minWidth: '100',
    maxWidth: '240'
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseContentStyle: TagStyle['content']['default'] = {
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

const baseStyle: TagStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle
  },
  content: {
    default: baseContentStyle,
    selected: {
      ...baseContentStyle,
      background: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
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
    },
    active: {
      ...baseContentStyle,
      background: {
        default: 'status/info/ghost/hover',
        hover: 'status/info/ghost/pressed',
        pressed: 'status/info/ghost/pressed',
        disabled: 'surface/color/disabled'
      }
    }
  },
  removeButton: {
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
  },
  group: {
    spacing: {
      default: 'component/base/gap/sm',
      compact: 'component/base/gap/xs',
      loose: 'component/base/gap/md'
    },
    wrap: {
      enabled: true,
      spacing: 'component/base/gap/sm'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['background', 'border', 'color', 'transform', 'opacity']
  }
};

export const TAG_STYLES: TagStyles = {
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

export const TAG_VARIANTS: TagVariantProps[] = [
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

  // With icons
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'info', 
    shape: 'rounded',
    icon: { 
      name: 'info',
      position: 'start'
    }
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'success', 
    shape: 'rounded',
    icon: { 
      name: 'check',
      position: 'end'
    }
  },

  // Interactive
  { 
    size: 'medium', 
    variant: 'outlined', 
    status: 'primary',
    interactive: true,
    selected: true
  },
  { 
    size: 'medium', 
    variant: 'outlined', 
    status: 'primary',
    interactive: true,
    active: true
  },

  // Removable
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    removable: true,
    removeButton: {
      icon: { name: 'close' },
      tooltip: 'Remove tag',
      ariaLabel: 'Remove tag'
    }
  },

  // With group
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    group: {
      spacing: 'compact',
      wrap: true,
      wrapSpacing: 'component/base/gap/xs',
      maxItems: 5,
      overflow: 'ellipsis'
    }
  },

  // With validation
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'error',
    validation: {
      required: true,
      pattern: '^[A-Za-z]+$',
      minSelected: 1,
      maxSelected: 3
    }
  },

  // With animation
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    animation: {
      duration: 200,
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
      name: 'tag',
      position: 'start',
      size: 16
    },
    label: 'Interactive Tag',
    interactive: true,
    removable: true,
    removeButton: {
      icon: { name: 'close' },
      tooltip: 'Remove tag'
    },
    group: {
      spacing: 'default',
      wrap: true,
      direction: 'horizontal'
    },
    validation: {
      required: true,
      minSelected: 1
    },
    animation: {
      duration: 200,
      timing: 'ease-out',
      properties: ['transform', 'opacity', 'background']
    }
  }
] as const; 