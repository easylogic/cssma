import { DividerSizeConfig, DividerStyleConfig, DividerVariantProps } from '../types/divider';

export const DIVIDER_SIZES: DividerSizeConfig = {
  small: {
    thickness: "{token/size/height/xs}",
    spacing: "{semantic/spacing/element}",
    labelSpacing: "{semantic/spacing/element}",
    fontSize: "{semantic/typography/size/caption}",
    lineHeight: "{semantic/typography/lineHeight/caption}",
    dashLength: "{token/spacing/4}",
    dashGap: "{token/spacing/4}",
    dotSize: "{token/spacing/2}",
    dotGap: "{token/spacing/2}"
  },
  medium: {
    thickness: "{token/size/height/sm}",
    spacing: "{semantic/spacing/content}",
    labelSpacing: "{semantic/spacing/element}",
    fontSize: "{semantic/typography/size/body}",
    lineHeight: "{semantic/typography/lineHeight/body}",
    dashLength: "{token/spacing/6}",
    dashGap: "{token/spacing/6}",
    dotSize: "{token/spacing/3}",
    dotGap: "{token/spacing/3}"
  },
  large: {
    thickness: "{token/size/height/md}",
    spacing: "{semantic/spacing/section}",
    labelSpacing: "{semantic/spacing/content}",
    fontSize: "{semantic/typography/size/title}",
    lineHeight: "{semantic/typography/lineHeight/title}",
    dashLength: "{token/spacing/8}",
    dashGap: "{token/spacing/8}",
    dotSize: "{token/spacing/4}",
    dotGap: "{token/spacing/4}"
  }
} as const;

export const DIVIDER_STYLES: DividerStyleConfig = {
  default: {
    line: {
      solid: {
        default: 'semantic/border/default',
        subtle: 'semantic/border/subtle'
      },
      dashed: {
        default: 'semantic/border/default',
        subtle: 'semantic/border/subtle'
      },
      dotted: {
        default: 'semantic/border/default',
        subtle: 'semantic/border/subtle'
      }
    },
    text: {
      default: 'semantic/text/default',
      muted: 'semantic/text/muted'
    }
  },
  primary: {
    line: {
      solid: {
        default: 'semantic/action/primary/default',
        subtle: 'semantic/action/primary/subtle'
      },
      dashed: {
        default: 'semantic/action/primary/default',
        subtle: 'semantic/action/primary/subtle'
      },
      dotted: {
        default: 'semantic/action/primary/default',
        subtle: 'semantic/action/primary/subtle'
      }
    },
    text: {
      default: 'semantic/action/primary/default',
      muted: 'semantic/action/primary/subtle'
    }
  },
  subtle: {
    line: {
      solid: {
        default: 'semantic/border/subtle',
        subtle: 'semantic/border/muted'
      },
      dashed: {
        default: 'semantic/border/subtle',
        subtle: 'semantic/border/muted'
      },
      dotted: {
        default: 'semantic/border/subtle',
        subtle: 'semantic/border/muted'
      }
    },
    text: {
      default: 'semantic/text/muted',
      muted: 'semantic/text/disabled'
    }
  }
} as const;

export const DIVIDER_VARIANTS: DividerVariantProps[] = [
  // Basic variants - Horizontal
  { orientation: 'horizontal', variant: 'solid', size: 'small', theme: 'default' },
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default' },
  { orientation: 'horizontal', variant: 'solid', size: 'large', theme: 'default' },

  // Basic variants - Vertical
  { orientation: 'vertical', variant: 'solid', size: 'small', theme: 'default' },
  { orientation: 'vertical', variant: 'solid', size: 'medium', theme: 'default' },
  { orientation: 'vertical', variant: 'solid', size: 'large', theme: 'default' },

  // Line style variants
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default' },
  { orientation: 'horizontal', variant: 'dashed', size: 'medium', theme: 'default' },
  { orientation: 'horizontal', variant: 'dotted', size: 'medium', theme: 'default' },

  // Theme variants
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default' },
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'primary' },
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'subtle' },

  // Label position variants
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default', hasLabel: true, label: 'Start', labelPosition: 'start' },
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default', hasLabel: true, label: 'Center', labelPosition: 'center' },
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default', hasLabel: true, label: 'End', labelPosition: 'end' },

  // Label alignment variants
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default', hasLabel: true, label: 'Left', labelAlignment: 'start' },
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default', hasLabel: true, label: 'Center', labelAlignment: 'center' },
  { orientation: 'horizontal', variant: 'solid', size: 'medium', theme: 'default', hasLabel: true, label: 'Right', labelAlignment: 'end' },

  // Complex combinations
  { 
    orientation: 'horizontal',
    variant: 'dashed',
    size: 'large',
    theme: 'primary',
    hasLabel: true,
    label: 'Section Divider',
    labelPosition: 'center',
    labelAlignment: 'center'
  },
  { 
    orientation: 'horizontal',
    variant: 'dotted',
    size: 'medium',
    theme: 'subtle',
    hasLabel: true,
    label: 'OR',
    labelPosition: 'center',
    labelAlignment: 'center'
  }
] as const; 