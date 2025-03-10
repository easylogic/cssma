
export interface FigmaStyleProperties {
  // Layout properties
  layoutMode?: 'HORIZONTAL' | 'VERTICAL';
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
  itemSpacing?: number;
  counterAxisSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;

  // Size properties
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;

  // Border properties
  cornerRadius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  strokeWeight?: number;
  strokeTopWeight?: number;
  strokeRightWeight?: number;
  strokeBottomWeight?: number;
  strokeLeftWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  dashPattern?: number[];

  // Fill and stroke
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];

  // Effects
  effects?: Effect[];
  opacity?: number;

  // Text properties
  fontSize?: number;
  fontName?: FontName;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  paragraphSpacing?: number;
  paragraphIndent?: number;

  // Variable bindings
  boundVariables?: {
    [key: string]: FigmaVariableBinding;
  };
}


export interface FigmaVariableBinding {
  type: 'VARIABLE_ALIAS';
  id: string;
}


export interface FigmaStyleObject extends FigmaStyleProperties {
  boundVariables?: {
    [K in keyof FigmaStyleProperties]?: FigmaVariableBinding;
  };
}


export interface ParsedStyle {
  property: string;
  value: any;
  variant: 'preset' | 'arbitrary' | 'figma-variable';
  variableId?: string;
  opacity?: number;
}


export interface FigmaVariablePaint extends GradientPaint {
  boundVariables?: {
    color?: FigmaVariableBinding;
  };
  gradientStops: readonly FigmaVariableGradientStop[];
}


export interface FigmaVariableGradientStop extends ColorStop {
  boundVariables?: {
    color?: FigmaVariableBinding;
  };
}


export interface BasePaint {
  type: string;
  visible?: boolean;
  opacity?: number;
  blendMode?: string;
}

// Solid Paint
export interface FigmaSolidPaint extends BasePaint {
  type: 'SOLID';
  color: { r: number; g: number; b: number };
  boundVariables?: {
    color?: FigmaVariableBinding;
  };
}

// Gradient Stop
export interface FigmaGradientStop {
  position: number;
  color: { r: number; g: number; b: number };
  boundVariables?: {
    color?: FigmaVariableBinding;
  };
}

// Gradient Paint
export interface FigmaGradientPaint extends BasePaint {
  type: 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR';
  gradientStops: readonly FigmaGradientStop[];
  boundVariables?: {
    color?: FigmaVariableBinding;
  };
}

// Paint Union Type
export type FigmaPaint = FigmaSolidPaint | FigmaGradientPaint;

// ... rest of the existing types ... 