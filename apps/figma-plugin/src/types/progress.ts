/**
 * Progress Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive progress component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ProgressSize = 'small' | 'medium' | 'large';
export type ProgressVariant = 'line' | 'circle' | 'dashboard';
export type ProgressStatus = 'default' | 'success' | 'error' | 'warning';
export type ProgressState = 'default' | 'active' | 'disabled';
export type ProgressFormat = 'percent' | 'number' | 'custom';
export type ProgressStrokeLinecap = 'round' | 'square';
export type ProgressGapPosition = 'top' | 'bottom' | 'left' | 'right';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ProgressSizeConfig = {
  [key in ProgressSize]: {
    fontSize: string;
    lineHeight: string;
    spacing: {
      label: string;      // 라벨과 프로그레스 바 간격
      icon: string;       // 아이콘과 텍스트 간격
      extra: string;      // 추가 콘텐츠 간격
    };
    linear: {
      height: string;
      borderRadius: string;
      steps?: {
        size: string;
        gap: string;
      };
    };
    circular: {
      size: string;
      thickness: string;
      gap: string;
    };
    label: {
      fontSize: string;
      lineHeight: string;
    };
    description: {
      fontSize: string;
      lineHeight: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ProgressStateStyle {
  default: string;
  active: string;
  disabled: string;
}

export interface ProgressTrackStyle {
  background: ProgressStateStyle;
  border: ProgressStateStyle;
}

export interface ProgressIndicatorStyle {
  background: ProgressStateStyle;
  border: ProgressStateStyle;
  gradient?: {
    from: string;
    to: string;
    angle?: number;
  };
}

export interface ProgressTextStyle {
  color: ProgressStateStyle;
  background?: ProgressStateStyle;
}

export interface ProgressStyle {
  root: {
    background: ProgressStateStyle;
    border: ProgressStateStyle;
  };
  track: {
    default: ProgressTrackStyle;
    success: ProgressTrackStyle;
    error: ProgressTrackStyle;
    warning: ProgressTrackStyle;
  };
  indicator: {
    default: ProgressIndicatorStyle;
    success: ProgressIndicatorStyle;
    error: ProgressIndicatorStyle;
    warning: ProgressIndicatorStyle;
  };
  text: {
    value: ProgressTextStyle;
    label: ProgressTextStyle;
    description: ProgressTextStyle;
  };
  steps?: {
    active: ProgressStateStyle;
    completed: ProgressStateStyle;
    remaining: ProgressStateStyle;
  };
}

export type ProgressStyles = {
  [key in ProgressVariant]: ProgressStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ProgressIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface ProgressFormatProps {
  type: ProgressFormat;
  formatter?: (value: number, total?: number) => string;
  prefix?: string;
  suffix?: string;
}

export interface ProgressStepsProps {
  count: number;
  current: number;
  size?: number;
  gap?: number;
  clickable?: boolean;
  onChange?: (step: number) => void;
}

export interface ProgressGradientProps {
  from: string;
  to: string;
  angle?: number;
  stops?: Array<{
    offset: number;
    color: string;
  }>;
}

export interface ProgressSuccessProps {
  value: number;
  icon?: ProgressIconProps;
  color?: string;
}

export interface ProgressVariantProps {
  size?: ProgressSize;
  variant?: ProgressVariant;
  status?: ProgressStatus;
  state?: ProgressState;
  value?: number;
  total?: number;
  showValue?: boolean;
  format?: ProgressFormatProps;
  label?: string;
  description?: string;
  icon?: ProgressIconProps;
  steps?: ProgressStepsProps;
  strokeLinecap?: ProgressStrokeLinecap;
  gapPosition?: ProgressGapPosition;
  gapDegree?: number;
  gradient?: ProgressGradientProps;
  success?: ProgressSuccessProps;
  indeterminate?: boolean;
  animated?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface ProgressInstance {
  value: number;
  total: number;
  status: ProgressStatus;
  state: ProgressState;
  format?: ProgressFormatProps;
  steps?: ProgressStepsProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateProgressOptions {
  variants?: ProgressVariant[];
} 