/**
 * Skeleton Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive skeleton component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type SkeletonSize = 'small' | 'medium' | 'large';
export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'custom';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type SkeletonSizeConfig = {
  [key in SkeletonSize]: {
    text: {
      width: string;
      height: string;
      borderRadius: string;
      spacing: string;
      lines: {
        count: number;
        lastWidth: string;
      };
    };
    circular: {
      size: string;
      borderRadius: string;
    };
    rectangular: {
      width: string;
      height: string;
      borderRadius: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface SkeletonStyle {
  root: {
    background: {
      base: string;
      highlight: string;
    };
    opacity: {
      base: string;
      highlight: string;
    };
  };
  animation: {
    pulse: {
      duration: string;
      timing: string;
      delay: string;
    };
    wave: {
      duration: string;
      timing: string;
      delay: string;
      gradient: {
        from: string;
        via: string;
        to: string;
      };
    };
  };
}

export type SkeletonStyles = {
  [key in SkeletonVariant]: SkeletonStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface SkeletonTextProps {
  lines?: number;
  spacing?: string;
  lastLineWidth?: string;
  paragraph?: boolean;
}

export interface SkeletonCircularProps {
  size?: string | number;
}

export interface SkeletonRectangularProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export interface SkeletonCustomProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  shape?: 'custom';
  path?: string;
}

export interface SkeletonAnimationProps {
  type?: SkeletonAnimation;
  duration?: number;
  delay?: number;
  timing?: string;
  iterations?: number;
}

export interface SkeletonVariantProps {
  size?: SkeletonSize;
  variant?: SkeletonVariant;
  animation?: SkeletonAnimationProps;
  text?: SkeletonTextProps;
  circular?: SkeletonCircularProps;
  rectangular?: SkeletonRectangularProps;
  custom?: SkeletonCustomProps;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  fitContent?: boolean;
  disableAspectRatio?: boolean;
  ariaLabel?: string;
  role?: string;
}

// --------------------------------------------------------
// Component Instance
// --------------------------------------------------------

export interface SkeletonInstance {
  variant: SkeletonVariant;
  animation: SkeletonAnimation;
  dimensions: {
    width: number;
    height: number;
  };
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateSkeletonOptions {
  variants?: SkeletonVariant[];
}

// --------------------------------------------------------
// Component Reference
// --------------------------------------------------------

export interface SkeletonRef {
  startAnimation: () => void;
  stopAnimation: () => void;
  getDimensions: () => { width: number; height: number };
  setDimensions: (dimensions: { width?: number; height?: number }) => void;
}

// --------------------------------------------------------
// Component Context
// --------------------------------------------------------

export interface SkeletonContextValue {
  size: SkeletonSize;
  variant: SkeletonVariant;
  animation: SkeletonAnimation;
  dimensions: {
    width: number | string;
    height: number | string;
  };
}

// --------------------------------------------------------
// Component Events
// --------------------------------------------------------

export interface SkeletonAnimationEvent {
  type: SkeletonAnimation;
  state: 'start' | 'end' | 'cancel';
  iteration: number;
}

// --------------------------------------------------------
// Component DOM
// --------------------------------------------------------

export interface SkeletonComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface SkeletonExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 