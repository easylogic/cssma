/**
 * Avatar Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive avatar component set in Figma.
 * This type system supports:
 * - Multiple avatar types (image, text, icon)
 * - Flexible fallback system
 * - Group and stack functionality
 * - Rich interaction states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarVariant = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'default';
export type AvatarState = 'default' | 'hover' | 'pressed' | 'loading' | 'error';
export type AvatarType = 'image' | 'text' | 'icon';
export type AvatarPresence = 'dot' | 'ring' | 'icon' | 'text';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type AvatarSizeConfig = {
  [key in AvatarSize]: {
    root: {
      size: string;
      borderRadius: {
        circle: string;
        rounded: string;
        square: string;
      };
      borderWidth: string;
    };
    image: {
      size: string;
      objectFit: 'cover' | 'contain' | 'fill';
    };
    text: {
      fontSize: string;
      lineHeight: string;
      fontWeight: string;
      letterSpacing: string;
    };
    icon: {
      size: string;
      padding: string;
    };
    presence: {
      dot: {
        size: string;
        offset: string;
        borderWidth: string;
      };
      ring: {
        size: string;
        width: string;
        offset: string;
      };
      icon: {
        size: string;
        padding: string;
      };
      text: {
        fontSize: string;
        padding: string;
      };
    };
    group: {
      spacing: string;
      overlap: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface AvatarStateStyle {
  default: string;
  hover: string;
  pressed: string;
  loading: string;
  error: string;
}

export interface AvatarPresenceStyle {
  dot: {
    background: {
      online: string;
      offline: string;
      away: string;
      busy: string;
    };
    border: string;
  };
  ring: {
    border: {
      online: string;
      offline: string;
      away: string;
      busy: string;
    };
    background: string;
  };
  icon: {
    color: {
      online: string;
      offline: string;
      away: string;
      busy: string;
    };
    background: string;
  };
  text: {
    color: {
      online: string;
      offline: string;
      away: string;
      busy: string;
    };
    background: string;
  };
}

export interface AvatarStyle {
  root: {
    background: AvatarStateStyle;
    border: AvatarStateStyle;
    shadow?: AvatarStateStyle;
  };
  image: {
    opacity: AvatarStateStyle;
    filter?: AvatarStateStyle;
  };
  text: {
    color: AvatarStateStyle;
    background: AvatarStateStyle;
  };
  icon: {
    color: AvatarStateStyle;
    background: AvatarStateStyle;
  };
  presence: AvatarPresenceStyle;
  group: {
    background: string;
    border: string;
    shadow?: string;
  };
  fallback: {
    background: string;
    color: string;
    border: string;
  };
  loading: {
    background: string;
    color: string;
    overlay: string;
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface AvatarImageProps {
  src: string;
  srcSet?: string;
  alt?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
}

export interface AvatarTextProps {
  text: string;
  maxLength?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  formatter?: (text: string) => string;
}

export interface AvatarIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface AvatarPresenceProps {
  type: AvatarPresence;
  status: AvatarStatus;
  icon?: AvatarIconProps;
  text?: string;
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: { x?: number; y?: number };
}

export interface AvatarGroupProps {
  max?: number;
  total?: number;
  spacing?: number;
  overlap?: number;
  reverse?: boolean;
  vertical?: boolean;
  surplus?: {
    show: boolean;
    maxDigits?: number;
    formatter?: (count: number) => string;
  };
}

export interface AvatarFallbackProps {
  type: AvatarType;
  delay?: number;
  content?: string | AvatarIconProps;
  onRender?: () => void;
}

export interface AvatarLoadingProps {
  state: boolean;
  indicator?: 'spinner' | 'pulse' | 'skeleton';
  text?: string;
}

export interface AvatarVariantProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  type?: AvatarType;
  state?: AvatarState;
  src?: string;
  alt?: string;
  text?: string | AvatarTextProps;
  icon?: AvatarIconProps;
  presence?: AvatarPresenceProps;
  group?: AvatarGroupProps;
  fallback?: AvatarFallbackProps;
  loading?: AvatarLoadingProps;
  draggable?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface AvatarInstance {
  type: AvatarType;
  state: AvatarState;
  src?: string;
  text?: string;
  icon?: AvatarIconProps;
  presence?: AvatarPresenceProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateAvatarOptions {
  variants?: AvatarVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface AvatarRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
}

export interface AvatarContextValue {
  size: AvatarSize;
  variant: AvatarVariant;
  type: AvatarType;
  state: AvatarState;
  disabled: boolean;
  group?: AvatarGroupProps;
}

export interface AvatarGroupContextValue {
  size: AvatarSize;
  variant: AvatarVariant;
  max?: number;
  total: number;
  spacing: number;
  overlap: number;
  reverse: boolean;
  vertical: boolean;
}

export interface AvatarComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface AvatarGroupComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface AvatarExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 