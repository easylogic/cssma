import { BlockquoteSizeConfig, BlockquoteStyle, BlockquoteStyles, BlockquoteVariantProps } from '../types/blockquote';

export const BLOCKQUOTE_SIZES: BlockquoteSizeConfig = {
  small: {
    root: {
      minWidth: '240',
      maxWidth: '480',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    content: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      letterSpacing: '-0.01em',
      paragraphSpacing: '0.75em'
    },
    citation: {
      fontSize: 'text/body/xs',
      lineHeight: 'text/lineHeight/xs',
      spacing: 'component/base/gap/xs'
    },
    icon: {
      size: 'component/base/icon/sm',
      spacing: 'component/base/gap/sm'
    },
    spacing: {
      content: 'component/base/gap/sm',
      citation: 'component/base/gap/md',
      border: 'component/base/gap/sm'
    },
    padding: {
      x: 'component/base/padding/md',
      y: 'component/base/padding/md'
    }
  },
  medium: {
    root: {
      minWidth: '320',
      maxWidth: '640',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    content: {
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      letterSpacing: '-0.01em',
      paragraphSpacing: '1em'
    },
    citation: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      spacing: 'component/base/gap/sm'
    },
    icon: {
      size: 'component/base/icon/md',
      spacing: 'component/base/gap/md'
    },
    spacing: {
      content: 'component/base/gap/md',
      citation: 'component/base/gap/lg',
      border: 'component/base/gap/md'
    },
    padding: {
      x: 'component/base/padding/lg',
      y: 'component/base/padding/lg'
    }
  },
  large: {
    root: {
      minWidth: '400',
      maxWidth: '800',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    content: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      letterSpacing: '-0.01em',
      paragraphSpacing: '1.25em'
    },
    citation: {
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      spacing: 'component/base/gap/md'
    },
    icon: {
      size: 'component/base/icon/lg',
      spacing: 'component/base/gap/lg'
    },
    spacing: {
      content: 'component/base/gap/lg',
      citation: 'component/base/gap/xl',
      border: 'component/base/gap/lg'
    },
    padding: {
      x: 'component/base/padding/xl',
      y: 'component/base/padding/xl'
    }
  }
} as const;

const baseColorStyle = {
  default: 'text/color/secondary',
  info: 'status/info/default',
  success: 'status/success/default',
  warning: 'status/warning/default',
  error: 'status/error/default'
};

const baseBorderStyle = {
  color: baseColorStyle,
  width: 'component/base/border/width/thin',
  style: 'solid' as const
};

const baseIconStyle = {
  color: baseColorStyle,
  opacity: '0.8'
};

const baseBlockquoteStyle: BlockquoteStyle = {
  root: {
    background: {
      default: 'surface/color/white',
      info: 'status/info/ghost/hover',
      success: 'status/success/ghost/hover',
      warning: 'status/warning/ghost/hover',
      error: 'status/error/ghost/hover'
    },
    border: baseBorderStyle,
    shadow: {
      default: 'component/base/shadow/sm',
      info: 'status/info/ghost/hover',
      success: 'status/success/ghost/hover',
      warning: 'status/warning/ghost/hover',
      error: 'status/error/ghost/hover'
    }
  },
  content: {
    text: baseColorStyle
  },
  citation: {
    text: {
      default: 'text/color/muted',
      info: 'status/info/default',
      success: 'status/success/default',
      warning: 'status/warning/default',
      error: 'status/error/default'
    }
  },
  icon: baseIconStyle,
  transition: {
    duration: '150ms',
    timing: 'ease-in-out',
    properties: ['background', 'border', 'shadow', 'color']
  }
};

export const BLOCKQUOTE_STYLES: BlockquoteStyles = {
  filled: {
    ...baseBlockquoteStyle,
    root: {
      ...baseBlockquoteStyle.root,
      background: {
        default: 'surface/color/default',
        info: 'status/info/ghost/hover',
        success: 'status/success/ghost/hover',
        warning: 'status/warning/ghost/hover',
        error: 'status/error/ghost/hover'
      }
    }
  },
  outlined: {
    ...baseBlockquoteStyle,
    root: {
      ...baseBlockquoteStyle.root,
      background: {
        default: 'surface/color/white',
        info: 'surface/color/white',
        success: 'surface/color/white',
        warning: 'surface/color/white',
        error: 'surface/color/white'
      }
    }
  },
  ghost: {
    ...baseBlockquoteStyle,
    root: {
      ...baseBlockquoteStyle.root,
      background: {
        default: 'surface/color/transparent',
        info: 'status/info/ghost/hover',
        success: 'status/success/ghost/hover',
        warning: 'status/warning/ghost/hover',
        error: 'status/error/ghost/hover'
      },
      border: {
        ...baseBlockquoteStyle.root.border,
        color: {
          default: 'surface/color/transparent',
          info: 'surface/color/transparent',
          success: 'surface/color/transparent',
          warning: 'surface/color/transparent',
          error: 'surface/color/transparent'
        }
      }
    }
  }
} as const;

export const BLOCKQUOTE_VARIANTS: BlockquoteVariantProps[] = [
  // Size variants
  {
    size: 'small',
    variant: 'filled',
    children: 'Small blockquote with concise content.'
  },
  {
    size: 'medium',
    variant: 'filled',
    children: 'Medium blockquote with standard content length.'
  },
  {
    size: 'large',
    variant: 'filled',
    children: 'Large blockquote with extended content for emphasis.'
  },

  // Variant styles
  {
    variant: 'filled',
    children: 'Filled blockquote with solid background.'
  },
  {
    variant: 'outlined',
    children: 'Outlined blockquote with border emphasis.'
  },
  {
    variant: 'ghost',
    children: 'Ghost blockquote with minimal styling.'
  },

  // Status variants
  {
    variant: 'filled',
    status: 'default',
    children: 'Default status blockquote.'
  },
  {
    variant: 'filled',
    status: 'info',
    children: 'Information blockquote with relevant details.'
  },
  {
    variant: 'filled',
    status: 'success',
    children: 'Success blockquote highlighting achievements.'
  },
  {
    variant: 'filled',
    status: 'warning',
    children: 'Warning blockquote for cautionary messages.'
  },
  {
    variant: 'filled',
    status: 'error',
    children: 'Error blockquote indicating issues.'
  },

  // Alignment variants
  {
    variant: 'filled',
    align: 'left',
    children: 'Left-aligned blockquote content.'
  },
  {
    variant: 'filled',
    align: 'center',
    children: 'Center-aligned blockquote content.'
  },
  {
    variant: 'filled',
    align: 'right',
    children: 'Right-aligned blockquote content.'
  },

  // With icon
  {
    variant: 'filled',
    icon: {
      name: 'quote',
      position: 'top'
    },
    children: 'Blockquote with top icon decoration.'
  },
  {
    variant: 'filled',
    icon: {
      name: 'quote',
      position: 'left'
    },
    children: 'Blockquote with left icon decoration.'
  },

  // With citation
  {
    variant: 'filled',
    citation: {
      author: 'John Doe',
      source: 'Design Systems Weekly',
      date: '2024'
    },
    children: 'Blockquote with full citation details.'
  },

  // Responsive variant
  {
    variant: 'filled',
    responsive: {
      size: {
        base: 'small',
        md: 'medium',
        lg: 'large'
      },
      align: {
        base: 'left',
        md: 'center'
      }
    },
    children: 'Responsive blockquote that adapts to screen size.'
  },

  // Full featured
  {
    size: 'large',
    variant: 'filled',
    status: 'info',
    align: 'left',
    icon: {
      name: 'quote',
      position: 'left'
    },
    citation: {
      author: 'Jane Smith',
      source: 'Design Systems Handbook',
      date: '2024',
      link: {
        href: 'https://example.com',
        external: true
      }
    },
    responsive: {
      size: {
        base: 'small',
        lg: 'large'
      }
    },
    bordered: true,
    elevated: true,
    children: 'A comprehensive blockquote showcasing all available features including responsive behavior, icon decoration, citation, and visual enhancements.'
  }
] as const; 