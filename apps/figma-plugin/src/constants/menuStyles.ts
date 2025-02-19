import { MenuSizeConfig, MenuStyle, MenuStyles, MenuVariantProps } from '../types/menu';

/**
 * Size configuration for menu components.
 * All values reference design tokens from the design system.
 */
export const MENU_SIZES: MenuSizeConfig = {
  small: {
    // Container dimensions
    minWidth: 'menu/container/small/minWidth',
    maxWidth: 'menu/container/small/maxWidth',
    indent: 'menu/item/indent',
    shortcutGap: 'menu/item/shortcut/gap',
    groupHeaderGap: 'menu/group/header/gap',
    
    // Item dimensions
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    
    // Icons and indicators
    iconSize: 'component/base/icon/sm',
    indicatorSize: 'component/base/icon/sm',
    arrowSize: 'component/base/icon/sm',
    
    // Spacing
    padding: 'component/base/padding/sm',
    itemGap: 'component/base/gap/xs',
    groupGap: 'component/base/gap/sm',
    iconGap: 'component/base/gap/sm',
    
    // Borders and radius
    borderWidth: 'component/base/border/width/thin',
    borderRadius: 'component/base/radius/sm'
  },
  medium: {
    minWidth: 'menu/container/medium/minWidth',
    maxWidth: 'menu/container/medium/maxWidth',
    indent: 'menu/item/indent',
    shortcutGap: 'menu/item/shortcut/gap',
    groupHeaderGap: 'menu/group/header/gap',

    height: 'component/base/height/sm',
    fontSize: 'text/body/md',
    lineHeight: 'text/body/md',
    iconSize: 'component/base/icon/md',
    indicatorSize: 'component/base/icon/md',
    arrowSize: 'component/base/icon/md',
    padding: 'component/base/padding/md',
    itemGap: 'component/base/gap/sm',
    groupGap: 'component/base/gap/md',
    iconGap: 'component/base/gap/md',
    borderWidth: 'component/base/border/width/thin',
    borderRadius: 'component/base/radius/md'
  },
  large: {
    minWidth: 'menu/container/large/minWidth',
    maxWidth: 'menu/container/large/maxWidth',
    indent: 'menu/item/indent',
    shortcutGap: 'menu/item/shortcut/gap',
    groupHeaderGap: 'menu/group/header/gap',

    height: 'component/base/height/md',
    fontSize: 'text/body/lg',
    lineHeight: 'text/body/lg',
    iconSize: 'component/base/icon/lg',
    indicatorSize: 'component/base/icon/lg',
    arrowSize: 'component/base/icon/lg',
    padding: 'component/base/padding/lg',
    itemGap: 'component/base/gap/md',
    groupGap: 'component/base/gap/lg',
    iconGap: 'component/base/gap/lg',
    borderWidth: 'component/base/border/width/thin',
    borderRadius: 'component/base/radius/lg'
  }
} as const;

/**
 * Style configuration for menu components.
 * All values reference semantic color tokens.
 */
export const MENU_STYLES: MenuStyles = {
  'default-filled': {
    container: {
      fill: 'surface/color/default',
      stroke: 'surface/color/default',
      shadow: 'component/base/shadow/sm'
    },
    item: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled',
        active: 'surface/color/selected'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled',
        active: 'text/color/default'
      },
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled',
        active: 'text/color/default'
      },
      indicator: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled',
        active: 'status/success/default'
      }
    },
    group: {
      title: 'text/color/secondary',
      background: 'surface/color/subtle'
    },
    divider: 'surface/color/divider'
  },
  'default-outlined': {
    container: {
      fill: 'surface/color/white',
      stroke: 'surface/color/default',
      shadow: 'component/base/shadow/none'
    },
    item: {
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled',
        active: 'surface/color/selected'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        pressed: 'text/color/default',
        disabled: 'text/color/disabled',
        active: 'text/color/default'
      },
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled',
        active: 'text/color/default'
      },
      indicator: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        pressed: 'text/color/secondary',
        disabled: 'text/color/disabled',
        active: 'status/success/default'
      }
    },
    group: {
      title: 'text/color/secondary',
      background: 'surface/color/subtle'
    },
    divider: 'surface/color/divider'
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
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default' }
  },
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default' }
  },
  { 
    size: 'large',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default' }
  },

  // States for default items
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'hover' }
  },
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'pressed' }
  },
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'disabled' }
  },

  // Active items
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'active', state: 'default', indicator: true }
  },

  // Items with icons
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default', icon: true }
  },

  // Items with shortcuts
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default', shortcut: true }
  },

  // Submenu items
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default', submenu: true }
  },

  // Group variants
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default' },
    group: { title: true }
  },
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default' },
    group: { title: true, collapsed: true }
  },

  // Divider variants
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default' },
    divider: { spacing: 'default' }
  },
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    shape: 'rounded',
    item: { type: 'default', state: 'default' },
    divider: { spacing: 'compact' }
  }
] as const; 