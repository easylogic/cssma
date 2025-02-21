import { NumberInputSizeConfig, NumberInputStyle, NumberInputStyles, NumberInputVariantProps } from '../types/numberInput';

export const NUMBER_INPUT_SIZES: NumberInputSizeConfig = {
  small: {
    root: {
      height: 'component/base/height/sm',
      minWidth: '120',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    input: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      caretWidth: '1',
      caretHeight: '12'
    },
    stepper: {
      width: 'component/base/height/xs',
      height: 'component/base/height/xs',
      iconSize: 'component/base/icon/xs',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/sm',
      padding: 'component/base/gap/xs'
    },
    unit: {
      fontSize: 'text/body/sm',
      spacing: 'component/base/gap/xs'
    },
    spacing: {
      icon: 'component/base/gap/xs',
      unit: 'component/base/gap/xs',
      stepper: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    },
    padding: {
      x: 'component/base/padding/sm',
      y: 'component/base/padding/xs'
    }
  },
  medium: {
    root: {
      height: 'component/base/height/md',
      minWidth: '160',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    input: {
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      caretWidth: '2',
      caretHeight: '16'
    },
    stepper: {
      width: 'component/base/height/sm',
      height: 'component/base/height/sm',
      iconSize: 'component/base/icon/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/md',
      padding: 'component/base/gap/sm'
    },
    unit: {
      fontSize: 'text/body/md',
      spacing: 'component/base/gap/sm'
    },
    spacing: {
      icon: 'component/base/gap/sm',
      unit: 'component/base/gap/sm',
      stepper: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    },
    padding: {
      x: 'component/base/padding/md',
      y: 'component/base/padding/sm'
    }
  },
  large: {
    root: {
      height: 'component/base/height/lg',
      minWidth: '200',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    input: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      caretWidth: '2',
      caretHeight: '20'
    },
    stepper: {
      width: 'component/base/height/md',
      height: 'component/base/height/md',
      iconSize: 'component/base/icon/md',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/lg',
      padding: 'component/base/gap/md'
    },
    unit: {
      fontSize: 'text/body/lg',
      spacing: 'component/base/gap/md'
    },
    spacing: {
      icon: 'component/base/gap/md',
      unit: 'component/base/gap/md',
      stepper: 'component/base/gap/md',
      group: 'component/base/gap/lg'
    },
    padding: {
      x: 'component/base/padding/lg',
      y: 'component/base/padding/md'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  focused: 'surface/color/hover',
  disabled: 'surface/color/disabled'
};

const baseStepperStyle = {
  background: {
    default: 'surface/color/transparent',
    hover: 'surface/color/hover',
    focused: 'surface/color/pressed',
    disabled: 'surface/color/disabled'
  },
  icon: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: {
    default: 'surface/color/transparent',
    hover: 'surface/color/hover',
    focused: 'surface/color/pressed',
    disabled: 'surface/color/disabled'
  }
};

export const NUMBER_INPUT_STYLES: NumberInputStyles = {
  filled: {
    root: {
      background: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        focused: 'surface/color/hover',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        focused: 'status/info/default',
        disabled: 'surface/color/disabled'
      },
      shadow: {
        default: 'shadow/sm',
        hover: 'shadow/md',
        focused: 'shadow/lg',
        disabled: 'shadow/none'
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
      caret: {
        default: 'text/color/default',
        hover: 'text/color/default',
        focused: 'status/info/default',
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
    stepper: {
      increment: baseStepperStyle,
      decrement: baseStepperStyle
    },
    icon: {
      leading: baseStateStyle,
      trailing: baseStateStyle
    },
    unit: {
      text: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    validation: {
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      message: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    transition: {
      duration: '150ms',
      timing: 'ease-in-out',
      properties: ['background', 'border', 'box-shadow', 'color', 'opacity']
    }
  },
  outlined: {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        focused: 'surface/color/white',
        disabled: 'surface/color/white'
      },
      border: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        focused: 'status/info/default',
        disabled: 'surface/color/disabled'
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
      caret: {
        default: 'text/color/default',
        hover: 'text/color/default',
        focused: 'status/info/default',
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
    stepper: {
      increment: baseStepperStyle,
      decrement: baseStepperStyle
    },
    icon: {
      leading: baseStateStyle,
      trailing: baseStateStyle
    },
    unit: {
      text: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    validation: {
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      message: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    transition: {
      duration: '150ms',
      timing: 'ease-in-out',
      properties: ['background', 'border', 'box-shadow', 'color', 'opacity']
    }
  },
  ghost: {
    root: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        focused: 'surface/color/hover',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        focused: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
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
      caret: {
        default: 'text/color/default',
        hover: 'text/color/default',
        focused: 'status/info/default',
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
    stepper: {
      increment: baseStepperStyle,
      decrement: baseStepperStyle
    },
    icon: {
      leading: baseStateStyle,
      trailing: baseStateStyle
    },
    unit: {
      text: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    validation: {
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      message: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    transition: {
      duration: '150ms',
      timing: 'ease-in-out',
      properties: ['background', 'border', 'box-shadow', 'color', 'opacity']
    }
  }
} as const;

export const NUMBER_INPUT_VARIANTS: NumberInputVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled' },
  { size: 'medium', variant: 'filled' },
  { size: 'large', variant: 'filled' },

  // Variant styles
  { size: 'medium', variant: 'filled' },
  { size: 'medium', variant: 'outlined' },
  { size: 'medium', variant: 'ghost' },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'default' },
  { size: 'medium', variant: 'filled', status: 'success' },
  { size: 'medium', variant: 'filled', status: 'error' },
  { size: 'medium', variant: 'filled', status: 'warning' },

  // With placeholder
  { size: 'medium', variant: 'filled', placeholder: 'Enter number...' },

  // With icon
  { 
    size: 'medium', 
    variant: 'filled', 
    icon: { name: 'calculator' },
    placeholder: 'Enter number...'
  },

  // With unit
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Enter amount...',
    unit: { text: '$', position: 'prefix' }
  },

  // With stepper
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Enter number...',
    stepper: {
      enabled: true,
      position: 'right',
      allowMouseWheel: true
    }
  },

  // With format
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Enter amount...',
    format: {
      mode: 'currency',
      locale: 'en-US',
      precision: 2,
      prefix: '$'
    }
  },

  // With clamp
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Enter number...',
    clamp: {
      min: 0,
      max: 100,
      step: 5,
      roundValueToStep: true
    }
  },

  // With validation
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Enter number...',
    validation: {
      required: true,
      min: 0,
      max: 100,
      integer: true
    }
  },

  // Full featured
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Enter amount...',
    icon: { name: 'calculator' },
    unit: { text: '$', position: 'prefix' },
    stepper: {
      enabled: true,
      position: 'right',
      allowMouseWheel: true
    },
    format: {
      mode: 'currency',
      locale: 'en-US',
      precision: 2
    },
    clamp: {
      min: 0,
      max: 1000000,
      step: 0.01,
      roundValueToStep: true
    },
    validation: {
      required: true,
      min: 0,
      max: 1000000
    },
    align: 'right',
    selectOnFocus: true
  }
] as const; 