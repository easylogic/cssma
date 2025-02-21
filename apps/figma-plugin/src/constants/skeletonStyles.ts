import { SkeletonSizeConfig, SkeletonStyle, SkeletonStyles, SkeletonVariantProps } from '../types/skeleton';

export const SKELETON_SIZES: SkeletonSizeConfig = {
  small: {
    text: {
      width: '120',
      height: '16',
      borderRadius: 'component/base/radius/sm',
      spacing: 'component/base/gap/xs',
      lines: {
        count: 3,
        lastWidth: '80%'
      }
    },
    circular: {
      size: '32',
      borderRadius: 'component/base/radius/pill'
    },
    rectangular: {
      width: '120',
      height: '80',
      borderRadius: 'component/base/radius/sm'
    }
  },
  medium: {
    text: {
      width: '200',
      height: '20',
      borderRadius: 'component/base/radius/md',
      spacing: 'component/base/gap/sm',
      lines: {
        count: 3,
        lastWidth: '60%'
      }
    },
    circular: {
      size: '48',
      borderRadius: 'component/base/radius/pill'
    },
    rectangular: {
      width: '200',
      height: '120',
      borderRadius: 'component/base/radius/md'
    }
  },
  large: {
    text: {
      width: '320',
      height: '24',
      borderRadius: 'component/base/radius/lg',
      spacing: 'component/base/gap/md',
      lines: {
        count: 4,
        lastWidth: '40%'
      }
    },
    circular: {
      size: '64',
      borderRadius: 'component/base/radius/pill'
    },
    rectangular: {
      width: '320',
      height: '200',
      borderRadius: 'component/base/radius/lg'
    }
  }
} as const;

const baseSkeletonStyle: SkeletonStyle = {
  root: {
    background: {
      base: 'surface/color/default',
      highlight: 'surface/color/hover'
    },
    opacity: {
      base: '0.1',
      highlight: '0.05'
    }
  },
  animation: {
    pulse: {
      duration: '1.5s',
      timing: 'ease-in-out',
      delay: '0s'
    },
    wave: {
      duration: '1.5s',
      timing: 'linear',
      delay: '0s',
      gradient: {
        from: 'surface/color/transparent',
        via: 'surface/color/hover',
        to: 'surface/color/transparent'
      }
    }
  }
};

export const SKELETON_STYLES: SkeletonStyles = {
  text: baseSkeletonStyle,
  circular: baseSkeletonStyle,
  rectangular: baseSkeletonStyle,
  custom: baseSkeletonStyle
} as const;

export const SKELETON_VARIANTS: SkeletonVariantProps[] = [
  // Text variants
  {
    variant: 'text',
    size: 'small',
    text: {
      lines: 3,
      lastLineWidth: '80%'
    }
  },
  {
    variant: 'text',
    size: 'medium',
    text: {
      lines: 3,
      lastLineWidth: '60%'
    }
  },
  {
    variant: 'text',
    size: 'large',
    text: {
      lines: 4,
      lastLineWidth: '40%'
    }
  },

  // Circular variants
  {
    variant: 'circular',
    size: 'small'
  },
  {
    variant: 'circular',
    size: 'medium'
  },
  {
    variant: 'circular',
    size: 'large'
  },

  // Rectangular variants
  {
    variant: 'rectangular',
    size: 'small'
  },
  {
    variant: 'rectangular',
    size: 'medium'
  },
  {
    variant: 'rectangular',
    size: 'large'
  },

  // Animation variants
  {
    variant: 'rectangular',
    animation: {
      type: 'pulse',
      duration: 1500,
      iterations: Infinity
    }
  },
  {
    variant: 'rectangular',
    animation: {
      type: 'wave',
      duration: 1500,
      iterations: Infinity
    }
  },

  // Custom shape variants
  {
    variant: 'custom',
    custom: {
      width: 200,
      height: 200,
      borderRadius: 16,
      shape: 'custom',
      path: 'M10 10 H 90 V 90 H 10 L 10 10'
    }
  },

  // Complex layout examples
  {
    variant: 'rectangular',
    size: 'medium',
    animation: {
      type: 'wave'
    },
    rectangular: {
      width: '100%',
      height: 200,
      borderRadius: 8
    }
  },

  // Card skeleton
  {
    variant: 'rectangular',
    rectangular: {
      width: 320,
      height: 400,
      borderRadius: 16
    },
    animation: {
      type: 'pulse',
      duration: 1500,
      iterations: Infinity
    }
  },

  // Avatar with text skeleton
  {
    variant: 'circular',
    circular: {
      size: 40
    },
    animation: {
      type: 'pulse'
    }
  },

  // List item skeleton
  {
    variant: 'rectangular',
    rectangular: {
      width: '100%',
      height: 60,
      borderRadius: 8
    },
    animation: {
      type: 'wave'
    }
  },

  // Image placeholder skeleton
  {
    variant: 'rectangular',
    rectangular: {
      width: 240,
      height: 160,
      borderRadius: 8
    },
    animation: {
      type: 'pulse'
    }
  },

  // Form field skeleton
  {
    variant: 'rectangular',
    rectangular: {
      width: '100%',
      height: 40,
      borderRadius: 4
    },
    animation: {
      type: 'pulse'
    }
  }
] as const; 