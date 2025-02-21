import { ComboboxSizeConfig, ComboboxStyle, ComboboxStyles, ComboboxVariantProps } from '../types/combobox';

export const COMBOBOX_SIZES: ComboboxSizeConfig = {
  small: {
    root: {
      height: 'component/base/height/sm',
      minWidth: '160',
      maxWidth: '320',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    input: {
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      caretWidth: '1',
      caretHeight: '12'
    },
    icon: {
      size: 'component/base/icon/sm',
      spacing: 'component/base/gap/xs'
    },
    dropdown: {
      maxHeight: '240',
      borderRadius: 'component/base/radius/sm',
      borderWidth: 'component/base/border/width/thin'
    },
    item: {
      height: 'component/base/height/sm',
      fontSize: 'text/body/sm',
      lineHeight: 'text/lineHeight/sm',
      spacing: 'component/base/gap/xs'
    },
    group: {
      titleSize: 'text/body/xs',
      titleSpacing: 'component/base/gap/xs',
      itemSpacing: 'component/base/gap/2xs'
    },
    spacing: {
      icon: 'component/base/gap/xs',
      clear: 'component/base/gap/xs',
      indicator: 'component/base/gap/xs',
      group: 'component/base/gap/sm'
    },
    padding: {
      x: 'component/base/padding/sm',
      y: 'component/base/padding/xs'
    }
  },
  medium: {
    root: {
      height: 'component/base/height/md',
      minWidth: '200',
      maxWidth: '400',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    input: {
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      caretWidth: '1',
      caretHeight: '14'
    },
    icon: {
      size: 'component/base/icon/md',
      spacing: 'component/base/gap/sm'
    },
    dropdown: {
      maxHeight: '320',
      borderRadius: 'component/base/radius/md',
      borderWidth: 'component/base/border/width/thin'
    },
    item: {
      height: 'component/base/height/md',
      fontSize: 'text/body/md',
      lineHeight: 'text/lineHeight/md',
      spacing: 'component/base/gap/sm'
    },
    group: {
      titleSize: 'text/body/sm',
      titleSpacing: 'component/base/gap/sm',
      itemSpacing: 'component/base/gap/xs'
    },
    spacing: {
      icon: 'component/base/gap/sm',
      clear: 'component/base/gap/sm',
      indicator: 'component/base/gap/sm',
      group: 'component/base/gap/md'
    },
    padding: {
      x: 'component/base/padding/md',
      y: 'component/base/padding/sm'
    }
  },
  large: {
    root: {
      height: 'component/base/height/lg',
      minWidth: '240',
      maxWidth: '480',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    input: {
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      caretWidth: '2',
      caretHeight: '16'
    },
    icon: {
      size: 'component/base/icon/lg',
      spacing: 'component/base/gap/md'
    },
    dropdown: {
      maxHeight: '400',
      borderRadius: 'component/base/radius/lg',
      borderWidth: 'component/base/border/width/thin'
    },
    item: {
      height: 'component/base/height/lg',
      fontSize: 'text/body/lg',
      lineHeight: 'text/lineHeight/lg',
      spacing: 'component/base/gap/md'
    },
    group: {
      titleSize: 'text/body/md',
      titleSpacing: 'component/base/gap/md',
      itemSpacing: 'component/base/gap/sm'
    },
    spacing: {
      icon: 'component/base/gap/md',
      clear: 'component/base/gap/md',
      indicator: 'component/base/gap/md',
      group: 'component/base/gap/lg'
    },
    padding: {
      x: 'component/base/padding/lg',
      y: 'component/base/padding/md'
    }
  }
} as const;

const baseStateStyle = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  focused: 'surface/color/hover',
  disabled: 'surface/color/disabled'
};

const baseInputStyle = {
  background: baseStateStyle,
  text: {
    default: 'text/color/default',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  placeholder: {
    default: 'text/color/muted',
    hover: 'text/color/muted',
    focused: 'text/color/muted',
    disabled: 'text/color/disabled'
  },
  caret: {
    default: 'text/color/default',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  },
  border: baseStateStyle
};

const baseIconStyle = {
  color: {
    default: 'text/color/secondary',
    hover: 'text/color/default',
    focused: 'text/color/default',
    disabled: 'text/color/disabled'
  }
};

const baseDropdownStyle = {
  background: {
    default: 'surface/color/white',
    hover: 'surface/color/white',
    focused: 'surface/color/white',
    disabled: 'surface/color/disabled'
  },
  border: baseStateStyle,
  shadow: {
    default: 'component/base/shadow/md',
    hover: 'component/base/shadow/md',
    focused: 'component/base/shadow/md',
    disabled: 'component/base/shadow/none'
  },
  scrollbar: {
    thumb: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      focused: 'surface/color/hover',
      disabled: 'surface/color/disabled'
    },
    track: {
      default: 'surface/color/white',
      hover: 'surface/color/white',
      focused: 'surface/color/white',
      disabled: 'surface/color/disabled'
    }
  }
};

const baseItemStyle = {
  background: {
    default: {
      default: 'surface/color/transparent',
      hover: 'surface/color/hover',
      focused: 'surface/color/hover',
      disabled: 'surface/color/disabled'
    },
    selected: {
      default: 'status/info/ghost/hover',
      hover: 'status/info/ghost/pressed',
      focused: 'status/info/ghost/pressed',
      disabled: 'surface/color/disabled'
    },
    active: {
      default: 'status/info/ghost/pressed',
      hover: 'status/info/ghost/pressed',
      focused: 'status/info/ghost/pressed',
      disabled: 'surface/color/disabled'
    }
  },
  text: {
    default: {
      default: 'text/color/default',
      hover: 'text/color/default',
      focused: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    selected: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      focused: 'status/info/hover',
      disabled: 'text/color/disabled'
    },
    active: {
      default: 'status/info/hover',
      hover: 'status/info/hover',
      focused: 'status/info/hover',
      disabled: 'text/color/disabled'
    }
  },
  icon: {
    default: {
      default: 'text/color/secondary',
      hover: 'text/color/default',
      focused: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    selected: {
      default: 'status/info/default',
      hover: 'status/info/hover',
      focused: 'status/info/hover',
      disabled: 'text/color/disabled'
    },
    active: {
      default: 'status/info/hover',
      hover: 'status/info/hover',
      focused: 'status/info/hover',
      disabled: 'text/color/disabled'
    }
  }
};

const baseGroupStyle = {
  title: {
    default: 'text/color/secondary',
    hover: 'text/color/secondary',
    focused: 'text/color/secondary',
    disabled: 'text/color/disabled'
  },
  divider: {
    default: 'surface/color/default',
    hover: 'surface/color/default',
    focused: 'surface/color/default',
    disabled: 'surface/color/disabled'
  }
};

const baseComboboxStyle: ComboboxStyle = {
  input: baseInputStyle,
  icon: baseIconStyle,
  dropdown: baseDropdownStyle,
  item: baseItemStyle,
  group: baseGroupStyle,
  transition: {
    duration: '150ms',
    timing: 'ease-in-out',
    properties: ['background', 'border', 'shadow', 'color']
  }
};

export const COMBOBOX_STYLES: ComboboxStyles = {
  filled: {
    default: baseComboboxStyle,
    success: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    error: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    warning: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          focused: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    }
  },
  outlined: {
    default: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        }
      }
    },
    success: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/success/default',
          hover: 'status/success/hover',
          focused: 'status/success/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    error: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/error/default',
          hover: 'status/error/hover',
          focused: 'status/error/hover',
          disabled: 'surface/color/disabled'
        }
      }
    },
    warning: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/white',
          hover: 'surface/color/white',
          focused: 'surface/color/white',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'status/warning/default',
          hover: 'status/warning/hover',
          focused: 'status/warning/hover',
          disabled: 'surface/color/disabled'
        }
      }
    }
  },
  ghost: {
    default: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          focused: 'surface/color/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    success: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/success/ghost/hover',
          focused: 'status/success/ghost/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    error: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/error/ghost/hover',
          focused: 'status/error/ghost/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    },
    warning: {
      ...baseComboboxStyle,
      input: {
        ...baseComboboxStyle.input,
        background: {
          default: 'surface/color/transparent',
          hover: 'status/warning/ghost/hover',
          focused: 'status/warning/ghost/hover',
          disabled: 'surface/color/disabled'
        },
        border: {
          default: 'surface/color/transparent',
          hover: 'surface/color/transparent',
          focused: 'surface/color/transparent',
          disabled: 'surface/color/transparent'
        }
      }
    }
  }
} as const;

export const COMBOBOX_VARIANTS: ComboboxVariantProps[] = [
  // Size variants
  {
    size: 'small',
    variant: 'filled',
    placeholder: 'Select option...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },
  {
    size: 'medium',
    variant: 'filled',
    placeholder: 'Select option...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },
  {
    size: 'large',
    variant: 'filled',
    placeholder: 'Select option...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },

  // Variant styles
  {
    variant: 'filled',
    placeholder: 'Filled combobox...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },
  {
    variant: 'outlined',
    placeholder: 'Outlined combobox...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },
  {
    variant: 'ghost',
    placeholder: 'Ghost combobox...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },

  // Status variants
  {
    variant: 'filled',
    status: 'default',
    placeholder: 'Default status...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },
  {
    variant: 'filled',
    status: 'success',
    placeholder: 'Success status...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },
  {
    variant: 'filled',
    status: 'error',
    placeholder: 'Error status...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },
  {
    variant: 'filled',
    status: 'warning',
    placeholder: 'Warning status...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },

  // With icons
  {
    variant: 'filled',
    icon: {
      name: 'search'
    },
    placeholder: 'Search...',
    options: [
      { value: '1', label: 'Option 1', icon: { name: 'home' } },
      { value: '2', label: 'Option 2', icon: { name: 'settings' } },
      { value: '3', label: 'Option 3', icon: { name: 'user' } }
    ]
  },

  // With groups
  {
    variant: 'filled',
    placeholder: 'Select option...',
    options: [
      {
        label: 'Group 1',
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' }
        ]
      },
      {
        label: 'Group 2',
        options: [
          { value: '3', label: 'Option 3' },
          { value: '4', label: 'Option 4' }
        ]
      }
    ]
  },

  // With filtering
  {
    variant: 'filled',
    placeholder: 'Search options...',
    searchable: true,
    filter: {
      enabled: true,
      mode: 'contains',
      highlight: true
    },
    options: [
      { value: '1', label: 'Apple' },
      { value: '2', label: 'Banana' },
      { value: '3', label: 'Orange' }
    ]
  },

  // With async loading
  {
    variant: 'filled',
    placeholder: 'Search users...',
    searchable: true,
    async: {
      enabled: true,
      url: 'https://api.example.com/users',
      debounce: 300
    },
    loading: {
      state: false,
      indicator: {
        name: 'loading'
      }
    }
  },

  // With validation
  {
    variant: 'filled',
    placeholder: 'Required field...',
    validation: {
      required: true
    },
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' }
    ]
  },

  // Full featured
  {
    size: 'medium',
    variant: 'filled',
    status: 'default',
    placeholder: 'Search users...',
    icon: {
      name: 'search'
    },
    searchable: true,
    clearable: true,
    filter: {
      enabled: true,
      mode: 'contains',
      highlight: true,
      debounce: 300
    },
    async: {
      enabled: true,
      url: 'https://api.example.com/users',
      cache: true,
      retry: {
        count: 3,
        delay: 1000
      }
    },
    loading: {
      state: false,
      indicator: {
        name: 'loading'
      },
      text: 'Loading...'
    },
    validation: {
      required: true,
      validate: (value) => value.length >= 3 || 'Min 3 characters required'
    },
    placement: 'bottom-start',
    trigger: 'click',
    virtualized: true,
    options: [
      {
        label: 'Recent',
        options: [
          { value: '1', label: 'John Doe', icon: { name: 'user' } },
          { value: '2', label: 'Jane Smith', icon: { name: 'user' } }
        ]
      },
      {
        label: 'All Users',
        options: [
          { value: '3', label: 'Alice Johnson', icon: { name: 'user' } },
          { value: '4', label: 'Bob Wilson', icon: { name: 'user' } }
        ]
      }
    ]
  }
] as const; 