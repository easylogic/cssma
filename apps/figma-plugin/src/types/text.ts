/**
 * Text Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive text component set in Figma.
 * This type system supports:
 * - Rich typography options
 * - Flexible content structure
 * - Semantic variants
 * - Responsive behavior
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type TextSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TextVariant = 'body' | 'heading' | 'display' | 'code' | 'quote';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextDecoration = 'none' | 'underline' | 'line-through';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type TextOverflow = 'clip' | 'ellipsis' | 'fade';
export type TextStatus = 'default' | 'success' | 'error' | 'warning' | 'info' | 'muted';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type TextSizeConfig = {
  [key in TextSize]: {
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    paragraphSpacing: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface TextColorStyle {
  default: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  muted: string;
}

export interface TextDecorationStyle {
  color: string;
  style: 'solid' | 'dashed' | 'dotted' | 'wavy';
  thickness: string;
  offset: string;
}

export interface TextSelectionStyle {
  background: string;
  color: string;
}

export interface TextStyle {
  color: TextColorStyle;
  background?: TextColorStyle;
  decoration?: TextDecorationStyle;
  selection?: TextSelectionStyle;
  transition?: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type TextStyles = {
  [key in TextVariant]: TextStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface TextTruncateProps {
  enabled: boolean;
  lines?: number;
  overflow?: TextOverflow;
  expandable?: boolean;
  showExpand?: boolean;
  expandText?: string;
  collapseText?: string;
}

export interface TextHighlightProps {
  query: string | RegExp;
  color?: string;
  background?: string;
  matchCase?: boolean;
  matchWholeWord?: boolean;
}

export interface TextLinkProps {
  href: string;
  external?: boolean;
  underline?: boolean | 'hover';
  color?: string;
}

export interface TextResponsiveProps {
  size?: Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl', TextSize>>;
  align?: Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl', TextAlign>>;
}

export interface TextVariantProps {
  size?: TextSize;
  variant?: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  status?: TextStatus;
  decoration?: TextDecoration;
  transform?: TextTransform;
  truncate?: TextTruncateProps;
  highlight?: TextHighlightProps;
  link?: TextLinkProps;
  responsive?: TextResponsiveProps;
  selectable?: boolean;
  spellcheck?: boolean;
  textIndent?: string | number;
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  children: string;
  ariaLabel?: string;
  role?: string;
}

export interface TextInstance {
  content: string;
  variant: TextVariant;
  status: TextStatus;
  truncate?: TextTruncateProps;
  highlight?: TextHighlightProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateTextOptions {
  variants?: TextVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface TextRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  copy: () => void;
  expand: () => void;
  collapse: () => void;
  getContent: () => string;
  setContent: (content: string) => void;
}

export interface TextContextValue {
  size: TextSize;
  variant: TextVariant;
  weight: TextWeight;
  align: TextAlign;
  status: TextStatus;
  truncate?: TextTruncateProps;
  highlight?: TextHighlightProps;
}

// --------------------------------------------------------
// Event Types
// --------------------------------------------------------

export interface TextCopyEvent {
  content: string;
  selection?: string;
}

export interface TextExpandEvent {
  expanded: boolean;
  content: string;
}

export interface TextHighlightEvent {
  content: string;
  matches: string[];
  indices: number[];
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface TextComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface TextExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 