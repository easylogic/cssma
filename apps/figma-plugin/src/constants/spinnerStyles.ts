import { SpinnerSizeConfig, SpinnerStyle, SpinnerStyles, SpinnerVariantProps } from '../types/spinner';

export const SPINNER_SIZES: SpinnerSizeConfig = {
  xs: {
    size: '16',
    thickness: '2',
    gap: 'component/base/gap/2xs',
    count: {
      dots: 3,
      bars: 3,
      grid: 4,
      rings: 2
    },
    item: {
      size: '4',
      gap: 'component/base/gap/2xs'
    }
  },
  sm: {
    size: '24',
    thickness: '2',
    gap: 'component/base/gap/xs',
    count: {
      dots: 4,
      bars: 4,
      grid: 9,
      rings: 2
    },
    item: {
      size: '6',
      gap: 'component/base/gap/xs'
    }
  },
  md: {
    size: '32',
    thickness: '3',
    gap: 'component/base/gap/sm',
    count: {
      dots: 5,
      bars: 5,
      grid: 9,
      rings: 3
    },
    item: {
      size: '8',
      gap: 'component/base/gap/sm'
    }
  },
  lg: {
    size: '48',
    thickness: '4',
    gap: 'component/base/gap/md',
    count: {
      dots: 6,
      bars: 6,
      grid: 16,
      rings: 3
    },
    item: {
      size: '12',
      gap: 'component/base/gap/md'
    }
  },
  xl: {
    size: '64',
    thickness: '5',
    gap: 'component/base/gap/lg',
    count: {
      dots: 7,
      bars: 7,
      grid: 16,
      rings: 4
    },
    item: {
      size: '16',
      gap: 'component/base/gap/lg'
    }
  }
} as const;

const baseSpinnerStyle: SpinnerStyle = {
  root: {
    color: {
      default: 'surface/color/default',
      primary: 'status/info/default',
      success: 'status/success/default',
      error: 'status/error/default',
      warning: 'status/warning/default'
    },
    opacity: {
      active: '1',
      inactive: '0.3'
    }
  },
  track: {
    color: {
      default: 'surface/color/default',
      primary: 'status/info/default',
      success: 'status/success/default',
      error: 'status/error/default',
      warning: 'status/warning/default'
    },
    opacity: '0.2'
  },
  animation: {
    circle: {
      duration: '0.75s',
      timing: 'linear',
      iterations: Infinity
    },
    dots: {
      duration: '0.6s',
      timing: 'ease-in-out',
      delay: '0.1s',
      iterations: Infinity
    },
    bars: {
      duration: '1s',
      timing: 'ease-in-out',
      delay: '0.1s',
      iterations: Infinity
    },
    grid: {
      duration: '1.2s',
      timing: 'ease-in-out',
      delay: '0.1s',
      iterations: Infinity
    },
    rings: {
      duration: '1.5s',
      timing: 'ease-in-out',
      delay: '0.2s',
      iterations: Infinity
    }
  }
};

export const SPINNER_STYLES: SpinnerStyles = {
  circle: baseSpinnerStyle,
  dots: baseSpinnerStyle,
  bars: baseSpinnerStyle,
  grid: baseSpinnerStyle,
  rings: baseSpinnerStyle
} as const;

export const SPINNER_VARIANTS: SpinnerVariantProps[] = [
  // Size variants
  {
    variant: 'circle',
    size: 'xs'
  },
  {
    variant: 'circle',
    size: 'sm'
  },
  {
    variant: 'circle',
    size: 'md'
  },
  {
    variant: 'circle',
    size: 'lg'
  },
  {
    variant: 'circle',
    size: 'xl'
  },

  // Variant styles
  {
    variant: 'circle',
    size: 'md'
  },
  {
    variant: 'dots',
    size: 'md'
  },
  {
    variant: 'bars',
    size: 'md'
  },
  {
    variant: 'grid',
    size: 'md'
  },
  {
    variant: 'rings',
    size: 'md'
  },

  // Status variants
  {
    variant: 'circle',
    size: 'md',
    status: 'default'
  },
  {
    variant: 'circle',
    size: 'md',
    status: 'primary'
  },
  {
    variant: 'circle',
    size: 'md',
    status: 'success'
  },
  {
    variant: 'circle',
    size: 'md',
    status: 'error'
  },
  {
    variant: 'circle',
    size: 'md',
    status: 'warning'
  },

  // With track
  {
    variant: 'circle',
    size: 'md',
    track: {
      visible: true,
      thickness: 2,
      opacity: 0.2
    }
  },

  // With label
  {
    variant: 'circle',
    size: 'md',
    label: {
      text: 'Loading...',
      position: 'right',
      spacing: 8
    }
  },

  // With progress
  {
    variant: 'circle',
    size: 'md',
    progress: {
      value: 75,
      min: 0,
      max: 100,
      showValue: true,
      format: (value) => `${value}%`
    }
  },

  // Custom animation
  {
    variant: 'circle',
    size: 'md',
    animation: {
      duration: 2000,
      timing: 'ease-in-out',
      direction: 'alternate',
      iterations: Infinity
    }
  },

  // Custom colors
  {
    variant: 'circle',
    size: 'md',
    color: '#6366F1',
    secondaryColor: '#E0E7FF'
  },

  // Reverse direction
  {
    variant: 'circle',
    size: 'md',
    reverse: true
  },

  // Custom speed
  {
    variant: 'circle',
    size: 'md',
    speed: 2
  }
] as const; 