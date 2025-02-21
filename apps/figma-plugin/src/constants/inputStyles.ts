import { InputActionStyle, InputAddonStyle, InputIconStyle, InputSizeConfig, InputStateStyle, InputStyle, InputStyles, InputVariantProps } from '../types/input';

export const INPUT_SIZES: InputSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/xs',
    spacing: {
      addon: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      clear: 'component/base/gap/2xs',
      action: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/xs',
      vertical: 'component/base/padding/2xs'
    },
    borderRadius: 'component/base/radius/sm',
    borderWidth: 'component/base/border/width/thin'
  },
  medium: {
    height: 'component/base/height/sm',
    fontSize: 'text/body/md',
    lineHeight: 'text/body/md',
    iconSize: 'component/base/icon/sm',
    spacing: {
      addon: 'component/base/gap/sm',
      icon: 'component/base/gap/xs',
      clear: 'component/base/gap/xs',
      action: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/xs'
    },
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin'
  },
  large: {
    height: 'component/base/height/md',
    fontSize: 'text/body/lg',
    lineHeight: 'text/body/lg',
    iconSize: 'component/base/icon/md',
    spacing: {
      addon: 'component/base/gap/md',
      icon: 'component/base/gap/sm',
      clear: 'component/base/gap/sm',
      action: 'component/base/gap/md',
      group: 'component/base/gap/lg'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/sm'
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin'
  }
} as const;

const baseStateStyle: InputStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  focused: 'surface/color/focused',
  disabled: 'surface/color/disabled'
};

const baseIconStyle: InputIconStyle = {
  background: baseStateStyle,
  text: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: {
    default: 'surface/color/transparent',
    hover: 'surface/color/transparent',
    focused: 'surface/color/transparent',
    disabled: 'surface/color/transparent'
  }
};

const baseAddonStyle: InputAddonStyle = {
  background: {
    default: 'surface/color/subtle',
    hover: 'surface/color/hover',
    focused: 'surface/color/hover',
    disabled: 'surface/color/disabled'
  },
  text: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: {
    default: 'surface/color/default',
    hover: 'surface/color/hover',
    focused: 'surface/color/focused',
    disabled: 'surface/color/disabled'
  }
};

const baseActionStyle: InputActionStyle = {
  background: {
    default: 'surface/color/transparent',
    hover: 'surface/color/hover',
    focused: 'surface/color/pressed',
    disabled: 'surface/color/disabled'
  },
  text: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  icon: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: {
    default: 'surface/color/transparent',
    hover: 'surface/color/transparent',
    focused: 'surface/color/transparent',
    disabled: 'surface/color/transparent'
  }
};

const baseStyle: InputStyle = {
  root: {
    background: {
      default: 'surface/color/white',
      hover: 'surface/color/white',
      focused: 'surface/color/white',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      focused: 'status/info/default',
      disabled: 'surface/color/disabled'
    },
    shadow: {
      default: 'component/base/shadow/none',
      hover: 'component/base/shadow/none',
      focused: 'component/base/shadow/sm',
      disabled: 'component/base/shadow/none'
    }
  },
  input: {
    text: {
      default: 'text/color/default',
      hover: 'text/color/default',
      focused: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    placeholder: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      focused: 'text/color/secondary',
      disabled: 'text/color/disabled'
    },
    selection: {
      background: {
        default: 'status/info/ghost/hover',
        hover: 'status/info/ghost/hover',
        focused: 'status/info/ghost/hover',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        focused: 'text/color/default',
        disabled: 'text/color/disabled'
      }
    }
  },
  prefix: baseAddonStyle,
  suffix: baseAddonStyle,
  leftIcon: baseIconStyle,
  rightIcon: baseIconStyle,
  clearButton: baseActionStyle,
  actionButton: baseActionStyle,
  counter: {
    text: {
      default: 'text/color/secondary',
      hover: 'text/color/secondary',
      focused: 'text/color/secondary',
      disabled: 'text/color/disabled'
    },
    warning: {
      default: 'status/warning/default',
      hover: 'status/warning/hover',
      focused: 'status/warning/pressed',
      disabled: 'text/color/disabled'
    },
    error: {
      default: 'status/error/default',
      hover: 'status/error/hover',
      focused: 'status/error/pressed',
      disabled: 'text/color/disabled'
    }
  },
  group: {
    separator: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      focused: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    spacing: {
      default: 'component/base/gap/md',
      compact: 'component/base/gap/sm',
      loose: 'component/base/gap/lg'
    }
  }
};

export const INPUT_STYLES: InputStyles = {
  filled: {
    default: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/subtle',
          hover: 'surface/color/hover',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/info/default',
          disabled: 'surface/color/disabled'
        }
      }
    },
    success: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/subtle',
          hover: 'surface/color/hover',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/success/default',
          disabled: 'surface/color/disabled'
        }
      }
    },
    error: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/subtle',
          hover: 'surface/color/hover',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/error/default',
          disabled: 'surface/color/disabled'
        }
      }
    },
    warning: {
      ...baseStyle,
      root: {
        ...baseStyle.root,
        background: {
          default: 'surface/color/subtle',
          hover: 'surface/color/hover',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/warning/default',
          disabled: 'surface/color/disabled'
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
          hover: 'surface/color/white',
          focused: 'surface/color/white',
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
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/default',
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
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/default',
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
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          focused: 'status/warning/default',
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
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/info/default',
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
          hover: 'surface/color/hover',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/success/default',
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
          hover: 'surface/color/hover',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/error/default',
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
          hover: 'surface/color/hover',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'status/warning/default',
          disabled: 'surface/color/transparent'
        }
      }
    }
  }
} as const;

export const INPUT_VARIANTS: InputVariantProps[] = [
  // Size variants
  { 
    size: 'small',
    variant: 'filled',
    placeholder: 'Small input'
  },
  { 
    size: 'medium',
    variant: 'filled',
    placeholder: 'Medium input'
  },
  { 
    size: 'large',
    variant: 'filled',
    placeholder: 'Large input'
  },

  // Variant styles
  { 
    size: 'medium',
    variant: 'filled',
    placeholder: 'Filled input'
  },
  { 
    size: 'medium',
    variant: 'outlined',
    placeholder: 'Outlined input'
  },
  { 
    size: 'medium',
    variant: 'ghost',
    placeholder: 'Ghost input'
  },

  // Status variants
  { 
    size: 'medium',
    variant: 'outlined',
    status: 'default',
    placeholder: 'Default input'
  },
  { 
    size: 'medium',
    variant: 'outlined',
    status: 'success',
    placeholder: 'Success input'
  },
  { 
    size: 'medium',
    variant: 'outlined',
    status: 'error',
    placeholder: 'Error input'
  },
  { 
    size: 'medium',
    variant: 'outlined',
    status: 'warning',
    placeholder: 'Warning input'
  },

  // With icons
  { 
    size: 'medium',
    variant: 'outlined',
    leftIcon: { name: 'search' },
    placeholder: 'Search'
  },
  { 
    size: 'medium',
    variant: 'outlined',
    rightIcon: { name: 'calendar' },
    placeholder: 'Select date'
  },

  // With addons
  { 
    size: 'medium',
    variant: 'outlined',
    prefix: { content: 'https://' },
    placeholder: 'Enter domain'
  },
  { 
    size: 'medium',
    variant: 'outlined',
    suffix: { content: '@example.com' },
    placeholder: 'Enter username'
  },

  // With clear button
  { 
    size: 'medium',
    variant: 'outlined',
    clearable: true,
    placeholder: 'Clearable input'
  },

  // With action
  { 
    size: 'medium',
    variant: 'outlined',
    action: {
      icon: { name: 'send' },
      tooltip: 'Send message'
    },
    placeholder: 'Type message'
  },

  // With counter
  { 
    size: 'medium',
    variant: 'outlined',
    counter: {
      show: true,
      max: 100,
      showMax: true
    },
    placeholder: 'Enter description'
  },

  // With validation
  { 
    size: 'medium',
    variant: 'outlined',
    validation: {
      required: true,
      pattern: '^[A-Za-z0-9]+$',
      minLength: 3,
      maxLength: 20
    },
    placeholder: 'Enter username'
  },

  // With transform
  { 
    size: 'medium',
    variant: 'outlined',
    transform: {
      trim: true,
      normalize: (value) => value.toLowerCase(),
      format: (value) => value.replace(/\s+/g, '-')
    },
    placeholder: 'Enter slug'
  },

  // Disabled state
  { 
    size: 'medium',
    variant: 'outlined',
    disabled: true,
    placeholder: 'Disabled input'
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'outlined',
    type: 'email',
    leftIcon: { name: 'mail' },
    clearable: true,
    action: {
      icon: { name: 'check' },
      tooltip: 'Verify email'
    },
    validation: {
      required: true,
      pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
    },
    transform: {
      trim: true,
      normalize: (value) => value.toLowerCase()
    },
    placeholder: 'Enter email address',
    counter: {
      show: true,
      max: 50,
      showMax: true
    },
    autoComplete: 'email'
  }
] as const; 