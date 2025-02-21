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

import { IconSize, IconVariant } from "./icon";

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'filled' | 'outlined' | 'ghost';
export type ButtonType = 'default' | 'primary' | 'neutral' | 'secondary' | 'danger';
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';
export type ButtonShape = 'rounded' | 'square' | 'pill';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type ButtonSizeOption = {
  height: string;
  fontSize: string;
  lineHeight: string;
  iconSize: string;
  spacing: string;
  paddingHorizontal: string;
  paddingVertical: string;
  borderRadius: string;
}

export type ButtonSizeConfig = {
  [key in ButtonSize]: ButtonSizeOption
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface ButtonStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface ButtonStyle {
  background: ButtonStateStyle;
  text: ButtonStateStyle;
  border: ButtonStateStyle;
}

export type ButtonStyles = {
  [key: string]: ButtonStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface ButtonIconProps {
  size?: IconSize;
  variant?: IconVariant;
  name?: string;
  position?: 'left' | 'right';
}

export interface ButtonLoadingProps {
  state?: boolean;
  text?: string;
  position?: 'left' | 'right' | 'center';
}

export interface ButtonVariantProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  state?: ButtonState;
  shape?: ButtonShape;
  icon?: ButtonIconProps;
  label?: string;
  disabled?: boolean;
  loading?: ButtonLoadingProps;
  fullWidth?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface ButtonInstance {
  text?: string;
  icon?: ButtonIconProps;
  loading?: ButtonLoadingProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateButtonOptions {
  variants?: ButtonVariant[];
} 