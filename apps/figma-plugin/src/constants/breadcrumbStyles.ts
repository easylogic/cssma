import { BreadcrumbSizeConfig, BreadcrumbStyle, BreadcrumbStyles, BreadcrumbVariantProps } from '../types/breadcrumb';

export const BREADCRUMB_SIZES: BreadcrumbSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/xs',
    spacing: {
      item: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      separator: 'component/base/gap/xs'
    },
    padding: {
      horizontal: 'component/base/padding/xs',
      vertical: 'component/base/padding/xs'
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
      separator: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/sm'
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
      separator: 'component/base/gap/md'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/md'
    }
  }
} as const;

export const BREADCRUMB_STYLES: BreadcrumbStyles = {
  'default': {
    root: {
      background: {
        default: 'surface/color/white',
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
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      current: {
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
        icon: {
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
      collapsed: {
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
    separator: {
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      text: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    }
  },
  'error': {
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
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      current: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/disabled'
        },
        text: {
          default: 'status/error/default',
          hover: 'status/error/default',
          pressed: 'status/error/default',
          disabled: 'text/color/disabled'
        },
        icon: {
          default: 'status/error/default',
          hover: 'status/error/default',
          pressed: 'status/error/default',
          disabled: 'text/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      },
      collapsed: {
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
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          pressed: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    separator: {
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      text: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled'
      }
    }
  }
} as const;

export const BREADCRUMB_VARIANTS: BreadcrumbVariantProps[] = [
  // Size variants
  { 
    size: 'small', 
    variant: 'filled', 
    status: 'default',
    items: [
      { text: 'Home', href: '/' }
    ],
    separator: {
      type: 'text',
      content: '/'
    }
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    items: [
      { text: 'Home', href: '/' }
    ],
    separator: {
      type: 'text',
      content: '/'
    }
  },
  { 
    size: 'large', 
    variant: 'filled', 
    status: 'default',
    items: [
      { text: 'Home', href: '/' }
    ],
    separator: {
      type: 'text',
      content: '/'
    }
  },

  // With icons
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    items: [
      { text: 'Home', href: '/', icon: { name: 'home' } },
      { text: 'Products', href: '/products', icon: { name: 'box' } },
      { text: 'Electronics', href: '/products/electronics', icon: { name: 'laptop' } }
    ],
    separator: {
      type: 'icon',
      content: 'chevron-right'
    }
  },

  // With collapse
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'Electronics', href: '/products/electronics' },
      { text: 'Laptops', href: '/products/electronics/laptops' },
      { text: 'MacBook Pro', href: '/products/electronics/laptops/macbook-pro' }
    ],
    separator: {
      type: 'text',
      content: '/'
    },
    collapse: {
      enabled: true,
      maxItems: 3,
      itemsBefore: 1,
      itemsAfter: 1
    }
  },

  // Error state
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'error',
    items: [
      { text: 'Home', href: '/' },
      { text: 'Error', href: '/error' }
    ],
    separator: {
      type: 'text',
      content: '/'
    }
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    items: [
      { text: 'Home', href: '/', icon: { name: 'home' } },
      { text: 'Products', href: '/products', icon: { name: 'box' } },
      { text: 'Electronics', href: '/products/electronics', icon: { name: 'laptop' } },
      { text: 'Laptops', href: '/products/electronics/laptops', icon: { name: 'laptop' } },
      { text: 'MacBook Pro', href: '/products/electronics/laptops/macbook-pro', icon: { name: 'apple' } }
    ],
    separator: {
      type: 'icon',
      content: 'chevron-right'
    },
    collapse: {
      enabled: true,
      maxItems: 4,
      itemsBefore: 1,
      itemsAfter: 2
    }
  }
] as const; 