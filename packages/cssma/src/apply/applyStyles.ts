import { findVariableByName } from 'src/utils/figma-variable';
import { processStyles } from '../index';

/**
 * Figma 노드에 Tailwind CSS 스타일을 적용합니다.
 * 
 * @param node 스타일을 적용할 Figma 노드
 * @param styles Tailwind CSS 형식의 스타일 문자열 (예: 'flex-col bg-white rounded-lg p-[16] gap-[8]')
 * @returns 스타일이 적용된 노드
 * 
 * @example
 * ```typescript
 * // 프레임 생성 및 스타일 적용
 * const frame = figma.createFrame();
 * applyStyles(frame, 'flex-col bg-white rounded-lg p-[16] gap-[8]');
 * 
 * // 텍스트 노드 생성 및 스타일 적용
 * const text = figma.createText();
 * text.characters = 'Hello World';
 * applyStyles(text, 'text-lg font-bold text-[#1a1a1a]');
 * ```
 */
export async function applyStyles<T extends SceneNode>(node: T, styles: string = ''): Promise<T> {
  if (!styles) return node;
  
  try {
    const styleObject = processStyles(styles);
    
    // 노드 타입에 따라 적용 가능한 속성 확인
    const isFrameLike = ['FRAME', 'COMPONENT', 'INSTANCE', 'SECTION'].includes(node.type);
    const isTextNode = node.type === 'TEXT';
    const isVectorNode = node.type === 'VECTOR';
    
    // 속성 존재 여부 확인 (필요한 경우에만)
    const hasCornerRadius = styleObject.cornerRadius !== undefined || 
                           styleObject.topLeftRadius !== undefined || 
                           styleObject.topRightRadius !== undefined || 
                           styleObject.bottomLeftRadius !== undefined || 
                           styleObject.bottomRightRadius !== undefined;
                           
    const hasFills = styleObject.fills !== undefined;
    const hasStrokes = styleObject.strokes !== undefined || 
                      styleObject.strokeWeight !== undefined || 
                      styleObject.strokeAlign !== undefined || 
                      styleObject.dashPattern !== undefined;
                      
    const hasEffects = styleObject.effects !== undefined;
    const hasResize = styleObject.width !== undefined || styleObject.height !== undefined;
    const hasOpacity = styleObject.opacity !== undefined;
    
    // 레이아웃 속성 적용 (프레임, 컴포넌트, 인스턴스에만 적용)
    if (isFrameLike) {
      const frameNode = node as FrameNode;
      
      // 레이아웃 모드 및 방향
      if (styleObject.layoutMode !== undefined) {
        frameNode.layoutMode = styleObject.layoutMode;
      }
      
      // 정렬 속성
      if (styleObject.primaryAxisAlignItems !== undefined) {
        frameNode.primaryAxisAlignItems = styleObject.primaryAxisAlignItems;
      }
      
      if (styleObject.counterAxisAlignItems !== undefined) {
        frameNode.counterAxisAlignItems = styleObject.counterAxisAlignItems;
      }
      
      // 레이아웃 랩 (줄바꿈)
      if (styleObject.layoutWrap !== undefined) {
        frameNode.layoutWrap = styleObject.layoutWrap;
      }
      
      // 사이징 속성
      if (styleObject.layoutSizingHorizontal !== undefined) {
        frameNode.layoutSizingHorizontal = styleObject.layoutSizingHorizontal;
      }
      
      if (styleObject.layoutSizingVertical !== undefined) {
        frameNode.layoutSizingVertical = styleObject.layoutSizingVertical;
      }
      
      // 간격 속성
      if (styleObject.itemSpacing !== undefined) {
        frameNode.itemSpacing = styleObject.itemSpacing;
      }
      
      if (styleObject.counterAxisSpacing !== undefined) {
        frameNode.counterAxisSpacing = styleObject.counterAxisSpacing;
      }
      
      // 패딩 속성
      if (styleObject.paddingTop !== undefined) {
        frameNode.paddingTop = styleObject.paddingTop;
      }
      
      if (styleObject.paddingRight !== undefined) {
        frameNode.paddingRight = styleObject.paddingRight;
      }
      
      if (styleObject.paddingBottom !== undefined) {
        frameNode.paddingBottom = styleObject.paddingBottom;
      }
      
      if (styleObject.paddingLeft !== undefined) {
        frameNode.paddingLeft = styleObject.paddingLeft;
      }
    }
    
    // 모서리 반경 속성
    if (hasCornerRadius && 'cornerRadius' in node) {
      const roundableNode = node as SceneNode & { 
        cornerRadius: number;
        topLeftRadius?: number;
        topRightRadius?: number;
        bottomLeftRadius?: number;
        bottomRightRadius?: number;
      };
      
      // 전체 모서리 반경
      if (styleObject.cornerRadius !== undefined) {
        roundableNode.cornerRadius = styleObject.cornerRadius;
      }
      
      // 개별 모서리 반경
      if ('topLeftRadius' in roundableNode && styleObject.topLeftRadius !== undefined) {
        roundableNode.topLeftRadius = styleObject.topLeftRadius;
      }
      
      if ('topRightRadius' in roundableNode && styleObject.topRightRadius !== undefined) {
        roundableNode.topRightRadius = styleObject.topRightRadius;
      }
      
      if ('bottomLeftRadius' in roundableNode && styleObject.bottomLeftRadius !== undefined) {
        roundableNode.bottomLeftRadius = styleObject.bottomLeftRadius;
      }
      
      if ('bottomRightRadius' in roundableNode && styleObject.bottomRightRadius !== undefined) {
        roundableNode.bottomRightRadius = styleObject.bottomRightRadius;
      }
    }
    
    // 채우기 속성
    if (hasFills && 'fills' in node) {
      const fillableNode = node as SceneNode & { fills: ReadonlyArray<Paint> | Paint[] };
      fillableNode.fills = await Promise.all(styleObject.fills?.map(async (fill) => {
        if (fill.type === 'SOLID' && 'variable' in fill) {
          return figma.variables.setBoundVariableForPaint(
            { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
            'color',
            await findVariableByName(fill.variable as string)
          ) as Paint;
        }
        return fill as Paint;
      }) || []);
    }
    
    // 테두리 속성
    if (hasStrokes && 'strokes' in node) {
      const strokeableNode = node as SceneNode & { 
        strokes: ReadonlyArray<Paint> | Paint[];
        strokeWeight?: number;
        strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
        strokeCap?: 'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL';
        strokeJoin?: 'MITER' | 'BEVEL' | 'ROUND';
        dashPattern?: ReadonlyArray<number> | number[];
      };
      
      if (styleObject.strokes !== undefined) {
        strokeableNode.strokes = styleObject.strokes as Paint[];
      }
      
      if ('strokeWeight' in strokeableNode && styleObject.strokeWeight !== undefined) {
        strokeableNode.strokeWeight = styleObject.strokeWeight;
      }
      
      if ('strokeAlign' in strokeableNode && styleObject.strokeAlign !== undefined) {
        strokeableNode.strokeAlign = styleObject.strokeAlign as 'INSIDE' | 'OUTSIDE' | 'CENTER';
      }
      
      if ('dashPattern' in strokeableNode && styleObject.dashPattern !== undefined) {
        strokeableNode.dashPattern = styleObject.dashPattern as number[];
      }
    }
    
    // 효과 속성
    if (hasEffects && 'effects' in node) {
      const effectableNode = node as SceneNode & { effects: ReadonlyArray<Effect> | Effect[] };
      effectableNode.effects = styleObject.effects as Effect[];
    }
    
    // 불투명도 속성
    if (hasOpacity && 'opacity' in node) {
      const opacityNode = node as SceneNode & { opacity: number };
      if (styleObject.opacity !== undefined) {
        opacityNode.opacity = styleObject.opacity;
      }
    }
    
    // 텍스트 노드 특수 처리
    if (isTextNode) {
      const textNode = node as TextNode;
      
      // 폰트 크기
      if (styleObject.fontSize !== undefined) {
        textNode.fontSize = styleObject.fontSize;
      }
      
      // 폰트 이름 (폰트 패밀리 + 스타일)
      if (styleObject.fontName !== undefined) {
        textNode.fontName = styleObject.fontName as FontName;
      }
      
      // 텍스트 정렬
      if (styleObject.textAlignHorizontal !== undefined) {
        textNode.textAlignHorizontal = styleObject.textAlignHorizontal as 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
      }
      
      if (styleObject.textAlignVertical !== undefined) {
        textNode.textAlignVertical = styleObject.textAlignVertical as 'TOP' | 'CENTER' | 'BOTTOM';
      }
      
      // 행간
      if (styleObject.lineHeight !== undefined) {
        // 행간 값이 숫자인 경우 LineHeight 객체로 변환
        if (typeof styleObject.lineHeight === 'number') {
          textNode.lineHeight = {
            value: styleObject.lineHeight,
            unit: 'PIXELS'
          };
        } else {
          textNode.lineHeight = styleObject.lineHeight as LineHeight;
        }
      }
      
      // 자간
      if (styleObject.letterSpacing !== undefined) {
        // 자간 값이 숫자인 경우 LetterSpacing 객체로 변환
        if (typeof styleObject.letterSpacing === 'number') {
          textNode.letterSpacing = {
            value: styleObject.letterSpacing,
            unit: 'PIXELS'
          };
        } else {
          textNode.letterSpacing = styleObject.letterSpacing as LetterSpacing;
        }
      }
      
      // 텍스트 장식
      if (styleObject.textDecoration !== undefined) {
        textNode.textDecoration = styleObject.textDecoration as 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
      }
      
      // 텍스트 변환
      if (styleObject.textCase !== undefined) {
        textNode.textCase = styleObject.textCase as 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
      }
    }
    
    // 벡터 노드 특수 처리
    if (isVectorNode) {
      const vectorNode = node as VectorNode;
      const extendedStyleObject = styleObject as any;
      
      if (extendedStyleObject.vectorPaths !== undefined) {
        vectorNode.vectorPaths = extendedStyleObject.vectorPaths;
      } else if (extendedStyleObject.paths !== undefined) {
        // 이전 버전 호환성을 위한 처리
        vectorNode.vectorPaths = extendedStyleObject.paths.map((path: string) => ({
          data: path,
          windingRule: 'NONZERO'
        }));
      }
    }
    
    // 크기 속성 (resize 메서드가 있는 노드에만 적용)
    if (hasResize && 'resize' in node) {
      const resizableNode = node as SceneNode & { resize: (width: number, height: number) => void };
      
      if (styleObject.width !== undefined && styleObject.height !== undefined) {
        resizableNode.resize(styleObject.width, styleObject.height);
      } else if (styleObject.width !== undefined) {
        resizableNode.resize(styleObject.width, node.height);
      } else if (styleObject.height !== undefined) {
        resizableNode.resize(node.width, styleObject.height);
      }
    }
    
    return node;
  } catch (error) {
    console.error('스타일 적용 중 오류 발생:', error);
    return node;
  }
}