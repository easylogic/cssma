/**
 * PinInput Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive pin input component set in Figma.
 * This type system supports:
 * - Multiple input methods (keyboard, paste)
 * - Rich validation and masking
 * - OTP and security code handling
 * - Accessibility features
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type PinInputSize = 'small' | 'medium' | 'large';
export type PinInputVariant = 'filled' | 'outlined' | 'ghost';
export type PinInputStatus = 'default' | 'success' | 'error' | 'warning';
export type PinInputState = 'default' | 'hover' | 'focused' | 'disabled';
export type PinInputType = 'numeric' | 'alphanumeric' | 'custom';
export type PinInputMask = 'none' | 'bullet' | 'asterisk' | 'custom';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type PinInputSizeConfig = {
  [key in PinInputSize]: {
    cell: {
      width: string;
      height: string;
      borderRadius: string;
      borderWidth: string;
      fontSize: string;
      lineHeight: string;
    };
    spacing: {
      cell: string;      // 셀 간격
      group: string;     // 그룹 간격
    };
    icon: {
      size: string;
      padding: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface PinInputStateStyle {
  default: string;
  hover: string;
  focused: string;
  disabled: string;
}

export interface PinInputCellStyle {
  background: PinInputStateStyle;
  text: PinInputStateStyle;
  border: PinInputStateStyle;
  shadow?: PinInputStateStyle;
}

export interface PinInputStyle {
  root: {
    background: PinInputStateStyle;
    border: PinInputStateStyle;
    shadow?: PinInputStateStyle;
  };
  cell: {
    empty: PinInputCellStyle;
    filled: PinInputCellStyle;
    active: PinInputCellStyle;
    success: PinInputCellStyle;
    error: PinInputCellStyle;
    warning: PinInputCellStyle;
  };
  icon: {
    leading: PinInputStateStyle;
    trailing: PinInputStateStyle;
  };
  validation: {
    icon: PinInputStateStyle;
    message: PinInputStateStyle;
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type PinInputStyles = {
  [key in PinInputVariant]: PinInputStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface PinInputIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface PinInputMaskProps {
  type: PinInputMask;
  character?: string;
  delay?: number;
  showOnFocus?: boolean;
}

export interface PinInputValidationProps {
  required?: boolean;
  pattern?: string | RegExp;
  validate?: (value: string) => boolean | string;
  validateCell?: (value: string, index: number) => boolean | string;
}

export interface PinInputFormatProps {
  transform?: (value: string) => string;
  format?: (value: string) => string;
  parse?: (value: string) => string;
}

export interface PinInputBehaviorProps {
  autoFocus?: boolean;
  blurOnComplete?: boolean;
  clearOnError?: boolean;
  focusOnEmpty?: boolean;
  selectOnFocus?: boolean;
  submitOnComplete?: boolean;
  manageFocus?: boolean;
  placeholder?: string;
}

export interface PinInputVariantProps {
  size?: PinInputSize;
  variant?: PinInputVariant;
  status?: PinInputStatus;
  state?: PinInputState;
  type?: PinInputType;
  length?: number;
  value?: string;
  defaultValue?: string;
  icon?: PinInputIconProps;
  mask?: PinInputMaskProps;
  validation?: PinInputValidationProps;
  format?: PinInputFormatProps;
  behavior?: PinInputBehaviorProps;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onClear?: () => void;
  ariaLabel?: string;
  role?: string;
}

export interface PinInputInstance {
  value: string;
  status: PinInputStatus;
  state: PinInputState;
  validation?: PinInputValidationProps;
  format?: PinInputFormatProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreatePinInputOptions {
  variants?: PinInputVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface PinInputRef {
  focus: (index?: number) => void;
  blur: () => void;
  clear: () => void;
  setValue: (value: string) => void;
  getValue: () => string;
  validate: () => boolean;
}

export interface PinInputContextValue {
  size: PinInputSize;
  variant: PinInputVariant;
  status: PinInputStatus;
  state: PinInputState;
  type: PinInputType;
  length: number;
  disabled: boolean;
  validation?: PinInputValidationProps;
  format?: PinInputFormatProps;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface PinInputChangeEvent {
  value: string;
  index: number;
  source: 'input' | 'paste' | 'keyboard' | 'api';
}

export interface PinInputValidateEvent {
  value: string;
  valid: boolean;
  errors?: string[];
}

export interface PinInputKeyboardEvent {
  key: string;
  value: string;
  index: number;
  direction?: 'next' | 'prev';
}

export interface PinInputPasteEvent {
  originalText: string;
  parsedValue: string;
  startIndex: number;
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface PinInputComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface PinInputExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 