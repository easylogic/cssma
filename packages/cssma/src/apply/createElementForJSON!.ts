import { createElement } from './createElement!';
import type { CompactNodeData, FigmaNodeType } from '../types';
import { applyCssStyles } from './applyStyles';

export function createNodeFromJSON(data: CompactNodeData, parentNode?: SceneNode) {
  const node = createElement(data.type as FigmaNodeType);

  if (parentNode) {
    (parentNode as FrameNode).appendChild(node);
  }

  if (data.styles) {
    applyCssStyles(node, data.styles);
  }


  if (data.children && data.children.length > 0 && 'appendChild' in node) {
    for (const childData of data.children) {
      createNodeFromJSON(childData, node);
    }
  }

  return node;
}