import { 
  CardContentVariantProps, 
  CardFooterVariantProps, 
  CardHeaderVariantProps, 
  CardMediaVariantProps, 
  CardSize, 
  CardSizeConfig, 
  CardVariantProps 
} from '../types/card';

export const CARD_VARIANTS: CardVariantProps[] = [
  // Size variants
  { 
    size: 'small', 
    variant: 'filled',
    content: {
      title: 'Small Card',
      description: 'This is a small card'
    }
  },
  { 
    size: 'medium', 
    variant: 'filled',
    content: {
      title: 'Medium Card',
      description: 'This is a medium card'
    }
  },
  { 
    size: 'large', 
    variant: 'filled',
    content: {
      title: 'Large Card',
      description: 'This is a large card'
    }
  },

  // Variant styles
  { 
    size: 'medium', 
    variant: 'filled',
    content: {
      title: 'Filled Card',
      description: 'This is a filled card'
    }
  },
  { 
    size: 'medium', 
    variant: 'outlined',
    content: {
      title: 'Outlined Card',
      description: 'This is an outlined card'
    }
  },
  { 
    size: 'medium', 
    variant: 'elevated',
    content: {
      title: 'Elevated Card',
      description: 'This is an elevated card'
    }
  },

  // With header
  { 
    size: 'medium', 
    variant: 'filled',
    header: {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      avatar: 'user-avatar',
      extra: 'More'
    },
    content: {
      description: 'Card with header'
    }
  },

  // With footer
  { 
    size: 'medium', 
    variant: 'filled',
    content: {
      description: 'Card with footer'
    },
    footer: {
      actions: ['Action 1', 'Action 2'],
      extra: 'Footer extra'
    }
  },

  // With media
  { 
    size: 'medium', 
    variant: 'filled',
    media: {
      image: 'card-image.jpg',
      aspectRatio: '16/9',
      overlay: true
    },
    content: {
      description: 'Card with media'
    }
  },

  // Interactive
  { 
    size: 'medium', 
    variant: 'filled',
    interactive: true,
    content: {
      title: 'Interactive Card',
      description: 'Click me!'
    }
  },

  // Loading
  { 
    size: 'medium', 
    variant: 'filled',
    loading: true,
    content: {
      title: 'Loading Card',
      description: 'Please wait...'
    }
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'elevated',
    header: {
      title: 'Featured Article',
      subtitle: 'By John Doe',
      avatar: 'author-avatar',
      extra: 'Share'
    },
    media: {
      image: 'article-image.jpg',
      aspectRatio: '16/9',
      overlay: true
    },
    content: {
      title: 'Amazing Discovery',
      description: 'Scientists have made an incredible breakthrough...',
      children: 'Full article content goes here'
    },
    footer: {
      actions: ['Like', 'Comment', 'Save'],
      extra: '5 min read'
    },
    interactive: true
  }
] as const; 


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
    withDescription: true
  },
  { 
    size: 'medium', 
    variant: 'filled',
    withDescription: false
  },

  // 작은 크기
  { 
    size: 'small', 
    variant: 'filled',
    withDescription: true
  },
  { 
    size: 'small', 
    variant: 'filled',
    withDescription: false
  },

  // 큰 크기
  { 
    size: 'large', 
    variant: 'filled',
    withDescription: true
  },
  { 
    size: 'large', 
    variant: 'filled',
    withDescription: false
  },

  // Outlined 변형
  { 
    size: 'medium', 
    variant: 'outlined',
    withDescription: true
  },
  { 
    size: 'medium', 
    variant: 'outlined',
    withDescription: false
  },

  // Elevated 변형
  { 
    size: 'medium', 
    variant: 'elevated',
    withDescription: true
  },
  { 
    size: 'medium', 
    variant: 'elevated',
    withDescription: false
  }
] as const;


// Media constants
export const MEDIA_SIZES: Record<CardSize, {
  width: number;
  padding: string;
  spacing: string;
  borderRadius: string;
}> = {
  small: {
    width: 280,
    padding: 'component/base/padding/sm',
    spacing: 'component/base/gap/sm',
    borderRadius: 'component/base/radius/sm'
  },
  medium: {
    width: 320,
    padding: 'component/base/padding/md',
    spacing: 'component/base/gap/md',
    borderRadius: 'component/base/radius/md'
  },
  large: {
    width: 400,
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


// Constants
export const CARD_SIZES: CardSizeConfig = {
  small: {
    width: 280,
    height: 'component/base/height/xs',
    padding: 'component/base/padding/sm',
    spacing: 'component/base/gap/sm',
    borderRadius: 'component/base/radius/sm',
    fontSize: {
      title: 'typography/size/sm',
      subtitle: 'typography/size/xs',
      description: 'typography/size/xs'
    },
    buttonSize: 'small'
  },
  medium: {
    width: 320,
    height: 'component/base/height/sm',
    padding: 'component/base/padding/md',
    spacing: 'component/base/gap/md',
    borderRadius: 'component/base/radius/md',
    fontSize: {
      title: 'typography/size/md',
      subtitle: 'typography/size/sm',
      description: 'typography/size/sm'
    },
    buttonSize: 'medium'
  },
  large: {
    width: 400,
    height: 'component/base/height/md',
    padding: 'component/base/padding/lg',
    spacing: 'component/base/gap/lg',
    borderRadius: 'component/base/radius/lg',
    fontSize: {
      title: 'typography/size/lg',
      subtitle: 'typography/size/md',
      description: 'typography/size/md'
    },
    buttonSize: 'large'
  }
} as const;

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