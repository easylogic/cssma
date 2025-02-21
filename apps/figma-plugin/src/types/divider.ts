/**
 * Divider Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive divider component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type DividerSize = 'small' | 'medium' | 'large';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerTheme = 'default' | 'primary' | 'subtle';
export type DividerState = 'default' | 'hover' | 'pressed' | 'disabled';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type DividerSizeConfig = {
  [key in DividerSize]: {
    line: {
      thickness: string;
      spacing: string;
    };
    pattern: {
      dashLength?: string;
      dashGap?: string;
      dotSize?: string;
      dotGap?: string;
    };
    label: {
      fontSize: string;
      lineHeight: string;
      spacing: string;
    };
    icon: {
      size: string;
      spacing: string;
    };
    spacing: {
      content: string;  // 라벨/아이콘과 라인 사이 간격
      section: string;  // 섹션 간격
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface DividerStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface DividerLineStyle {
  color: DividerStateStyle;
  opacity: {
    default: string;
    subtle: string;
  };
}

export interface DividerLabelStyle {
  color: DividerStateStyle;
  background?: DividerStateStyle;
  opacity: {
    default: string;
    subtle: string;
  };
}

export interface DividerIconStyle {
  color: DividerStateStyle;
  opacity: {
    default: string;
    subtle: string;
  };
  transform?: {
    default: string;
    rotated: string;
  };
}

export interface DividerStyle {
  line: {
    solid: DividerLineStyle;
    dashed: DividerLineStyle;
    dotted: DividerLineStyle;
  };
  label: DividerLabelStyle;
  icon: DividerIconStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type DividerStyles = {
  [key in DividerTheme]: DividerStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface DividerIconProps {
  name: string;
  size?: number;
  color?: string;
  rotate?: number;
}

export interface DividerLabelProps {
  text: string;
  position?: 'start' | 'center' | 'end';
  alignment?: 'start' | 'center' | 'end';
  background?: boolean;
}

export interface DividerContentProps {
  spacing?: 'default' | 'compact' | 'loose';
  reverse?: boolean;  // 라벨과 아이콘의 순서를 반대로
}

export interface DividerAnimationProps {
  duration?: number;
  timing?: string;
  properties?: string[];
}

export interface DividerVariantProps {
  size?: DividerSize;
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  theme?: DividerTheme;
  state?: DividerState;
  icon?: DividerIconProps;
  label?: DividerLabelProps;
  content?: DividerContentProps;
  animation?: DividerAnimationProps;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface DividerInstance {
  theme: DividerTheme;
  state: DividerState;
  label?: DividerLabelProps;
  icon?: DividerIconProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateDividerOptions {
  variants?: DividerVariant[];
} 