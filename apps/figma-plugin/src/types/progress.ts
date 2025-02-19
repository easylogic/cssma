export type ProgressSize = 'small' | 'medium' | 'large';
export type ProgressVariant = 'line' | 'circle' | 'dashboard';
export type ProgressStatus = 'default' | 'success' | 'error' | 'warning';

export type ProgressSizeConfig = {
  [key in ProgressSize]: {
    height: string;
    fontSize: string;
    iconSize: string;
    strokeWidth: string;
    spacing: string;
    circleSize: string;
  };
};

export interface ProgressStyle {
  track: {
    default: string;
    success: string;
    error: string;
    warning: string;
  };
  indicator: {
    default: string;
    success: string;
    error: string;
    warning: string;
  };
  text: {
    default: string;
    success: string;
    error: string;
    warning: string;
  };
}

export type ProgressStyles = {
  [key: string]: ProgressStyle;
};

export interface ProgressVariantProps {
  size?: ProgressSize;
  variant?: ProgressVariant;
  status?: ProgressStatus;
  percent?: number;
  showInfo?: boolean;
  strokeLinecap?: 'round' | 'square';
  strokeColor?: string;
  trailColor?: string;
  format?: string;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface ProgressInstance {
  percent: number;
  status: ProgressStatus;
  showInfo: boolean;
}

export interface CreateProgressOptions {
  variants?: ProgressVariant[];
} 