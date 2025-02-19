export type DividerSize = 'small' | 'medium' | 'large';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerSizeConfig = {
  [key in DividerSize]: {
    thickness: string;
    spacing: string;
    length: string;
    labelSpacing: string;
    fontSize: string;
  };
};

export interface DividerStyle {
  line: {
    default: string;
    subtle: string;
    disabled: string;
  };
  text: {
    default: string;
    subtle: string;
    disabled: string;
  };
}

export type DividerStyles = {
  [key: string]: DividerStyle;
};

export interface DividerVariantProps {
  size?: DividerSize;
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  label?: string;
  labelPosition?: 'start' | 'center' | 'end';
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface DividerInstance {
  label?: string;
  labelPosition?: 'start' | 'center' | 'end';
}

export interface CreateDividerOptions {
  variants?: DividerVariant[];
} 