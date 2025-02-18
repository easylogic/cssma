export interface ButtonSize {
  small: {
    height: string;
    fontSize: string;
    lineHeight: string;
    paddingHorizontal: string;
    paddingVertical: string;
    iconSize: string;
    spacing: string;
    borderRadius: string;
  };
  medium: {
    height: string;
    fontSize: string;
    lineHeight: string;
    paddingHorizontal: string;
    paddingVertical: string;
    iconSize: string;
    spacing: string;
    borderRadius: string;
  };
  large: {
    height: string;
    fontSize: string;
    lineHeight: string;
    paddingHorizontal: string;
    paddingVertical: string;
    iconSize: string;
    spacing: string;
    borderRadius: string;
  };
}

export interface ButtonStyle {
  background: string;
  text: string;
  border: string;
}

export interface ButtonStyles {
  [key: string]: ButtonStyle;
}

export interface ButtonVariant {
  size?: keyof ButtonSize;
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
}

export interface ButtonInstance {
  text?: string;
  // 기타 인스턴스 관련 속성들
} 