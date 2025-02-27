// Parser Types
export interface ParsedStyle {
  property: string;
  value: number | string | FigmaColor | FigmaFontName | FigmaLineHeight;
  unit?: string;
  variant?: string;  // 예: 'arbitrary' | 'preset'
  angle?: number;   // 예: 45
  direction?: string; // 예: 'to-r'
  opacity?: number;
}

// Figma Types
export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface FigmaFontName {
  family: string;
  style: string;
}

export interface FigmaLineHeight {
  value: number;
  unit: 'PIXELS' | 'PERCENT';
}

export interface FigmaGradientStop {
  position: number;
  color: FigmaColor;
}

export interface FigmaGradientLinear {
  type: 'GRADIENT_LINEAR';
  gradientStops: FigmaGradientStop[];
  gradientTransform: number[][];
}

export interface FigmaGradientRadial {
  type: 'GRADIENT_RADIAL';
  gradientStops: FigmaGradientStop[];
  centerX: number;
  centerY: number;
  radius: number;
}

export interface FigmaGradientAngular {
  type: 'GRADIENT_ANGULAR';
  gradientStops: FigmaGradientStop[];
  centerX: number;
  centerY: number;
  rotation: number;
}

export interface FigmaGradientDiamond {
  type: 'GRADIENT_DIAMOND';
  gradientStops: FigmaGradientStop[];
  centerX: number;
  centerY: number;
  rotation: number;
}

export type FigmaGradient = 
  | FigmaGradientLinear 
  | FigmaGradientRadial 
  | FigmaGradientAngular 
  | FigmaGradientDiamond;

export interface FigmaSolidPaint {
  type: 'SOLID';
  color: FigmaColor;
  opacity?: number;
}

export type FigmaPaint = FigmaSolidPaint | FigmaGradient;

export interface FigmaEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  color?: FigmaColor;
  offset?: { x: number; y: number };
  radius: number;
  spread?: number;
  visible: boolean;
  blendMode: string;
}

export interface FigmaLayoutProps {
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutAlign?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  layoutGrow?: number;
  itemSpacing?: number;
  counterAxisSpacing?: number;
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  width?: number;
  height?: number;
  layoutSizingHorizontal?: 'FIXED' | 'FILL' | 'HUG';
  layoutSizingVertical?: 'FIXED' | 'FILL' | 'HUG';
}

export interface FigmaTextProps {
  fontSize?: number;
  fontName?: { family: string; style: string };
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  letterSpacing?: number;
  lineHeight?: number | { value: number; unit: 'PIXELS' | 'PERCENT' };
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
}

export interface FigmaGeometryProps {
  cornerRadius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  strokeWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
}

export interface FigmaStyleProperties {
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  effects?: FigmaEffect[];
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutAlign?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  layoutGrow?: number;
  itemSpacing?: number;
  counterAxisSpacing?: number;
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  letterSpacing?: number;
  lineHeight?: number | { value: number; unit: 'PIXELS' | 'PERCENT' };
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  fontSize?: number;
  fontName?: { family: string; style: string };
  fontWeight?: number;
  fontStyle?: 'NORMAL' | 'ITALIC';
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  textTransform?: 'NONE' | 'UPPER' | 'LOWER' | 'TITLE';
  textOverflow?: 'ELLIPSIS' | 'TRUNCATE';
  textWrap?: 'WRAP' | 'NO_WRAP';
  width?: number;
  height?: number;
  layoutSizingHorizontal?: 'FIXED' | 'FILL' | 'HUG';
  layoutSizingVertical?: 'FIXED' | 'FILL' | 'HUG';
  cornerRadius?: number;
  opacity?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  strokeWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
} 