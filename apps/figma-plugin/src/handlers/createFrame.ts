import { processStyles } from 'css-to-figma';
/**
 * Figma 노드 생성을 위한 유틸리티 클래스
 * 토큰 기반 스타일 시스템을 사용하여 UI 요소를 생성합니다.
 */
import { CompactNodeData, CompactFrameStructure } from '../types/compact';

type StyleApplyPhase = 'layout' | 'sizing' | 'spacing' | 'appearance';

const STYLE_APPLY_ORDER: Record<StyleApplyPhase, string[]> = {
  // Phase 1: 레이아웃 모드 및 정렬 설정
  layout: [
    'layoutMode',              // VERTICAL, HORIZONTAL
    'primaryAxisAlignItems',   // MIN, CENTER, MAX, SPACE_BETWEEN
    'counterAxisAlignItems',   // MIN, CENTER, MAX, BASELINE
    'layoutWrap'              // WRAP, NO_WRAP
  ],

  // Phase 2: 기본 사이징 설정
  sizing: [
    'width',                  // 먼저 실제 크기 설정
    'height',
    'layoutSizingHorizontal', // 그 다음 layoutSizing 모드 설정
    'layoutSizingVertical',
    'primaryAxisSizingMode',
    'counterAxisSizingMode'
  ],

  // Phase 3: 간격 및 여백 설정
  spacing: [
    'itemSpacing',
    'counterAxisSpacing',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft'
  ],

  // Phase 4: 시각적 스타일 설정
  appearance: [
    'fills',
    'strokes',
    'effects',
    'cornerRadius',
    'opacity'
  ]
};

function applyStyles(node: SceneNode, styles: string = '') {
  const styleObject = processStyles(styles);
  console.log("styleObject", JSON.stringify(styleObject, null, 2));

  // layout 속성 적용

  if (styleObject.layoutMode !== undefined) {
    (node as FrameNode).layoutMode = styleObject.layoutMode;
    delete styleObject.layoutMode;
  }

  if (styleObject.primaryAxisAlignItems !== undefined) {
    (node as FrameNode).primaryAxisAlignItems = styleObject.primaryAxisAlignItems;
    delete styleObject.primaryAxisAlignItems;
  }

  if (styleObject.counterAxisAlignItems !== undefined) {
    (node as FrameNode).counterAxisAlignItems = styleObject.counterAxisAlignItems;
    delete styleObject.counterAxisAlignItems;
  }

  if (styleObject.layoutWrap !== undefined) {
    (node as FrameNode).layoutWrap = styleObject.layoutWrap;
    delete styleObject.layoutWrap;
  }

  // sizing 속성 적용
  if (styleObject.width !== undefined) {
    (node as FrameNode).resize(styleObject.width, node.height);
    delete styleObject.width;
  }

  if (styleObject.height !== undefined) { 
    (node as FrameNode).resize(node.width, styleObject.height);
    delete styleObject.height;
  }

  if (styleObject.layoutSizingHorizontal !== undefined) {
    (node as FrameNode).layoutSizingHorizontal = styleObject.layoutSizingHorizontal;
    delete styleObject.layoutSizingHorizontal;
  }

  if (styleObject.layoutSizingVertical !== undefined) { 
    (node as FrameNode).layoutSizingVertical = styleObject.layoutSizingVertical;
    delete styleObject.layoutSizingVertical;
  }

  // spacing 속성 적용

  if (styleObject.itemSpacing !== undefined) {
    (node as FrameNode).itemSpacing = styleObject.itemSpacing;
    delete styleObject.itemSpacing;
  }

  if (styleObject.counterAxisSpacing !== undefined) {
    (node as FrameNode).counterAxisSpacing = styleObject.counterAxisSpacing;
    delete styleObject.counterAxisSpacing;
  }

  if (styleObject.paddingTop !== undefined) {
    (node as FrameNode).paddingTop = styleObject.paddingTop;
    delete styleObject.paddingTop;
  }

  if (styleObject.paddingRight !== undefined) { 
    (node as FrameNode).paddingRight = styleObject.paddingRight;
    delete styleObject.paddingRight;
  }

  if (styleObject.paddingBottom !== undefined) {
    (node as FrameNode).paddingBottom = styleObject.paddingBottom;
    delete styleObject.paddingBottom;
  }

  if (styleObject.paddingLeft !== undefined) {
    (node as FrameNode).paddingLeft = styleObject.paddingLeft;
    delete styleObject.paddingLeft;
  }

  // appearance 속성 적용

  if (styleObject.fills !== undefined) {
    (node as FrameNode).fills = styleObject.fills as Paint[];
    delete styleObject.fills;
  }

  if (styleObject.strokes !== undefined) {
    (node as FrameNode).strokes = styleObject.strokes as Paint[];
    delete styleObject.strokes;
  }

  if (styleObject.effects !== undefined) {
    (node as FrameNode).effects = styleObject.effects as Effect[];
    delete styleObject.effects;
  }


  if (styleObject.topLeftRadius !== undefined) {
    (node as FrameNode).topLeftRadius = styleObject.topLeftRadius;
    delete styleObject.topLeftRadius;
  }

  if (styleObject.topRightRadius !== undefined) {
    (node as FrameNode).topRightRadius = styleObject.topRightRadius;
    delete styleObject.topRightRadius;
  }

  if (styleObject.bottomLeftRadius !== undefined) {
    (node as FrameNode).bottomLeftRadius = styleObject.bottomLeftRadius;
    delete styleObject.bottomLeftRadius;
  }

  if (styleObject.bottomRightRadius !== undefined) {
    (node as FrameNode).bottomRightRadius = styleObject.bottomRightRadius;
    delete styleObject.bottomRightRadius;
  }

  if (styleObject.opacity !== undefined) {
    (node as FrameNode).opacity = styleObject.opacity;
    delete styleObject.opacity;
  }
  
  // 나머지 속성 적용
  
  const phases: StyleApplyPhase[] = ['layout', 'sizing', 'spacing', 'appearance'];
  
  for (const phase of phases) {
    const properties = STYLE_APPLY_ORDER[phase];
    for (const prop of properties) {
      try {
        if (styleObject?.[prop] !== undefined) {
            // width/height는 특별 처리
            if (prop === 'width' && styleObject.layoutSizingHorizontal !== 'FIXED') {
              continue; // FILL/HUG인 경우 resize 건너뛰기
            }
            if (prop === 'height' && styleObject.layoutSizingVertical !== 'FIXED') {
              continue; // FILL/HUG인 경우 resize 건너뛰기
            }

            // resize 처리
            if (prop === 'width') {
              (node as FrameNode).resize(styleObject.width, node.height);
            } else if (prop === 'height') {
              (node as FrameNode).resize(node.width, styleObject.height);
            } else {
              // 일반 속성 적용
              (node as any)[prop] = styleObject[prop];
            }
        }
      } catch (error) {
        console.warn(`Failed to apply ${phase} property ${prop}:`, error);
      }
    }
  }
}

// export function applyStyles(node: SceneNode, styles: string = '') {
 
//     // 스타일 적용
//     const styleObject = processStyles(styles);
//     console.log("styleObject", JSON.stringify(styleObject, null, 2));

//     for(const key in styleObject) {
//       if(key === 'width') {
//         (node as FrameNode).resize(styleObject[key] as number, node.height);
//       } else if(key === 'height') {
//         (node as FrameNode).resize(node.width, styleObject[key] as number);
//       } else {
//         Object.assign(node, {
//           [key]: styleObject[key]
//         });
//       }
//     }
    
// }

export class FigmaNodeCreator {
  private static instance: FigmaNodeCreator;
  
  private constructor() {}

  /**
   * 싱글톤 인스턴스를 반환합니다.
   */
  static getInstance(): FigmaNodeCreator {
    if (!this.instance) {
      this.instance = new FigmaNodeCreator();
    }
    return this.instance;
  }

  /**
   * 토큰 기반 JSON 구조로부터 프레임을 생성합니다.
   * 
   * @param data 컴팩트 JSON 구조
   * @returns 생성된 프레임 노드
   */
  async createFrameFromJson(data: CompactFrameStructure): Promise<FrameNode | null> {
    console.log('Creating frame from token-based JSON:', data);
    
    if (!data || !data.frame) {
      console.error('Invalid JSON data structure');
      return null;
    }
    
    try {


      // 기본 폰트 로드 (현재 설정된 폰트가 없거나 타입 에러 방지용)
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });

      // 루트 프레임 생성
      const rootFrame = await this.createNodeFromData(data.frame, figma.currentPage) as FrameNode;
      if (!rootFrame) {
        console.error('Failed to create root frame');
        return null;
      }
      
      // 생성된 프레임을 뷰포트 중앙에 배치
      const viewportCenter = figma.viewport.center;
      rootFrame.x = viewportCenter.x - rootFrame.width / 2;
      rootFrame.y = viewportCenter.y - rootFrame.height / 2;
      
      // 생성된 프레임을 현재 선택으로 설정
      figma.currentPage.selection = [rootFrame];
      figma.viewport.scrollAndZoomIntoView([rootFrame]);
      
      return rootFrame;
    } catch (error) {
      console.error('Error creating frame from JSON:', error);
      return await this.createErrorFrame(error instanceof Error ? error.message : String(error));
    }
  }
  
  /**
   * 컴팩트 노드 데이터로부터 노드를 생성합니다.
   * 
   * @param data 컴팩트 노드 데이터
   * @param parent 부모 노드 (선택적)
   * @returns 생성된 노드
   */
  private async createNodeFromData(data: CompactNodeData, parent: BaseNode | null = null): Promise<SceneNode | null> {
    let node: SceneNode | null = null;
    const dataType = data.type || 'FRAME';
    
    // 노드 타입에 따라 생성
    switch (dataType) {
      case 'FRAME':
        node = figma.createFrame();
        break;
        
      case 'TEXT':
        node = figma.createText();
        // 텍스트 콘텐츠 설정
        if (data.text) {
          try {
            // 폰트 설정 후 텍스트 내용 설정
            (node as TextNode).fontName = { family: "Inter", style: "Regular" };
            (node as TextNode).characters = data.text || "";
          } catch (error) {
            console.warn('폰트 로딩 오류:', error);
            // 에러 발생 시 텍스트만 설정
            (node as TextNode).characters = data.text;
          }
        }
        break;
        
      case 'RECTANGLE':
        node = figma.createRectangle();
        break;
        
      case 'ELLIPSE':
        node = figma.createEllipse();
        break;
        
      case 'LINE':
        node = figma.createLine();
        break;
        
      case 'VECTOR':
        node = figma.createVector();

        try {
          (node as VectorNode).vectorPaths = data.paths.map(path => ({
            windingRule: 'NONZERO',
            data: path
          })) as VectorPaths;
        } catch (error) {
          console.error('Error setting vector paths:', error);
        }

        break;
        
      default:
        console.error(`Unsupported node type: ${data.type}`);
        return null;
    }
    
    if (!node) return null;

    if (parent && 'appendChild' in parent) {
      (parent as FrameNode).appendChild(node as SceneNode);
    }
    
    // 이름 설정
    if (data.name) node.name = data.name;
        
    // 레이아웃 모드 설정 스타일이 있으면 먼저 적용
    // (자식 노드 추가 전에 레이아웃 모드가 설정되어야 함)
    if (data.styles) {
      applyStyles(node, data.styles);
    }

    // 자식 노드 처리
    if (data.children && data.children.length > 0 && 'appendChild' in node) {
      for (const childData of data.children) {
        await this.createNodeFromData(childData, node);
      }
    }
    
    return node;
  }

  /**
   * 현재 선택된 노드들을 JSON 데이터로 업데이트합니다.
   * @param jsonData 토큰 기반 JSON 데이터
   * @returns 업데이트 성공 여부
   */
  async updateSelectedNodesWithJson(jsonData: CompactFrameStructure): Promise<boolean> {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      console.warn('No nodes selected for update');
      return false;
    }

    try {
      // 가장 첫 번째 선택된 노드 업데이트
      await this.updateNodeWithJson(selection[0], jsonData.frame);
      console.log('Updated selected node with JSON data');
      return true;
    } catch (error) {
      console.error('Error updating node with JSON:', error);
      return false;
    }
  }

  /**
   * 노드를 JSON 데이터로 업데이트합니다.
   * @param node 업데이트할 노드
   * @param jsonData 토큰 기반 JSON 데이터
   */
  async updateNodeWithJson(node: SceneNode, jsonData: CompactNodeData): Promise<void> {
    if (!node || !jsonData) return;

    // 노드 이름 업데이트
    if (jsonData.name) {
      node.name = jsonData.name;
    }

    applyStyles(node, jsonData.styles);
    // 텍스트 내용 업데이트
    if (node.type === 'TEXT' && jsonData.text) {
      try {
        // 텍스트 내용 설정
        (node as TextNode).fontName = { family: "Inter", style: "Regular" };
        (node as TextNode).characters = jsonData.text;
      } catch (error) {
        console.warn('Font loading error:', error);
      }
    }

    // 자식 노드 업데이트
    if (jsonData.children && 'children' in node) {
      // 새 자식 노드 개수가 현재 노드의 자식 개수보다 많거나 같으면
      // 기존 자식 노드를 업데이트하고, 부족하면 새로 생성
      for (let i = 0; i < jsonData.children.length; i++) {
        if (i < node.children.length) {
          // 기존 자식 노드 업데이트
          await this.updateNodeWithJson(node.children[i], jsonData.children[i]);
        } else {
          // 새 자식 노드 추가
          const childNode = await this.createNodeFromData(jsonData.children[i], node);
          if (childNode) {
            node.appendChild(childNode);
            this.validateChildLayoutSizing(childNode, jsonData.children[i]);
          }
        }
      }
      
      // 남은 노드 제거 (선택적)
      if (jsonData.children.length < node.children.length) {
        for (let i = node.children.length - 1; i >= jsonData.children.length; i--) {
          node.children[i].remove();
        }
      }
    }
  }

  /**
   * 에러 메시지를 표시하는 프레임을 생성합니다.
   * @param errorMessage 에러 메시지
   * @returns 에러 메시지가 포함된 프레임
   */
  private async createErrorFrame(errorMessage: string): Promise<FrameNode> {
    // 에러 프레임 생성
    const frame = figma.createFrame();
    frame.name = "Error Frame";
    frame.resize(400, 200);
    

    // 스타일 적용
    const styleObject = processStyles('bg-[#FFEEEE] p-4 flex-col gap-4 rounded-md');
    console.log("styleObject", JSON.stringify(styleObject, null, 2));

    for(const key in styleObject) {
      if(key === 'width') {
        (frame as FrameNode).resize(styleObject[key] as number, frame.height);
      } else if(key === 'height') {
        (frame as FrameNode).resize(frame.width, styleObject[key] as number);
      } else {
        Object.assign(frame, {
          [key]: styleObject[key]
        });
      }
    }
    
    try {
      // 에러 아이콘 프레임
      const iconFrame = figma.createFrame();
      iconFrame.name = "Error Icon";
      iconFrame.resize(32, 32);
      
      applyStyles(iconFrame, 'bg-[#FF5555] rounded-full');
      
      frame.appendChild(iconFrame);
      
      // 에러 타이틀
      const title = figma.createText();
      title.fontName = { family: "Inter", style: "Bold" };
      title.characters = "Error Creating Frame";
      title.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0, b: 0 } }];
      title.fontSize = 16;
      
      frame.appendChild(title);
      
      // 에러 메시지
      const message = figma.createText();
      message.fontName = { family: "Inter", style: "Regular" };
      message.characters = errorMessage;
      message.fills = [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }];
      message.fontSize = 14;
      
      frame.appendChild(message);
      
    } catch (error) {
      console.error("Error creating error frame:", error);
    }
    
    // 뷰포트 중앙에 위치시키기
    const viewportCenter = figma.viewport.center;
    frame.x = viewportCenter.x - frame.width / 2;
    frame.y = viewportCenter.y - frame.height / 2;
    
    return frame;
  }
}

// 핸들러 함수 모음
export const frameHandlers = {
  /**
   * JSON 데이터로부터 프레임을 생성합니다.
   * @param jsonData 토큰 기반 JSON 데이터
   * @returns 생성된 프레임
   */
  createFrame: async (jsonData: CompactFrameStructure): Promise<FrameNode | null> => {
    const creator = FigmaNodeCreator.getInstance();
    return await creator.createFrameFromJson(jsonData);
  },

  /**
   * 현재 선택된 노드들을 JSON 데이터로 업데이트합니다.
   * @param jsonData 토큰 기반 JSON 데이터
   * @returns 업데이트 성공 여부
   */
  updateSelectionWithData: async (jsonData: CompactFrameStructure): Promise<boolean> => {
    const creator = FigmaNodeCreator.getInstance();
    return await creator.updateSelectedNodesWithJson(jsonData);
  },

  /**
   * 기본 프레임을 생성합니다.
   * @returns 기본 프레임
   */
  createDefaultFrame: async (): Promise<FrameNode> => {
    // 토큰 기반 기본 프레임 데이터
    const defaultFrameData: CompactFrameStructure = {
      frame: {
        type: "FRAME",
        name: "Default Frame",
        styles: "bg-white w-[800] h-[600] flex-col p-8 gap-4 rounded-md",
        children: [
          {
            type: "TEXT",
            name: "Title",
            styles: "text-2xl text-[#333333] font-bold",
            text: "Welcome to FigmaIKR"
          },
          {
            type: "TEXT",
            name: "Subtitle",
            styles: "text-md text-[#666666]",
            text: "Create Figma designs with a token-based styling system"
          },
          {
            type: "FRAME",
            name: "Content Area",
            styles: "w-full bg-[#F8F9FA] p-6 flex-col gap-4 rounded-lg",
            children: [
              {
                type: "TEXT",
                name: "Content",
                styles: "text-md text-[#333333]",
                text: "This is a default frame created with the token-based styling system."
              }
            ]
          }
        ]
      }
    };

    const creator = FigmaNodeCreator.getInstance();
    return await creator.createFrameFromJson(defaultFrameData) as FrameNode;
  }
}; 