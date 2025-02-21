import { SegmentGroupSizeConfig, SegmentGroupStyle, SegmentGroupStyles, SegmentGroupVariantProps } from '../types/segmentGroup';

export const SEGMENT_GROUP_SIZES: SegmentGroupSizeConfig = {
  small: {
    root: {
      minHeight: 'component/base/height/sm',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    segment: {
      minWidth: '60',
      height: 'component/base/height/sm',
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/sm',
      padding: 'component/base/gap/xs'
    },
    spacing: {
      segment: 'component/base/gap/xs',
      icon: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    },
    padding: {
      x: 'component/base/padding/sm',
      y: 'component/base/padding/xs'
    }
  },
  medium: {
    root: {
      minHeight: 'component/base/height/md',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    segment: {
      minWidth: '80',
      height: 'component/base/height/md',
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/md',
      padding: 'component/base/gap/sm'
    },
    spacing: {
      segment: 'component/base/gap/sm',
      icon: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    },
    padding: {
      x: 'component/base/padding/md',
      y: 'component/base/padding/sm'
    }
  },
  large: {
    root: {
      minHeight: 'component/base/height/lg',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    segment: {
      minWidth: '100',
      height: 'component/base/height/lg',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/lg',
      padding: 'component/base/gap/md'
    },
    spacing: {
      segment: 'component/base/gap/md',
      icon: 'component/base/gap/md',
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
  pressed: 'surface/color/hover',
  disabled: 'surface/color/disabled'
};

const baseSegmentStyle = {
  background: {
    default: 'surface/color/default',
    hover: 'surface/color/hover',
    pressed: 'surface/color/hover',
    disabled: 'surface/color/disabled'
  },
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
  border: {
    default: 'surface/color/default',
    hover: 'surface/color/hover',
    pressed: 'status/info/default',
    disabled: 'surface/color/disabled'
  }
};

export const SEGMENT_GROUP_STYLES: SegmentGroupStyles = {
  filled: {
    root: {
      background: baseStateStyle,
      border: baseStateStyle
    },
    segment: {
      default: baseSegmentStyle,
      selected: {
        ...baseSegmentStyle,
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
      success: {
        ...baseSegmentStyle,
        background: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
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
      error: {
        ...baseSegmentStyle,
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
        },
        icon: {
          default: 'text/color/inverse',
          hover: 'text/color/inverse',
          pressed: 'text/color/inverse',
          disabled: 'text/color/disabled'
        }
      },
      warning: {
        ...baseSegmentStyle,
        background: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
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
      }
    },
    divider: {
      default: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      },
      vertical: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      }
    },
    transition: {
      duration: '150ms',
      timing: 'ease-in-out',
      properties: ['background', 'border', 'color', 'opacity']
    }
  },
  outlined: {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        pressed: 'surface/color/white',
        disabled: 'surface/color/white'
      },
      border: baseStateStyle
    },
    segment: {
      default: {
        ...baseSegmentStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/hover',
          pressed: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        }
      },
      selected: {
        ...baseSegmentStyle,
        background: {
          default: 'surface/color/white',
          hover: 'status/info/ghost/hover',
          pressed: 'status/info/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        },
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
      },
      success: {
        ...baseSegmentStyle,
        background: {
          default: 'surface/color/white',
          hover: 'status/success/ghost/hover',
          pressed: 'status/success/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'surface/color/disabled'
        },
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
      },
      error: {
        ...baseSegmentStyle,
        background: {
          default: 'surface/color/white',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'surface/color/disabled'
        },
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
      },
      warning: {
        ...baseSegmentStyle,
        background: {
          default: 'surface/color/white',
          hover: 'status/warning/ghost/hover',
          pressed: 'status/warning/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'surface/color/disabled'
        },
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
    },
    divider: {
      default: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      },
      vertical: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      }
    },
    transition: {
      duration: '150ms',
      timing: 'ease-in-out',
      properties: ['background', 'border', 'color', 'opacity']
    }
  },
  ghost: {
    root: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    segment: {
      default: {
        ...baseSegmentStyle,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      selected: {
        ...baseSegmentStyle,
        background: {
          default: 'status/info/ghost/hover',
          hover: 'status/info/ghost/pressed',
          pressed: 'status/info/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        },
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
      },
      success: {
        ...baseSegmentStyle,
        background: {
          default: 'status/success/ghost/hover',
          hover: 'status/success/ghost/pressed',
          pressed: 'status/success/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        },
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
      },
      error: {
        ...baseSegmentStyle,
        background: {
          default: 'status/error/ghost/hover',
          hover: 'status/error/ghost/pressed',
          pressed: 'status/error/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        },
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
      },
      warning: {
        ...baseSegmentStyle,
        background: {
          default: 'status/warning/ghost/hover',
          hover: 'status/warning/ghost/pressed',
          pressed: 'status/warning/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        },
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
    },
    divider: {
      default: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      vertical: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    transition: {
      duration: '150ms',
      timing: 'ease-in-out',
      properties: ['background', 'border', 'color', 'opacity']
    }
  }
} as const;

export const SEGMENT_GROUP_VARIANTS: SegmentGroupVariantProps[] = [
  // Size variants
  {
    size: 'small',
    variant: 'filled',
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },
  {
    size: 'large',
    variant: 'filled',
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },

  // Variant styles
  {
    size: 'medium',
    variant: 'filled',
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },
  {
    size: 'medium',
    variant: 'outlined',
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },
  {
    size: 'medium',
    variant: 'ghost',
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },

  // Layout variants
  {
    size: 'medium',
    variant: 'filled',
    layout: { type: 'horizontal' },
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    layout: { type: 'vertical' },
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },

  // With icons
  {
    size: 'medium',
    variant: 'filled',
    segments: [
      { id: '1', label: 'List', value: '1', icon: { name: 'list' } },
      { id: '2', label: 'Grid', value: '2', icon: { name: 'grid' } },
      { id: '3', label: 'Table', value: '3', icon: { name: 'table' } }
    ]
  },

  // Selection modes
  {
    size: 'medium',
    variant: 'filled',
    selection: { type: 'single' },
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    selection: { type: 'multiple', minSelect: 1, maxSelect: 2 },
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },

  // With validation
  {
    size: 'medium',
    variant: 'filled',
    validation: { required: true },
    segments: [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
      { id: '3', label: 'Option 3', value: '3' }
    ]
  },

  // Full featured
  {
    size: 'medium',
    variant: 'filled',
    layout: { type: 'horizontal', align: 'center' },
    selection: {
      type: 'multiple',
      minSelect: 1,
      maxSelect: 2,
      allowDeselect: true
    },
    validation: { required: true },
    segments: [
      { id: '1', label: 'List', value: '1', icon: { name: 'list' } },
      { id: '2', label: 'Grid', value: '2', icon: { name: 'grid' } },
      { id: '3', label: 'Table', value: '3', icon: { name: 'table' } }
    ]
  }
] as const; 