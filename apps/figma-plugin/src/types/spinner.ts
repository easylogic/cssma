/**
 * Spinner Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive spinner component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'circle' | 'dots' | 'bars' | 'grid' | 'rings';
export type SpinnerStatus = 'default' | 'primary' | 'success' | 'error' | 'warning';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type SpinnerSizeConfig = {
  [key in SpinnerSize]: {
    size: string;
    thickness: string;
    gap: string;
    count: {
      dots: number;
      bars: number;
      grid: number;
      rings: number;
    };
    item: {
      size: string;
      gap: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface SpinnerColorStyle {
  default: string;
  primary: string;
  success: string;
  error: string;
  warning: string;
}

export interface SpinnerStyle {
  root: {
    color: SpinnerColorStyle;
    opacity: {
      active: string;
      inactive: string;
    };
  };
  track: {
    color: SpinnerColorStyle;
    opacity: string;
  };
  animation: {
    circle: {
      duration: string;
      timing: string;
      iterations: number;
    };
    dots: {
      duration: string;
      timing: string;
      delay: string;
      iterations: number;
    };
    bars: {
      duration: string;
      timing: string;
      delay: string;
      iterations: number;
    };
    grid: {
      duration: string;
      timing: string;
      delay: string;
      iterations: number;
    };
    rings: {
      duration: string;
      timing: string;
      delay: string;
      iterations: number;
    };
  };
}

export type SpinnerStyles = {
  [key in SpinnerVariant]: SpinnerStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface SpinnerAnimationProps {
  duration?: number;
  delay?: number;
  timing?: string;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export interface SpinnerTrackProps {
  visible?: boolean;
  thickness?: string | number;
  opacity?: number;
}

export interface SpinnerLabelProps {
  text?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  spacing?: string | number;
}

export interface SpinnerProgressProps {
  value?: number;
  min?: number;
  max?: number;
  showValue?: boolean;
  format?: (value: number) => string;
}

export interface SpinnerVariantProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  status?: SpinnerStatus;
  animation?: SpinnerAnimationProps;
  track?: SpinnerTrackProps;
  label?: SpinnerLabelProps;
  progress?: SpinnerProgressProps;
  thickness?: string | number;
  speed?: number;
  reverse?: boolean;
  color?: string;
  secondaryColor?: string;
  ariaLabel?: string;
  role?: string;
}

// --------------------------------------------------------
// Component Instance
// --------------------------------------------------------

export interface SpinnerInstance {
  variant: SpinnerVariant;
  status: SpinnerStatus;
  progress?: number;
  isAnimating: boolean;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateSpinnerOptions {
  variants?: SpinnerVariant[];
}

// --------------------------------------------------------
// Component Reference
// --------------------------------------------------------

export interface SpinnerRef {
  start: () => void;
  stop: () => void;
  setProgress: (value: number) => void;
  getProgress: () => number;
  isAnimating: () => boolean;
}

// --------------------------------------------------------
// Component Context
// --------------------------------------------------------

export interface SpinnerContextValue {
  size: SpinnerSize;
  variant: SpinnerVariant;
  status: SpinnerStatus;
  progress?: number;
  isAnimating: boolean;
}

// --------------------------------------------------------
// Component Events
// --------------------------------------------------------

export interface SpinnerProgressEvent {
  value: number;
  normalized: number;
  source: 'api' | 'user';
}

export interface SpinnerAnimationEvent {
  state: 'start' | 'stop' | 'complete';
  iteration: number;
}

// --------------------------------------------------------
// Component DOM
// --------------------------------------------------------

export interface SpinnerComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface SpinnerExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 