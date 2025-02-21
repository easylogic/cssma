/**
 * SegmentGroup Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive segment group component set in Figma.
 * This type system supports:
 * - Multiple selection modes (single, multiple)
 * - Rich segment customization
 * - Flexible layout options
 * - Accessibility features
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type SegmentGroupSize = 'small' | 'medium' | 'large';
export type SegmentGroupVariant = 'filled' | 'outlined' | 'ghost';
export type SegmentGroupStatus = 'default' | 'success' | 'error' | 'warning';
export type SegmentGroupState = 'default' | 'hover' | 'pressed' | 'disabled';
export type SegmentGroupLayout = 'horizontal' | 'vertical' | 'wrap';
export type SegmentGroupAlign = 'start' | 'center' | 'end' | 'stretch';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type SegmentGroupSizeConfig = {
  [key in SegmentGroupSize]: {
    root: {
      minHeight: string;
      borderRadius: string;
      borderWidth: string;
    };
    segment: {
      minWidth: string;
      height: string;
      fontSize: string;
      lineHeight: string;
      borderRadius: string;
      borderWidth: string;
    };
    icon: {
      size: string;
      padding: string;
    };
    spacing: {
      segment: string;    // 세그먼트 간격
      icon: string;       // 아이콘과 텍스트 간격
      group: string;      // 그룹 간격
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

export interface SegmentGroupStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface SegmentStyle {
  background: SegmentGroupStateStyle;
  text: SegmentGroupStateStyle;
  icon: SegmentGroupStateStyle;
  border: SegmentGroupStateStyle;
  shadow?: SegmentGroupStateStyle;
}

export interface SegmentGroupStyle {
  root: {
    background: SegmentGroupStateStyle;
    border: SegmentGroupStateStyle;
    shadow?: SegmentGroupStateStyle;
  };
  segment: {
    default: SegmentStyle;
    selected: SegmentStyle;
    success: SegmentStyle;
    error: SegmentStyle;
    warning: SegmentStyle;
  };
  divider: {
    default: SegmentGroupStateStyle;
    vertical: SegmentGroupStateStyle;
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type SegmentGroupStyles = {
  [key in SegmentGroupVariant]: SegmentGroupStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface SegmentGroupIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface SegmentProps {
  id: string;
  label: string;
  value: string;
  icon?: SegmentGroupIconProps;
  disabled?: boolean;
  tooltip?: string;
  data?: any;
}

export interface SegmentGroupLayoutProps {
  type: SegmentGroupLayout;
  align?: SegmentGroupAlign;
  wrap?: boolean;
  reverse?: boolean;
  gap?: number | string;
}

export interface SegmentGroupSelectionProps {
  type: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  minSelect?: number;
  maxSelect?: number;
  allowDeselect?: boolean;
  preserveSelection?: boolean;
}

export interface SegmentGroupValidationProps {
  required?: boolean;
  validate?: (value: string | string[]) => boolean | string;
  validateSegment?: (value: string, selected: boolean) => boolean | string;
}

export interface SegmentGroupAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface SegmentGroupVariantProps {
  size?: SegmentGroupSize;
  variant?: SegmentGroupVariant;
  status?: SegmentGroupStatus;
  state?: SegmentGroupState;
  segments: SegmentProps[];
  layout?: SegmentGroupLayoutProps;
  selection?: SegmentGroupSelectionProps;
  validation?: SegmentGroupValidationProps;
  animation?: SegmentGroupAnimationProps;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
  onSegmentClick?: (value: string, selected: boolean) => void;
  ariaLabel?: string;
  role?: string;
}

export interface SegmentGroupInstance {
  value: string | string[];
  status: SegmentGroupStatus;
  state: SegmentGroupState;
  validation?: SegmentGroupValidationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateSegmentGroupOptions {
  variants?: SegmentGroupVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface SegmentGroupRef {
  focus: (value?: string) => void;
  blur: () => void;
  select: (value: string | string[]) => void;
  deselect: (value?: string) => void;
  getValue: () => string | string[];
  validate: () => boolean;
}

export interface SegmentGroupContextValue {
  size: SegmentGroupSize;
  variant: SegmentGroupVariant;
  status: SegmentGroupStatus;
  state: SegmentGroupState;
  layout: SegmentGroupLayout;
  disabled: boolean;
  selection?: SegmentGroupSelectionProps;
  validation?: SegmentGroupValidationProps;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface SegmentGroupChangeEvent {
  value: string | string[];
  previousValue: string | string[];
  source: 'click' | 'keyboard' | 'api';
}

export interface SegmentGroupValidateEvent {
  value: string | string[];
  valid: boolean;
  errors?: string[];
}

export interface SegmentGroupKeyboardEvent {
  key: string;
  value: string;
  selected: boolean;
  direction?: 'next' | 'prev' | 'first' | 'last';
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface SegmentGroupComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface SegmentGroupExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 