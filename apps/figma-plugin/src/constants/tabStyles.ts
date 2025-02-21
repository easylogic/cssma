import { TabSizeConfig, TabStyle, TabStyles, TabVariantProps } from '../types/tab';

export const TAB_SIZES: TabSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/xs',
    spacing: {
      item: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      content: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/xs',
      vertical: 'component/base/padding/xs'
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
      content: 'component/base/gap/md'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/sm'
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
      content: 'component/base/gap/lg'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/md'
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin'
  }
} as const;

export const TAB_STYLES: TabStyles = {
  line: {
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
        default: 'component/base/shadow/none',
        hover: 'component/base/shadow/none',
        pressed: 'component/base/shadow/none',
        disabled: 'component/base/shadow/none'
      }
    },
    list: {
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
      },
      divider: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      },
      shadow: {
        default: 'component/base/shadow/none',
        hover: 'component/base/shadow/none',
        pressed: 'component/base/shadow/none',
        disabled: 'component/base/shadow/none'
      }
    },
    item: {
      default: {
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
        indicator: {
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
        },
        closeButton: {
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
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
        indicator: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        },
        closeButton: {
          background: {
            default: 'surface/color/transparent',
            hover: 'surface/color/hover',
            pressed: 'surface/color/pressed',
            disabled: 'surface/color/disabled'
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
        }
      },
      disabled: {
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
        indicator: {
          default: 'surface/color/disabled',
          hover: 'surface/color/disabled',
          pressed: 'surface/color/disabled',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/disabled',
          hover: 'surface/color/disabled',
          pressed: 'surface/color/disabled',
          disabled: 'surface/color/disabled'
        },
        closeButton: {
          background: {
            default: 'surface/color/disabled',
            hover: 'surface/color/disabled',
            pressed: 'surface/color/disabled',
            disabled: 'surface/color/disabled'
          },
          icon: {
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
    panel: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/white',
        pressed: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      },
      shadow: {
        default: 'component/base/shadow/none',
        hover: 'component/base/shadow/none',
        pressed: 'component/base/shadow/none',
        disabled: 'component/base/shadow/none'
      }
    },
    extra: {
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
      divider: {
        default: 'surface/color/default',
        hover: 'surface/color/default',
        pressed: 'surface/color/default',
        disabled: 'surface/color/disabled'
      }
    },
    transition: {
      item: {
        duration: '150ms',
        timing: 'ease-in-out'
      },
      panel: {
        duration: '200ms',
        timing: 'ease-in-out'
      },
      indicator: {
        duration: '150ms',
        timing: 'ease-in-out'
      }
    }
  },
  card: {
    // Similar structure as line variant but with different styles
    // ... card variant styles with elevated appearance
  },
  segment: {
    // Similar structure as line variant but with different styles
    // ... segment variant styles with connected appearance
  }
} as const;

export const TAB_VARIANTS: TabVariantProps[] = [
  // Size variants
  { 
    size: 'small',
    variant: 'line',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ]
  },
  { 
    size: 'medium',
    variant: 'line',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ]
  },
  { 
    size: 'large',
    variant: 'line',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ]
  },

  // Variant styles
  { 
    size: 'medium',
    variant: 'line',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ]
  },
  { 
    size: 'medium',
    variant: 'card',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ]
  },
  { 
    size: 'medium',
    variant: 'segment',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ]
  },

  // With icons
  { 
    size: 'medium',
    variant: 'line',
    items: [
      { 
        key: '1', 
        label: 'Dashboard', 
        icon: { name: 'dashboard' },
        content: 'Dashboard content'
      },
      { 
        key: '2', 
        label: 'Settings',
        icon: { name: 'settings' },
        content: 'Settings content'
      }
    ]
  },

  // With placement
  { 
    size: 'medium',
    variant: 'line',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ],
    list: {
      placement: 'left',
      align: 'start'
    }
  },

  // With extra content
  { 
    size: 'medium',
    variant: 'card',
    items: [
      { key: '1', label: 'Tab 1', content: 'Content 1' },
      { key: '2', label: 'Tab 2', content: 'Content 2' }
    ],
    list: {
      extraContent: 'Extra content'
    }
  },

  // With closable tabs
  { 
    size: 'medium',
    variant: 'card',
    items: [
      { 
        key: '1', 
        label: 'Tab 1',
        content: 'Content 1',
        closable: true
      },
      { 
        key: '2', 
        label: 'Tab 2',
        content: 'Content 2',
        closable: true
      }
    ]
  },

  // Complex combination
  { 
    size: 'medium',
    variant: 'card',
    items: [
      { 
        key: '1', 
        label: 'Dashboard', 
        icon: { name: 'dashboard' },
        content: 'Dashboard content',
        closable: true
      },
      { 
        key: '2', 
        label: 'Settings',
        icon: { name: 'settings' },
        content: 'Settings content',
        disabled: true
      },
      { 
        key: '3', 
        label: 'Profile',
        icon: { name: 'user' },
        content: 'Profile content',
        closable: true
      }
    ],
    list: {
      placement: 'top',
      align: 'start',
      extraContent: 'Actions'
    },
    panel: {
      animated: true,
      destroyInactivePanel: true
    },
    defaultActiveKey: '1'
  }
] as const; 