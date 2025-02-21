import { ToggleGroupSizeConfig, ToggleGroupStyle, ToggleGroupStyles, ToggleGroupVariantProps } from '../types/toggleGroup';

export const TOGGLE_GROUP_SIZES: ToggleGroupSizeConfig = {
  small: {
    root: {
      minWidth: '120',
      minHeight: '32',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    spacing: {
      item: 'component/base/gap/xs',
      row: 'component/base/gap/sm',
      column: 'component/base/gap/sm',
      section: 'component/base/gap/md'
    },
    padding: {
      x: 'component/base/padding/xs',
      y: 'component/base/padding/xs'
    }
  },
  medium: {
    root: {
      minWidth: '160',
      minHeight: '40',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    spacing: {
      item: 'component/base/gap/sm',
      row: 'component/base/gap/md',
      column: 'component/base/gap/md',
      section: 'component/base/gap/lg'
    },
    padding: {
      x: 'component/base/padding/sm',
      y: 'component/base/padding/sm'
    }
  },
  large: {
    root: {
      minWidth: '200',
      minHeight: '48',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    spacing: {
      item: 'component/base/gap/md',
      row: 'component/base/gap/lg',
      column: 'component/base/gap/lg',
      section: 'component/base/gap/xl'
    },
    padding: {
      x: 'component/base/padding/md',
      y: 'component/base/padding/md'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};

const baseContainerStyle = {
  background: baseStateStyle,
  border: baseStateStyle,
  shadow: {
    default: 'component/base/shadow/sm',
    hover: 'component/base/shadow/md',
    pressed: 'component/base/shadow/sm',
    disabled: 'component/base/shadow/none'
  }
};

const baseDividerStyle = {
  horizontal: {
    color: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    width: 'component/base/border/width/thin',
    spacing: 'component/base/gap/sm'
  },
  vertical: {
    color: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    width: 'component/base/border/width/thin',
    spacing: 'component/base/gap/sm'
  }
};

const baseToggleGroupStyle: ToggleGroupStyle = {
  root: {
    background: {
      default: 'surface/color/white',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: baseStateStyle,
    shadow: {
      default: 'component/base/shadow/sm',
      hover: 'component/base/shadow/md',
      pressed: 'component/base/shadow/sm',
      disabled: 'component/base/shadow/none'
    }
  },
  container: {
    default: baseContainerStyle,
    success: {
      ...baseContainerStyle,
      background: {
        default: 'status/success/ghost/hover',
        hover: 'status/success/ghost/pressed',
        pressed: 'status/success/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/success/default',
        hover: 'status/success/hover',
        pressed: 'status/success/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    error: {
      ...baseContainerStyle,
      background: {
        default: 'status/error/ghost/hover',
        hover: 'status/error/ghost/pressed',
        pressed: 'status/error/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/error/default',
        hover: 'status/error/hover',
        pressed: 'status/error/pressed',
        disabled: 'surface/color/disabled'
      }
    },
    warning: {
      ...baseContainerStyle,
      background: {
        default: 'status/warning/ghost/hover',
        hover: 'status/warning/ghost/pressed',
        pressed: 'status/warning/ghost/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'status/warning/default',
        hover: 'status/warning/hover',
        pressed: 'status/warning/pressed',
        disabled: 'surface/color/disabled'
      }
    }
  },
  divider: baseDividerStyle,
  transition: {
    duration: '150ms',
    timing: 'ease-in-out',
    properties: ['background', 'border', 'shadow', 'opacity']
  }
};

export const TOGGLE_GROUP_STYLES: ToggleGroupStyles = {
  filled: {
    ...baseToggleGroupStyle,
    root: {
      ...baseToggleGroupStyle.root,
      background: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      }
    }
  },
  outlined: {
    ...baseToggleGroupStyle,
    root: {
      ...baseToggleGroupStyle.root,
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      }
    }
  },
  ghost: {
    ...baseToggleGroupStyle,
    root: {
      ...baseToggleGroupStyle.root,
      background: {
        default: 'surface/color/transparent',
        hover: 'surface/color/hover',
        pressed: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/transparent',
        hover: 'surface/color/transparent',
        pressed: 'surface/color/transparent',
        disabled: 'surface/color/transparent'
      }
    }
  }
} as const;

export const TOGGLE_GROUP_VARIANTS: ToggleGroupVariantProps[] = [
  // Size variants
  {
    size: 'small',
    variant: 'filled',
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },
  {
    size: 'large',
    variant: 'filled',
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },

  // Variant styles
  {
    size: 'medium',
    variant: 'filled',
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },
  {
    size: 'medium',
    variant: 'outlined',
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },
  {
    size: 'medium',
    variant: 'ghost',
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },

  // Layout variants
  {
    size: 'medium',
    variant: 'filled',
    layout: {
      type: 'horizontal',
      align: 'center'
    },
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    layout: {
      type: 'vertical',
      align: 'stretch'
    },
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    layout: {
      type: 'grid',
      columns: 2,
      gap: 8
    },
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' },
      { id: '4', value: 'option4', label: 'Option 4' }
    ]
  },

  // Selection mode variants
  {
    size: 'medium',
    variant: 'filled',
    selection: {
      mode: 'single',
      defaultValue: 'option1'
    },
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    selection: {
      mode: 'multiple',
      defaultValue: ['option1', 'option2'],
      minSelect: 1,
      maxSelect: 2
    },
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },

  // With sections
  {
    size: 'medium',
    variant: 'filled',
    items: [
      {
        id: 'section1',
        label: 'Section 1',
        items: [
          { id: '1', value: 'option1', label: 'Option 1' },
          { id: '2', value: 'option2', label: 'Option 2' }
        ]
      },
      {
        id: 'section2',
        label: 'Section 2',
        items: [
          { id: '3', value: 'option3', label: 'Option 3' },
          { id: '4', value: 'option4', label: 'Option 4' }
        ]
      }
    ]
  },

  // With icons
  {
    size: 'medium',
    variant: 'filled',
    items: [
      { id: '1', value: 'option1', label: 'Option 1', icon: 'home' },
      { id: '2', value: 'option2', label: 'Option 2', icon: 'settings' },
      { id: '3', value: 'option3', label: 'Option 3', icon: 'user' }
    ]
  },

  // With validation
  {
    size: 'medium',
    variant: 'filled',
    selection: {
      mode: 'multiple',
      minSelect: 1,
      maxSelect: 2
    },
    validation: {
      required: true,
      minSelected: 1,
      maxSelected: 2
    },
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },

  // Disabled state
  {
    size: 'medium',
    variant: 'filled',
    disabled: true,
    items: [
      { id: '1', value: 'option1', label: 'Option 1' },
      { id: '2', value: 'option2', label: 'Option 2' },
      { id: '3', value: 'option3', label: 'Option 3' }
    ]
  },

  // Full featured
  {
    size: 'medium',
    variant: 'filled',
    layout: {
      type: 'grid',
      columns: 2,
      gap: 8,
      align: 'stretch'
    },
    selection: {
      mode: 'multiple',
      defaultValue: ['option1'],
      minSelect: 1,
      maxSelect: 2
    },
    validation: {
      required: true,
      minSelected: 1,
      maxSelected: 2
    },
    animation: {
      duration: 200,
      timing: 'ease-in-out'
    },
    items: [
      { id: '1', value: 'option1', label: 'Option 1', icon: 'home' },
      { id: '2', value: 'option2', label: 'Option 2', icon: 'settings' },
      { id: '3', value: 'option3', label: 'Option 3', icon: 'user' },
      { id: '4', value: 'option4', label: 'Option 4', icon: 'mail' }
    ]
  }
] as const; 