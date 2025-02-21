import { RadioSizeConfig, RadioStyle, RadioStyles, RadioVariantProps } from '../types/radio';

export const RADIO_SIZES: RadioSizeConfig = {
  small: {
    circle: {
      size: 'component/base/height/xs',
      borderWidth: 'component/base/border/width/thin',
      dotSize: 'component/base/icon/xs',
      dotOffset: 'component/base/gap/2xs'
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
    description: {
      fontSize: 'text/body/xs',
      lineHeight: 'text/body/xs',
      spacing: 'component/base/gap/2xs'
    },
    spacing: {
      content: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    }
  },
  medium: {
    circle: {
      size: 'component/base/height/sm',
      borderWidth: 'component/base/border/width/thin',
      dotSize: 'component/base/icon/sm',
      dotOffset: 'component/base/gap/xs'
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
    description: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/body/sm',
      spacing: 'component/base/gap/xs'
    },
    spacing: {
      content: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    }
  },
  large: {
    circle: {
      size: 'component/base/height/md',
      borderWidth: 'component/base/border/width/thin',
      dotSize: 'component/base/icon/md',
      dotOffset: 'component/base/gap/sm'
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
    description: {
      fontSize: 'text/body/md',
      lineHeight: 'text/body/md',
      spacing: 'component/base/gap/sm'
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

const baseStyle: RadioStyle = {
  circle: {
    background: {
      unchecked: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      checked: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
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
    dot: {
      unchecked: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
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
        default: 'component/base/shadow/none',
        hover: 'component/base/shadow/sm',
        pressed: 'component/base/shadow/none',
        disabled: 'component/base/shadow/none'
      },
      checked: {
        default: 'component/base/shadow/none',
        hover: 'component/base/shadow/sm',
        pressed: 'component/base/shadow/none',
        disabled: 'component/base/shadow/none'
      }
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
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
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
  description: {
    color: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      pressed: 'text/color/secondary',
      disabled: 'text/color/disabled'
    },
    opacity: {
      unchecked: '0.8',
      checked: '1'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['transform', 'background', 'border', 'opacity', 'box-shadow']
  }
};

export const RADIO_STYLES: RadioStyles = {
  filled: {
    default: baseStyle,
    success: {
      ...baseStyle,
      circle: {
        ...baseStyle.circle,
        border: {
          ...baseStyle.circle.border,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        dot: {
          ...baseStyle.circle.dot,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      },
      icon: {
        ...baseStyle.icon,
        color: {
          ...baseStyle.icon.color,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    error: {
      ...baseStyle,
      circle: {
        ...baseStyle.circle,
        border: {
          ...baseStyle.circle.border,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        dot: {
          ...baseStyle.circle.dot,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      },
      icon: {
        ...baseStyle.icon,
        color: {
          ...baseStyle.icon.color,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    },
    warning: {
      ...baseStyle,
      circle: {
        ...baseStyle.circle,
        border: {
          ...baseStyle.circle.border,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        dot: {
          ...baseStyle.circle.dot,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        }
      },
      icon: {
        ...baseStyle.icon,
        color: {
          ...baseStyle.icon.color,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'text/color/disabled'
          }
        }
      }
    }
  },
  outlined: {
    default: {
      ...baseStyle,
      circle: {
        ...baseStyle.circle,
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
      circle: {
        ...baseStyle.circle,
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
          ...baseStyle.circle.border,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        dot: {
          ...baseStyle.circle.dot,
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
      circle: {
        ...baseStyle.circle,
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
          ...baseStyle.circle.border,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        dot: {
          ...baseStyle.circle.dot,
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
      circle: {
        ...baseStyle.circle,
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
          ...baseStyle.circle.border,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        dot: {
          ...baseStyle.circle.dot,
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

export const RADIO_VARIANTS: RadioVariantProps[] = [
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
      text: 'Radio label',
      description: 'Additional description text',
      placement: 'end'
    }
  },

  // With validation
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    validation: {
      required: true,
      customValidation: (value) => value === 'option1' || 'Please select option 1'
    }
  },

  // Disabled state
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    disabled: true
  },

  // Group example
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    group: {
      name: 'fruits',
      value: 'apple',
      spacing: 'compact',
      direction: 'vertical',
      buttonStyle: true
    }
  },

  // Complex combinations
  { 
    size: 'large',
    variant: 'outlined',
    status: 'success',
    value: 'terms',
    icon: { name: 'check' },
    label: {
      text: 'Terms and Conditions',
      description: 'I agree to the terms and conditions',
      placement: 'end'
    },
    validation: {
      required: true,
      customValidation: (value) => value === 'terms' || 'You must agree to the terms'
    },
    animation: {
      duration: 300,
      timing: 'ease-in-out',
      properties: ['transform', 'opacity']
    }
  }
] as const; 