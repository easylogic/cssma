/**
 * Menu Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive menu component set in Figma.
 * This type system is designed to generate a complete set of menu components with:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 * - Proper constraints for responsive behavior
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

/** 
 * Basic menu types that will be exposed as component properties in Figma.
 * These will appear in the properties panel for each component instance.
 */
export type MenuSize = 'small' | 'medium' | 'large';
export type MenuVariant = 'filled' | 'outlined';
export type MenuStatus = 'default' | 'error' | 'success' | 'warning';
export type MenuShape = 'rounded' | 'square';

/** 
 * Menu item states and types that will be represented as component variants.
 * These combinations will create the variant matrix in the Figma assets panel.
 */
export type MenuItemType = 'default' | 'active' | 'disabled' | 'danger';
export type MenuItemState = 'default' | 'hover' | 'pressed' | 'disabled';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

/** 
 * Defines the complete sizing system for menu components.
 * All values should reference Figma variables from your design tokens.
 * The structure uses auto-layout properties for consistent spacing.
 */
export type MenuSizeConfig = {
  [key in MenuSize]: {
    // 컴포넌트 특화 값
    minWidth: string;
    maxWidth: string;
    indent: string;
    shortcutGap: string;
    groupHeaderGap: string;

    // 기본 크기
    height: string;
    fontSize: string;
    lineHeight: string;

    // 아이콘
    iconSize: string;
    indicatorSize: string;
    arrowSize: string;

    // 간격
    padding: string;
    itemGap: string;
    groupGap: string;
    iconGap: string;

    // 테두리
    borderWidth: string;
    borderRadius: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

/** 
 * Defines the visual style system for menu components.
 * All color values should reference Figma variables from your color tokens.
 * Styles are applied through component properties and variants.
 */
export interface MenuStyle {
  container: {
    fill: string;      // Background fill color
    stroke: string;    // Border stroke color
    shadow: string;    // Effect style reference
  };
  item: {
    background: {      // Fill colors for different states
      default: string;  // Normal state
      hover: string;    // Mouse hover
      pressed: string;  // Mouse pressed/active
      disabled: string; // Disabled state
      active: string;   // Selected/current state
    };
    text: {            // Text colors for different states
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      active: string;
    };
    icon: {            // Icon colors for different states
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      active: string;
    };
    indicator: {       // Indicator (checkmark/radio) colors
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      active: string;
    };
  };
  group: {
    title: string;     // Group header text color
    background: string; // Group container background
  };
  divider: string;     // Divider line color
}

/** Collection of style variants mapped to component variants */
export type MenuStyles = {
  [key: string]: MenuStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

/** 
 * Properties that will be exposed in Figma's properties panel.
 * These control the appearance and behavior of menu items.
 */
export interface MenuItemProps {
  type: MenuItemType;      // Visual style variant
  state: MenuItemState;    // Interactive state
  icon?: boolean;          // Show/hide icon placeholder
  indicator?: boolean;     // Show/hide selection indicator
  shortcut?: boolean;      // Show/hide shortcut text
  submenu?: boolean;       // Show/hide submenu arrow
}

/** 
 * Properties for group container components.
 * Controls the group header and collapse state.
 */
export interface MenuGroupProps {
  title: boolean;          // Show/hide group title
  collapsed?: boolean;     // Group expansion state
}

/** 
 * Properties for divider components.
 * Controls the spacing around separator lines.
 */
export interface MenuDividerProps {
  spacing: 'default' | 'compact' | 'loose';  // Divider padding variant
}

// --------------------------------------------------------
// Variant Configuration
// --------------------------------------------------------

/** 
 * Defines the complete set of properties that create a unique variant.
 * This will determine the total number of components in your Figma component set.
 */
export interface MenuVariantProps {
  size: MenuSize;          // Component size variant
  variant: MenuVariant;    // Visual style variant
  status: MenuStatus;      // Validation/state variant
  shape: MenuShape;        // Corner style variant
  item: MenuItemProps;     // Item-specific properties
  group?: MenuGroupProps;  // Optional group properties
  divider?: MenuDividerProps; // Optional divider properties
}

/** 
 * Complete matrix of all possible component variants.
 * This will be used to generate the full component set in Figma.
 * Each variant will be created as a separate component and combined
 * into a single component set with properties and variants.
 */
export const MENU_VARIANTS: MenuVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' } },
  { size: 'large', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' } },

  // Variant styles
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' } },
  { size: 'medium', variant: 'outlined', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' } },

  // Status variants
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' } },
  { size: 'medium', variant: 'filled', status: 'error', shape: 'rounded', item: { type: 'default', state: 'default' } },
  { size: 'medium', variant: 'filled', status: 'success', shape: 'rounded', item: { type: 'default', state: 'default' } },
  { size: 'medium', variant: 'filled', status: 'warning', shape: 'rounded', item: { type: 'default', state: 'default' } },

  // Item states
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'hover' } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'pressed' } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'disabled' } },

  // Item types
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default', icon: true } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'active', state: 'default', indicator: true } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'danger', state: 'default' } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default', submenu: true } },

  // With shortcuts
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default', shortcut: true } },

  // Group variants
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' }, group: { title: true } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' }, group: { title: true, collapsed: true } },

  // Divider variants
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' }, divider: { spacing: 'default' } },
  { size: 'medium', variant: 'filled', status: 'default', shape: 'rounded', item: { type: 'default', state: 'default' }, divider: { spacing: 'compact' } },
];

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

/** 
 * Options for creating the component set in Figma.
 * Controls the organization and documentation of the components.
 */
export interface CreateMenuOptions {
  name?: string;           // Component set name in Figma
  description?: string;    // Component documentation
  variants?: MenuVariantProps[]; // Variant matrix
}

/** 
 * Properties available on component instances.
 * These values can be accessed and modified in instances.
 */
export interface MenuInstance {
  variant: MenuVariantProps;  // Current variant configuration
  content: string;           // Menu content/text
} 