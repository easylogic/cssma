import { applyStyles } from './applyStyles';
import type { FigmaNodeType } from '../types';

/**
 * Figma 노드를 생성하고 스타일을 적용합니다.
 * 
 * @example
 * ```typescript
 * const frame = createElement('FRAME', 'w-[100px] h-[100px] bg-red-500');
 * const text = createElement('TEXT', 'w-[100px] h-[100px] bg-red-500');
 * ```
 * 
 * @param nodeType 생성할 Figma 노드 타입
 * @param styles 적용할 스타일 문자열 (Tailwind CSS 형식)
 * @param children 자식 노드들 (선택적)
 * @param props 추가 속성 (선택적)
 * @returns 생성된 Figma 노드
 */
export function createElement(
  nodeType: FigmaNodeType,
  styles: string = '',
): SceneNode {
  let node: SceneNode;
  
  // 노드 생성
  switch (nodeType) {
    case 'FRAME':
      node = figma.createFrame();
      break;
    case 'TEXT':
      node = figma.createText();
      break;
    case 'RECTANGLE':
      node = figma.createRectangle();
      break;
    case 'ELLIPSE':
      node = figma.createEllipse();
      break;
    case 'POLYGON':
      node = figma.createPolygon();
      break;
    case 'STAR':
      node = figma.createStar();
      break;
    case 'VECTOR':
      node = figma.createVector();
      break;
    case 'LINE':
      node = figma.createLine();
      break;
    case 'COMPONENT':
      node = figma.createComponent();
      break;
    case 'INSTANCE':
      throw new Error('INSTANCE 노드는 직접 생성할 수 없습니다. 컴포넌트의 createInstance()를 사용하세요.');
    default:
      throw new Error(`지원하지 않는 노드 타입: ${nodeType}`);
  }
  
  return node;
}