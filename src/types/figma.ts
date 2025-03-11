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

export interface BaseNode {
  id: string;
  name: string;
  type: NodeType;
  visible: boolean;
  locked: boolean;
  children?: BaseNode[];
  parent?: BaseNode;
  remove: () => void;
}

export interface ResizeableNode extends BaseNode {
  resize: (width: number, height: number) => void;
  width: number;
  height: number;
}

export interface TextNode extends ResizeableNode {
  type: 'TEXT';
  characters: string;
  fontSize: number;
  fontName: { family: string; style: string };
  textAlignHorizontal: string;
  textAlignVertical: string;
  letterSpacing: number;
  lineHeight: number | { value: number; unit: string };
}

export interface InstanceNode extends ResizeableNode {
  type: 'INSTANCE';
  componentProperties: Record<string, {
    type: string;
    value: any;
  }>;
  mainComponent?: { id: string };
}

export interface FrameNode extends ResizeableNode {
  type: 'FRAME';
  children: BaseNode[];
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  counterAxisSizingMode?: 'FIXED' | 'AUTO';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  insertChild: (index: number, node: BaseNode) => void;
  appendChild: (node: BaseNode) => void;
}

export type SceneNode = BaseNode | TextNode | InstanceNode | FrameNode;

export interface NodeData {
  type: NodeType;
  name?: string;
  styles?: string;
  text?: string;
  props?: {
    width?: number;
    height?: number;
    componentProperties?: Record<string, any>;
    [key: string]: any;
  };
  children?: NodeData[];
} 