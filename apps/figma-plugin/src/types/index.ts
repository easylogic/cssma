export interface PluginMessage {
  type: 'analyze' | 'analyze-done';
}

export interface CreateFrameOptions {
  name?: string;
  width?: number;
  height?: number;
  fills?: Paint[];
  strokes?: Paint[];
  effects?: Effect[];
}

export interface CreateShapeOptions {
  name?: string;
  width?: number;
  height?: number;
  fills?: Paint[];
  strokes?: Paint[];
  effects?: Effect[];
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL'
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL'
}

export interface CreateTextOptions extends CreateShapeOptions {
  text: string;
  fontSize?: number;
  fontName?: FontName;
  fills?: Paint[];
  textAlignHorizontal?: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAutoResize?: "WIDTH_AND_HEIGHT" | "HEIGHT" | "NONE" | "TRUNCATE";
}

export interface ButtonVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
}

export interface CardVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  variant?: 'filled' | 'outlined';
  image?: boolean;
}

export interface CardSubComponentOptions {
  width: number;
  height?: number;
  padding?: number;
  variant?: CardVariant;
}

export interface CreateCardOptions {
  title?: string;
  description?: string;
  variants?: CardVariant[];
}

export interface SelectVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  state?: 'default' | 'hover' | 'focused' | 'disabled';
  open?: boolean;
}

export interface ProgressVariant {
  type: 'bar' | 'circular' | 'steps';
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'success' | 'error';
  value?: number; // 0-100 사이의 값
  showValue?: boolean;
  animated?: boolean;
}

export interface CreateProgressOptions {
  variants?: ProgressVariant[];
  defaultValue?: number;
  steps?: number;
  stepLabels?: string[];
}

export interface TooltipVariant {
  placement: 'top' | 'right' | 'bottom' | 'left';
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'info' | 'success' | 'warning' | 'error';
  hasArrow?: boolean;
  maxWidth?: number;
}

export interface CreateTooltipOptions {
  text?: string;
  variants?: TooltipVariant[];
  content?: string;
  delay?: number;
}

export interface PaginationVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'simple';
  state?: 'default' | 'disabled';
  currentPage?: number;
  totalPages?: number;
  hasJumper?: boolean;
  hasQuickJump?: boolean; // 처음/마지막 페이지로 이동 버튼
}

export interface CreatePaginationOptions {
  variants?: PaginationVariant[];
  defaultPage?: number;
  pageSize?: number;
  showTotal?: boolean;
}

export interface InputVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'success' | 'warning' | 'error';
  state?: 'default' | 'hover' | 'focused' | 'disabled';
  prefix?: boolean;
  suffix?: boolean;
  clearable?: boolean;
  placeholder?: string;
  value?: string;
}

export interface CreateInputOptions {
  variants?: InputVariant[];
  defaultValue?: string;
  defaultPlaceholder?: string;
}

export interface CheckboxVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'primary';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  checked?: boolean;
  indeterminate?: boolean;
  label?: string;
}

export interface CreateCheckboxOptions {
  variants?: CheckboxVariant[];
  defaultLabel?: string;
}

export interface RadioVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'primary';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  checked?: boolean;
  label?: string;
}

export interface CreateRadioOptions {
  variants?: RadioVariant[];
  defaultLabel?: string;
}

export interface SwitchVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  checked?: boolean;
  label?: string;
  loading?: boolean;
}

export interface CreateSwitchOptions {
  variants?: SwitchVariant[];
  defaultLabel?: string;
}

export interface TagVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  closable?: boolean;
  icon?: boolean;
  text?: string;
}

export interface CreateTagOptions {
  variants?: TagVariant[];
  defaultText?: string;
} 