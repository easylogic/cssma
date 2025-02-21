/**
 * Sidebar Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive sidebar component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type SidebarSize = 'small' | 'medium' | 'large' | 'custom';
export type SidebarVariant = 'filled' | 'outlined' | 'ghost';
export type SidebarStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type SidebarState = 'default' | 'hover' | 'pressed' | 'disabled';
export type SidebarPlacement = 'left' | 'right';
export type SidebarMode = 'expanded' | 'collapsed' | 'overlay';
export type SidebarTrigger = 'click' | 'hover' | 'manual';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type SidebarSizeConfig = {
  [key in SidebarSize]: {
    root: {
      width: {
        expanded: string;
        collapsed: string;
      };
      minWidth: string;
      maxWidth: string;
      borderRadius: string;
      borderWidth: string;
    };
    header: {
      height: string;
      fontSize: string;
      lineHeight: string;
      iconSize: string;
      spacing: string;
    };
    content: {
      fontSize: string;
      lineHeight: string;
      iconSize: string;
      spacing: {
        item: string;      // 아이템 간격
        icon: string;      // 아이콘과 텍스트 간격
        indent: string;    // 중첩 메뉴 들여쓰기
        section: string;   // 섹션 간격
      };
    };
    footer: {
      height: string;
      fontSize: string;
      lineHeight: string;
      iconSize: string;
      spacing: string;
    };
    padding: {
      header: {
        x: string;
        y: string;
      };
      content: {
        x: string;
        y: string;
      };
      footer: {
        x: string;
        y: string;
      };
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface SidebarStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface SidebarSectionStyle {
  background: SidebarStateStyle;
  text: SidebarStateStyle;
  icon: SidebarStateStyle;
  border: SidebarStateStyle;
  shadow?: SidebarStateStyle;
}

export interface SidebarItemStyle {
  background: {
    default: SidebarStateStyle;
    active: SidebarStateStyle;
    selected: SidebarStateStyle;
  };
  text: {
    default: SidebarStateStyle;
    active: SidebarStateStyle;
    selected: SidebarStateStyle;
  };
  icon: {
    default: SidebarStateStyle;
    active: SidebarStateStyle;
    selected: SidebarStateStyle;
  };
  indicator: {
    default: SidebarStateStyle;
    active: SidebarStateStyle;
    selected: SidebarStateStyle;
  };
  badge: {
    background: SidebarStateStyle;
    text: SidebarStateStyle;
  };
}

export interface SidebarStyle {
  root: {
    background: SidebarStateStyle;
    border: SidebarStateStyle;
    shadow: SidebarStateStyle;
  };
  header: SidebarSectionStyle;
  content: {
    background: SidebarStateStyle;
    item: SidebarItemStyle;
    divider: SidebarStateStyle;
  };
  footer: SidebarSectionStyle;
  overlay: {
    background: SidebarStateStyle;
    blur?: {
      enabled: boolean;
      amount: string;
    };
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type SidebarStyles = {
  [key in SidebarVariant]: {
    [key in SidebarStatus]: SidebarStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface SidebarIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface SidebarBadgeProps {
  content: string | number;
  status?: SidebarStatus;
  max?: number;
  dot?: boolean;
}

export interface SidebarItemProps {
  id: string;
  label: string;
  icon?: SidebarIconProps;
  badge?: SidebarBadgeProps;
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
  items?: SidebarItemProps[];
  onClick?: () => void;
}

export interface SidebarHeaderProps {
  title?: string;
  icon?: SidebarIconProps;
  action?: {
    icon: SidebarIconProps;
    onClick: () => void;
  };
}

export interface SidebarFooterProps {
  content?: string;
  icon?: SidebarIconProps;
  action?: {
    icon: SidebarIconProps;
    onClick: () => void;
  };
}

export interface SidebarResizeProps {
  enabled?: boolean;
  minWidth?: number;
  maxWidth?: number;
  handles?: ('left' | 'right')[];
  preserveWidth?: boolean;
}

export interface SidebarCollapseProps {
  enabled?: boolean;
  defaultCollapsed?: boolean;
  collapseWidth?: number;
  expandWidth?: number;
  showTooltip?: boolean;
  tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom';
}

export interface SidebarOverlayProps {
  enabled?: boolean;
  backdrop?: boolean;
  closeOnClick?: boolean;
  closeOnEsc?: boolean;
  preventScroll?: boolean;
}

export interface SidebarAnimationProps {
  enabled?: boolean;
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface SidebarVariantProps {
  size?: SidebarSize;
  variant?: SidebarVariant;
  status?: SidebarStatus;
  state?: SidebarState;
  placement?: SidebarPlacement;
  mode?: SidebarMode;
  trigger?: SidebarTrigger;
  header?: SidebarHeaderProps;
  items: SidebarItemProps[];
  footer?: SidebarFooterProps;
  resize?: SidebarResizeProps;
  collapse?: SidebarCollapseProps;
  overlay?: SidebarOverlayProps;
  animation?: SidebarAnimationProps;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  elevated?: boolean;
  bordered?: boolean;
  showDivider?: boolean;
  disabled?: boolean;
  onResize?: (width: number) => void;
  onCollapse?: (collapsed: boolean) => void;
  onSelect?: (itemId: string) => void;
  ariaLabel?: string;
  role?: string;
}

// --------------------------------------------------------
// Component Instance
// --------------------------------------------------------

export interface SidebarInstance {
  mode: SidebarMode;
  status: SidebarStatus;
  state: SidebarState;
  width: number;
  selectedItemId?: string;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateSidebarOptions {
  variants?: SidebarVariant[];
}

// --------------------------------------------------------
// Component Reference
// --------------------------------------------------------

export interface SidebarRef {
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  setWidth: (width: number) => void;
  getWidth: () => number;
  selectItem: (itemId: string) => void;
  getSelectedItem: () => string | undefined;
}

// --------------------------------------------------------
// Component Context
// --------------------------------------------------------

export interface SidebarContextValue {
  size: SidebarSize;
  variant: SidebarVariant;
  status: SidebarStatus;
  state: SidebarState;
  mode: SidebarMode;
  placement: SidebarPlacement;
  disabled: boolean;
  collapse?: SidebarCollapseProps;
}

// --------------------------------------------------------
// Component Events
// --------------------------------------------------------

export interface SidebarResizeEvent {
  width: number;
  source: 'drag' | 'api';
}

export interface SidebarCollapseEvent {
  collapsed: boolean;
  source: 'trigger' | 'resize' | 'api';
}

export interface SidebarSelectEvent {
  itemId: string;
  item: SidebarItemProps;
  source: 'click' | 'keyboard' | 'api';
}

// --------------------------------------------------------
// Component DOM
// --------------------------------------------------------

export interface SidebarComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface SidebarExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 