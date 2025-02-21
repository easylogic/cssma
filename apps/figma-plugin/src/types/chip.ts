/**
 * Chip Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive chip component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ChipSize = 'small' | 'medium' | 'large';
export type ChipVariant = 'filled' | 'outlined' | 'ghost';
export type ChipStatus = 'default' | 'primary' | 'success' | 'error' | 'warning';
export type ChipState = 'default' | 'hover' | 'pressed' | 'disabled' | 'selected';
export type ChipShape = 'rounded' | 'circular' | 'square';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ChipSizeConfig = {
  [key in ChipSize]: {
    height: string;
    minWidth: string;
    maxWidth: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      content: string;  // 아이콘/텍스트 간격
      group: string;    // 칩 그룹 간격
    };
    padding: {
      horizontal: string;
      vertical: string;
    };
    borderRadius: {
      rounded: string;
      circular: string;
      square: string;
    };
    borderWidth: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ChipStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
  selected: string;
}

export interface ChipContentStyle {
  background: ChipStateStyle;
  text: ChipStateStyle;
  icon: ChipStateStyle;
  border: ChipStateStyle;
  shadow?: ChipStateStyle;
}

export interface ChipStyle {
  root: {
    background: ChipStateStyle;
    border: ChipStateStyle;
    shadow?: ChipStateStyle;
  };
  content: {
    default: ChipContentStyle;   // 기본 상태
    selected: ChipContentStyle;  // 선택된 상태
  };
  remove: {
    background: ChipStateStyle;
    icon: ChipStateStyle;
    border: ChipStateStyle;
  };
  group: {
    spacing: {
      default: string;
      compact: string;
      loose: string;
    };
    wrap: {
      enabled: boolean;
      spacing: string;
    };
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type ChipStyles = {
  [key in ChipVariant]: {
    [key in ChipStatus]: ChipStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ChipIconProps {
  name: string;
  size?: number;
  color?: string;
  position?: 'start' | 'end';
}

export interface ChipRemoveProps {
  icon?: ChipIconProps;
  tooltip?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

export interface ChipGroupProps {
  spacing?: 'default' | 'compact' | 'loose';
  wrap?: boolean;
  wrapSpacing?: string;
  maxItems?: number;
  overflow?: 'hidden' | 'scroll' | 'ellipsis';
  direction?: 'horizontal' | 'vertical';
}

export interface ChipAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface ChipValidationProps {
  required?: boolean;
  minSelected?: number;
  maxSelected?: number;
  customValidation?: (value: string) => boolean | string;
}

export interface ChipVariantProps {
  size?: ChipSize;
  variant?: ChipVariant;
  status?: ChipStatus;
  state?: ChipState;
  shape?: ChipShape;
  icon?: ChipIconProps;
  label?: string;
  selected?: boolean;
  removable?: boolean;
  remove?: ChipRemoveProps;
  group?: ChipGroupProps;
  animation?: ChipAnimationProps;
  validation?: ChipValidationProps;
  interactive?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  ariaLabel?: string;
  role?: string;
}

// --------------------------------------------------------
// Component Instance
// --------------------------------------------------------

export interface ChipInstance {
  label: string;
  status: ChipStatus;
  state: ChipState;
  selected?: boolean;
  validation?: ChipValidationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateChipOptions {
  variants?: ChipVariant[];
}

// --------------------------------------------------------
// Component Reference
// --------------------------------------------------------

export interface ChipRef {
  select: () => void;
  deselect: () => void;
  toggle: () => void;
  remove: () => void;
  isSelected: () => boolean;
  validate: () => boolean;
}

// --------------------------------------------------------
// Component Context
// --------------------------------------------------------

export interface ChipContextValue {
  size: ChipSize;
  variant: ChipVariant;
  status: ChipStatus;
  state: ChipState;
  shape: ChipShape;
  selected: boolean;
  disabled: boolean;
  validation?: ChipValidationProps;
}

// --------------------------------------------------------
// Component Events
// --------------------------------------------------------

export interface ChipSelectEvent {
  selected: boolean;
  source: 'click' | 'keyboard' | 'api';
}

export interface ChipRemoveEvent {
  removed: boolean;
  source: 'click' | 'keyboard' | 'api';
}

export interface ChipValidateEvent {
  valid: boolean;
  error?: string;
}

// --------------------------------------------------------
// Component DOM
// --------------------------------------------------------

export interface ChipComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface ChipExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 