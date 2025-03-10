// Parser Types
export interface ParsedStyle {
  property: string;
  value: number | number[] | string | FigmaColor | FigmaFontName | FigmaLineHeight | Shadow[] | {
    horizontal?: 'MIN' | 'MAX' | 'SCALE' | 'CENTER' | 'STRETCH';
    vertical?: 'MIN' | 'MAX' | 'SCALE' | 'CENTER' | 'STRETCH';
  };
  unit?: string;
  variant?: string;  // 예: 'arbitrary' | 'preset' | 'figma-variable'
  variableId?: string;  // Figma 변수 ID
  angle?: number;   // 예: 45
  direction?: string; // 예: 'to-r'
  opacity?: number;
  constraints?: {
    horizontal?: 'MIN' | 'MAX' | 'SCALE' | 'CENTER' | 'STRETCH';
    vertical?: 'MIN' | 'MAX' | 'SCALE' | 'CENTER' | 'STRETCH';
  };
}

export type FigmaNodeType = 
  | 'FRAME' 
  | 'TEXT' 
  | 'RECTANGLE' 
  | 'ELLIPSE' 
  | 'POLYGON'
  | 'STAR' 
  | 'VECTOR' 
  | 'LINE' 
  | 'COMPONENT'
  | 'INSTANCE';


// Shadow Types
export interface Shadow {
  type: 'outer' | 'inner';
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string | FigmaColor;
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

export interface FigmaLetterSpacing {
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
  variable?: string; // local variable name
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

export type ConstraintValue = 'MIN' | 'MAX' | 'CENTER' | 'STRETCH' | 'SCALE';

export type Constraints = {
  horizontal?: ConstraintValue;
  vertical?: ConstraintValue;
};

export type FigmaPosition = {
  direction: 'left' | 'right' | 'top' | 'bottom' | 'center-x' | 'center-y' | 'stretch-x' | 'stretch-y';
  value: number | string;
  unit?: 'px' | '%';
  variableId?: string;
};

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
  letterSpacing?: number | FigmaLetterSpacing;
  lineHeight?: number | FigmaLineHeight;
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  fontSize?: number;
  fontName?: { family: string; style: string };
  fontWeight?: number;
  fontStyle?: 'NORMAL' | 'ITALIC';
  paragraphSpacing?: number;
  paragraphIndent?: number;
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  textTransform?: 'NONE' | 'UPPER' | 'LOWER' | 'TITLE';
  textOverflow?: 'ELLIPSIS' | 'TRUNCATE';
  textWrap?: 'WRAP' | 'NO_WRAP';
  leadingTrim?: 'NONE' | 'CAP_HEIGHT';
  width?: number;
  height?: number;
  layoutSizingHorizontal?: 'FIXED' | 'FILL' | 'HUG';
  layoutSizingVertical?: 'FIXED' | 'FILL' | 'HUG';
  layoutPositioning?: 'ABSOLUTE' | 'AUTO';
  cornerRadius?: number;
  opacity?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  strokeWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  dashPattern?: number[];  // 점선 패턴 (예: [4, 2])
  paths?: string[];        // 벡터 경로 데이터 (이전 버전 호환용)
  vectorPaths?: VectorPath[]; // 벡터 경로 데이터
  position?: FigmaPosition;
  constraints?: Constraints;
  order?: number;
}

export interface ProcessOptions {
  defaultFontFamily?: string;
  defaultFontStyle?: string;
  preserveDefaults?: boolean;
} 

export interface CompactNodeData {
  type: string;
  styles: string;
  children?: CompactNodeData[];
  props?: Record<string, any>;
}

export interface BindingCondition {
  property: string;
  value: string;
}

export interface Binding {
  text?: string;
  visible?: BindingCondition;
  [key: string]: string | BindingCondition | undefined;
}

export interface NodeData {
  type: string;
  id?: string;         // 명시적 ID 지원
  name?: string;
  styles?: string;
  text?: string;
  children?: NodeData[];
  props?: Record<string, any>;
  bind?: Binding;
}

export interface ComponentProps {
  propertyDefinitions?: Record<string, {
    type: string;
    defaultValue?: any;
    options?: string[];
  }>;
  variantProperties?: Record<string, string>;
  boundVariables?: Record<string, {
    type: string;
    property: string;
  }>;
  componentProperties?: Record<string, any>;
}

export type NodeType = 
  | 'FRAME'
  | 'TEXT'
  | 'RECTANGLE'
  | 'ELLIPSE'
  | 'POLYGON'
  | 'STAR'
  | 'VECTOR'
  | 'LINE'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'INSTANCE';

export interface ComponentVariantProps {
  id: string;         // variant ID
  name: string;       // variant name (e.g. Button/Primary/Small/Default)
  variant: {
    size?: string;
    style?: string;
    state?: string;
    [key: string]: string | undefined;
  };
  styles?: string;
  children?: NodeData[];
}

export interface PropertyDefinition {
  type: 'TEXT' | 'BOOLEAN' | 'VARIANT' | 'NUMBER';
  defaultValue?: any;
  options?: string[];
}

export interface ComponentDefinition {
  type: 'COMPONENT_SET';
  id: string;         // Component Set ID
  name: string;       // Base name (e.g. "Button")
  props: {
    variantProperties: {
      [key: string]: string[];  // e.g. size: ['sm', 'md', 'lg']
    };
    propertyDefinitions: {
      [key: string]: PropertyDefinition;
    };
    variants: {
      [key: string]: ComponentVariantProps;
    };
  };
  defaultVariant: string;
}

export interface ComponentInstance extends NodeData {
  type: 'INSTANCE';
  componentId: string;  // Reference to variant component ID
  variantProps: {      // Must match variantProperties from ComponentDefinition
    [key: string]: string;
  };
  properties: {        // Must match propertyDefinitions from ComponentDefinition
    [key: string]: any;
  };
}
