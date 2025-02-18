export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardInteraction = 'clickable' | 'none';

export interface CardVariantProps {
  size?: CardSize;
  variant?: CardVariant;
  interaction?: CardInteraction;
  hasHeader?: boolean;
  hasMedia?: boolean;
  hasFooter?: boolean;
  hasActions?: boolean;
  ariaLabel?: string;
  role?: string;
}

export type CardSizeConfig = {
  [key in CardSize]: {
    padding: number;
    spacing: number;
    borderRadius: number;
    mediaHeight: number;
    headerSpacing: number;
    footerSpacing: number;
    actionSpacing: number;
  };
};

export type CardStyleConfig = {
  [key in CardVariant]: {
    background: {
      default: string;
      hover: string;
      pressed: string;
    };
    border: {
      default: string;
      hover: string;
      pressed: string;
    };
    shadow: {
      default: string;
      hover: string;
      pressed: string;
    };
  };
}; 