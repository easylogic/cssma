export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'filled' | 'outlined' | 'elevated';
export type CardStatus = 'default' | 'error';

export type CardSizeConfig = {
  [key in CardSize]: {
    padding: string;
    borderRadius: string;
    borderWidth: string;
    elevation: string;
    spacing: string;
  };
};

export interface CardStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface CardSectionStyle {
  background: CardStateStyle;
  border: CardStateStyle;
  text: CardStateStyle;
  padding: string;
}

export interface CardStyle {
  root: {
    background: CardStateStyle;
    border: CardStateStyle;
    shadow: CardStateStyle;
  };
  header: CardSectionStyle;
  content: CardSectionStyle;
  footer: CardSectionStyle;
  media: {
    aspectRatio: string;
    overlay: CardStateStyle;
  };
}

export type CardStyles = {
  [key in CardVariant]: CardStyle;
};

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  avatar?: string;
  extra?: string;
}

export interface CardMediaProps {
  image?: string;
  video?: string;
  aspectRatio?: string;
  overlay?: boolean;
}

export interface CardContentProps {
  title?: string;
  description?: string;
  children?: string;
}

export interface CardFooterProps {
  actions?: string[];
  extra?: string;
}

export interface CardVariantProps {
  size?: CardSize;
  variant?: CardVariant;
  status?: CardStatus;
  interactive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  header?: CardHeaderProps;
  media?: CardMediaProps;
  content?: CardContentProps;
  footer?: CardFooterProps;
  ariaLabel?: string;
  role?: string;
}

export interface CardInstance {
  header?: CardHeaderProps;
  media?: CardMediaProps;
  content?: CardContentProps;
  footer?: CardFooterProps;
}

export interface CreateCardOptions {
  variants?: CardVariant[];
} 