/**
 * TagsInput Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive tags input component set in Figma.
 * This type system supports:
 * - Multiple input methods (text, paste, drag)
 * - Rich tag customization
 * - Validation and formatting
 * - Keyboard navigation
 * - Accessibility features
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type TagsInputSize = 'small' | 'medium' | 'large';
export type TagsInputVariant = 'filled' | 'outlined' | 'ghost';
export type TagsInputStatus = 'default' | 'success' | 'error' | 'warning';
export type TagsInputState = 'default' | 'hover' | 'focused' | 'disabled';
export type TagsInputValidateMode = 'onChange' | 'onBlur' | 'onSubmit';
export type TagsInputPasteMode = 'split' | 'single';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type TagsInputSizeConfig = {
  [key in TagsInputSize]: {
    root: {
      minHeight: string;
      maxHeight?: string;
      borderRadius: string;
      borderWidth: string;
    };
    input: {
      height: string;
      minWidth: string;
      fontSize: string;
      lineHeight: string;
      caretWidth: string;
      caretHeight: string;
    };
    tag: {
      height: string;
      minWidth: string;
      maxWidth: string;
      fontSize: string;
      lineHeight: string;
      iconSize: string;
      borderRadius: string;
      borderWidth: string;
    };
    icon: {
      size: string;
      padding: string;
    };
    spacing: {
      tag: string;       // 태그 간격
      icon: string;      // 아이콘과 텍스트 간격
      remove: string;    // 삭제 버튼 간격
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

export interface TagsInputStateStyle {
  default: string;
  hover: string;
  focused: string;
  disabled: string;
}

export interface TagsInputTagStyle {
  background: TagsInputStateStyle;
  text: TagsInputStateStyle;
  icon: TagsInputStateStyle;
  border: TagsInputStateStyle;
  shadow?: TagsInputStateStyle;
  remove: {
    background: TagsInputStateStyle;
    icon: TagsInputStateStyle;
    border: TagsInputStateStyle;
  };
}

export interface TagsInputStyle {
  root: {
    background: TagsInputStateStyle;
    border: TagsInputStateStyle;
    shadow?: TagsInputStateStyle;
  };
  input: {
    text: TagsInputStateStyle;
    placeholder: TagsInputStateStyle;
    caret: TagsInputStateStyle;
    selection: {
      background: TagsInputStateStyle;
      text: TagsInputStateStyle;
    };
  };
  tag: {
    default: TagsInputTagStyle;
    success: TagsInputTagStyle;
    error: TagsInputTagStyle;
    warning: TagsInputTagStyle;
  };
  icon: {
    leading: TagsInputStateStyle;
    trailing: TagsInputStateStyle;
  };
  validation: {
    icon: TagsInputStateStyle;
    message: TagsInputStateStyle;
  };
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type TagsInputStyles = {
  [key in TagsInputVariant]: TagsInputStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface TagsInputIconProps {
  name: string;
  size?: number;
  color?: string;
}

export interface TagsInputTagProps {
  id: string;
  text: string;
  status?: TagsInputStatus;
  icon?: TagsInputIconProps;
  removable?: boolean;
  data?: any;
}

export interface TagsInputValidationProps {
  mode?: TagsInputValidateMode;
  required?: boolean;
  minTags?: number;
  maxTags?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
  allowDuplicates?: boolean;
  validate?: (value: string) => boolean | string;
  validateTags?: (tags: TagsInputTagProps[]) => boolean | string;
}

export interface TagsInputTransformProps {
  trim?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  normalize?: (value: string) => string;
  format?: (value: string) => string;
  parse?: (value: string) => string;
}

export interface TagsInputPasteProps {
  enabled?: boolean;
  mode?: TagsInputPasteMode;
  separator?: string | RegExp;
  transform?: (value: string) => string[];
  validate?: (values: string[]) => boolean;
  maxItems?: number;
}

export interface TagsInputDragProps {
  enabled?: boolean;
  dragSelector?: string;
  dropSelector?: string;
  validate?: (items: DataTransferItem[]) => boolean;
  transform?: (items: DataTransferItem[]) => Promise<string[]>;
}

export interface TagsInputSuggestionProps {
  enabled?: boolean;
  source?: string[] | ((query: string) => Promise<string[]>);
  minChars?: number;
  maxItems?: number;
  highlight?: boolean;
  caseSensitive?: boolean;
  filter?: (query: string, items: string[]) => string[];
}

export interface TagsInputVariantProps {
  size?: TagsInputSize;
  variant?: TagsInputVariant;
  status?: TagsInputStatus;
  state?: TagsInputState;
  value?: TagsInputTagProps[];
  defaultValue?: TagsInputTagProps[];
  placeholder?: string;
  icon?: TagsInputIconProps;
  validation?: TagsInputValidationProps;
  transform?: TagsInputTransformProps;
  paste?: TagsInputPasteProps;
  drag?: TagsInputDragProps;
  suggestion?: TagsInputSuggestionProps;
  readOnly?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  addOnBlur?: boolean;
  addOnPaste?: boolean;
  addOnSpace?: boolean;
  addOnComma?: boolean;
  addOnEnter?: boolean;
  removeOnBackspace?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface TagsInputInstance {
  value: TagsInputTagProps[];
  status: TagsInputStatus;
  state: TagsInputState;
  validation?: TagsInputValidationProps;
  transform?: TagsInputTransformProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateTagsInputOptions {
  variants?: TagsInputVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface TagsInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  addTag: (tag: string | TagsInputTagProps) => void;
  removeTag: (id: string) => void;
  getValue: () => TagsInputTagProps[];
  validate: () => boolean;
}

export interface TagsInputContextValue {
  size: TagsInputSize;
  variant: TagsInputVariant;
  status: TagsInputStatus;
  state: TagsInputState;
  disabled: boolean;
  validation?: TagsInputValidationProps;
  transform?: TagsInputTransformProps;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface TagsInputChangeEvent {
  value: TagsInputTagProps[];
  added?: TagsInputTagProps;
  removed?: TagsInputTagProps;
  source: 'input' | 'paste' | 'drag' | 'suggestion' | 'api';
}

export interface TagsInputValidateEvent {
  value: TagsInputTagProps[];
  valid: boolean;
  errors?: string[];
}

export interface TagsInputPasteEvent {
  originalText: string;
  parsedTags: string[];
  addedTags: TagsInputTagProps[];
}

export interface TagsInputDragEvent {
  items: DataTransferItem[];
  parsedTags: string[];
  addedTags: TagsInputTagProps[];
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface TagsInputComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface TagsInputExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 