export interface RadioSize {
  small: { 
    size: number;
    fontSize: number;
    spacing: number;
    dotSize: number;
  };
  medium: { 
    size: number;
    fontSize: number;
    spacing: number;
    dotSize: number;
  };
}

export interface RadioStyle {
  circle: {
    background: string;
    border: string;
    dot: string;
  };
  text: string;
}

export interface RadioStyles {
  [key: string]: RadioStyle;
}

export interface RadioVariant {
  size?: 'small' | 'medium';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  checked?: boolean;
} 