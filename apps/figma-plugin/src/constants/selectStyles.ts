import { SelectSizeConfig, SelectStyle, SelectStyles, SelectVariantProps } from '../types/select';

export const SELECT_SIZES: SelectSizeConfig = {
  small: {
    height: 'component/base/height/xs',
    fontSize: 'text/body/sm',
    lineHeight: 'text/body/sm',
    iconSize: 'component/base/icon/xs',
    spacing: {
      item: 'component/base/gap/xs',
      icon: 'component/base/gap/2xs',
      tag: 'component/base/gap/2xs'
    },
    padding: {
      horizontal: 'component/base/padding/xs',
      vertical: 'component/base/padding/xs'
    },
    borderRadius: 'component/base/radius/sm',
    borderWidth: 'component/base/border/width/thin',
    menu: {
      maxHeight: '200',
      itemHeight: 'component/base/height/xs',
      padding: {
        horizontal: 'component/base/padding/xs',
        vertical: 'component/base/padding/xs'
      }
    }
  },
  medium: {
    height: 'component/base/height/sm',
    fontSize: 'text/body/md',
    lineHeight: 'text/body/md',
    iconSize: 'component/base/icon/sm',
    spacing: {
      item: 'component/base/gap/sm',
      icon: 'component/base/gap/xs',
      tag: 'component/base/gap/xs'
    },
    padding: {
      horizontal: 'component/base/padding/sm',
      vertical: 'component/base/padding/sm'
    },
    borderRadius: 'component/base/radius/md',
    borderWidth: 'component/base/border/width/thin',
    menu: {
      maxHeight: '280',
      itemHeight: 'component/base/height/sm',
      padding: {
        horizontal: 'component/base/padding/sm',
        vertical: 'component/base/padding/sm'
      }
    }
  },
  large: {
    height: 'component/base/height/md',
    fontSize: 'text/body/lg',
    lineHeight: 'text/body/lg',
    iconSize: 'component/base/icon/md',
    spacing: {
      item: 'component/base/gap/md',
      icon: 'component/base/gap/sm',
      tag: 'component/base/gap/sm'
    },
    padding: {
      horizontal: 'component/base/padding/md',
      vertical: 'component/base/padding/md'
    },
    borderRadius: 'component/base/radius/lg',
    borderWidth: 'component/base/border/width/thin',
    menu: {
      maxHeight: '360',
      itemHeight: 'component/base/height/md',
      padding: {
        horizontal: 'component/base/padding/md',
        vertical: 'component/base/padding/md'
      }
    }
  }
} as const;

export const SELECT_STYLES: SelectStyles = {
  'default': {
    root: {
      background: {
        default: 'surface/color/white',
        hover: 'surface/color/hover',
        focused: 'surface/color/white',
        disabled: 'surface/color/disabled'
      },
      border: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        focused: 'status/info/default',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        focused: 'text/color/default',
        disabled: 'text/color/disabled'
      }
    },
    trigger: {
      icon: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        focused: 'status/info/default',
        disabled: 'text/color/disabled'
      },
      placeholder: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      clearButton: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        focused: 'text/color/default',
        disabled: 'text/color/disabled'
      }
    },
    menu: {
      background: 'surface/color/white',
      border: 'surface/color/default',
      shadow: 'component/base/shadow/md',
      item: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          selected: 'status/info/ghost/hover',
          disabled: 'surface/color/disabled'
        },
        text: {
          default: 'text/color/default',
          hover: 'text/color/default',
          selected: 'status/info/default',
          disabled: 'text/color/disabled'
        },
        icon: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          selected: 'status/info/default',
          disabled: 'text/color/disabled'
        },
        checkbox: {
          default: 'text/color/secondary',
          hover: 'text/color/default',
          selected: 'status/info/default',
          disabled: 'text/color/disabled'
        }
      },
      group: {
        header: {
          text: 'text/color/secondary',
          background: 'surface/color/subtle'
        },
        divider: 'surface/color/default'
      }
    },
    tag: {
      background: {
        default: 'surface/color/default',
        hover: 'surface/color/hover',
        focused: 'surface/color/pressed',
        disabled: 'surface/color/disabled'
      },
      text: {
        default: 'text/color/default',
        hover: 'text/color/default',
        focused: 'text/color/default',
        disabled: 'text/color/disabled'
      },
      removeButton: {
        default: 'text/color/secondary',
        hover: 'text/color/default',
        focused: 'text/color/default',
        disabled: 'text/color/disabled'
      }
    },
    loading: {
      spinner: {
        default: 'text/color/secondary',
        hover: 'text/color/secondary',
        focused: 'text/color/secondary',
        disabled: 'text/color/disabled'
      },
      overlay: {
        default: 'surface/color/overlay',
        hover: 'surface/color/overlay',
        focused: 'surface/color/overlay',
        disabled: 'surface/color/overlay'
      }
    }
  },
  'error': {
    background: {
      default: 'surface/color/white',
      hover: 'surface/color/hover',
      focused: 'surface/color/white',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'status/error/default',
      hover: 'status/error/hover',
      focused: 'status/error/default',
      disabled: 'surface/color/disabled'
    },
    text: {
      default: 'text/color/default',
      placeholder: 'text/color/secondary',
      disabled: 'text/color/disabled'
    },
    icon: {
      default: 'text/color/secondary',
      hover: 'text/color/default',
      pressed: 'text/color/default',
      disabled: 'text/color/disabled'
    },
    menu: {
      background: 'surface/color/white',
      border: 'surface/color/default',
      shadow: 'component/base/shadow/md',
      item: {
        background: {
          default: 'surface/color/transparent',
          hover: 'surface/color/hover',
          selected: 'status/error/ghost/hover',
          disabled: 'surface/color/disabled'
        },
        text: {
          default: 'text/color/default',
          hover: 'text/color/default',
          selected: 'status/error/default',
          disabled: 'text/color/disabled'
        }
      }
    }
  }
} as const;

export const SELECT_VARIANTS: SelectVariantProps[] = [
  // Size variants
  { 
    size: 'small', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Select option',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]
  },
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Select option',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]
  },
  { 
    size: 'large', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Select option',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' }
    ]
  },

  // With icons
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Select country',
    options: [
      { label: 'United States', value: 'us', icon: { name: 'flag-us' } },
      { label: 'United Kingdom', value: 'uk', icon: { name: 'flag-uk' } },
      { label: 'South Korea', value: 'kr', icon: { name: 'flag-kr' } }
    ]
  },

  // With groups
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Select fruit',
    groups: [
      {
        label: 'Citrus',
        options: [
          { label: 'Orange', value: 'orange' },
          { label: 'Lemon', value: 'lemon' }
        ]
      },
      {
        label: 'Berries',
        options: [
          { label: 'Strawberry', value: 'strawberry' },
          { label: 'Blueberry', value: 'blueberry' }
        ]
      }
    ]
  },

  // Multiple selection
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Select multiple',
    multiple: true,
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ],
    tag: {
      maxCount: 2,
      showCount: true,
      closable: true
    }
  },

  // With search
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Search options',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ],
    search: {
      enabled: true,
      placeholder: 'Type to search'
    }
  },

  // Loading state
  { 
    size: 'medium', 
    variant: 'filled', 
    status: 'default',
    placeholder: 'Loading options',
    loading: {
      state: true,
      text: 'Loading...',
      indicator: { name: 'spinner' }
    }
  },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'filled',
    status: 'default',
    placeholder: 'Select technologies',
    multiple: true,
    search: {
      enabled: true,
      placeholder: 'Search technologies'
    },
    groups: [
      {
        label: 'Frontend',
        options: [
          { label: 'React', value: 'react', icon: { name: 'react' } },
          { label: 'Vue', value: 'vue', icon: { name: 'vue' } },
          { label: 'Angular', value: 'angular', icon: { name: 'angular' } }
        ]
      },
      {
        label: 'Backend',
        options: [
          { label: 'Node.js', value: 'nodejs', icon: { name: 'nodejs' } },
          { label: 'Python', value: 'python', icon: { name: 'python' } },
          { label: 'Java', value: 'java', icon: { name: 'java' } }
        ]
      }
    ],
    tag: {
      maxCount: 3,
      showCount: true,
      closable: true
    },
    clearable: true,
    virtual: true
  }
] as const; 