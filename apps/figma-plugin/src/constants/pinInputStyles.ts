import { PinInputSizeConfig, PinInputStyle, PinInputStyles, PinInputVariantProps } from '../types/pinInput';

export const PIN_INPUT_SIZES: PinInputSizeConfig = {
  small: {
    cell: {
      width: 'component/base/height/sm',
      height: 'component/base/height/sm',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin',
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm'
    },
    spacing: {
      cell: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    },
    icon: {
      size: 'component/base/icon/sm',
      padding: 'component/base/gap/xs'
    }
  },
  medium: {
    cell: {
      width: 'component/base/height/md',
      height: 'component/base/height/md',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin',
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md'
    },
    spacing: {
      cell: 'component/base/gap/md',
      group: 'component/base/gap/lg'
    },
    icon: {
      size: 'component/base/icon/md',
      padding: 'component/base/gap/sm'
    }
  },
  large: {
    cell: {
      width: 'component/base/height/lg',
      height: 'component/base/height/lg',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg'
    },
    spacing: {
      cell: 'component/base/gap/lg',
      group: 'component/base/gap/xl'
    },
    icon: {
      size: 'component/base/icon/lg',
      padding: 'component/base/gap/md'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  focused: 'surface/color/hover',
  disabled: 'surface/color/disabled'
};

const baseCellStyle = {
  background: {
    default: 'surface/color/default',
    hover: 'surface/color/hover',
    focused: 'surface/color/hover',
    disabled: 'surface/color/disabled'
  },
  text: {
    default: 'text/color/default',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
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
};

export const PIN_INPUT_STYLES: PinInputStyles = {
  filled: {
    root: {
      background: baseStateStyle,
      border: baseStateStyle
    },
    cell: {
      empty: baseCellStyle,
      filled: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/hover',
          hover: 'surface/color/hover',
          focused: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        }
      },
      active: {
        ...baseCellStyle,
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          focused: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      success: {
        ...baseCellStyle,
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        ...baseCellStyle,
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        ...baseCellStyle,
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          focused: 'status/warning/pressed',
          disabled: 'surface/color/disabled'
        }
      }
    },
    icon: {
      leading: baseStateStyle,
      trailing: baseStateStyle
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
      border: baseStateStyle
    },
    cell: {
      empty: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/white'
        }
      },
      filled: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/white'
        }
      },
      active: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/white'
        },
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          focused: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      success: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/white'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/white'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/white'
        },
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          focused: 'status/warning/pressed',
          disabled: 'surface/color/disabled'
        }
      }
    },
    icon: {
      leading: baseStateStyle,
      trailing: baseStateStyle
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
        hover: 'surface/color/transparent',
        focused: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        focused: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    cell: {
      empty: {
        ...baseCellStyle,
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
      filled: {
        ...baseCellStyle,
        background: {
          default: 'surface/color/hover',
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
      active: {
        ...baseCellStyle,
        background: {
          default: 'status/info/ghost/hover',
          hover: 'status/info/ghost/pressed',
          focused: 'status/info/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      success: {
        ...baseCellStyle,
        background: {
          default: 'status/success/ghost/hover',
          hover: 'status/success/ghost/pressed',
          focused: 'status/success/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      error: {
        ...baseCellStyle,
        background: {
          default: 'status/error/ghost/hover',
          hover: 'status/error/ghost/pressed',
          focused: 'status/error/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      warning: {
        ...baseCellStyle,
        background: {
          default: 'status/warning/ghost/hover',
          hover: 'status/warning/ghost/pressed',
          focused: 'status/warning/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    icon: {
      leading: baseStateStyle,
      trailing: baseStateStyle
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

export const PIN_INPUT_VARIANTS: PinInputVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', length: 4 },
  { size: 'medium', variant: 'filled', length: 4 },
  { size: 'large', variant: 'filled', length: 4 },

  // Variant styles
  { size: 'medium', variant: 'filled', length: 4 },
  { size: 'medium', variant: 'outlined', length: 4 },
  { size: 'medium', variant: 'ghost', length: 4 },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'default', length: 4 },
  { size: 'medium', variant: 'filled', status: 'success', length: 4 },
  { size: 'medium', variant: 'filled', status: 'error', length: 4 },
  { size: 'medium', variant: 'filled', status: 'warning', length: 4 },

  // Type variants
  { size: 'medium', variant: 'filled', type: 'numeric', length: 4 },
  { size: 'medium', variant: 'filled', type: 'alphanumeric', length: 6 },

  // With mask
  {
    size: 'medium',
    variant: 'filled',
    length: 4,
    mask: {
      type: 'bullet',
      showOnFocus: true
    }
  },

  // With validation
  {
    size: 'medium',
    variant: 'filled',
    length: 4,
    validation: {
      required: true,
      pattern: '^[0-9]+$'
    }
  },

  // With behavior
  {
    size: 'medium',
    variant: 'filled',
    length: 4,
    behavior: {
      autoFocus: true,
      blurOnComplete: true,
      submitOnComplete: true
    }
  },

  // Full featured
  {
    size: 'medium',
    variant: 'filled',
    type: 'numeric',
    length: 6,
    mask: {
      type: 'bullet',
      showOnFocus: true
    },
    validation: {
      required: true,
      pattern: '^[0-9]+$'
    },
    behavior: {
      autoFocus: true,
      blurOnComplete: true,
      submitOnComplete: true,
      clearOnError: true
    }
  }
] as const; 