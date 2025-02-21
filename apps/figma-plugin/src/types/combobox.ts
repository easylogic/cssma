/**
 * Combobox Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive combobox component set in Figma.
 * This type system supports:
 * - Rich selection options
 * - Flexible filtering
 * - Async data loading
 * - Keyboard navigation
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ComboboxSize = 'small' | 'medium' | 'large';
export type ComboboxVariant = 'filled' | 'outlined' | 'ghost';
export type ComboboxStatus = 'default' | 'success' | 'error' | 'warning';
export type ComboboxState = 'default' | 'hover' | 'focused' | 'disabled';
export type ComboboxPlacement = 'bottom' | 'top' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type ComboboxTrigger = 'click' | 'hover' | 'manual';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ComboboxSizeConfig = {
  [key in ComboboxSize]: {
    root: {
      height: string;
      minWidth: string;
      maxWidth: string;
      borderRadius: string;
      borderWidth: string;
    };
    input: {
      fontSize: string;
      lineHeight: string;
      caretWidth: string;
      caretHeight: string;
    };
    icon: {
      size: string;
      spacing: string;
    };
    dropdown: {
      maxHeight: string;
      borderRadius: string;
      borderWidth: string;
    };
    item: {
      height: string;
      fontSize: string;
      lineHeight: string;
      spacing: string;
    };
    group: {
      titleSize: string;
      titleSpacing: string;
      itemSpacing: string;
    };
    spacing: {
      icon: string;      // 아이콘과 텍스트 간격
      clear: string;     // 클리어 버튼 간격
      indicator: string; // 드롭다운 인디케이터 간격
      group: string;     // 그룹 간격
    };
    padding: {
      x: string;
      y: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ComboboxStateStyle {
  default: string;
  hover: string;
  focused: string;
  disabled: string;
}

export interface ComboboxInputStyle {
  background: ComboboxStateStyle;
  text: ComboboxStateStyle;
  placeholder: ComboboxStateStyle;
  caret: ComboboxStateStyle;
  border: ComboboxStateStyle;
  shadow?: ComboboxStateStyle;
}

export interface ComboboxIconStyle {
  color: ComboboxStateStyle;
  background?: ComboboxStateStyle;
  border?: ComboboxStateStyle;
}

export interface ComboboxDropdownStyle {
  background: ComboboxStateStyle;
  border: ComboboxStateStyle;
  shadow: ComboboxStateStyle;
  scrollbar: {
    thumb: ComboboxStateStyle;
    track: ComboboxStateStyle;
  };
}

export interface ComboboxItemStyle {
  background: {
    default: ComboboxStateStyle;
    selected: ComboboxStateStyle;
    active: ComboboxStateStyle;
  };
  text: {
    default: ComboboxStateStyle;
    selected: ComboboxStateStyle;
    active: ComboboxStateStyle;
  };
  icon: {
    default: ComboboxStateStyle;
    selected: ComboboxStateStyle;
    active: ComboboxStateStyle;
  };
  checkbox?: {
    default: ComboboxStateStyle;
    selected: ComboboxStateStyle;
    active: ComboboxStateStyle;
  };
}

export interface ComboboxGroupStyle {
  title: ComboboxStateStyle;
  divider: ComboboxStateStyle;
}

export interface ComboboxStyle {
  input: ComboboxInputStyle;
  icon: ComboboxIconStyle;
  dropdown: ComboboxDropdownStyle;
  item: ComboboxItemStyle;
  group: ComboboxGroupStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type ComboboxStyles = {
  [key in ComboboxVariant]: {
    [key in ComboboxStatus]: ComboboxStyle;
  };
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ComboboxIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface ComboboxOptionProps {
  value: string;
  label: string;
  icon?: ComboboxIconProps;
  description?: string;
  disabled?: boolean;
  selected?: boolean;
  data?: any;
}

export interface ComboboxGroupProps {
  label: string;
  options: ComboboxOptionProps[];
  disabled?: boolean;
}

export interface ComboboxFilterProps {
  enabled: boolean;
  mode?: 'startsWith' | 'contains' | 'custom';
  matchCase?: boolean;
  minChars?: number;
  debounce?: number;
  highlight?: boolean;
  custom?: (query: string, option: ComboboxOptionProps) => boolean;
}

export interface ComboboxAsyncProps {
  enabled: boolean;
  url?: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: Record<string, any>;
  transform?: (data: any) => ComboboxOptionProps[];
  cache?: boolean;
  debounce?: number;
  retry?: {
    count: number;
    delay: number;
  };
}

export interface ComboboxLoadingProps {
  state: boolean;
  indicator?: ComboboxIconProps;
  text?: string;
  delay?: number;
}

export interface ComboboxValidationProps {
  required?: boolean;
  pattern?: string | RegExp;
  minLength?: number;
  maxLength?: number;
  validate?: (value: string) => boolean | string;
}

export interface ComboboxVariantProps {
  size?: ComboboxSize;
  variant?: ComboboxVariant;
  status?: ComboboxStatus;
  state?: ComboboxState;
  placeholder?: string;
  options?: ComboboxOptionProps[] | ComboboxGroupProps[];
  defaultValue?: string;
  value?: string;
  icon?: ComboboxIconProps;
  filter?: ComboboxFilterProps;
  async?: ComboboxAsyncProps;
  loading?: ComboboxLoadingProps;
  validation?: ComboboxValidationProps;
  placement?: ComboboxPlacement;
  trigger?: ComboboxTrigger;
  clearable?: boolean;
  searchable?: boolean;
  virtualized?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  ariaLabel?: string;
  role?: string;
}

export interface ComboboxInstance {
  value: string;
  status: ComboboxStatus;
  state: ComboboxState;
  filter?: ComboboxFilterProps;
  validation?: ComboboxValidationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateComboboxOptions {
  variants?: ComboboxVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface ComboboxRef {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  getOptions: () => ComboboxOptionProps[];
  setOptions: (options: ComboboxOptionProps[]) => void;
  validate: () => boolean;
}

export interface ComboboxContextValue {
  size: ComboboxSize;
  variant: ComboboxVariant;
  status: ComboboxStatus;
  state: ComboboxState;
  value: string;
  disabled: boolean;
  filter?: ComboboxFilterProps;
  validation?: ComboboxValidationProps;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface ComboboxChangeEvent {
  value: string;
  option?: ComboboxOptionProps;
  source: 'input' | 'select' | 'clear' | 'api';
}

export interface ComboboxSearchEvent {
  query: string;
  results: ComboboxOptionProps[];
  filtered: boolean;
}

export interface ComboboxValidateEvent {
  value: string;
  valid: boolean;
  error?: string;
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface ComboboxComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface ComboboxExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 