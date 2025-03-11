import { FigmaFontName, FigmaLineHeight, FigmaPaint } from '../types';

export type FigmaStyleProperties = {
  fills?: FigmaPaint[];
  fontSize?: number;
  fontName?: FigmaFontName;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  letterSpacing?: number | { value: number; unit: string };
  lineHeight?: FigmaLineHeight;
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  textTransform?: 'NONE' | 'UPPER' | 'LOWER' | 'TITLE';
  fontStyle?: 'NORMAL' | 'ITALIC';
  fontWeight?: number;
  width?: number;
  height?: number;
  gap?: number;
  paragraphSpacing?: number;
  paragraphIndent?: number;
};

export type Transform = [[number, number, number], [number, number, number]]

export type BlendMode = 'NORMAL' | 'DARKEN' | 'MULTIPLY' | 'COLOR_BURN' | 'LIGHTEN' | 'SCREEN' | 'COLOR_DODGE' | 'OVERLAY' | 'SOFT_LIGHT' | 'HARD_LIGHT' | 'DIFFERENCE' | 'EXCLUSION' | 'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY'

export type LayoutAlign = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'

export type Constraints = {
  horizontal: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
  vertical: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
}

export type Paint = {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE' | 'EMOJI';
  visible?: boolean;
  opacity?: number;
  blendMode?: BlendMode;
}

export type Effect = {
  type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible?: boolean;
  radius?: number;
  spread?: number;
  color?: { r: number; g: number; b: number; a: number };
  offset?: { x: number; y: number };
  blendMode?: BlendMode;
}

export type ExportSettings = {
  format: 'JPG' | 'PNG' | 'SVG' | 'PDF';
  suffix: string;
  constraint: { type: 'SCALE'; value: number } | { type: 'WIDTH'; value: number } | { type: 'HEIGHT'; value: number };
}

export type LayoutGrid = {
  pattern: 'GRID' | 'COLUMNS' | 'ROWS';
  sectionSize: number;
  visible: boolean;
  color: { r: number; g: number; b: number; a: number };
  alignment: 'MIN' | 'MAX' | 'CENTER';
  gutterSize: number;
  offset: number;
  count: number;
}

export type Guide = {
  axis: 'X' | 'Y';
  offset: number;
}

export type FontName = {
  family: string;
  style: string;
}

export type TextCase = 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE'
export type TextDecoration = 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH'
export type LetterSpacing = { value: number; unit: 'PIXELS' | 'PERCENT' }
export type LineHeight = { value: number; unit: 'PIXELS' | 'PERCENT' | 'AUTO' }
export type HyperlinkTarget = { type: 'URL' | 'NODE'; value: string }

export type OverflowDirection = 'NONE' | 'HORIZONTAL' | 'VERTICAL' | 'BOTH'

export type DocumentationLink = {
  uri: string;
  tooltipText?: string;
}

export type ComponentPropertyDefinition = {
  type: string;
  defaultValue: any;
  preferredValues?: any[];
  description?: string;
}

export type NodeType = 
  | 'FRAME'
  | 'GROUP'
  | 'RECTANGLE'
  | 'ELLIPSE'
  | 'VECTOR'
  | 'TEXT'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'INSTANCE'
  | 'BOOLEAN_OPERATION'
  | 'STAR'
  | 'LINE'
  | 'POLYGON'
  | 'STICKY'
  | 'SHAPE_WITH_TEXT'
  | 'CONNECTOR'
  | 'CODE_BLOCK'
  | 'STAMP'
  | 'WIDGET'
  | 'EMBED'
  | 'LINK_UNFURL'
  | 'MEDIA'
  | 'SECTION'
  | 'HIGHLIGHT'
  | 'WASHI_TAPE'
  | 'TABLE'

export interface BaseNodeMixin {
  id: string;
  name: string;
  type: NodeType;
  visible: boolean;
  locked: boolean;
  removed: boolean;
  parent: (BaseNode & ChildrenMixin) | null;
  toString(): string;
  remove(): void;
  setRelaunchData(data: { [command: string]: string }): void;
  getRelaunchData(): { [command: string]: string };
  setPluginData(key: string, value: string): void;
  getPluginData(key: string): string;
  setSharedPluginData(namespace: string, key: string, value: string): void;
  getSharedPluginData(namespace: string, key: string): string;
}

export interface SceneNodeMixin {
  visible: boolean;
  locked: boolean;
  exportSettings: ReadonlyArray<ExportSettings>;
  blendMode: BlendMode;
  preserveRatio: boolean;
  constraints: Constraints;
  layoutAlign: LayoutAlign;
  layoutGrow: number;
  opacity: number;
  isMask: boolean;
  effects: ReadonlyArray<Effect>;
  effectStyleId: string;
  expanded: boolean;
  backgrounds: ReadonlyArray<Paint>;
  backgroundStyleId: string;
}

export interface ChildrenMixin {
  readonly children: ReadonlyArray<SceneNode>;
}

export interface LayoutMixin {
  readonly absoluteTransform: Transform;
  readonly width: number;
  readonly height: number;
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
  layoutAlign: LayoutAlign;
  layoutGrow: number;
  resize(width: number, height: number): void;
  resizeWithoutConstraints(width: number, height: number): void;
}

export interface BlendMixin {
  opacity: number;
  blendMode: BlendMode;
  isMask: boolean;
  effects: ReadonlyArray<Effect>;
  effectStyleId: string;
}

export interface ContainerMixin {
  expanded: boolean;
  backgrounds: ReadonlyArray<Paint>;
  backgroundStyleId: string;
}

export interface BaseNode extends BaseNodeMixin {
  readonly parent: (BaseNode & ChildrenMixin) | null;
  readonly removed: boolean;
}

export interface SceneNode extends BaseNode, SceneNodeMixin, LayoutMixin, BlendMixin {
  clone(): SceneNode;
}

export interface TextNode extends SceneNode {
  readonly type: "TEXT";
  clone(): TextNode;
  characters: string;
  readonly hasMissingFont: boolean;
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
  textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT";
  paragraphIndent: number;
  paragraphSpacing: number;
  autoRename: boolean;
  fontSize: number;
  fontName: FontName;
  textCase: TextCase;
  textDecoration: TextDecoration;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  hyperlink: HyperlinkTarget | null;
  insertCharacters(start: number, characters: string, useStyle?: "BEFORE" | "AFTER"): void;
  deleteCharacters(start: number, end: number): void;
  getRangeFontSize(start: number, end: number): number;
  setRangeFontSize(start: number, end: number, value: number): void;
  getRangeFontName(start: number, end: number): FontName;
  setRangeFontName(start: number, end: number, value: FontName): void;
  getRangeTextCase(start: number, end: number): TextCase;
  setRangeTextCase(start: number, end: number, value: TextCase): void;
  getRangeTextDecoration(start: number, end: number): TextDecoration;
  setRangeTextDecoration(start: number, end: number, value: TextDecoration): void;
  getRangeLetterSpacing(start: number, end: number): LetterSpacing;
  setRangeLetterSpacing(start: number, end: number, value: LetterSpacing): void;
  getRangeLineHeight(start: number, end: number): LineHeight;
  setRangeLineHeight(start: number, end: number, value: LineHeight): void;
  getRangeHyperlink(start: number, end: number): HyperlinkTarget | null;
  setRangeHyperlink(start: number, end: number, value: HyperlinkTarget | null): void;
  getRangeFills(start: number, end: number): Paint[];
  setRangeFills(start: number, end: number, value: Paint[]): void;
  getRangeTextStyleId(start: number, end: number): string;
  setRangeTextStyleId(start: number, end: number, value: string): void;
  getRangeFillStyleId(start: number, end: number): string;
  setRangeFillStyleId(start: number, end: number, value: string): void;
}

export interface FrameNode extends SceneNode, ChildrenMixin, ContainerMixin {
  readonly type: "FRAME";
  clone(): FrameNode;
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  primaryAxisSizingMode: "FIXED" | "AUTO";
  counterAxisSizingMode: "FIXED" | "AUTO";
  primaryAxisAlignItems: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlignItems: "MIN" | "CENTER" | "MAX";
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  itemSpacing: number;
  layoutGrids: LayoutGrid[];
  gridStyleId: string;
  clipsContent: boolean;
  guides: Guide[];
}

export interface InstanceNode extends SceneNode, ChildrenMixin, ContainerMixin {
  readonly type: "INSTANCE";
  clone(): InstanceNode;
  mainComponent: ComponentNode | null;
  swapComponent(componentNode: ComponentNode): void;
  detachInstance(): FrameNode;
  scaleFactor: number;
  readonly componentProperties: { [property: string]: ComponentProperty };
  readonly exposedInstances: ReadonlyArray<InstanceNode>;
  readonly overrides: ReadonlyArray<{ id: string; overriddenFields: ReadonlyArray<string> }>;
  resetOverrides(): void;
  readonly overflowDirection: OverflowDirection;
  readonly documentationLinks: ReadonlyArray<DocumentationLink>;
}

export interface ComponentNode extends SceneNode, ChildrenMixin, ContainerMixin {
  readonly type: "COMPONENT";
  clone(): ComponentNode;
  createInstance(): InstanceNode;
  readonly instances: ReadonlyArray<InstanceNode>;
  readonly componentPropertyDefinitions: { [property: string]: ComponentPropertyDefinition };
  readonly documentationLinks: ReadonlyArray<DocumentationLink>;
}

export type ComponentProperty = {
  type: string;
  value: any;
};

export interface NodeData {
  type: NodeType;
  name?: string;
  styles?: string;
  text?: string;
  props?: {
    width?: number;
    height?: number;
    componentProperties?: { [key: string]: any };
    [key: string]: any;
  };
  children?: NodeData[];
} 