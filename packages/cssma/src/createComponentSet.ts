import { ComponentDefinition, ComponentVariantProps, NodeData } from './types';
import { processStyles } from './style/processStyles';

/**
 * Creates a Figma component set from a component definition
 */
export function createComponentSet(definition: ComponentDefinition): ComponentSetNode {
  try {
    // 1. Create components for each variant
    const components = Object.entries(definition.props.variants).map(([variantId, variant]) => {
      // Create base component
      const component = figma.createComponent();
      component.name = variant.name;

      // Apply styles
      if (variant.styles) {
        const styles = processStyles(variant.styles);
        Object.assign(component, styles);
      }

      // Create and append child nodes
      if (variant.children) {
        variant.children.forEach(child => {
          const childNode = createNode(child);
          component.appendChild(childNode);
        });
      }

      return component;
    });

    // 2. Combine into component set
    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = definition.name;

    return componentSet;

  } catch (error) {
    console.error('Error creating component set:', error);
    throw error;
  }
}

/**
 * Creates a Figma node from NodeData
 */
function createNode(data: NodeData): SceneNode {
  let node: SceneNode;

  // Create node based on type
  switch (data.type) {
    case 'FRAME':
      node = figma.createFrame();
      break;
    case 'TEXT':
      node = figma.createText();
      if (data.text) {
        node.characters = data.text;
      }
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
    case 'LINE':
      node = figma.createLine();
      break;
    default:
      node = figma.createFrame();
  }

  // Set name
  if (data.name) {
    node.name = data.name;
  }

  // Apply styles
  if (data.styles) {
    const styles = processStyles(data.styles);
    Object.assign(node, styles);
  }

  // Create and append children
  if ('children' in node && data.children) {
    data.children.forEach(child => {
      const childNode = createNode(child);
      node.appendChild(childNode);
    });
  }

  return node;
} 