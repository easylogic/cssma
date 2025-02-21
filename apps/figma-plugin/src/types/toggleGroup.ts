/**
 * ToggleGroup Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive toggle group component set in Figma.
 * This type system supports:
 * - Multiple selection modes (single, multiple)
 * - Rich layout options
 * - Flexible content structure
 * - Accessibility features
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ToggleGroupSize = 'small' | 'medium' | 'large';
export type ToggleGroupVariant = 'filled' | 'outlined' | 'ghost';
export type ToggleGroupStatus = 'default' | 'success' | 'error' | 'warning';
export type ToggleGroupState = 'default' | 'hover' | 'pressed' | 'disabled';
export type ToggleGroupLayout = 'horizontal' | 'vertical' | 'grid';
export type ToggleGroupAlign = 'start' | 'center' | 'end' | 'stretch';
export type ToggleGroupSelectionMode = 'single' | 'multiple';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ToggleGroupSizeConfig = {
  [key in ToggleGroupSize]: {
    root: {
      minWidth: string;
      minHeight: string;
      borderRadius: string;
      borderWidth: string;
    };
    spacing: {
      item: string;      // 아이템 간격
      row: string;       // 행 간격 (그리드 레이아웃)
      column: string;    // 열 간격 (그리드 레이아웃)
      section: string;   // 섹션 간격
    };
    padding: {
      x: string;
      y: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ToggleGroupStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface ToggleGroupContainerStyle {
  background: ToggleGroupStateStyle;
  border: ToggleGroupStateStyle;
  shadow?: ToggleGroupStateStyle;
}

export interface ToggleGroupDividerStyle {
  color: ToggleGroupStateStyle;
  width: string;
  spacing: string;
}

export interface ToggleGroupStyle {
  root: {
    background: ToggleGroupStateStyle;
    border: ToggleGroupStateStyle;
    shadow?: ToggleGroupStateStyle;
  };
  container: {
    default: ToggleGroupContainerStyle;
    success: ToggleGroupContainerStyle;
    error: ToggleGroupContainerStyle;
    warning: ToggleGroupContainerStyle;
  };
  divider: {
    horizontal: ToggleGroupDividerStyle;
    vertical: ToggleGroupDividerStyle;
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type ToggleGroupStyles = {
  [key in ToggleGroupVariant]: ToggleGroupStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ToggleGroupItem {
  id: string;
  label?: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  tooltip?: string;
}

export interface ToggleGroupSection {
  id: string;
  label?: string;
  items: ToggleGroupItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface ToggleGroupLayoutProps {
  type: ToggleGroupLayout;
  align?: ToggleGroupAlign;
  columns?: number;
  gap?: number | string;
  wrap?: boolean;
  reverse?: boolean;
}

export interface ToggleGroupSelectionProps {
  mode: ToggleGroupSelectionMode;
  defaultValue?: string | string[];
  value?: string | string[];
  minSelect?: number;
  maxSelect?: number;
  allowDeselect?: boolean;
  preserveSelection?: boolean;
}

export interface ToggleGroupValidationProps {
  required?: boolean;
  minSelected?: number;
  maxSelected?: number;
  validate?: (value: string | string[]) => boolean | string;
  validateItem?: (value: string, selected: boolean) => boolean | string;
}

export interface ToggleGroupAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface ToggleGroupVariantProps {
  size?: ToggleGroupSize;
  variant?: ToggleGroupVariant;
  status?: ToggleGroupStatus;
  state?: ToggleGroupState;
  items: (ToggleGroupItem | ToggleGroupSection)[];
  layout?: ToggleGroupLayoutProps;
  selection?: ToggleGroupSelectionProps;
  validation?: ToggleGroupValidationProps;
  animation?: ToggleGroupAnimationProps;
  showDivider?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: string | string[]) => void;
  onItemClick?: (value: string, selected: boolean) => void;
  ariaLabel?: string;
  role?: string;
}

export interface ToggleGroupInstance {
  value: string | string[];
  status: ToggleGroupStatus;
  state: ToggleGroupState;
  layout: ToggleGroupLayoutProps;
  selection: ToggleGroupSelectionProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateToggleGroupOptions {
  variants?: ToggleGroupVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface ToggleGroupRef {
  select: (value: string | string[]) => void;
  deselect: (value?: string) => void;
  getValue: () => string | string[];
  validate: () => boolean;
  expandSection: (id: string) => void;
  collapseSection: (id: string) => void;
}

export interface ToggleGroupContextValue {
  size: ToggleGroupSize;
  variant: ToggleGroupVariant;
  status: ToggleGroupStatus;
  state: ToggleGroupState;
  layout: ToggleGroupLayout;
  disabled: boolean;
  selection?: ToggleGroupSelectionProps;
  validation?: ToggleGroupValidationProps;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface ToggleGroupChangeEvent {
  value: string | string[];
  previousValue: string | string[];
  source: 'click' | 'keyboard' | 'api';
}

export interface ToggleGroupValidateEvent {
  value: string | string[];
  valid: boolean;
  errors?: string[];
}

export interface ToggleGroupKeyboardEvent {
  key: string;
  value: string;
  selected: boolean;
  direction?: 'next' | 'prev' | 'first' | 'last';
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface ToggleGroupComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface ToggleGroupExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 