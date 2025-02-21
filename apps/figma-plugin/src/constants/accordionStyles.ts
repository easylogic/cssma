import { AccordionSizeConfig, AccordionStyle, AccordionStyles, AccordionVariantProps } from '../types/accordion';

export const ACCORDION_SIZES: AccordionSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/xs',
    spacing: {
      item: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      content: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/xs',
        vertical: 'component/base/padding/xs'
      },
      content: {
        horizontal: 'component/base/padding/xs',
        vertical: 'component/base/padding/xs'
      }
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
      item: 'component/base/gap/sm',
      icon: 'component/base/gap/xs',
      content: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/sm'
      },
      content: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/sm'
      }
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
      item: 'component/base/gap/md',
      icon: 'component/base/gap/sm',
      content: 'component/base/gap/md',
      group: 'component/base/gap/lg'
    },
    padding: {
      header: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/md'
      },
      content: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/md'
      }
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin'
  }
} as const;

export const ACCORDION_STYLES: AccordionStyles = {
  filled: {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
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
      }
    },
    item: {
      default: {
        header: {
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
          icon: {
            default: 'text/color/secondary',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
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
        },
        content: {
          background: {
            default: 'surface/color/white',
            hover: 'surface/color/white',
            pressed: 'surface/color/white',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/default',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/default',
            hover: 'surface/color/default',
            pressed: 'surface/color/default',
            disabled: 'surface/color/disabled'
          }
        }
      },
      expanded: {
        header: {
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
          icon: {
            default: 'text/color/default',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
            default: 'text/color/default',
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
        },
        content: {
          background: {
            default: 'surface/color/white',
            hover: 'surface/color/white',
            pressed: 'surface/color/white',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/default',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/default',
            hover: 'surface/color/default',
            pressed: 'surface/color/default',
            disabled: 'surface/color/disabled'
          }
        }
      },
      disabled: {
        header: {
          background: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          }
        },
        content: {
          background: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    divider: {
      line: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      },
      spacing: {
        default: 'component/base/gap/md',
        compact: 'component/base/gap/sm',
        loose: 'component/base/gap/lg'
      }
    },
    transition: {
      header: {
        duration: '150ms',
        timing: 'ease-in-out'
      },
      content: {
        duration: '200ms',
        timing: 'ease-in-out'
      },
      expandIcon: {
        duration: '150ms',
        timing: 'ease-in-out'
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
        header: {
          background: {
            default: 'surface/color/transparent',
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
          icon: {
            default: 'text/color/secondary',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
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
        },
        content: {
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/default',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/default',
            hover: 'surface/color/default',
            pressed: 'surface/color/default',
            disabled: 'surface/color/disabled'
          }
        }
      },
      expanded: {
        header: {
          background: {
            default: 'surface/color/transparent',
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
          icon: {
            default: 'text/color/default',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
            default: 'text/color/default',
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
        },
        content: {
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/default',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/default',
            hover: 'surface/color/default',
            pressed: 'surface/color/default',
            disabled: 'surface/color/disabled'
          }
        }
      },
      disabled: {
        header: {
          background: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          }
        },
        content: {
          background: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          }
        }
      }
    },
    divider: {
      line: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      },
      spacing: {
        default: 'component/base/gap/md',
        compact: 'component/base/gap/sm',
        loose: 'component/base/gap/lg'
      }
    },
    transition: {
      header: {
        duration: '150ms',
        timing: 'ease-in-out'
      },
      content: {
        duration: '200ms',
        timing: 'ease-in-out'
      },
      expandIcon: {
        duration: '150ms',
        timing: 'ease-in-out'
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
        header: {
          background: {
            default: 'surface/color/transparent',
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
          icon: {
            default: 'text/color/secondary',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
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
        },
        content: {
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/default',
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
      expanded: {
        header: {
          background: {
            default: 'surface/color/transparent',
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
          icon: {
            default: 'text/color/default',
            hover: 'text/color/default',
            pressed: 'text/color/default',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
            default: 'text/color/default',
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
        },
        content: {
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/default',
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
      disabled: {
        header: {
          background: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          icon: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          expandIcon: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        },
        content: {
          background: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          },
          text: {
            default: 'text/color/disabled',
            hover: 'text/color/disabled',
            pressed: 'text/color/disabled',
            disabled: 'text/color/disabled'
          },
          border: {
            default: 'surface/color/transparent',
            hover: 'surface/color/transparent',
            pressed: 'surface/color/transparent',
            disabled: 'surface/color/transparent'
          }
        }
      }
    },
    divider: {
      line: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      },
      spacing: {
        default: 'component/base/gap/md',
        compact: 'component/base/gap/sm',
        loose: 'component/base/gap/lg'
      }
    },
    transition: {
      header: {
        duration: '150ms',
        timing: 'ease-in-out'
      },
      content: {
        duration: '200ms',
        timing: 'ease-in-out'
      },
      expandIcon: {
        duration: '150ms',
        timing: 'ease-in-out'
      }
    }
  }
} as const;

export const ACCORDION_VARIANTS: AccordionVariantProps[] = [
  // Size variants
  { 
    size: 'small',
    variant: 'filled',
    items: [
      {
        key: '1',
        header: { title: 'Small Accordion' },
        content: 'Content for small accordion'
      }
    ]
  },
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      {
        key: '1',
        header: { title: 'Medium Accordion' },
        content: 'Content for medium accordion'
      }
    ]
  },
  { 
    size: 'large',
    variant: 'filled',
    items: [
      {
        key: '1',
        header: { title: 'Large Accordion' },
        content: 'Content for large accordion'
      }
    ]
  },

  // Variant styles
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      {
        key: '1',
        header: { title: 'Filled Accordion' },
        content: 'Content for filled accordion'
      }
    ]
  },
  { 
    size: 'medium',
    variant: 'outlined',
    items: [
      {
        key: '1',
        header: { title: 'Outlined Accordion' },
        content: 'Content for outlined accordion'
      }
    ]
  },
  { 
    size: 'medium',
    variant: 'ghost',
    items: [
      {
        key: '1',
        header: { title: 'Ghost Accordion' },
        content: 'Content for ghost accordion'
      }
    ]
  },

  // With icons
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      {
        key: '1',
        header: { 
          title: 'Accordion with Icon',
          icon: { name: 'settings' },
          expandIcon: { name: 'chevron-down' }
        },
        content: 'Content for accordion with icon'
      }
    ]
  },

  // With groups
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      {
        key: 'group1',
        items: [
          {
            key: '1',
            header: { title: 'Item 1' },
            content: 'Content for item 1'
          },
          {
            key: '2',
            header: { title: 'Item 2' },
            content: 'Content for item 2'
          }
        ],
        showDivider: true
      }
    ]
  },

  // With animation
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      {
        key: '1',
        header: { title: 'Animated Accordion' },
        content: 'Content for animated accordion'
      }
    ],
    animation: {
      animated: true,
      duration: 200,
      timing: 'ease-in-out'
    }
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'outlined',
    items: [
      {
        key: 'group1',
        items: [
          {
            key: '1',
            header: { 
              title: 'Section 1',
              subtitle: 'Optional description',
              icon: { name: 'folder' },
              expandIcon: { name: 'chevron-down' },
              expandIconPlacement: 'end'
            },
            content: 'Content for section 1',
            showDivider: true,
            dividerSpacing: 'default'
          },
          {
            key: '2',
            header: { 
              title: 'Section 2',
              subtitle: 'Optional description',
              icon: { name: 'file' },
              expandIcon: { name: 'chevron-down' },
              expandIconPlacement: 'end'
            },
            content: 'Content for section 2',
            disabled: true
          }
        ],
        showDivider: true,
        dividerSpacing: 'loose'
      }
    ],
    defaultExpandedKeys: ['1'],
    multiple: true,
    collapsible: true,
    destroyInactivePanel: true,
    animation: {
      animated: true,
      duration: 200,
      timing: 'ease-in-out'
    }
  }
] as const; 