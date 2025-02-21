import { PaginationInputStyle, PaginationItemStyle, PaginationSizeConfig, PaginationStateStyle, PaginationStyle, PaginationStyles, PaginationVariantProps } from '../types/pagination';

export const PAGINATION_SIZES: PaginationSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/xs',
    spacing: {
      item: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      section: 'component/base/gap/sm'
    },
    padding: {
      item: {
        horizontal: 'component/base/padding/xs',
        vertical: 'component/base/padding/2xs'
      },
      input: {
        horizontal: 'component/base/padding/xs',
        vertical: 'component/base/padding/2xs'
      }
    },
    borderRadius: 'component/base/radius/sm',
    borderWidth: 'component/base/border/width/thin',
    input: {
      width: '60',
      height: 'component/base/height/xs'
    }
  },
  medium: {
    height: 'component/base/height/sm',
    fontSize: 'text/body/md',
    lineHeight: 'text/body/md',
    iconSize: 'component/base/icon/sm',
    spacing: {
      item: 'component/base/gap/sm',
      icon: 'component/base/gap/xs',
      section: 'component/base/gap/md'
    },
    padding: {
      item: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/xs'
      },
      input: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/xs'
      }
    },
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin',
    input: {
      width: '70',
      height: 'component/base/height/sm'
    }
  },
  large: {
    height: 'component/base/height/md',
    fontSize: 'text/body/lg',
    lineHeight: 'text/body/lg',
    iconSize: 'component/base/icon/md',
    spacing: {
      item: 'component/base/gap/md',
      icon: 'component/base/gap/sm',
      section: 'component/base/gap/lg'
    },
    padding: {
      item: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      },
      input: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/sm'
      }
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin',
    input: {
      width: '80',
      height: 'component/base/height/md'
    }
  }
} as const;

const baseStateStyle: PaginationStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseItemStyle: PaginationItemStyle = {
  background: baseStateStyle,
  text: {
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  icon: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: {
    default: 'surface/color/default',
    hover: 'surface/color/hover',
    pressed: 'surface/color/pressed',
    disabled: 'surface/color/disabled'
  }
};

const baseInputStyle: PaginationInputStyle = {
  background: {
    default: 'surface/color/white',
    hover: 'surface/color/hover',
    pressed: 'surface/color/pressed',
    disabled: 'surface/color/disabled'
  },
  text: {
    default: 'text/color/default',
    hover: 'text/color/default',
    pressed: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  placeholder: {
    default: 'text/color/secondary',
    hover: 'text/color/secondary',
    pressed: 'text/color/secondary',
    disabled: 'text/color/disabled'
  },
  border: {
    default: 'surface/color/default',
    hover: 'surface/color/hover',
    pressed: 'surface/color/pressed',
    disabled: 'surface/color/disabled'
  }
};

export const PAGINATION_STYLES: PaginationStyles = {
  filled: {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        pressed: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    item: {
      default: baseItemStyle,
      active: {
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
        },
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      control: baseItemStyle,
      ellipsis: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        text: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
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
      }
    },
    input: baseInputStyle,
    total: {
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      label: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    sizeChanger: {
      trigger: baseItemStyle,
      menu: {
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/default',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        shadow: {
          default: 'component/base/shadow/sm',
          hover: 'component/base/shadow/sm',
          pressed: 'component/base/shadow/sm',
          disabled: 'component/base/shadow/none'
        },
        item: baseItemStyle
      }
    }
  },
  outlined: {
    root: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      },
      border: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    item: {
      default: {
        ...baseItemStyle,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      active: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
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
        },
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      control: {
        ...baseItemStyle,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      ellipsis: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        text: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
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
      }
    },
    input: {
      ...baseInputStyle,
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    total: {
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      label: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    sizeChanger: {
      trigger: {
        ...baseItemStyle,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        }
      },
      menu: {
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/default',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        shadow: {
          default: 'component/base/shadow/sm',
          hover: 'component/base/shadow/sm',
          pressed: 'component/base/shadow/sm',
          disabled: 'component/base/shadow/none'
        },
        item: {
          ...baseItemStyle,
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          border: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      }
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
    item: {
      default: {
        ...baseItemStyle,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      active: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
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
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      control: {
        ...baseItemStyle,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      ellipsis: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        text: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
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
      }
    },
    input: {
      ...baseInputStyle,
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    total: {
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      label: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    },
    sizeChanger: {
      trigger: {
        ...baseItemStyle,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      menu: {
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/default',
          hover: 'surface/color/hover',
          pressed: 'surface/color/pressed',
          disabled: 'surface/color/disabled'
        },
        shadow: {
          default: 'component/base/shadow/sm',
          hover: 'component/base/shadow/sm',
          pressed: 'component/base/shadow/sm',
          disabled: 'component/base/shadow/none'
        },
        item: {
          ...baseItemStyle,
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
          },
          border: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      }
    }
  }
} as const;

export const PAGINATION_VARIANTS: PaginationVariantProps[] = [
  // Size variants
  { 
    size: 'small',
    variant: 'filled',
    total: 50,
    current: 1
  },
  { 
    size: 'medium',
    variant: 'filled',
    total: 50,
    current: 1
  },
  { 
    size: 'large',
    variant: 'filled',
    total: 50,
    current: 1
  },

  // Variant styles
  { 
    size: 'medium',
    variant: 'filled',
    total: 50,
    current: 1
  },
  { 
    size: 'medium',
    variant: 'outlined',
    total: 50,
    current: 1
  },
  { 
    size: 'medium',
    variant: 'ghost',
    total: 50,
    current: 1
  },

  // With size changer
  { 
    size: 'medium',
    variant: 'filled',
    total: 50,
    current: 1,
    showSizeChanger: true,
    sizeChanger: {
      options: [10, 20, 50, 100],
      value: 10
    }
  },

  // With quick jumper
  { 
    size: 'medium',
    variant: 'filled',
    total: 50,
    current: 1,
    showQuickJumper: true,
    quickJumper: {
      placeholder: 'Go to'
    }
  },

  // With total
  { 
    size: 'medium',
    variant: 'filled',
    total: 50,
    current: 1,
    showTotal: true,
    totalFormatter: {
      template: 'Total {total} items',
      formatter: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    }
  },

  // Simple mode
  { 
    size: 'medium',
    variant: 'filled',
    total: 50,
    current: 1,
    simple: true
  },

  // Disabled state
  { 
    size: 'medium',
    variant: 'filled',
    total: 50,
    current: 1,
    disabled: true
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'outlined',
    total: 100,
    current: 5,
    showSizeChanger: true,
    sizeChanger: {
      options: [10, 20, 50, 100],
      value: 20
    },
    showQuickJumper: true,
    quickJumper: {
      placeholder: 'Jump to'
    },
    showTotal: true,
    totalFormatter: {
      template: '{range[0]}-{range[1]} of {total} items',
      formatter: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    },
    align: 'center',
    responsive: true,
    showLessItems: true,
    locale: {
      items_per_page: 'items / page',
      jump_to: 'Go to',
      page: 'Page'
    }
  }
] as const; 