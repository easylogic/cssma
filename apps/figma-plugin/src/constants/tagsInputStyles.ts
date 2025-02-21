import { TagsInputSizeConfig, TagsInputStyle, TagsInputStyles, TagsInputVariantProps } from '../types/tagsInput';

export const TAGS_INPUT_SIZES: TagsInputSizeConfig = {
  small: {
    root: {
      minHeight: 'component/base/height/sm',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    input: {
      height: 'component/base/height/xs',
      minWidth: '60',
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      caretWidth: '1',
      caretHeight: '12'
    },
    tag: {
      height: 'component/base/height/xs',
      minWidth: '60',
      maxWidth: '160',
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      iconSize: 'component/base/icon/xs',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/sm',
      padding: 'component/base/gap/xs'
    },
    spacing: {
      tag: 'component/base/gap/xs',
      icon: 'component/base/gap/xs',
      remove: 'component/base/gap/xs',
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
    input: {
      height: 'component/base/height/sm',
      minWidth: '80',
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      caretWidth: '2',
      caretHeight: '16'
    },
    tag: {
      height: 'component/base/height/sm',
      minWidth: '80',
      maxWidth: '200',
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      iconSize: 'component/base/icon/sm',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/md',
      padding: 'component/base/gap/sm'
    },
    spacing: {
      tag: 'component/base/gap/sm',
      icon: 'component/base/gap/sm',
      remove: 'component/base/gap/sm',
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
    input: {
      height: 'component/base/height/md',
      minWidth: '100',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      caretWidth: '2',
      caretHeight: '20'
    },
    tag: {
      height: 'component/base/height/md',
      minWidth: '100',
      maxWidth: '240',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      iconSize: 'component/base/icon/md',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    icon: {
      size: 'component/base/icon/lg',
      padding: 'component/base/gap/md'
    },
    spacing: {
      tag: 'component/base/gap/md',
      icon: 'component/base/gap/md',
      remove: 'component/base/gap/md',
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

const baseTagStyle = {
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
  icon: {
    default: 'text/color/default',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: {
    default: 'surface/color/default',
    hover: 'surface/color/hover',
    focused: 'surface/color/hover',
    disabled: 'surface/color/disabled'
  },
  remove: {
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
  }
};

export const TAGS_INPUT_STYLES: TagsInputStyles = {
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
    tag: {
      default: baseTagStyle,
      success: {
        ...baseTagStyle,
        background: {
          default: 'status/success/ghost/hover',
          hover: 'status/success/ghost/pressed',
          focused: 'status/success/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        ...baseTagStyle,
        background: {
          default: 'status/error/ghost/hover',
          hover: 'status/error/ghost/pressed',
          focused: 'status/error/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        ...baseTagStyle,
        background: {
          default: 'status/warning/ghost/hover',
          hover: 'status/warning/ghost/pressed',
          focused: 'status/warning/ghost/pressed',
          disabled: 'surface/color/disabled'
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
    tag: {
      default: {
        ...baseTagStyle,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/hover',
          focused: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        }
      },
      success: {
        ...baseTagStyle,
        background: {
          default: 'surface/color/white',
          hover: 'status/success/ghost/hover',
          focused: 'status/success/ghost/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        ...baseTagStyle,
        background: {
          default: 'surface/color/white',
          hover: 'status/error/ghost/hover',
          focused: 'status/error/ghost/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        ...baseTagStyle,
        background: {
          default: 'surface/color/white',
          hover: 'status/warning/ghost/hover',
          focused: 'status/warning/ghost/hover',
          disabled: 'surface/color/disabled'
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
    tag: {
      default: {
        ...baseTagStyle,
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
      success: {
        ...baseTagStyle,
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
        ...baseTagStyle,
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
        ...baseTagStyle,
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

export const TAGS_INPUT_VARIANTS: TagsInputVariantProps[] = [
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
  { size: 'medium', variant: 'filled', placeholder: 'Add tags...' },

  // With icon
  { 
    size: 'medium', 
    variant: 'filled', 
    icon: { name: 'tag' },
    placeholder: 'Add tags...'
  },

  // With validation
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Add tags...',
    validation: {
      required: true,
      minTags: 1,
      maxTags: 5,
      minLength: 2,
      maxLength: 20
    }
  },

  // With suggestions
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Add tags...',
    suggestion: {
      enabled: true,
      source: ['react', 'vue', 'angular', 'svelte', 'solid']
    }
  },

  // With paste handling
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Add tags...',
    paste: {
      enabled: true,
      mode: 'split',
      separator: ','
    }
  },

  // Full featured
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Add tags...',
    icon: { name: 'tag' },
    validation: {
      required: true,
      minTags: 1,
      maxTags: 5
    },
    suggestion: {
      enabled: true,
      source: ['react', 'vue', 'angular', 'svelte', 'solid']
    },
    paste: {
      enabled: true,
      mode: 'split',
      separator: ','
    },
    addOnBlur: true,
    addOnPaste: true,
    addOnSpace: true,
    addOnComma: true,
    addOnEnter: true,
    removeOnBackspace: true
  }
] as const; 