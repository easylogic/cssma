/**
 * Blockquote Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive blockquote component set in Figma.
 * This type system supports:
 * - Rich typography options
 * - Flexible content structure
 * - Citation and attribution
 * - Visual customization
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type BlockquoteSize = 'small' | 'medium' | 'large';
export type BlockquoteVariant = 'filled' | 'outlined' | 'ghost';
export type BlockquoteStatus = 'default' | 'info' | 'success' | 'warning' | 'error';
export type BlockquoteAlign = 'left' | 'center' | 'right';
export type BlockquoteIconPosition = 'top' | 'left';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type BlockquoteSizeConfig = {
  [key in BlockquoteSize]: {
    root: {
      minWidth: string;
      maxWidth: string;
      borderRadius: string;
      borderWidth: string;
    };
    content: {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
      paragraphSpacing: string;
    };
    citation: {
      fontSize: string;
      lineHeight: string;
      spacing: string;
    };
    icon: {
      size: string;
      spacing: string;
    };
    spacing: {
      content: string;   // 내부 콘텐츠 간격
      citation: string;  // 인용문과 출처 간격
      border: string;    // 테두리와 콘텐츠 간격
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

export interface BlockquoteColorStyle {
  default: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

export interface BlockquoteBorderStyle {
  color: BlockquoteColorStyle;
  width: string;
  style: 'solid' | 'dashed' | 'dotted';
}

export interface BlockquoteIconStyle {
  color: BlockquoteColorStyle;
  background?: BlockquoteColorStyle;
  opacity: string;
}

export interface BlockquoteStyle {
  root: {
    background: BlockquoteColorStyle;
    border: BlockquoteBorderStyle;
    shadow?: BlockquoteColorStyle;
  };
  content: {
    text: BlockquoteColorStyle;
    background?: BlockquoteColorStyle;
  };
  citation: {
    text: BlockquoteColorStyle;
    background?: BlockquoteColorStyle;
  };
  icon: BlockquoteIconStyle;
  transition: {
    duration: string;
    timing: string;
    properties: string[];
  };
}

export type BlockquoteStyles = {
  [key in BlockquoteVariant]: BlockquoteStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface BlockquoteIconProps {
  name: string;
  size?: number;
  color?: string;
  position?: BlockquoteIconPosition;
}

export interface BlockquoteCitationProps {
  author?: string;
  source?: string;
  date?: string;
  link?: {
    href: string;
    external?: boolean;
  };
}

export interface BlockquoteResponsiveProps {
  size?: Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl', BlockquoteSize>>;
  align?: Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl', BlockquoteAlign>>;
}

export interface BlockquoteVariantProps {
  size?: BlockquoteSize;
  variant?: BlockquoteVariant;
  status?: BlockquoteStatus;
  align?: BlockquoteAlign;
  icon?: BlockquoteIconProps;
  citation?: BlockquoteCitationProps;
  responsive?: BlockquoteResponsiveProps;
  bordered?: boolean;
  elevated?: boolean;
  fullWidth?: boolean;
  children: string;
  ariaLabel?: string;
  role?: string;
}

export interface BlockquoteInstance {
  content: string;
  variant: BlockquoteVariant;
  status: BlockquoteStatus;
  citation?: BlockquoteCitationProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateBlockquoteOptions {
  variants?: BlockquoteVariant[];
}

// --------------------------------------------------------
// Utility Types
// --------------------------------------------------------

export interface BlockquoteRef {
  focus: () => void;
  blur: () => void;
  getContent: () => string;
  setContent: (content: string) => void;
  getCitation: () => BlockquoteCitationProps | undefined;
  setCitation: (citation: BlockquoteCitationProps) => void;
}

export interface BlockquoteContextValue {
  size: BlockquoteSize;
  variant: BlockquoteVariant;
  status: BlockquoteStatus;
  align: BlockquoteAlign;
  icon?: BlockquoteIconProps;
  citation?: BlockquoteCitationProps;
}

// --------------------------------------------------------
// Figma Component Types
// --------------------------------------------------------

export interface BlockquoteComponent extends ComponentNode {
  readonly type: 'COMPONENT';
}

export interface BlockquoteExampleContainer extends FrameNode {
  readonly type: 'FRAME';
} 