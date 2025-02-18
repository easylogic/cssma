export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarType = 'image' | 'initial' | 'icon';
export type AvatarState = 'default' | 'error';
export type AvatarShape = 'circle' | 'square';

export interface AvatarStyle {
  background: Record<AvatarState, string>;
  text: Record<AvatarState, string>;
  border: Record<AvatarState, string>;
}

export type AvatarSizeConfig = {
  [key in AvatarSize]: {
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    size: string;    
    badgeSize: string;
    badgeOffset: number;
  };
};

export interface AvatarStyles {
  [key: string]: AvatarStyle;
}

export interface AvatarVariantProps {
  size?: AvatarSize;
  type?: AvatarType;
  state?: AvatarState;
  shape?: AvatarShape;
  image?: string;
  initials?: string;
  icon?: string;
  badge?: {
    status?: 'online' | 'offline' | 'away' | 'busy';
    count?: number;
  };
  badgeContent?: string;
}

export interface AvatarGroupProps {
  max?: number;
  spacing?: number;
  direction?: 'left' | 'right';
}

export interface AvatarComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface AvatarInstance extends InstanceNode {
  readonly type: 'INSTANCE';
}

export interface AvatarGroupComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface AvatarExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 