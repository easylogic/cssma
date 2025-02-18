export interface InputSize {
  small: { 
    height: number; 
    fontSize: number; 
    padding: number;
    iconSize: number;
    helperTextSize: number;
  };
  medium: { 
    height: number; 
    fontSize: number; 
    padding: number;
    iconSize: number;
    helperTextSize: number;
  };
}

export interface InputStyle {
  background: string;
  text: string;
  border: string;
  placeholder: string;
  helper: string;
}

export interface InputStyles {
  [key: string]: InputStyle;
}

export interface InputVariant {
  size?: 'small' | 'medium';
  state?: 'default' | 'hover' | 'focused' | 'disabled' | 'error';
  hasIcon?: boolean;
  iconPosition?: 'left' | 'right';
  hasHelper?: boolean;
} 