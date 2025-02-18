export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchState = 'default' | 'hover' | 'pressed' | 'disabled';
export type SwitchStatus = 'default' | 'success' | 'error';

export interface SwitchVariantProps {
  size?: SwitchSize;
  state?: SwitchState;
  status?: SwitchStatus;
  checked?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  description?: string;
  required?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  role?: string;
}

export type SwitchSizeConfig = {
  [key in SwitchSize]: {
    height: number;
    width: number;
    thumbSize: number;
    thumbOffset: number;
    fontSize: number;
    lineHeight: number;
    spacing: number;
    labelSpacing: number;
    descriptionFontSize: number;
    descriptionLineHeight: number;
  };
};

export type SwitchStyleConfig = {
  [key in SwitchStatus]: {
    track: {
      unchecked: {
        default: string;
        hover: string;
        pressed: string;
        disabled: string;
      };
      checked: {
        default: string;
        hover: string;
        pressed: string;
        disabled: string;
      };
    };
    thumb: {
      unchecked: {
        default: string;
        hover: string;
        pressed: string;
        disabled: string;
      };
      checked: {
        default: string;
        hover: string;
        pressed: string;
        disabled: string;
      };
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