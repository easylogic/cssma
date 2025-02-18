export type CheckboxSize = {
  small: {
    size: number;
    spacing: number;
    fontSize: number;
    lineHeight: number;
  };
  medium: {
    size: number;
    spacing: number;
    fontSize: number;
    lineHeight: number;
  };
};

export type CheckboxState = 'default' | 'hover' | 'pressed' | 'disabled';

export interface CheckboxVariant {
  size?: keyof CheckboxSize;
  state?: CheckboxState;
  checked?: boolean;
  indeterminate?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  required?: boolean;
  name?: string;
}

export type CheckboxStyles = {
  [key in CheckboxState]: {
    box: {
      background: string;
      border: string;
      check: string;
    };
    label: {
      color: string;
    };
  };
}; 