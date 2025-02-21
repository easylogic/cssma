import { ChipSizeConfig, ChipStyle, ChipStyles, ChipVariantProps } from '../types/chip';

export const CHIP_SIZES: ChipSizeConfig = {
  small: {
    height: 'component/base/height/sm',
    minWidth: '64',
    maxWidth: '200',
    fontSize: 'text/body/sm',
    lineHeight: 'text/lineHeight/sm',
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
      rounded: 'component/base/radius/sm',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin'
  },
  medium: {
    height: 'component/base/height/md',
    minWidth: '80',
    maxWidth: '240',
    fontSize: 'text/body/md',
    lineHeight: 'text/lineHeight/md',
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
      rounded: 'component/base/radius/md',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin'
  },
  large: {
    height: 'component/base/height/lg',
    minWidth: '96',
    maxWidth: '280',
    fontSize: 'text/body/lg',
    lineHeight: 'text/lineHeight/lg',
    iconSize: 'component/base/icon/lg',
    spacing: {
      content: 'component/base/gap/md',
      group: 'component/base/gap/lg'
    },
    padding: {
      horizontal: 'component/base/padding/lg',
      vertical: 'component/base/padding/md'
    },
    borderRadius: {
      rounded: 'component/base/radius/lg',
      circular: 'component/base/radius/pill',
      square: 'component/base/radius/none'
    },
    borderWidth: 'component/base/border/width/thin'
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled',
  selected: 'status/info/ghost/hover'
};

const baseContentStyle = {
  background: baseStateStyle,
  text: {
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled',
    selected: 'status/info/default'
  },
  icon: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled',
    selected: 'status/info/default'
  },
  border: baseStateStyle
};

const baseChipStyle: ChipStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/sm',
      hover: 'component/base/shadow/md',
      pressed: 'component/base/shadow/sm',
      disabled: 'component/base/shadow/none',
      selected: 'component/base/shadow/md'
    }
  },
  content: {
    default: baseContentStyle,
    selected: {
      ...baseContentStyle,
      background: {
        default: 'status/info/ghost/hover',
        hover: 'status/info/ghost/pressed',
        pressed: 'status/info/ghost/pressed',
        disabled: 'surface/color/disabled',
        selected: 'status/info/ghost/pressed'
      },
      text: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/hover',
        disabled: 'text/color/disabled',
        selected: 'status/info/hover'
      },
      icon: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/hover',
        disabled: 'text/color/disabled',
        selected: 'status/info/hover'
      }
    }
  },
  remove: {
    background: baseStateStyle,
    icon: {
      default: 'text/color/secondary',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled',
      selected: 'status/info/default'
    },
    border: baseStateStyle
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
    duration: '150ms',
    timing: 'ease-in-out',
    properties: ['background', 'border', 'shadow', 'color']
  }
};

export const CHIP_STYLES: ChipStyles = {
  filled: {
    default: baseChipStyle,
    primary: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/info/hover'
        }
      }
    },
    success: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/success/hover'
        }
      }
    },
    error: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/error/hover'
        }
      }
    },
    warning: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/warning/hover'
        }
      }
    }
  },
  outlined: {
    default: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled',
          selected: 'surface/color/white'
        }
      }
    },
    primary: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled',
          selected: 'surface/color/white'
        },
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/info/hover'
        }
      }
    },
    success: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled',
          selected: 'surface/color/white'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/success/hover'
        }
      }
    },
    error: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled',
          selected: 'surface/color/white'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/error/hover'
        }
      }
    },
    warning: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled',
          selected: 'surface/color/white'
        },
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/hover',
          disabled: 'surface/color/disabled',
          selected: 'status/warning/hover'
        }
      }
    }
  },
  ghost: {
    default: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled',
          selected: 'surface/color/hover'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent',
          selected: 'surface/color/transparent'
        }
      }
    },
    primary: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/info/ghost/hover',
          pressed: 'status/info/ghost/pressed',
          disabled: 'surface/color/disabled',
          selected: 'status/info/ghost/hover'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent',
          selected: 'surface/color/transparent'
        }
      }
    },
    success: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/success/ghost/hover',
          pressed: 'status/success/ghost/pressed',
          disabled: 'surface/color/disabled',
          selected: 'status/success/ghost/hover'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent',
          selected: 'surface/color/transparent'
        }
      }
    },
    error: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
          disabled: 'surface/color/disabled',
          selected: 'status/error/ghost/hover'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent',
          selected: 'surface/color/transparent'
        }
      }
    },
    warning: {
      ...baseChipStyle,
      root: {
        ...baseChipStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/warning/ghost/hover',
          pressed: 'status/warning/ghost/pressed',
          disabled: 'surface/color/disabled',
          selected: 'status/warning/ghost/hover'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent',
          selected: 'surface/color/transparent'
        }
      }
    }
  }
} as const;

export const CHIP_VARIANTS: ChipVariantProps[] = [
  // Size variants
  {
    size: 'small',
    variant: 'filled',
    label: 'Small'
  },
  {
    size: 'medium',
    variant: 'filled',
    label: 'Medium'
  },
  {
    size: 'large',
    variant: 'filled',
    label: 'Large'
  },

  // Variant styles
  {
    variant: 'filled',
    label: 'Filled'
  },
  {
    variant: 'outlined',
    label: 'Outlined'
  },
  {
    variant: 'ghost',
    label: 'Ghost'
  },

  // Status variants
  {
    variant: 'filled',
    status: 'default',
    label: 'Default'
  },
  {
    variant: 'filled',
    status: 'primary',
    label: 'Primary'
  },
  {
    variant: 'filled',
    status: 'success',
    label: 'Success'
  },
  {
    variant: 'filled',
    status: 'error',
    label: 'Error'
  },
  {
    variant: 'filled',
    status: 'warning',
    label: 'Warning'
  },

  // Shape variants
  {
    variant: 'filled',
    shape: 'rounded',
    label: 'Rounded'
  },
  {
    variant: 'filled',
    shape: 'circular',
    label: 'Circular'
  },
  {
    variant: 'filled',
    shape: 'square',
    label: 'Square'
  },

  // With icon
  {
    variant: 'filled',
    icon: {
      name: 'check',
      position: 'start'
    },
    label: 'With Icon'
  },

  // With remove button
  {
    variant: 'filled',
    removable: true,
    remove: {
      icon: {
        name: 'close'
      },
      ariaLabel: 'Remove'
    },
    label: 'Removable'
  },

  // Selected state
  {
    variant: 'filled',
    selected: true,
    label: 'Selected'
  },

  // Disabled state
  {
    variant: 'filled',
    disabled: true,
    label: 'Disabled'
  },

  // Interactive
  {
    variant: 'filled',
    interactive: true,
    onClick: () => {},
    label: 'Interactive'
  },

  // With group
  {
    variant: 'filled',
    group: {
      spacing: 'default',
      wrap: true,
      direction: 'horizontal'
    },
    label: 'Grouped'
  },

  // With validation
  {
    variant: 'filled',
    validation: {
      required: true,
      minSelected: 1,
      maxSelected: 3
    },
    label: 'Validated'
  }
] as const; 