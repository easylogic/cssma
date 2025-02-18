export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarVariant = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarVariantProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
  hasImage?: boolean;
  initials?: string;
  ariaLabel?: string;
  role?: string;
}

export type AvatarSizeConfig = {
  [key in AvatarSize]: {
    size: number;
    fontSize: number;
    lineHeight: number;
    borderRadius: number;
    statusSize: number;
    statusOffset: number;
  };
};

export type AvatarStyleConfig = {
  background: {
    default: string;
    placeholder: string;
  };
  text: {
    default: string;
  };
  status: {
    [key in AvatarStatus]: {
      background: string;
      border: string;
    };
  };
  border: {
    default: string;
  };
}; 