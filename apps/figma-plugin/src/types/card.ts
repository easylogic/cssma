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

// Base types for all sections
interface BaseVariantProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'elevated';
  disabled?: boolean;
}

// Header section
export interface CardHeaderVariantProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'elevated';
  withAvatar?: boolean;
  withExtra?: boolean;
  withSubtitle?: boolean;
}

export interface CardHeaderProps extends Partial<CardHeaderVariantProps> {
  title?: string;
  subtitle?: string;
  avatar?: string;
  extra?: string;
}

// Header constants
export const HEADER_SIZES: Record<CardSize, {
  height: string;
  padding: string;
  spacing: string;
  fontSize: {
    title: string;
    subtitle: string;
  };
}> = {
  small: {
    height: 'component/base/height/xs',
    padding: 'component/base/padding/sm',
    spacing: 'component/base/gap/sm',
    fontSize: {
      title: 'typography/size/sm',
      subtitle: 'typography/size/xs'
    }
  },
  medium: {
    height: 'component/base/height/sm',
    padding: 'component/base/padding/md',
    spacing: 'component/base/gap/md',
    fontSize: {
      title: 'typography/size/md',
      subtitle: 'typography/size/sm'
    }
  },
  large: {
    height: 'component/base/height/md',
    padding: 'component/base/padding/lg',
    spacing: 'component/base/gap/lg',
    fontSize: {
      title: 'typography/size/lg',
      subtitle: 'typography/size/md'
    }
  }
} as const;

export const HEADER_VARIANTS: CardHeaderVariantProps[] = [
  // 기본 크기
  { 
    size: 'medium', 
    variant: 'filled',
    withSubtitle: true
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    withSubtitle: true,
    withAvatar: true 
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    withSubtitle: true,
    withExtra: true 
  },
  
  // 작은 크기
  { 
    size: 'small', 
    variant: 'filled',
    withSubtitle: true
  },
  { 
    size: 'small', 
    variant: 'filled', 
    withSubtitle: true,
    withAvatar: true 
  },
  { 
    size: 'small', 
    variant: 'filled', 
    withSubtitle: true,
    withExtra: true 
  },
  
  // 큰 크기
  { 
    size: 'large', 
    variant: 'filled',
    withSubtitle: true
  },
  { 
    size: 'large', 
    variant: 'filled', 
    withSubtitle: true,
    withAvatar: true 
  },
  { 
    size: 'large', 
    variant: 'filled', 
    withSubtitle: true,
    withExtra: true 
  },
  
  // Outlined 변형
  { 
    size: 'medium', 
    variant: 'outlined',
    withSubtitle: true
  },
  { 
    size: 'medium', 
    variant: 'outlined', 
    withSubtitle: true,
    withAvatar: true 
  },
  { 
    size: 'medium', 
    variant: 'outlined', 
    withSubtitle: true,
    withExtra: true 
  },
  
  // Elevated 변형
  { 
    size: 'medium', 
    variant: 'elevated',
    withSubtitle: true
  },
  { 
    size: 'medium', 
    variant: 'elevated', 
    withSubtitle: true,
    withAvatar: true 
  },
  { 
    size: 'medium', 
    variant: 'elevated', 
    withSubtitle: true,
    withExtra: true 
  },

  // 특수 조합
  { 
    size: 'medium', 
    variant: 'filled', 
    withSubtitle: true,
    withAvatar: true,
    withExtra: true
  },
  { 
    size: 'large', 
    variant: 'elevated', 
    withSubtitle: true,
    withAvatar: true,
    withExtra: true
  }
] as const;

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

// Media constants
export const MEDIA_SIZES: Record<CardSize, {
  width: string;
  padding: string;
  spacing: string;
  borderRadius: string;
}> = {
  small: {
    width: '280',
    padding: 'component/base/padding/sm',
    spacing: 'component/base/gap/sm',
    borderRadius: 'component/base/radius/sm'
  },
  medium: {
    width: '320',
    padding: 'component/base/padding/md',
    spacing: 'component/base/gap/md',
    borderRadius: 'component/base/radius/md'
  },
  large: {
    width: '400',
    padding: 'component/base/padding/lg',
    spacing: 'component/base/gap/lg',
    borderRadius: 'component/base/radius/lg'
  }
} as const;

export const MEDIA_VARIANTS: CardMediaVariantProps[] = [
  // 기본 크기 (16:9)
  {
    size: 'medium',
    variant: 'filled',
    aspectRatio: '16/9'
  },
  {
    size: 'medium',
    variant: 'filled',
    aspectRatio: '16/9',
    withOverlay: true
  },

  // 정사각형 (1:1)
  {
    size: 'medium',
    variant: 'filled',
    aspectRatio: '1/1'
  },
  {
    size: 'medium',
    variant: 'filled',
    aspectRatio: '1/1',
    withOverlay: true
  },

  // 4:3 비율
  {
    size: 'medium',
    variant: 'filled',
    aspectRatio: '4/3'
  },
  {
    size: 'medium',
    variant: 'filled',
    aspectRatio: '4/3',
    withOverlay: true
  },

  // 작은 크기
  {
    size: 'small',
    variant: 'filled',
    aspectRatio: '16/9'
  },
  {
    size: 'small',
    variant: 'filled',
    aspectRatio: '1/1'
  },

  // 큰 크기
  {
    size: 'large',
    variant: 'filled',
    aspectRatio: '16/9'
  },
  {
    size: 'large',
    variant: 'filled',
    aspectRatio: '1/1'
  },

  // Outlined 변형
  {
    size: 'medium',
    variant: 'outlined',
    aspectRatio: '16/9'
  },
  {
    size: 'medium',
    variant: 'outlined',
    aspectRatio: '1/1'
  },

  // Elevated 변형
  {
    size: 'medium',
    variant: 'elevated',
    aspectRatio: '16/9'
  },
  {
    size: 'medium',
    variant: 'elevated',
    aspectRatio: '1/1'
  }
] as const;

// Content section
export interface CardContentVariantProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'elevated';
  withTitle?: boolean;
  withDescription?: boolean;
}

export interface CardContentProps extends Partial<CardContentVariantProps> {
  title?: string;
  description?: string;
}

// Content constants
export const CONTENT_SIZES: Record<CardSize, {
  padding: string;
  spacing: string;
  fontSize: {
    title: string;
    description: string;
  };
}> = {
  small: {
    padding: 'component/base/padding/sm',
    spacing: 'component/base/gap/sm',
    fontSize: {
      title: 'typography/size/sm',
      description: 'typography/size/xs'
    }
  },
  medium: {
    padding: 'component/base/padding/md',
    spacing: 'component/base/gap/md',
    fontSize: {
      title: 'typography/size/md',
      description: 'typography/size/sm'
    }
  },
  large: {
    padding: 'component/base/padding/lg',
    spacing: 'component/base/gap/lg',
    fontSize: {
      title: 'typography/size/lg',
      description: 'typography/size/md'
    }
  }
} as const;

export const CONTENT_VARIANTS: CardContentVariantProps[] = [
  // 기본 크기
  { 
    size: 'medium', 
    variant: 'filled',
    withTitle: true,
    withDescription: true
  },
  { 
    size: 'medium', 
    variant: 'filled',
    withTitle: true
  },
  { 
    size: 'medium', 
    variant: 'filled',
    withDescription: true
  },

  // 작은 크기
  { 
    size: 'small', 
    variant: 'filled',
    withTitle: true,
    withDescription: true
  },
  { 
    size: 'small', 
    variant: 'filled',
    withTitle: true
  },
  { 
    size: 'small', 
    variant: 'filled',
    withDescription: true
  },

  // 큰 크기
  { 
    size: 'large', 
    variant: 'filled',
    withTitle: true,
    withDescription: true
  },
  { 
    size: 'large', 
    variant: 'filled',
    withTitle: true
  },
  { 
    size: 'large', 
    variant: 'filled',
    withDescription: true
  },

  // Outlined 변형
  { 
    size: 'medium', 
    variant: 'outlined',
    withTitle: true,
    withDescription: true
  },
  { 
    size: 'medium', 
    variant: 'outlined',
    withTitle: true
  },

  // Elevated 변형
  { 
    size: 'medium', 
    variant: 'elevated',
    withTitle: true,
    withDescription: true
  },
  { 
    size: 'medium', 
    variant: 'elevated',
    withTitle: true
  }
] as const;

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

// Footer constants
export const FOOTER_SIZES: Record<CardSize, {
  height: string;
  padding: string;
  spacing: string;
  fontSize: string;
  buttonSize: 'small' | 'medium' | 'large';
}> = {
  small: {
    height: 'component/base/height/xs',
    padding: 'component/base/padding/sm',
    spacing: 'component/base/gap/sm',
    fontSize: 'typography/size/sm',
    buttonSize: 'small'
  },
  medium: {
    height: 'component/base/height/sm',
    padding: 'component/base/padding/md',
    spacing: 'component/base/gap/md',
    fontSize: 'typography/size/md',
    buttonSize: 'medium'
  },
  large: {
    height: 'component/base/height/md',
    padding: 'component/base/padding/lg',
    spacing: 'component/base/gap/lg',
    fontSize: 'typography/size/lg',
    buttonSize: 'large'
  }
} as const;

export const FOOTER_VARIANTS: CardFooterVariantProps[] = [
  // 기본 크기
  { 
    size: 'medium', 
    variant: 'filled',
    withActions: true,
    alignment: 'right'
  },
  { 
    size: 'medium', 
    variant: 'filled',
    withActions: true,
    alignment: 'center'
  },
  { 
    size: 'medium', 
    variant: 'filled',
    withActions: true,
    alignment: 'space-between'
  },

  // 작은 크기
  { 
    size: 'small', 
    variant: 'filled',
    withActions: true,
    alignment: 'right'
  },
  { 
    size: 'small', 
    variant: 'filled',
    withActions: true,
    alignment: 'center'
  },

  // 큰 크기
  { 
    size: 'large', 
    variant: 'filled',
    withActions: true,
    alignment: 'right'
  },
  { 
    size: 'large', 
    variant: 'filled',
    withActions: true,
    alignment: 'center'
  },

  // Outlined 변형
  { 
    size: 'medium', 
    variant: 'outlined',
    withActions: true,
    alignment: 'right'
  },
  { 
    size: 'medium', 
    variant: 'outlined',
    withActions: true,
    alignment: 'space-between'
  },

  // Elevated 변형
  { 
    size: 'medium', 
    variant: 'elevated',
    withActions: true,
    alignment: 'right'
  },
  { 
    size: 'medium', 
    variant: 'elevated',
    withActions: true,
    alignment: 'space-between'
  }
] as const;

// Main card types
export interface CardVariantProps extends BaseVariantProps {
  status?: 'default' | 'error';
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

// Component creation options
export interface CreateCardOptions {
  variants?: CardVariantProps[];
}

// Card styles
export interface CardShadow {
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  color: { r: number; g: number; b: number; a: number };
  offset: { x: number; y: number };
  radius: number;
  spread?: number;
  visible?: boolean;
} 