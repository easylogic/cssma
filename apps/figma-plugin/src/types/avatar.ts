export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarVariant = 'filled' | 'outlined';
export type AvatarStatus = 'default' | 'error';
export type AvatarShape = 'circle' | 'square';
export type AvatarType = 'image' | 'initial' | 'icon';

export type AvatarSizeConfig = {
  [key in AvatarSize]: {
    size: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    iconSize: string;
    spacing: string;
  };
};

export interface AvatarStyle {
  background: {
    default: string;
    error: string;
  };
  text: {
    default: string;
    error: string;
  };
  border: {
    default: string;
    error: string;
  };
}

export type AvatarStyles = {
  [key: string]: AvatarStyle;
};

export interface AvatarBadge {
  status: 'online' | 'offline' | 'away' | 'busy';
  content?: string;
}

export interface AvatarVariantProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
  shape?: AvatarShape;
  type?: AvatarType;
  image?: string;
  initials?: string;
  icon?: string;
  disabled?: boolean;
  interactive?: boolean;
  badge?: AvatarBadge;
  badgeContent?: string;
  ariaLabel?: string;
  role?: string;
}

export interface AvatarInstance {
  text?: string;
  icon?: string;
  image?: string;
}

export interface CreateAvatarOptions {
  variants?: AvatarVariant[];
}

export interface AvatarGroupProps {
  max?: number;
  spacing?: number;
  direction?: 'left' | 'right';
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