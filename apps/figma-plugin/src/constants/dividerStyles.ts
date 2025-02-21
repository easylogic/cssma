import { DividerSizeConfig, DividerStyle, DividerStyles, DividerVariantProps } from '../types/divider';

export const DIVIDER_SIZES: DividerSizeConfig = {
  small: {
    line: {
      thickness: 'component/base/border/width/thin',
      spacing: 'component/base/gap/xs'
    },
    pattern: {
      dashLength: 'component/base/gap/xs',
      dashGap: 'component/base/gap/xs',
      dotSize: 'component/base/gap/2xs',
      dotGap: 'component/base/gap/2xs'
    },
    label: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/body/sm',
      spacing: 'component/base/gap/sm'
    },
    icon: {
      size: 'component/base/icon/xs',
      spacing: 'component/base/gap/xs'
    },
    spacing: {
      content: 'component/base/gap/xs',
      section: 'component/base/gap/sm'
    }
  },
  medium: {
    line: {
      thickness: 'component/base/border/width/thick',
      spacing: 'component/base/gap/sm'
    },
    pattern: {
      dashLength: 'component/base/gap/sm',
      dashGap: 'component/base/gap/sm',
      dotSize: 'component/base/gap/xs',
      dotGap: 'component/base/gap/xs'
    },
    label: {
      fontSize: 'text/body/md',
      lineHeight: 'text/body/md',
      spacing: 'component/base/gap/md'
    },
    icon: {
      size: 'component/base/icon/sm',
      spacing: 'component/base/gap/sm'
    },
    spacing: {
      content: 'component/base/gap/sm',
      section: 'component/base/gap/md'
    }
  },
  large: {
    line: {
      thickness: 'component/base/border/width/thicker',
      spacing: 'component/base/gap/md'
    },
    pattern: {
      dashLength: 'component/base/gap/md',
      dashGap: 'component/base/gap/md',
      dotSize: 'component/base/gap/sm',
      dotGap: 'component/base/gap/sm'
    },
    label: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/body/lg',
      spacing: 'component/base/gap/lg'
    },
    icon: {
      size: 'component/base/icon/md',
      spacing: 'component/base/gap/md'
    },
    spacing: {
      content: 'component/base/gap/md',
      section: 'component/base/gap/lg'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseStyle: DividerStyle = {
  line: {
    solid: {
      color: baseStateStyle,
      opacity: {
        default: '1',
        subtle: '0.5'
      }
    },
    dashed: {
      color: baseStateStyle,
      opacity: {
        default: '1',
        subtle: '0.5'
      }
    },
    dotted: {
      color: baseStateStyle,
      opacity: {
        default: '1',
        subtle: '0.5'
      }
    }
  },
  label: {
    color: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    background: {
      default: 'surface/color/white',
      hover: 'surface/color/white',
      pressed: 'surface/color/white',
      disabled: 'surface/color/disabled'
    },
    opacity: {
      default: '1',
      subtle: '0.7'
    }
  },
  icon: {
    color: {
      default: 'text/color/default',
      hover: 'text/color/hover',
      pressed: 'text/color/pressed',
      disabled: 'text/color/disabled'
    },
    opacity: {
      default: '1',
      subtle: '0.7'
    },
    transform: {
      default: 'rotate(0deg)',
      rotated: 'rotate(90deg)'
    }
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: ['opacity', 'transform', 'background']
  }
};

export const DIVIDER_STYLES: DividerStyles = {
  default: {
    ...baseStyle,
    line: {
      solid: {
        color: {
          default: 'surface/color/default',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '1',
          subtle: '0.5'
        }
      },
      dashed: {
        color: {
          default: 'surface/color/default',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '1',
          subtle: '0.5'
        }
      },
      dotted: {
        color: {
          default: 'surface/color/default',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '1',
          subtle: '0.5'
        }
      }
    }
  },
  primary: {
    ...baseStyle,
    line: {
      solid: {
        color: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '1',
          subtle: '0.5'
        }
      },
      dashed: {
        color: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '1',
          subtle: '0.5'
        }
      },
      dotted: {
        color: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '1',
          subtle: '0.5'
        }
      }
    },
    label: {
      ...baseStyle.label,
      color: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      }
    },
    icon: {
      ...baseStyle.icon,
      color: {
        default: 'status/info/default',
        hover: 'status/info/hover',
        pressed: 'status/info/pressed',
        disabled: 'text/color/disabled'
      }
    }
  },
  subtle: {
    ...baseStyle,
    line: {
      solid: {
        color: {
          default: 'surface/color/subtle',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '0.5',
          subtle: '0.3'
        }
      },
      dashed: {
        color: {
          default: 'surface/color/subtle',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '0.5',
          subtle: '0.3'
        }
      },
      dotted: {
        color: {
          default: 'surface/color/subtle',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        opacity: {
          default: '0.5',
          subtle: '0.3'
        }
      }
    },
    label: {
      ...baseStyle.label,
      color: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      opacity: {
        default: '0.7',
        subtle: '0.5'
      }
    },
    icon: {
      ...baseStyle.icon,
      color: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      opacity: {
        default: '0.7',
        subtle: '0.5'
      }
    }
  }
} as const;

export const DIVIDER_VARIANTS: DividerVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'solid', theme: 'default' },
  { size: 'medium', variant: 'solid', theme: 'default' },
  { size: 'large', variant: 'solid', theme: 'default' },

  // Variant styles
  { size: 'medium', variant: 'solid', theme: 'default' },
  { size: 'medium', variant: 'dashed', theme: 'default' },
  { size: 'medium', variant: 'dotted', theme: 'default' },

  // Theme variants
  { size: 'medium', variant: 'solid', theme: 'default' },
  { size: 'medium', variant: 'solid', theme: 'primary' },
  { size: 'medium', variant: 'solid', theme: 'subtle' },

  // Orientation variants
  { size: 'medium', variant: 'solid', theme: 'default', orientation: 'horizontal' },
  { size: 'medium', variant: 'solid', theme: 'default', orientation: 'vertical' },

  // With icons
  { 
    size: 'medium', 
    variant: 'solid', 
    theme: 'default',
    icon: { 
      name: 'minus',
      rotate: 90
    }
  },

  // With labels
  { 
    size: 'medium', 
    variant: 'solid', 
    theme: 'default',
    label: {
      text: 'Section Title',
      position: 'center',
      alignment: 'center',
      background: true
    }
  },

  // With content spacing
  { 
    size: 'medium', 
    variant: 'solid', 
    theme: 'default',
    content: {
      spacing: 'loose',
      reverse: true
    }
  },

  // With animation
  { 
    size: 'medium', 
    variant: 'solid', 
    theme: 'default',
    animation: {
      duration: 300,
      timing: 'ease-in-out',
      properties: ['opacity', 'transform']
    }
  },

  // Complex combinations
  { 
    size: 'large',
    variant: 'dashed',
    theme: 'primary',
    orientation: 'horizontal',
    icon: { 
      name: 'arrow-right',
      rotate: 0
    },
    label: {
      text: 'Next Section',
      position: 'end',
      alignment: 'center',
      background: true
    },
    content: {
      spacing: 'loose',
      reverse: false
    },
    animation: {
      duration: 300,
      timing: 'ease-in-out',
      properties: ['opacity', 'transform']
    }
  }
] as const; 