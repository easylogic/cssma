/**
 * Menu Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive menu component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type MenuSize = 'small' | 'medium' | 'large';
export type MenuVariant = 'filled' | 'outlined';
export type MenuStatus = 'default';
export type MenuState = 'default' | 'hover' | 'pressed' | 'disabled';

// MenuItem 관련 타입 재정의
export type MenuItemState = 'default' | 'active' | 'disabled';
export type MenuItemType = 'default' | 'danger';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type MenuSizeConfig = {
  [key in MenuSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      item: string;      // 아이템 간격
      icon: string;      // 아이콘과 텍스트 간격
      indent: string;    // 서브메뉴 들여쓰기
      shortcut: string;  // 단축키와 텍스트 간격
      group: string;     // 그룹 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    borderRadius: string;
    borderWidth: string;
    container: {
      minWidth: string;
      maxWidth: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface MenuStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface MenuItemStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  icon: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  shortcut: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  prefix: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  suffix: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  indicator: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export interface MenuStyle {
  root: {
    background: MenuStateStyle;
    border: MenuStateStyle;
    shadow: MenuStateStyle;
  };
  item: {
    default: MenuItemStyle;   // 기본 아이템
    active: MenuItemStyle;    // 활성화된 아이템
    danger: MenuItemStyle;    // 위험 아이템
    disabled: MenuItemStyle;  // 비활성화된 아이템
  };
  group: {
    header: {
      background: MenuStateStyle;
      text: MenuStateStyle;
      icon: MenuStateStyle;
    };
    divider: {
      line: MenuStateStyle;
      spacing: {
        default: string;
        compact: string;
        loose: string;
      };
    };
  };
  submenu: {
    arrow: MenuStateStyle;
    overlay: MenuStateStyle;
  };
}

export type MenuStyles = {
  [key in MenuStatus]: MenuStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface MenuIconProps {
  name: string;
  size?: number;
}

export interface MenuShortcutProps {
  text: string;
  icon?: MenuIconProps;
}

export interface MenuDividerProps {
  spacing?: 'default' | 'compact' | 'loose';
}

export interface MenuItemProps {
  key: string;
  type?: MenuItemType;      // 아이템의 종류 (default | danger)
  state?: MenuItemState;    // 아이템의 상태 (default | active | disabled)
  label: string;
  icon?: MenuIconProps;
  shortcut?: MenuShortcutProps;
  prefix?: MenuIconProps;
  suffix?: MenuIconProps;
  onClick?: () => void;
}

export interface MenuDividerItem {
  key: string;
  type: 'divider';
  divider: MenuDividerProps;
}

export interface MenuGroupProps {
  key: string;
  label: string;
  icon?: MenuIconProps;
  items: (MenuItemProps | MenuGroupProps | MenuDividerItem)[];
  divider?: MenuDividerProps;
  collapsed?: boolean;
}

export interface MenuSubmenuProps {
  items?: (MenuItemProps | MenuGroupProps | MenuDividerItem)[];
  placement?: 'right-start' | 'right-end' | 'left-start' | 'left-end';
  offset?: number;
  arrow?: boolean;
}

export interface MenuVariantProps {
  size?: MenuSize;
  variant?: MenuVariant;
  status?: MenuStatus;
  items: (MenuItemProps | MenuGroupProps | MenuDividerItem)[];
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  multiple?: boolean;
  submenu?: MenuSubmenuProps;
  ariaLabel?: string;
  role?: string;
}

export interface MenuInstance {
  items: (MenuItemProps | MenuGroupProps | MenuDividerItem)[];
  openKeys: string[];
  selectedKeys: string[];
  submenu?: MenuSubmenuProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateMenuOptions {
  variants?: MenuVariant[];
} 