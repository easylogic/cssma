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
  fontWeight?: number;
  fontName?: FontName;
  fills?: Paint[];
  textAlignHorizontal?: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAutoResize?: "WIDTH_AND_HEIGHT" | "HEIGHT" | "NONE" | "TRUNCATE";
}

// Button Component
export interface ButtonVariant {
  size: 'small' | 'medium' | 'large';
  type: 'primary' | 'secondary' | 'tertiary' | 'danger';
  variant: 'filled' | 'outlined' | 'ghost';
  state: 'default' | 'hover' | 'pressed' | 'disabled';
  styles?: {
    background: string;
    text: string;
    border: string;
  }
}

// Card Component
export interface CardVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  variant?: 'filled' | 'outlined';
  image?: boolean;
  round?: boolean;
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

// Select Component
export interface SelectVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  state?: 'default' | 'hover' | 'focused' | 'disabled';
  open?: boolean;
}

// Progress Component
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

// Tooltip Component
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

// Pagination Component
export interface PaginationVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'simple';
  state?: 'default' | 'disabled';
  currentPage?: number;
  totalPages?: number;
  hasJumper?: boolean;
  hasQuickJump?: boolean;
}

export interface CreatePaginationOptions {
  variants?: PaginationVariant[];
  defaultPage?: number;
  pageSize?: number;
  showTotal?: boolean;
}

// Input Component
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

// Checkbox Component
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

// Radio Component
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

// Switch Component
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

// Tag Component
export interface TagVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  text?: string;
  icon?: boolean;
  closable?: boolean;
}

export interface CreateTagOptions {
  variants?: TagVariant[];
  defaultText?: string;
}

// Badge Component
export interface BadgeVariant {
  size: 'small' | 'medium';
  type: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  variant: 'filled' | 'outlined';
  shape: 'text' | 'dot';
  state: 'default' | 'hover' | 'pressed' | 'disabled';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export interface CreateBadgeOptions {
  variants?: BadgeVariant[];
}

// Avatar Component
export interface AvatarVariant {
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
  type?: 'image' | 'initial' | 'icon';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
  text?: string;  // For initials
  backgroundColor?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  isGroup?: boolean;  // For group avatar stack
}

export interface CreateAvatarOptions {
  variants?: AvatarVariant[];
}

// Breadcrumb Component
export interface BreadcrumbVariant {
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'primary';
  separator?: 'slash' | 'arrow' | 'dot';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  hasIcon?: boolean;
  lastItemClickable?: boolean;
}

export interface CreateBreadcrumbOptions {
  variants?: BreadcrumbVariant[];
  items?: string[];
}

// Alert Component
export interface AlertVariant {
  type: 'info' | 'success' | 'warning' | 'error';
  variant: 'filled' | 'outlined';
  size: 'small' | 'medium' | 'large';
  hasIcon: boolean;
  hasTitle: boolean;
  closable: boolean;
  action: boolean;
}

export interface CreateAlertOptions {
  variants?: AlertVariant[];
  title?: string;
  description?: string;
}

// Divider Component
export interface DividerVariant {
  type?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  thickness?: 'thin' | 'regular' | 'thick';
  withText?: boolean;
  orientation?: 'left' | 'center' | 'right';
  text?: string;
  variantType?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export interface CreateDividerOptions {
  variants?: DividerVariant[];
  text?: string;
}

// Form Component
export interface FormItemConfig {
  type: 'input' | 'select' | 'checkbox' | 'radio' | 'switch';
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  variant?: InputVariant | SelectVariant | CheckboxVariant | RadioVariant | SwitchVariant;
}

export interface FormVariant {
  layout?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'disabled';
  labelPosition?: 'top' | 'left';
  labelWidth?: number;
  showRequiredMark?: boolean;
  items?: FormItemConfig[];
  actions?: {
    submitText?: string;
    cancelText?: string;
    layout?: 'start' | 'center' | 'end';
  };
}

export interface CreateFormOptions {
  variants?: FormVariant[];
  defaultLabelPosition?: 'top' | 'left';
  defaultLabelWidth?: number;
  defaultShowRequiredMark?: boolean;
}

export interface TextVariant {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'disabled';
  weight?: 'regular' | 'medium' | 'bold';
  text?: string;
  textAutoResize?: "WIDTH_AND_HEIGHT" | "HEIGHT" | "NONE" | "TRUNCATE";
} 