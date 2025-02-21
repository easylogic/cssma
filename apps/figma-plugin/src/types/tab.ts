/**
 * Tab Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive tab component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type TabSize = 'small' | 'medium' | 'large';
export type TabVariant = 'line' | 'card' | 'segment';
export type TabState = 'default' | 'hover' | 'pressed' | 'disabled';
export type TabPlacement = 'top' | 'right' | 'bottom' | 'left';
export type TabAlign = 'start' | 'center' | 'end';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type TabSizeConfig = {
  [key in TabSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      item: string;      // 탭 아이템 간격
      icon: string;      // 아이콘과 텍스트 간격
      content: string;   // 탭과 콘텐츠 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    borderRadius: string;
    borderWidth: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface TabStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface TabCloseButtonStyle {
  background: TabStateStyle;
  icon: TabStateStyle;
  border: TabStateStyle;
}

export interface TabItemStyle {
  background: TabStateStyle;
  text: TabStateStyle;
  icon: TabStateStyle;
  indicator: TabStateStyle;
  border: TabStateStyle;
  closeButton?: TabCloseButtonStyle;
}

export interface TabTransitionStyle {
  duration: string;
  timing: string;
  delay?: string;
}

export interface TabStyle {
  root: {
    background: TabStateStyle;
    border: TabStateStyle;
    shadow?: TabStateStyle;
  };
  list: {
    background: TabStateStyle;
    border: TabStateStyle;
    divider: TabStateStyle;
    shadow?: TabStateStyle;
  };
  item: {
    default: TabItemStyle;   // 기본 탭
    active: TabItemStyle;    // 활성화된 탭
    disabled: TabItemStyle;  // 비활성화된 탭
  };
  panel: {
    background: TabStateStyle;
    border: TabStateStyle;
    shadow?: TabStateStyle;
  };
  extra: {
    text: TabStateStyle;
    icon: TabStateStyle;
    divider?: TabStateStyle;
  };
  transition?: {
    item?: TabTransitionStyle;
    panel?: TabTransitionStyle;
    indicator?: TabTransitionStyle;
  };
}

export type TabStyles = {
  [key in TabVariant]: TabStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface TabIconProps {
  name: string;
  size?: number;
}

export interface TabItemProps {
  key: string;
  label: string;
  icon?: TabIconProps;
  disabled?: boolean;
  closable?: boolean;
  content?: string;
}

export interface TabListProps {
  placement?: TabPlacement;
  align?: TabAlign;
  extraContent?: string;
}

export interface TabPanelProps {
  animated?: boolean;
  destroyInactivePanel?: boolean;
}

export interface TabVariantProps {
  size?: TabSize;
  variant?: TabVariant;
  items: TabItemProps[];
  defaultActiveKey?: string;
  activeKey?: string;
  list?: TabListProps;
  panel?: TabPanelProps;
  onChange?: (key: string) => void;
  onTabClose?: (key: string) => void;
  ariaLabel?: string;
  role?: string;
}

export interface TabInstance {
  items: TabItemProps[];
  activeKey: string;
  list?: TabListProps;
  panel?: TabPanelProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateTabOptions {
  variants?: TabVariant[];
} 