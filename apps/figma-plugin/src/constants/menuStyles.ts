import { MenuSizeConfig, MenuStyle, MenuStyles, MenuVariantProps } from '../types/menu';

/**
 * Size configuration for menu components.
 * All values reference design tokens from the design system.
 */
export const MENU_SIZES: MenuSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/xs',
    spacing: {
      item: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      indent: 'menu/item/indent',
      shortcut: 'menu/item/shortcut/gap',
      group: 'menu/group/header/gap'
    },
    padding: {
      horizontal: 'component/base/padding/xs',
      vertical: 'component/base/padding/xs'
    },
    borderRadius: 'component/base/radius/sm',
    borderWidth: 'component/base/border/width/thin',
    container: {
      minWidth: 'menu/container/small/minWidth',
      maxWidth: 'menu/container/small/maxWidth'
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
      indent: 'menu/item/indent',
      shortcut: 'menu/item/shortcut/gap',
      group: 'menu/group/header/gap'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/sm'
    },
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin',
    container: {
      minWidth: 'menu/container/medium/minWidth',
      maxWidth: 'menu/container/medium/maxWidth'
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
      indent: 'menu/item/indent',
      shortcut: 'menu/item/shortcut/gap',
      group: 'menu/group/header/gap'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/md'
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin',
    container: {
      minWidth: 'menu/container/large/minWidth',
      maxWidth: 'menu/container/large/maxWidth'
    }
  }
} as const;

/**
 * Style configuration for menu components.
 * All values reference semantic color tokens.
 */
export const MENU_STYLES: MenuStyles = {
  default: {
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
        default: 'component/base/shadow/md',
        hover: 'component/base/shadow/lg',
        pressed: 'component/base/shadow/sm',
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
        shortcut: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          pressed: 'text/color/default',
          disabled: 'text/color/disabled'
        }
      },
      active: {
        background: {
          default: 'status/info/ghost/hover',
          hover: 'status/info/ghost/hover',
          pressed: 'status/info/ghost/pressed',
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
        shortcut: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/info/default',
          hover: 'status/info/hover',
          pressed: 'status/info/pressed',
          disabled: 'text/color/disabled'
        }
      },
      danger: {
        background: {
          default: 'surface/color/transparent',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
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
        },
        shortcut: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
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
        shortcut: {
          default: 'text/color/disabled',
          hover: 'text/color/disabled',
          pressed: 'text/color/disabled',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'text/color/disabled',
          hover: 'text/color/disabled',
          pressed: 'text/color/disabled',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'text/color/disabled',
          hover: 'text/color/disabled',
          pressed: 'text/color/disabled',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'text/color/disabled',
          hover: 'text/color/disabled',
          pressed: 'text/color/disabled',
          disabled: 'text/color/disabled'
        }
      }
    },
    group: {
      header: {
        background: {
          default: 'surface/color/subtle',
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
          default: 'component/base/gap/sm',
          compact: 'component/base/gap/xs',
          loose: 'component/base/gap/md'
        }
      }
    },
    submenu: {
      arrow: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay',
        pressed: 'surface/color/overlay',
        disabled: 'surface/color/overlay'
      }
    }
  },
  error: {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'surface/color/disabled'
      },
      shadow: {
        default: 'component/base/shadow/md',
        hover: 'component/base/shadow/lg',
        pressed: 'component/base/shadow/sm',
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
        },
        shortcut: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        }
      },
      active: {
        background: {
          default: 'status/error/ghost/hover',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
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
        },
        shortcut: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        }
      },
      danger: {
        background: {
          default: 'surface/color/transparent',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
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
        },
        shortcut: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        }
      }
    },
    group: {
      header: {
        background: {
          default: 'surface/color/subtle',
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
          default: 'component/base/gap/sm',
          compact: 'component/base/gap/xs',
          loose: 'component/base/gap/md'
        }
      }
    },
    submenu: {
      arrow: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay',
        pressed: 'surface/color/overlay',
        disabled: 'surface/color/overlay'
      }
    }
  },
  success: {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'surface/color/disabled'
      },
      shadow: {
        default: 'component/base/shadow/md',
        hover: 'component/base/shadow/lg',
        pressed: 'component/base/shadow/sm',
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
        },
        shortcut: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        }
      },
      active: {
        background: {
          default: 'status/success/ghost/hover',
          hover: 'status/success/ghost/hover',
          pressed: 'status/success/ghost/pressed',
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
        },
        shortcut: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          pressed: 'status/success/pressed',
          disabled: 'text/color/disabled'
        }
      },
      danger: {
        background: {
          default: 'surface/color/transparent',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
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
        },
        shortcut: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        }
      }
    },
    group: {
      header: {
        background: {
          default: 'surface/color/subtle',
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
          default: 'component/base/gap/sm',
          compact: 'component/base/gap/xs',
          loose: 'component/base/gap/md'
        }
      }
    },
    submenu: {
      arrow: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay',
        pressed: 'surface/color/overlay',
        disabled: 'surface/color/overlay'
      }
    }
  },
  warning: {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'surface/color/disabled'
      },
      shadow: {
        default: 'component/base/shadow/md',
        hover: 'component/base/shadow/lg',
        pressed: 'component/base/shadow/sm',
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
        },
        shortcut: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        }
      },
      active: {
        background: {
          default: 'status/warning/ghost/hover',
          hover: 'status/warning/ghost/hover',
          pressed: 'status/warning/ghost/pressed',
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
        },
        shortcut: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          pressed: 'status/warning/pressed',
          disabled: 'text/color/disabled'
        }
      },
      danger: {
        background: {
          default: 'surface/color/transparent',
          hover: 'status/error/ghost/hover',
          pressed: 'status/error/ghost/pressed',
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
        },
        shortcut: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        prefix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        suffix: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        },
        indicator: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          pressed: 'status/error/pressed',
          disabled: 'text/color/disabled'
        }
      }
    },
    group: {
      header: {
        background: {
          default: 'surface/color/subtle',
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
          default: 'component/base/gap/sm',
          compact: 'component/base/gap/xs',
          loose: 'component/base/gap/md'
        }
      }
    },
    submenu: {
      arrow: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay',
        pressed: 'surface/color/overlay',
        disabled: 'surface/color/overlay'
      }
    }
  }
} as const;

/**
 * All possible menu variants for the component set.
 * This defines the complete set of components that will be created.
 */
export const MENU_VARIANTS: MenuVariantProps[] = [
  // Size variants
  { 
    size: 'small',
    variant: 'filled',
    items: [
      { key: '1', label: 'Menu item 1' },
      { key: '2', label: 'Menu item 2' }
    ]
  },
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      { key: '1', label: 'Menu item 1' },
      { key: '2', label: 'Menu item 2' }
    ]
  },
  { 
    size: 'large',
    variant: 'filled',
    items: [
      { key: '1', label: 'Menu item 1' },
      { key: '2', label: 'Menu item 2' }
    ]
  },

  // With icons
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      { 
        key: '1', 
        label: 'Settings',
        icon: { name: 'settings' }
      },
      { 
        key: '2', 
        label: 'Profile',
        icon: { name: 'user' }
      }
    ]
  },

  // With shortcuts
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      { 
        key: '1', 
        label: 'Cut',
        shortcut: { text: '⌘X' }
      },
      { 
        key: '2', 
        label: 'Copy',
        shortcut: { text: '⌘C' }
      }
    ]
  },

  // With groups
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      {
        key: 'g1',
        type: 'divider',
        divider: { spacing: 'default' }
      },
      {
        key: 'g2',
        label: 'File',
        items: [
          { key: '1', label: 'New', icon: { name: 'file' } },
          { key: '2', label: 'Open', icon: { name: 'folder' } }
        ]
      },
      {
        key: 'g3',
        type: 'divider',
        divider: { spacing: 'default' }
      },
      {
        key: 'g4',
        label: 'Edit',
        items: [
          { key: '3', label: 'Cut', shortcut: { text: '⌘X' } },
          { key: '4', label: 'Copy', shortcut: { text: '⌘C' } }
        ]
      }
    ]
  },

  // With states
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      { 
        key: '1', 
        label: 'Default item',
        state: 'default'
      },
      { 
        key: '2', 
        label: 'Active item',
        state: 'active'
      },
      { 
        key: '3', 
        label: 'Disabled item',
        state: 'disabled'
      }
    ]
  },

  // With types
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      { 
        key: '1', 
        label: 'Default action',
        type: 'default'
      },
      { 
        key: '2', 
        label: 'Delete',
        type: 'danger',
        icon: { name: 'trash' }
      }
    ]
  },

  // Complex combination
  { 
    size: 'medium',
    variant: 'filled',
    items: [
      {
        key: 'g1',
        label: 'File',
        items: [
          { 
            key: '1', 
            label: 'New', 
            icon: { name: 'file' },
            shortcut: { text: '⌘N' }
          },
          { 
            key: '2', 
            label: 'Open', 
            icon: { name: 'folder' },
            shortcut: { text: '⌘O' }
          },
          {
            key: 'd1',
            type: 'divider',
            divider: { spacing: 'default' }
          },
          { 
            key: '3', 
            label: 'Delete', 
            type: 'danger',
            icon: { name: 'trash' },
            state: 'disabled'
          }
        ]
      },
      {
        key: 'g2',
        type: 'divider',
        divider: { spacing: 'default' }
      },
      {
        key: 'g3',
        label: 'Edit',
        items: [
          { 
            key: '4', 
            label: 'Cut',
            icon: { name: 'scissors' },
            shortcut: { text: '⌘X' }
          },
          { 
            key: '5', 
            label: 'Copy',
            icon: { name: 'copy' },
            shortcut: { text: '⌘C' },
            state: 'active'
          }
        ]
      }
    ]
  }
] as const; 