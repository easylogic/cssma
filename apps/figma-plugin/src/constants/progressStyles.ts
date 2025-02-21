import { ProgressSizeConfig, ProgressStyle, ProgressStyles, ProgressVariantProps } from '../types/progress';

export const PROGRESS_SIZES: ProgressSizeConfig = {
  small: {
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    spacing: {
      label: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      extra: 'component/base/gap/xs'
    },
    linear: {
      height: 'component/base/height/xs',
      borderRadius: 'component/base/radius/sm',
      steps: {
        size: 'component/base/gap/xs',
        gap: 'component/base/gap/2xs'
      }
    },
    circular: {
      size: 'component/base/height/lg',
      thickness: 'component/base/border/width/thin',
      gap: 'component/base/gap/xs'
    },
    label: {
      fontSize: 'text/body/xs',
      lineHeight: 'text/body/xs'
    },
    description: {
      fontSize: 'text/body/2xs',
      lineHeight: 'text/body/2xs'
    }
  },
  medium: {
    fontSize: 'text/body/md',
    lineHeight: 'text/body/md',
    spacing: {
      label: 'component/base/gap/sm',
      icon: 'component/base/gap/xs',
      extra: 'component/base/gap/sm'
    },
    linear: {
      height: 'component/base/height/sm',
      borderRadius: 'component/base/radius/md',
      steps: {
        size: 'component/base/gap/sm',
        gap: 'component/base/gap/xs'
      }
    },
    circular: {
      size: 'component/base/height/xl',
      thickness: 'component/base/border/width/thick',
      gap: 'component/base/gap/sm'
    },
    label: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/body/sm'
    },
    description: {
      fontSize: 'text/body/xs',
      lineHeight: 'text/body/xs'
    }
  },
  large: {
    fontSize: 'text/body/lg',
    lineHeight: 'text/body/lg',
    spacing: {
      label: 'component/base/gap/md',
      icon: 'component/base/gap/sm',
      extra: 'component/base/gap/md'
    },
    linear: {
      height: 'component/base/height/md',
      borderRadius: 'component/base/radius/lg',
      steps: {
        size: 'component/base/gap/md',
        gap: 'component/base/gap/sm'
      }
    },
    circular: {
      size: 'component/base/height/2xl',
      thickness: 'component/base/border/width/thicker',
      gap: 'component/base/gap/md'
    },
    label: {
      fontSize: 'text/body/md',
      lineHeight: 'text/body/md'
    },
    description: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/body/sm'
    }
  }
} as const;

const baseStateStyle: ProgressStateStyle = {
  default: 'surface/color/default',
  active: 'surface/color/hover',
  disabled: 'surface/color/disabled'
};

const baseTrackStyle: ProgressTrackStyle = {
  background: baseStateStyle,
  border: {
    default: 'surface/color/default',
    active: 'surface/color/hover',
    disabled: 'surface/color/disabled'
  }
};

const baseIndicatorStyle: ProgressIndicatorStyle = {
  background: {
    default: 'status/info/default',
    active: 'status/info/hover',
    disabled: 'surface/color/disabled'
  },
  border: {
    default: 'status/info/default',
    active: 'status/info/hover',
    disabled: 'surface/color/disabled'
  }
};

const baseTextStyle: ProgressTextStyle = {
  color: {
    default: 'text/color/default',
    active: 'text/color/default',
    disabled: 'text/color/disabled'
  }
};

export const PROGRESS_STYLES: ProgressStyles = {
  line: {
    root: {
      background: {
        default: 'surface/color/white',
        active: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        active: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    track: {
      default: baseTrackStyle,
      success: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    indicator: {
      default: baseIndicatorStyle,
      success: {
        background: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        background: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        background: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    text: {
      value: baseTextStyle,
      label: baseTextStyle,
      description: {
        color: {
          default: 'text/color/secondary',
          active: 'text/color/secondary',
          disabled: 'text/color/disabled'
        }
      }
    },
    steps: {
      active: {
        default: 'status/info/default',
        active: 'status/info/hover',
        disabled: 'surface/color/disabled'
      },
      completed: {
        default: 'status/success/default',
        active: 'status/success/hover',
        disabled: 'surface/color/disabled'
      },
      remaining: {
        default: 'surface/color/default',
        active: 'surface/color/hover',
        disabled: 'surface/color/disabled'
      }
    }
  },
  circle: {
    root: {
      background: {
        default: 'surface/color/white',
        active: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        active: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    track: {
      default: baseTrackStyle,
      success: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    indicator: {
      default: {
        ...baseIndicatorStyle,
        gradient: {
          from: 'status/info/default',
          to: 'status/info/hover',
          angle: 90
        }
      },
      success: {
        background: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        },
        gradient: {
          from: 'status/success/default',
          to: 'status/success/hover',
          angle: 90
        }
      },
      error: {
        background: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        },
        gradient: {
          from: 'status/error/default',
          to: 'status/error/hover',
          angle: 90
        }
      },
      warning: {
        background: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        },
        gradient: {
          from: 'status/warning/default',
          to: 'status/warning/hover',
          angle: 90
        }
      }
    },
    text: {
      value: {
        color: {
          default: 'text/color/default',
          active: 'text/color/default',
          disabled: 'text/color/disabled'
        },
        background: {
          default: 'surface/color/white',
          active: 'surface/color/white',
          disabled: 'surface/color/disabled'
        }
      },
      label: baseTextStyle,
      description: {
        color: {
          default: 'text/color/secondary',
          active: 'text/color/secondary',
          disabled: 'text/color/disabled'
        }
      }
    }
  },
  dashboard: {
    root: {
      background: {
        default: 'surface/color/white',
        active: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        active: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    },
    track: {
      default: baseTrackStyle,
      success: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      },
      error: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      },
      warning: {
        background: {
          default: 'surface/color/default',
          active: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    indicator: {
      default: {
        ...baseIndicatorStyle,
        gradient: {
          from: 'status/info/default',
          to: 'status/info/hover',
          angle: -90
        }
      },
      success: {
        background: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          active: 'status/success/hover',
          disabled: 'surface/color/disabled'
        },
        gradient: {
          from: 'status/success/default',
          to: 'status/success/hover',
          angle: -90
        }
      },
      error: {
        background: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          active: 'status/error/hover',
          disabled: 'surface/color/disabled'
        },
        gradient: {
          from: 'status/error/default',
          to: 'status/error/hover',
          angle: -90
        }
      },
      warning: {
        background: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          active: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        },
        gradient: {
          from: 'status/warning/default',
          to: 'status/warning/hover',
          angle: -90
        }
      }
    },
    text: {
      value: {
        color: {
          default: 'text/color/default',
          active: 'text/color/default',
          disabled: 'text/color/disabled'
        },
        background: {
          default: 'surface/color/white',
          active: 'surface/color/white',
          disabled: 'surface/color/disabled'
        }
      },
      label: baseTextStyle,
      description: {
        color: {
          default: 'text/color/secondary',
          active: 'text/color/secondary',
          disabled: 'text/color/disabled'
        }
      }
    }
  }
} as const;

export const PROGRESS_VARIANTS: ProgressVariantProps[] = [
  // Size variants
  { 
    size: 'small',
    variant: 'line',
    value: 50,
    showValue: true
  },
  { 
    size: 'medium',
    variant: 'line',
    value: 50,
    showValue: true
  },
  { 
    size: 'large',
    variant: 'line',
    value: 50,
    showValue: true
  },

  // Variant styles
  { 
    size: 'medium',
    variant: 'line',
    value: 50,
    showValue: true
  },
  { 
    size: 'medium',
    variant: 'circle',
    value: 50,
    showValue: true
  },
  { 
    size: 'medium',
    variant: 'dashboard',
    value: 50,
    showValue: true,
    gapDegree: 75,
    gapPosition: 'bottom'
  },

  // Status variants
  { 
    size: 'medium',
    variant: 'line',
    status: 'default',
    value: 50,
    showValue: true
  },
  { 
    size: 'medium',
    variant: 'line',
    status: 'success',
    value: 100,
    showValue: true
  },
  { 
    size: 'medium',
    variant: 'line',
    status: 'error',
    value: 30,
    showValue: true
  },
  { 
    size: 'medium',
    variant: 'line',
    status: 'warning',
    value: 70,
    showValue: true
  },

  // With steps
  { 
    size: 'medium',
    variant: 'line',
    value: 60,
    showValue: true,
    steps: {
      count: 5,
      current: 3,
      size: 20,
      gap: 4,
      clickable: true
    }
  },

  // With format
  { 
    size: 'medium',
    variant: 'circle',
    value: 75.5,
    showValue: true,
    format: {
      type: 'custom',
      formatter: (value) => `${value.toFixed(1)}%`,
      prefix: '↑',
      suffix: '/'
    }
  },

  // With gradient
  { 
    size: 'medium',
    variant: 'circle',
    value: 50,
    showValue: true,
    gradient: {
      from: 'status/info/default',
      to: 'status/success/default',
      angle: 90,
      stops: [
        { offset: 0, color: 'status/info/default' },
        { offset: 100, color: 'status/success/default' }
      ]
    }
  },

  // With success segment
  { 
    size: 'medium',
    variant: 'line',
    value: 70,
    showValue: true,
    success: {
      value: 30,
      icon: { name: 'check' },
      color: 'status/success/default'
    }
  },

  // Indeterminate state
  { 
    size: 'medium',
    variant: 'line',
    indeterminate: true,
    animated: true
  },

  // Complex combinations
  { 
    size: 'large',
    variant: 'dashboard',
    value: 85,
    total: 100,
    showValue: true,
    status: 'success',
    label: 'Progress',
    description: 'Detailed description',
    icon: { name: 'chart' },
    strokeLinecap: 'round',
    gapDegree: 75,
    gapPosition: 'bottom',
    format: {
      type: 'custom',
      formatter: (value, total) => `${value}/${total}`,
      prefix: '↑'
    },
    gradient: {
      from: 'status/success/default',
      to: 'status/success/hover',
      angle: -90
    },
    animated: true
  }
] as const; 