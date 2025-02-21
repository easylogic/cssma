import { SidebarSizeConfig, SidebarStyle, SidebarStyles, SidebarVariantProps } from '../types/sidebar';

export const SIDEBAR_SIZES: SidebarSizeConfig = {
  small: {
    root: {
      width: {
        expanded: '240',
        collapsed: '56'
      },
      minWidth: '56',
      maxWidth: '320',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    header: {
      height: 'component/base/height/md',
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      iconSize: 'component/base/icon/sm',
      spacing: 'component/base/gap/sm'
    },
    content: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      iconSize: 'component/base/icon/sm',
      spacing: {
        item: 'component/base/gap/xs',
        icon: 'component/base/gap/xs',
        indent: 'component/base/gap/md',
        section: 'component/base/gap/sm'
      }
    },
    footer: {
      height: 'component/base/height/md',
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      iconSize: 'component/base/icon/sm',
      spacing: 'component/base/gap/sm'
    },
    padding: {
      header: {
        x: 'component/base/padding/sm',
        y: 'component/base/padding/xs'
      },
      content: {
        x: 'component/base/padding/sm',
        y: 'component/base/padding/xs'
      },
      footer: {
        x: 'component/base/padding/sm',
        y: 'component/base/padding/xs'
      }
    }
  },
  medium: {
    root: {
      width: {
        expanded: '280',
        collapsed: '64'
      },
      minWidth: '64',
      maxWidth: '400',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    header: {
      height: 'component/base/height/lg',
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      iconSize: 'component/base/icon/md',
      spacing: 'component/base/gap/md'
    },
    content: {
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      iconSize: 'component/base/icon/md',
      spacing: {
        item: 'component/base/gap/sm',
        icon: 'component/base/gap/sm',
        indent: 'component/base/gap/lg',
        section: 'component/base/gap/md'
      }
    },
    footer: {
      height: 'component/base/height/lg',
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      iconSize: 'component/base/icon/md',
      spacing: 'component/base/gap/md'
    },
    padding: {
      header: {
        x: 'component/base/padding/md',
        y: 'component/base/padding/sm'
      },
      content: {
        x: 'component/base/padding/md',
        y: 'component/base/padding/sm'
      },
      footer: {
        x: 'component/base/padding/md',
        y: 'component/base/padding/sm'
      }
    }
  },
  large: {
    root: {
      width: {
        expanded: '320',
        collapsed: '72'
      },
      minWidth: '72',
      maxWidth: '480',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    header: {
      height: 'component/base/height/xl',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      iconSize: 'component/base/icon/lg',
      spacing: 'component/base/gap/lg'
    },
    content: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      iconSize: 'component/base/icon/lg',
      spacing: {
        item: 'component/base/gap/md',
        icon: 'component/base/gap/md',
        indent: 'component/base/gap/xl',
        section: 'component/base/gap/lg'
      }
    },
    footer: {
      height: 'component/base/height/xl',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      iconSize: 'component/base/icon/lg',
      spacing: 'component/base/gap/lg'
    },
    padding: {
      header: {
        x: 'component/base/padding/lg',
        y: 'component/base/padding/md'
      },
      content: {
        x: 'component/base/padding/lg',
        y: 'component/base/padding/md'
      },
      footer: {
        x: 'component/base/padding/lg',
        y: 'component/base/padding/md'
      }
    }
  },
  custom: {
    root: {
      width: {
        expanded: '100%',
        collapsed: '80'
      },
      minWidth: '80',
      maxWidth: '100%',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    header: {
      height: 'component/base/height/xl',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      iconSize: 'component/base/icon/lg',
      spacing: 'component/base/gap/lg'
    },
    content: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      iconSize: 'component/base/icon/lg',
      spacing: {
        item: 'component/base/gap/md',
        icon: 'component/base/gap/md',
        indent: 'component/base/gap/xl',
        section: 'component/base/gap/lg'
      }
    },
    footer: {
      height: 'component/base/height/xl',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      iconSize: 'component/base/icon/lg',
      spacing: 'component/base/gap/lg'
    },
    padding: {
      header: {
        x: 'component/base/padding/lg',
        y: 'component/base/padding/md'
      },
      content: {
        x: 'component/base/padding/lg',
        y: 'component/base/padding/md'
      },
      footer: {
        x: 'component/base/padding/lg',
        y: 'component/base/padding/md'
      }
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseSectionStyle = {
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
  border: baseStateStyle
};

const baseItemStyle = {
  background: {
    default: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    active: {
      default: 'status/info/ghost/hover',
      hover: 'status/info/ghost/pressed',
      pressed: 'status/info/ghost/pressed',
      disabled: 'surface/color/disabled'
    },
    selected: {
      default: 'status/info/ghost/hover',
      hover: 'status/info/ghost/pressed',
      pressed: 'status/info/ghost/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  text: {
    default: {
      default: 'text/color/default',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    active: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/hover',
      disabled: 'text/color/disabled'
    },
    selected: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/hover',
      disabled: 'text/color/disabled'
    }
  },
  icon: {
    default: {
      default: 'text/color/secondary',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    active: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/hover',
      disabled: 'text/color/disabled'
    },
    selected: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/hover',
      disabled: 'text/color/disabled'
    }
  },
  indicator: {
    default: {
      default: 'text/color/secondary',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    active: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/hover',
      disabled: 'text/color/disabled'
    },
    selected: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      pressed: 'status/info/hover',
      disabled: 'text/color/disabled'
    }
  },
  badge: {
    background: baseStateStyle,
    text: {
      default: 'text/color/inverse',
      hover: 'text/color/inverse',
      pressed: 'text/color/inverse',
      disabled: 'text/color/disabled'
    }
  }
};

const baseSidebarStyle: SidebarStyle = {
  root: {
    background: baseStateStyle,
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/md',
      hover: 'component/base/shadow/md',
      pressed: 'component/base/shadow/md',
      disabled: 'component/base/shadow/none'
    }
  },
  header: baseSectionStyle,
  content: {
    background: baseStateStyle,
    item: baseItemStyle,
    divider: baseStateStyle
  },
  footer: baseSectionStyle,
  overlay: {
    background: {
      default: 'surface/color/transparent',
      hover: 'surface/color/transparent',
      pressed: 'surface/color/transparent',
      disabled: 'surface/color/transparent'
    },
    blur: {
      enabled: true,
      amount: '4px'
    }
  },
  transition: {
    duration: '150ms',
    timing: 'ease-in-out',
    properties: ['width', 'transform', 'opacity']
  }
};

export const SIDEBAR_STYLES: SidebarStyles = {
  filled: {
    default: baseSidebarStyle,
    info: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    success: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    warning: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    error: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      }
    }
  },
  outlined: {
    default: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        }
      }
    },
    info: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    success: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    warning: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    error: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          pressed: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      }
    }
  },
  ghost: {
    default: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
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
    },
    info: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/info/ghost/hover',
          pressed: 'status/info/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    success: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/success/ghost/hover',
          pressed: 'status/success/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    warning: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/warning/ghost/hover',
          pressed: 'status/warning/ghost/pressed',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    error: {
      ...baseSidebarStyle,
      root: {
        ...baseSidebarStyle.root,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
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
} as const;

export const SIDEBAR_VARIANTS: SidebarVariantProps[] = [
  // Size variants
  {
    size: 'small',
    variant: 'filled',
    items: [
      { id: '1', label: 'Item 1', icon: { name: 'home' } },
      { id: '2', label: 'Item 2', icon: { name: 'settings' } },
      { id: '3', label: 'Item 3', icon: { name: 'user' } }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    items: [
      { id: '1', label: 'Item 1', icon: { name: 'home' } },
      { id: '2', label: 'Item 2', icon: { name: 'settings' } },
      { id: '3', label: 'Item 3', icon: { name: 'user' } }
    ]
  },
  {
    size: 'large',
    variant: 'filled',
    items: [
      { id: '1', label: 'Item 1', icon: { name: 'home' } },
      { id: '2', label: 'Item 2', icon: { name: 'settings' } },
      { id: '3', label: 'Item 3', icon: { name: 'user' } }
    ]
  },

  // Variant styles
  {
    variant: 'filled',
    items: [
      { id: '1', label: 'Item 1', icon: { name: 'home' } },
      { id: '2', label: 'Item 2', icon: { name: 'settings' } },
      { id: '3', label: 'Item 3', icon: { name: 'user' } }
    ]
  },
  {
    variant: 'outlined',
    items: [
      { id: '1', label: 'Item 1', icon: { name: 'home' } },
      { id: '2', label: 'Item 2', icon: { name: 'settings' } },
      { id: '3', label: 'Item 3', icon: { name: 'user' } }
    ]
  },
  {
    variant: 'ghost',
    items: [
      { id: '1', label: 'Item 1', icon: { name: 'home' } },
      { id: '2', label: 'Item 2', icon: { name: 'settings' } },
      { id: '3', label: 'Item 3', icon: { name: 'user' } }
    ]
  },

  // With header and footer
  {
    variant: 'filled',
    header: {
      title: 'Navigation',
      icon: { name: 'menu' },
      action: {
        icon: { name: 'chevron-left' },
        onClick: () => {}
      }
    },
    items: [
      { id: '1', label: 'Dashboard', icon: { name: 'home' } },
      { id: '2', label: 'Settings', icon: { name: 'settings' } },
      { id: '3', label: 'Profile', icon: { name: 'user' } }
    ],
    footer: {
      content: 'Logged in as Admin',
      icon: { name: 'user' },
      action: {
        icon: { name: 'log-out' },
        onClick: () => {}
      }
    }
  },

  // With nested items
  {
    variant: 'filled',
    items: [
      {
        id: '1',
        label: 'Dashboard',
        icon: { name: 'home' },
        items: [
          { id: '1-1', label: 'Analytics' },
          { id: '1-2', label: 'Reports' }
        ]
      },
      {
        id: '2',
        label: 'Settings',
        icon: { name: 'settings' },
        items: [
          { id: '2-1', label: 'General' },
          { id: '2-2', label: 'Security' }
        ]
      }
    ]
  },

  // With badges
  {
    variant: 'filled',
    items: [
      {
        id: '1',
        label: 'Inbox',
        icon: { name: 'inbox' },
        badge: { content: '3', status: 'info' }
      },
      {
        id: '2',
        label: 'Notifications',
        icon: { name: 'bell' },
        badge: { content: '12', status: 'error' }
      },
      {
        id: '3',
        label: 'Updates',
        icon: { name: 'download' },
        badge: { content: '2', status: 'success' }
      }
    ]
  },

  // Collapsible
  {
    variant: 'filled',
    collapse: {
      enabled: true,
      defaultCollapsed: false,
      collapseWidth: 64,
      expandWidth: 240,
      showTooltip: true
    },
    items: [
      { id: '1', label: 'Home', icon: { name: 'home' } },
      { id: '2', label: 'Settings', icon: { name: 'settings' } },
      { id: '3', label: 'Profile', icon: { name: 'user' } }
    ]
  },

  // Resizable
  {
    variant: 'filled',
    resize: {
      enabled: true,
      minWidth: 200,
      maxWidth: 400,
      handles: ['right']
    },
    items: [
      { id: '1', label: 'Home', icon: { name: 'home' } },
      { id: '2', label: 'Settings', icon: { name: 'settings' } },
      { id: '3', label: 'Profile', icon: { name: 'user' } }
    ]
  },

  // Overlay mode
  {
    variant: 'filled',
    mode: 'overlay',
    overlay: {
      enabled: true,
      backdrop: true,
      closeOnClick: true,
      closeOnEsc: true
    },
    items: [
      { id: '1', label: 'Home', icon: { name: 'home' } },
      { id: '2', label: 'Settings', icon: { name: 'settings' } },
      { id: '3', label: 'Profile', icon: { name: 'user' } }
    ]
  }
] as const; 