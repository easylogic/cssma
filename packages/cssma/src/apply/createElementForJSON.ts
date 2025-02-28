import { createElement } from './createElement';
import type { CompactNodeData, FigmaNodeType } from '../types';
import { applyStyles } from './applyStyles';

/**
 * 컴팩트 노드 데이터로부터 노드를 생성합니다.
 * 
 * @param data 컴팩트 노드 데이터
 * @returns 생성된 노드
 */
export function createNodeFromJSON(data: CompactNodeData, parentNode?: SceneNode) {
  const node = createElement(data.type as FigmaNodeType);

  if (parentNode) {
    (parentNode as FrameNode).appendChild(node);
  }

  if (data.styles) {
    applyStyles(node, data.styles);
  }

// 자식 노드 처리
  if (data.children && data.children.length > 0 && 'appendChild' in node) {
    for (const childData of data.children) {
      createNodeFromJSON(childData, node);
    }
  }

  return node;
}