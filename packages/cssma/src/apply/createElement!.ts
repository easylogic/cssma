import { applyCssStyles } from './applyStyles';
import type { FigmaNodeType } from '../types';

export function createElement(
  nodeType: FigmaNodeType,
): SceneNode {
  let node: SceneNode;
  
  
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
      throw new Error('Instance node do not create directly. Use createInstance() of component.');
    default:
      throw new Error(`Unsupported node type: ${nodeType}`);
  }
  
  return node;
}