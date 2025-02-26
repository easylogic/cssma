// Parser Types
export interface ParsedStyle {
  property: string;
  value: number | string;
  unit?: string;
  variant?: string;  // 예: 'arbitrary' | 'preset'
}

// Figma Types
export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
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
  layout?: FigmaLayoutProps;
  text?: FigmaTextProps;
  geometry?: FigmaGeometryProps;
  opacity?: number;
} 