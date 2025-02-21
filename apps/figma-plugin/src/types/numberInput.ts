/**
 * NumberInput Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive number input component set in Figma.
 * This type system supports:
 * - Multiple input methods (keyboard, buttons, scroll)
 * - Rich number formatting and validation
 * - Precision control
 * - Unit handling
 * - Accessibility features
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type NumberInputSize = 'small' | 'medium' | 'large';
export type NumberInputVariant = 'filled' | 'outlined' | 'ghost';
export type NumberInputStatus = 'default' | 'success' | 'error' | 'warning';
export type NumberInputState = 'default' | 'hover' | 'focused' | 'disabled';
export type NumberInputMode = 'decimal' | 'integer' | 'currency' | 'percentage';
export type NumberInputAlign = 'left' | 'center' | 'right';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type NumberInputSizeConfig = {
  [key in NumberInputSize]: {
    root: {
      height: string;
      minWidth: string;
      borderRadius: string;
      borderWidth: string;
    };
    input: {
      fontSize: string;
      lineHeight: string;
      caretWidth: string;
      caretHeight: string;
    };
    stepper: {
      width: string;
      height: string;
      iconSize: string;
      borderWidth: string;
    };
    icon: {
      size: string;
      padding: string;
    };
    unit: {
      fontSize: string;
      spacing: string;
    };
    spacing: {
      icon: string;      // 아이콘과 텍스트 간격
      unit: string;      // 단위와 텍스트 간격
      stepper: string;   // 스테퍼 버튼 간격
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

export interface NumberInputStateStyle {
  default: string;
  hover: string;
  focused: string;
  disabled: string;
}

export interface NumberInputStepperStyle {
  background: NumberInputStateStyle;
  icon: NumberInputStateStyle;
  border: NumberInputStateStyle;
}

export interface NumberInputStyle {
  root: {
    background: NumberInputStateStyle;
    border: NumberInputStateStyle;
    shadow?: NumberInputStateStyle;
  };
  input: {
    text: NumberInputStateStyle;
    placeholder: NumberInputStateStyle;
    caret: NumberInputStateStyle;
    selection: {
      background: NumberInputStateStyle;
      text: NumberInputStateStyle;
    };
  };
  stepper: {
    increment: NumberInputStepperStyle;
    decrement: NumberInputStepperStyle;
  };
  icon: {
    leading: NumberInputStateStyle;
    trailing: NumberInputStateStyle;
  };
  unit: {
    text: NumberInputStateStyle;
    background?: NumberInputStateStyle;
  };
  validation: {
    icon: NumberInputStateStyle;
    message: NumberInputStateStyle;
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type NumberInputStyles = {
  [key in NumberInputVariant]: NumberInputStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface NumberInputIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface NumberInputUnitProps {
  text: string;
  position?: 'prefix' | 'suffix';
  spacing?: number;
}

export interface NumberInputStepperProps {
  enabled?: boolean;
  position?: 'right' | 'split';
  allowMouseWheel?: boolean;
  incrementIcon?: NumberInputIconProps;
  decrementIcon?: NumberInputIconProps;
  repeatRate?: number;
  repeatDelay?: number;
}

export interface NumberInputFormatProps {
  locale?: string;
  mode?: NumberInputMode;
  precision?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  prefix?: string;
  suffix?: string;
  padZero?: boolean;
  normalize?: (value: number) => number;
  format?: (value: number) => string;
  parse?: (value: string) => number;
}

export interface NumberInputClampProps {
  min?: number;
  max?: number;
  step?: number;
  allowOutOfRange?: boolean;
  clampValueOnBlur?: boolean;
  roundValueToStep?: boolean;
}

export interface NumberInputValidationProps {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  integer?: boolean;
  validate?: (value: number) => boolean | string;
}

export interface NumberInputVariantProps {
  size?: NumberInputSize;
  variant?: NumberInputVariant;
  status?: NumberInputStatus;
  state?: NumberInputState;
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  icon?: NumberInputIconProps;
  unit?: NumberInputUnitProps;
  stepper?: NumberInputStepperProps;
  format?: NumberInputFormatProps;
  clamp?: NumberInputClampProps;
  validation?: NumberInputValidationProps;
  align?: NumberInputAlign;
  readOnly?: boolean;
  disabled?: boolean;
  hideControls?: boolean;
  allowNegative?: boolean;
  allowEmpty?: boolean;
  selectOnFocus?: boolean;
  onChange?: (value: number | null) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  onBlur?: () => void;
  ariaLabel?: string;
  role?: string;
}

export interface NumberInputInstance {
  value: number | null;
  status: NumberInputStatus;
  state: NumberInputState;
  format?: NumberInputFormatProps;
  validation?: NumberInputValidationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateNumberInputOptions {
  variants?: NumberInputVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface NumberInputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  setValue: (value: number | null) => void;
  getValue: () => number | null;
  validate: () => boolean;
}

export interface NumberInputContextValue {
  size: NumberInputSize;
  variant: NumberInputVariant;
  status: NumberInputStatus;
  state: NumberInputState;
  disabled: boolean;
  format?: NumberInputFormatProps;
  validation?: NumberInputValidationProps;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface NumberInputChangeEvent {
  value: number | null;
  formatted: string;
  source: 'input' | 'stepper' | 'wheel' | 'keyboard' | 'api';
}

export interface NumberInputValidateEvent {
  value: number | null;
  valid: boolean;
  errors?: string[];
}

export interface NumberInputKeyboardEvent {
  key: string;
  value: number | null;
  increment?: number;
  decrement?: number;
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface NumberInputComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface NumberInputExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 