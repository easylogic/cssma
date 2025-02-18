export type AlertSize = 'small' | 'medium' | 'large';
export type AlertType = 'info' | 'success' | 'warning' | 'error';
export type AlertVariantStyle = 'filled' | 'outlined';

export interface AlertVariant {
  size?: AlertSize;
  type?: AlertType;
  variant?: AlertVariantStyle;
  hasIcon?: boolean;
  hasTitle?: boolean;
  closable?: boolean;
  action?: boolean;
  ariaLive?: 'polite' | 'assertive';
  role?: 'alert' | 'status';
  ariaLabel?: string;
}

export type AlertSizeConfig = {
  [key in AlertSize]: {
    padding: number;
    iconSize: number;
    fontSize: number;
    spacing: number;
    lineHeight: number;
    borderRadius: number;
  };
};

export type AlertStyleConfig = {
  [key in AlertType]: {
    [key in AlertVariantStyle]: {
      background: string;
      backgroundHover: string;
      text: string;
      border: string;
      icon: string;
    };
  };
}; 