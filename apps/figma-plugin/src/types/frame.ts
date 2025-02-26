// Figma 요소들의 기본 속성
export interface BaseNodeProps {
  name: string;
  x?: number;
  y?: number;
  width?: number | "fill";
  height?: number | "hug";
  opacity?: number;
}

// 레이아웃 속성
export interface LayoutProps {
  direction?: "HORIZONTAL" | "VERTICAL";
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  itemSpacing?: number;
  layoutAlign?: "MIN" | "CENTER" | "MAX";
  layoutGrow?: number;
}

// 스타일 속성
export interface StyleProps {
  fill?: {
    type: "SOLID";
    color: { r: number; g: number; b: number };
    opacity?: number;
  };
  stroke?: {
    type: "SOLID";
    color: { r: number; g: number; b: number };
    opacity?: number;
    weight?: number;
  };
  cornerRadius?: number;
  effect?: {
    type: "DROP_SHADOW";
    color: { r: number; g: number; b: number; a: number };
    offset: { x: number; y: number };
    radius: number;
    spread?: number;
  }[];
}

// 텍스트 노드 속성
export interface TextProps extends BaseNodeProps {
  type: "TEXT";
  characters: string;
  fontSize?: number;
  fontName?: {
    family: string;
    style: string;
  };
  textAlignHorizontal?: "LEFT" | "CENTER" | "RIGHT";
  textAlignVertical?: "TOP" | "CENTER" | "BOTTOM";
  lineHeight?: number | {
    value: number;
    unit: "PIXELS" | "PERCENT";
  };
}

// 프레임 노드 속성
export interface FrameProps extends BaseNodeProps, LayoutProps, StyleProps {
  type: "FRAME";
  children?: (FrameProps | TextProps)[];
}

// 최상위 프레임 스펙
export interface FigmaFrameSpec {
  frame: FrameProps;
} 