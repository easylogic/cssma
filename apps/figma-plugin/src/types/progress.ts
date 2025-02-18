export type ProgressSize = 'small' | 'medium' | 'large';
export type ProgressVariant = 'linear' | 'circular';
export type ProgressStatus = 'default' | 'success' | 'warning' | 'error';

export interface ProgressVariantProps {
  size?: ProgressSize;
  variant?: ProgressVariant;
  status?: ProgressStatus;
  value?: number;
  indeterminate?: boolean;
  showValue?: boolean;
  label?: string;
  description?: string;
  formatValue?: (value: number) => string;
  ariaLabel?: string;
  role?: string;
}

export type ProgressSizeConfig = {
  [key in ProgressSize]: {
    // Common properties
    fontSize: number;
    lineHeight: number;
    spacing: number;
    labelSpacing: number;
    descriptionFontSize: number;
    descriptionLineHeight: number;

    // Linear progress specific
    linear: {
      height: number;
      borderRadius: number;
    };

    // Circular progress specific
    circular: {
      size: number;
      thickness: number;
      gap: number;
    };
  };
};

export type ProgressStyleConfig = {
  [key in ProgressStatus]: {
    track: {
      default: string;
      disabled: string;
    };
    indicator: {
      default: string;
      disabled: string;
    };
    text: {
      default: string;
      disabled: string;
    };
    description: {
      default: string;
      disabled: string;
    };
  };
}; 