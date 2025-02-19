/**
 * Button Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive button component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'filled' | 'outlined' | 'ghost';
export type ButtonType = 'default' | 'primary' | 'neutral' | 'secondary' | 'danger';
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ButtonSizeConfig = {
  [key in ButtonSize]: {
    // 기본 크기
    height: string;
    fontSize: string;
    lineHeight: string;

    // 아이콘
    iconSize: string;

    // 간격
    padding: string;
    gap: string;

    // 테두리
    borderWidth: string;
    borderRadius: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ButtonStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  border: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type ButtonStyles = {
  [key: string]: ButtonStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ButtonVariantProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  state?: ButtonState;
  icon?: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface ButtonInstance {
  text?: string;
  icon?: string;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateButtonOptions {
  variants?: ButtonVariant[];
} 