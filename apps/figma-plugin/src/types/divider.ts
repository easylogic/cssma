export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerSize = 'small' | 'medium' | 'large';
export type DividerTheme = 'default' | 'primary' | 'subtle';

export interface DividerVariantProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  size?: DividerSize;
  theme?: DividerTheme;
  hasLabel?: boolean;
  label?: string;
  labelPosition?: 'start' | 'center' | 'end';
  labelAlignment?: 'start' | 'center' | 'end';
  ariaLabel?: string;
  role?: string;
}

// Value can be either a number or a reference to a variable
export type SizeValue = number | `{${string}}`;

export type DividerSizeConfig = {
  [key in DividerSize]: {
    thickness: SizeValue;
    spacing: SizeValue;
    labelSpacing: SizeValue;
    fontSize: SizeValue;
    lineHeight: SizeValue;
    dashLength?: SizeValue;
    dashGap?: SizeValue;
    dotSize?: SizeValue;
    dotGap?: SizeValue;
  };
};

export type DividerStyleConfig = {
  [key in DividerTheme]: {
    line: {
      [key in DividerVariant]: {
        default: string;
        subtle: string;
      };
    };
    text: {
      default: string;
      muted: string;
    };
  };
}; 