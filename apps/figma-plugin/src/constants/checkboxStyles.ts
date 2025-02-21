import { CheckboxSizeConfig, CheckboxStyle, CheckboxStyles, CheckboxVariantProps } from '../types/checkbox';

export const CHECKBOX_SIZES: CheckboxSizeConfig = {
  small: {
    box: {
      size: 'component/base/height/xs',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
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
    box: {
      size: 'component/base/height/sm',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
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
    box: {
      size: 'component/base/height/md',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
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

const baseStyle: CheckboxStyle = {
  box: {
    background: {
      unchecked: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      checked: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'surface/color/disabled'
      },
      indeterminate: {
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
      },
      indeterminate: {
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
      },
      indeterminate: {
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
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      },
      checked: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      },
      indeterminate: {
        default: 'text/color/inverse',
        hover: 'text/color/inverse',
        pressed: 'text/color/inverse',
        disabled: 'text/color/disabled'
      }
    },
    opacity: {
      unchecked: '0',
      checked: '1',
      indeterminate: '1'
    },
    transform: {
      unchecked: 'scale(0.8)',
      checked: 'scale(1)',
      indeterminate: 'scale(1)'
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
      checked: '1',
      indeterminate: '1'
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
      checked: '1',
      indeterminate: '1'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['transform', 'background', 'border', 'opacity', 'box-shadow']
  }
};

export const CHECKBOX_STYLES: CheckboxStyles = {
  filled: {
    default: baseStyle,
    success: {
      ...baseStyle,
      box: {
        ...baseStyle.box,
        background: {
          ...baseStyle.box.background,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.box.border,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
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
      box: {
        ...baseStyle.box,
        background: {
          ...baseStyle.box.background,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.box.border,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
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
      box: {
        ...baseStyle.box,
        background: {
          ...baseStyle.box.background,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.box.border,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
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
      box: {
        ...baseStyle.box,
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
          },
          indeterminate: {
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
      box: {
        ...baseStyle.box,
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
          },
          indeterminate: {
            default: 'surface/color/transparent',
            hover: 'status/success/ghost/hover',
            pressed: 'status/success/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.box.border,
          checked: {
            default: 'status/success/default',
            hover: 'status/success/hover',
            pressed: 'status/success/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
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
      box: {
        ...baseStyle.box,
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
          },
          indeterminate: {
            default: 'surface/color/transparent',
            hover: 'status/error/ghost/hover',
            pressed: 'status/error/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.box.border,
          checked: {
            default: 'status/error/default',
            hover: 'status/error/hover',
            pressed: 'status/error/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
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
      box: {
        ...baseStyle.box,
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
          },
          indeterminate: {
            default: 'surface/color/transparent',
            hover: 'status/warning/ghost/hover',
            pressed: 'status/warning/ghost/pressed',
            disabled: 'surface/color/disabled'
          }
        },
        border: {
          ...baseStyle.box.border,
          checked: {
            default: 'status/warning/default',
            hover: 'status/warning/hover',
            pressed: 'status/warning/pressed',
            disabled: 'surface/color/disabled'
          },
          indeterminate: {
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

export const CHECKBOX_VARIANTS: CheckboxVariantProps[] = [
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

  // Value states
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    value: 'checked'
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    value: 'unchecked'
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    value: 'indeterminate'
  },

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
      text: 'Checkbox label',
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
      minSelected: 1,
      maxSelected: 3
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
      value: ['apple', 'banana'],
      spacing: 'compact',
      direction: 'vertical'
    }
  },

  // Complex combinations
  { 
    size: 'large',
    variant: 'outlined',
    status: 'success',
    value: 'checked',
    icon: { name: 'check' },
    label: {
      text: 'Terms and Conditions',
      description: 'I agree to the terms and conditions',
      placement: 'end'
    },
    validation: {
      required: true,
      customValidation: (value) => value || 'You must agree to the terms'
    },
    animation: {
      duration: 300,
      timing: 'ease-in-out',
      properties: ['transform', 'opacity']
    }
  }
] as const; 