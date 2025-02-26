/**
 * Figma 노드 생성을 위한 유틸리티 클래스
 * 토큰 기반 스타일 시스템을 사용하여 UI 요소를 생성합니다.
 */
import { CompactNodeData, CompactFrameStructure } from '../types/compact';
import { applyStyles, validateLayoutStyles } from '../utils/styleTokens';

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
    if (!data || !data.type) {
      console.error('Invalid node data: missing type');
      return null;
    }
    
    let node: SceneNode | null = null;
    
    // 노드 타입에 따라 생성
    switch (data.type) {
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
    
    // 기본 크기 설정
    let newWidth = node.width;
    let newHeight = node.height;
    let shouldResize = false;
    
    if (data.width !== undefined) {
      const widthValue = typeof data.width === 'number' ? data.width : parseInt(data.width);
      if (!isNaN(widthValue)) {
        newWidth = widthValue;
        shouldResize = true;
      }
    }
    
    if (data.height !== undefined) {
      const heightValue = typeof data.height === 'number' ? data.height : parseInt(data.height);
      if (!isNaN(heightValue)) {
        newHeight = heightValue;
        shouldResize = true;
      }
    }
    
    // 두 개의 resize 호출 대신 하나로 통합
    if (shouldResize && 'resize' in node) {
      (node as FrameNode).resize(newWidth, newHeight);
    }
    
    // 레이아웃 모드 설정 스타일이 있으면 먼저 적용
    // (자식 노드 추가 전에 레이아웃 모드가 설정되어야 함)
    if (data.styles) {
      const layoutStyles = data.styles.filter(style => 
        style === 'flex-col' || style === 'flex-row'
      );
      
      if (layoutStyles.length > 0) {
        // 레이아웃 관련 스타일만 먼저 적용
        applyStyles(node, layoutStyles);
      }
    }
    
    // 스타일 클래스 적용 (부모 레이아웃 검증 포함)
    if (data.styles) {
      const validatedStyles = validateLayoutStyles(parent, node, data.styles);
      applyStyles(node, validatedStyles);
    }
    
    // 추가 속성 적용
    if (data.properties) {
      // Object.entries는 TypeScript의 일부 버전에서 지원되지 않을 수 있어 for..in 루프 사용
      for (const key in data.properties) {
        if (Object.prototype.hasOwnProperty.call(data.properties, key)) {
          // @ts-ignore - Figma의 타입 정의와 맞지 않을 수 있음
          node[key] = data.properties[key];
        }
      }
    }
    
    // 자식 노드 처리
    if (data.children && data.children.length > 0 && 'appendChild' in node) {
      for (const childData of data.children) {
        const childNode = await this.createNodeFromData(childData, node);
        if (childNode) {
          (node as FrameNode).appendChild(childNode);
          
          // 자식 노드 추가 후 레이아웃 검증
          this.validateChildLayoutSizing(childNode, childData);
        }
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

    // 스타일 적용
    if (jsonData.styles && jsonData.styles.length > 0) {
      applyStyles(node, jsonData.styles);
    }

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
   * 자식 노드의 layoutSizing 속성이 부모 노드의 레이아웃 모드와 호환되는지 확인합니다.
   * 문제가 있으면 경고하고 수정합니다.
   * @param child 자식 노드
   * @param parent 부모 노드
   */
  private validateChildLayoutSizing(child: SceneNode, childData: CompactNodeData): void {
    const styles = childData.styles || [];

    // 레이아웃 크기 조정 스타일 처리
    if (styles.indexOf('w-full') !== -1) {
      (child as FrameNode).layoutSizingHorizontal = 'FILL';
    } else if (styles.indexOf('w-auto') !== -1) {
      (child as FrameNode).layoutSizingHorizontal = 'HUG';
    } else if (styles.indexOf('w-hug') !== -1) {
      (child as FrameNode).layoutSizingHorizontal = 'HUG';
    }

    if (styles.indexOf('h-full') !== -1) {
      (child as FrameNode).layoutSizingVertical = 'FILL';
    } else if (styles.indexOf('h-auto') !== -1) {
      (child as FrameNode).layoutSizingVertical = 'HUG';
    } else if (styles.indexOf('h-hug') !== -1) {
      (child as FrameNode).layoutSizingVertical = 'HUG';
    }

    // 임의 너비 처리 (w-[xxx] 패턴)
    const widthArbitraryStyle = styles.find(style => style.match(/^w-\[.*\]$/));
    if (widthArbitraryStyle && 'resize' in child) {
      const match = widthArbitraryStyle.match(/^w-\[(.*)\]$/);
      if (match && match[1]) {
        const width = parseInt(match[1]);
        if (!isNaN(width)) {
          console.log(`📏 임의 너비 적용: ${width}px`);
          (child as FrameNode).resize(width, child.height);
        }
      }
    }

    // 임의 높이 처리 (h-[xxx] 패턴)
    const heightArbitraryStyle = styles.find(style => style.match(/^h-\[.*\]$/));
    if (heightArbitraryStyle && 'resize' in child) {
      const match = heightArbitraryStyle.match(/^h-\[(.*)\]$/);
      if (match && match[1]) {
        const height = parseInt(match[1]);
        if (!isNaN(height)) {
          console.log(`📏 임의 높이 적용: ${height}px`);
          (child as FrameNode).resize(child.width, height);
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
    applyStyles(frame, [
      'bg-[#FFEEEE]',
      'p-4',
      'flex-col',
      'gap-4',
      'rounded-md'
    ]);
    
    try {
      // 에러 아이콘 프레임
      const iconFrame = figma.createFrame();
      iconFrame.name = "Error Icon";
      iconFrame.resize(32, 32);
      
      applyStyles(iconFrame, [
        'bg-[#FF5555]',
        'rounded-full'
      ]);
      
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
        styles: [
          "bg-white", 
          "w-[800]", 
          "h-[600]",
          "flex-col",
          "p-8",
          "gap-4",
          "rounded-md"
        ],
        children: [
          {
            type: "TEXT",
            name: "Title",
            styles: [
              "text-2xl",
              "text-[#333333]",
              "font-bold"
            ],
            text: "Welcome to FigmaIKR"
          },
          {
            type: "TEXT",
            name: "Subtitle",
            styles: [
              "text-md",
              "text-[#666666]"
            ],
            text: "Create Figma designs with a token-based styling system"
          },
          {
            type: "FRAME",
            name: "Content Area",
            styles: [
              "w-full",
              "bg-[#F8F9FA]",
              "p-6",
              "flex-col",
              "gap-4",
              "rounded-lg"
            ],
            children: [
              {
                type: "TEXT",
                name: "Content",
                styles: [
                  "text-md",
                  "text-[#333333]"
                ],
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