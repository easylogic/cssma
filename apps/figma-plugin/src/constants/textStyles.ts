import { TextSizeConfig, TextStyle, TextStyles, TextVariantProps } from '../types/text';

export const TEXT_SIZES: TextSizeConfig = {
  '2xs': {
    fontSize: 'text/body/2xs',
    lineHeight: 'text/lineHeight/2xs',
    letterSpacing: '-0.01em',
    paragraphSpacing: '0.5em'
  },
  'xs': {
    fontSize: 'text/body/xs',
    lineHeight: 'text/lineHeight/xs',
    letterSpacing: '-0.01em',
    paragraphSpacing: '0.5em'
  },
  'sm': {
    fontSize: 'text/body/sm',
    lineHeight: 'text/lineHeight/sm',
    letterSpacing: '-0.01em',
    paragraphSpacing: '0.75em'
  },
  'md': {
    fontSize: 'text/body/md',
    lineHeight: 'text/lineHeight/md',
    letterSpacing: '-0.01em',
    paragraphSpacing: '0.75em'
  },
  'lg': {
    fontSize: 'text/body/lg',
    lineHeight: 'text/lineHeight/lg',
    letterSpacing: '-0.01em',
    paragraphSpacing: '1em'
  },
  'xl': {
    fontSize: 'text/heading/sm',
    lineHeight: 'text/lineHeight/xl',
    letterSpacing: '-0.02em',
    paragraphSpacing: '1em'
  },
  '2xl': {
    fontSize: 'text/heading/md',
    lineHeight: 'text/lineHeight/2xl',
    letterSpacing: '-0.02em',
    paragraphSpacing: '1.25em'
  },
  '3xl': {
    fontSize: 'text/heading/lg',
    lineHeight: 'text/lineHeight/3xl',
    letterSpacing: '-0.02em',
    paragraphSpacing: '1.25em'
  },
  '4xl': {
    fontSize: 'text/heading/xl',
    lineHeight: 'text/lineHeight/4xl',
    letterSpacing: '-0.02em',
    paragraphSpacing: '1.5em'
  }
} as const;

const baseColorStyle = {
  default: 'text/color/default',
  success: 'status/success/default',
  error: 'status/error/default',
  warning: 'status/warning/default',
  info: 'status/info/default',
  muted: 'text/color/secondary'
};

const baseDecorationStyle = {
  color: 'text/color/default',
  style: 'solid' as const,
  thickness: '1px',
  offset: '0.1em'
};

const baseSelectionStyle = {
  background: 'surface/color/hover',
  color: 'text/color/default'
};

const baseTextStyle: TextStyle = {
  color: baseColorStyle,
  background: {
    default: 'surface/color/transparent',
    success: 'status/success/ghost/hover',
    error: 'status/error/ghost/hover',
    warning: 'status/warning/ghost/hover',
    info: 'status/info/ghost/hover',
    muted: 'surface/color/disabled'
  },
  decoration: baseDecorationStyle,
  selection: baseSelectionStyle,
  transition: {
    duration: '150ms',
    timing: 'ease-in-out',
    properties: ['color', 'background', 'text-decoration']
  }
};

export const TEXT_STYLES: TextStyles = {
  body: {
    ...baseTextStyle,
    color: {
      ...baseTextStyle.color,
      default: 'text/color/default'
    }
  },
  heading: {
    ...baseTextStyle,
    color: {
      ...baseTextStyle.color,
      default: 'text/color/default'
    }
  },
  display: {
    ...baseTextStyle,
    color: {
      ...baseTextStyle.color,
      default: 'text/color/default'
    }
  },
  code: {
    ...baseTextStyle,
    color: {
      ...baseTextStyle.color,
      default: 'text/color/default'
    },
    background: {
      ...baseTextStyle.background!,
      default: 'surface/color/default'
    }
  },
  quote: {
    ...baseTextStyle,
    color: {
      ...baseTextStyle.color,
      default: 'text/color/secondary'
    }
  }
} as const;

export const TEXT_VARIANTS: TextVariantProps[] = [
  // Size variants
  {
    size: 'sm',
    variant: 'body',
    children: 'Small text'
  },
  {
    size: 'md',
    variant: 'body',
    children: 'Medium text'
  },
  {
    size: 'lg',
    variant: 'body',
    children: 'Large text'
  },

  // Variant styles
  {
    variant: 'body',
    children: 'Body text'
  },
  {
    variant: 'heading',
    size: '2xl',
    children: 'Heading text'
  },
  {
    variant: 'display',
    size: '4xl',
    children: 'Display text'
  },
  {
    variant: 'code',
    children: 'Code text'
  },
  {
    variant: 'quote',
    children: 'Quote text'
  },

  // Weight variants
  {
    variant: 'body',
    weight: 'regular',
    children: 'Regular weight'
  },
  {
    variant: 'body',
    weight: 'medium',
    children: 'Medium weight'
  },
  {
    variant: 'body',
    weight: 'semibold',
    children: 'Semibold weight'
  },
  {
    variant: 'body',
    weight: 'bold',
    children: 'Bold weight'
  },

  // Alignment variants
  {
    variant: 'body',
    align: 'left',
    children: 'Left aligned text'
  },
  {
    variant: 'body',
    align: 'center',
    children: 'Center aligned text'
  },
  {
    variant: 'body',
    align: 'right',
    children: 'Right aligned text'
  },
  {
    variant: 'body',
    align: 'justify',
    children: 'Justified text that spans multiple lines to demonstrate the justification effect'
  },

  // Status variants
  {
    variant: 'body',
    status: 'default',
    children: 'Default status'
  },
  {
    variant: 'body',
    status: 'success',
    children: 'Success status'
  },
  {
    variant: 'body',
    status: 'error',
    children: 'Error status'
  },
  {
    variant: 'body',
    status: 'warning',
    children: 'Warning status'
  },
  {
    variant: 'body',
    status: 'info',
    children: 'Info status'
  },
  {
    variant: 'body',
    status: 'muted',
    children: 'Muted status'
  },

  // Decoration variants
  {
    variant: 'body',
    decoration: 'underline',
    children: 'Underlined text'
  },
  {
    variant: 'body',
    decoration: 'line-through',
    children: 'Strikethrough text'
  },

  // Transform variants
  {
    variant: 'body',
    transform: 'uppercase',
    children: 'Uppercase text'
  },
  {
    variant: 'body',
    transform: 'lowercase',
    children: 'Lowercase text'
  },
  {
    variant: 'body',
    transform: 'capitalize',
    children: 'Capitalized text'
  },

  // Truncate variants
  {
    variant: 'body',
    truncate: {
      enabled: true,
      lines: 2,
      overflow: 'ellipsis'
    },
    children: 'This is a long text that will be truncated after two lines with an ellipsis at the end to indicate there is more content.'
  },
  {
    variant: 'body',
    truncate: {
      enabled: true,
      lines: 3,
      overflow: 'fade',
      expandable: true,
      showExpand: true,
      expandText: 'Show more',
      collapseText: 'Show less'
    },
    children: 'This is an expandable text that fades out after three lines. Users can click to show more or less content as needed.'
  },

  // Highlight variant
  {
    variant: 'body',
    highlight: {
      query: 'highlight',
      color: 'text/color/default',
      background: 'status/warning/ghost/hover'
    },
    children: 'This text contains a highlighted word that matches the search query.'
  },

  // Link variant
  {
    variant: 'body',
    link: {
      href: 'https://example.com',
      external: true,
      underline: 'hover',
      color: 'status/info/default'
    },
    children: 'This is a link text that underlines on hover'
  },

  // Responsive variant
  {
    variant: 'body',
    responsive: {
      size: {
        base: 'sm',
        md: 'md',
        lg: 'lg'
      },
      align: {
        base: 'left',
        md: 'center'
      }
    },
    children: 'This text is responsive and changes size and alignment based on screen size'
  },

  // Full featured
  {
    variant: 'body',
    size: 'md',
    weight: 'medium',
    align: 'left',
    status: 'default',
    decoration: 'none',
    transform: 'none',
    truncate: {
      enabled: true,
      lines: 2,
      overflow: 'ellipsis',
      expandable: true
    },
    highlight: {
      query: 'featured',
      matchCase: false
    },
    responsive: {
      size: {
        base: 'sm',
        lg: 'md'
      }
    },
    selectable: true,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    children: 'This is a full featured text component that demonstrates various capabilities including truncation, highlighting, and responsive behavior.'
  }
] as const; 