// Base Types
export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'filled' | 'outlined' | 'elevated';
export type CardStatus = 'default' | 'error';

// Base Configurations
export type CardSizeConfig = {
  [key in CardSize]: {
    width: number;
    height?: string;
    padding: string;
    spacing: string;
    borderRadius: string;
    fontSize?: {
      title: string;
      subtitle?: string;
      description?: string;
    };
    buttonSize?: CardSize;
  };
};

// Base Style Types
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
    background: CardStateStyle;
    border: CardStateStyle;
    overlay: CardStateStyle;
  };
}

export type CardStyles = {
  [key in CardVariant]: CardStyle;
};

// Base Props Interface
interface BaseVariantProps {
  size?: CardSize;
  variant?: CardVariant;
  disabled?: boolean;
}

// Section Props
export interface CardHeaderVariantProps extends BaseVariantProps {
  withAvatar?: boolean;
  withExtra?: boolean;
  withSubtitle?: boolean;
}

export interface CardMediaVariantProps extends BaseVariantProps {
  aspectRatio: '1/1' | '16/9' | '4/3';
  withOverlay?: boolean;
}

export interface CardContentVariantProps extends BaseVariantProps {
  withDescription?: boolean;
}

export interface CardFooterVariantProps extends BaseVariantProps {
  withActions?: boolean;
  alignment?: 'left' | 'center' | 'right' | 'space-between';
}

// Instance Props
export interface CardHeaderProps extends Partial<CardHeaderVariantProps> {
  title?: string;
  subtitle?: string;
  avatar?: string;
  extra?: string;
}

export interface CardMediaProps extends Partial<CardMediaVariantProps> {
  image?: string;
  overlay?: boolean;
}

export interface CardContentProps extends Partial<CardContentVariantProps> {
  description?: string;
}

export interface CardFooterProps extends Partial<CardFooterVariantProps> {
  actions?: string[];
  extra?: string;
}

// Main Card Types
export interface CardVariantProps extends BaseVariantProps {
  status?: CardStatus;
  interactive?: boolean;
  loading?: boolean;
  header?: CardHeaderProps;
  media?: CardMediaProps;
  content?: CardContentProps;
  footer?: CardFooterProps;
}

export interface CardInstance {
  header?: CardHeaderProps;
  media?: CardMediaProps;
  content?: CardContentProps;
  footer?: CardFooterProps;
}

// Utility Types
export interface CardShadow {
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  color: { r: number; g: number; b: number; a: number };
  offset: { x: number; y: number };
  radius: number;
  spread?: number;
  visible?: boolean;
}

export interface CreateCardOptions {
  variants?: CardVariantProps[];
}


// Media section
export interface CardMediaVariantProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'elevated';
  aspectRatio: '1/1' | '16/9' | '4/3';
  withOverlay?: boolean;
}

export interface CardMediaProps extends Partial<CardMediaVariantProps> {
  image?: string;
  overlay?: boolean;
}


// Content section
export interface CardContentVariantProps extends BaseVariantProps {
  withDescription?: boolean;
}

export interface CardContentProps extends Partial<CardContentVariantProps> {
  description?: string;
}

// Footer section
export interface CardFooterVariantProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'elevated';
  withActions?: boolean;
  alignment?: 'left' | 'center' | 'right' | 'space-between';
}

export interface CardFooterProps extends Partial<CardFooterVariantProps> {
  actions?: string[];
  extra?: string;
}
