import { ComponentDefinition, NodeData, ComponentInstance } from '../types';
import { processStyles } from '../style/processStyles';

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

      // Set variant properties
      if (variant.variant) {
        // @ts-ignore: Figma API 타입 정의 문제 우회
        component.setProperties(variant.variant);
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
      // 텍스트 바인딩 설정
      if (data.bind?.text) {
        node.name = `text-bind:${data.bind.text}`;
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

  // 가시성 바인딩 설정
  if (data.bind?.visible) {
    node.name = `${node.name}${node.name ? ' ' : ''}visible-bind:${data.bind.visible}`;
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

/**
 * Creates an instance of a component with specified variant properties
 */
export function createComponentInstance(
  componentSet: ComponentSetNode,
  variantProps: Record<string, string>
): InstanceNode {
  try {
    // Find the component that matches the variant properties
    const defaultComponent = componentSet.defaultVariant;
    if (!defaultComponent) {
      throw new Error('No default variant found in component set');
    }

    // Create instance from component
    const instance = defaultComponent.createInstance();
    
    // Set variant properties
    // @ts-ignore: Figma API 타입 정의 문제 우회
    instance.setProperties(variantProps);

    return instance;

  } catch (error) {
    console.error('Error creating component instance:', error);
    throw error;
  }
}

/**
 * Updates bindings on a component instance
 */
export function updateBindings(
  instance: InstanceNode,
  bindings: {
    text?: Record<string, string>;
    visible?: Record<string, boolean>;
  }
): void {
  try {
    // 모든 자식 노드를 순회하며 바인딩 업데이트
    function updateNodeBindings(node: SceneNode) {
      const nodeName = node.name;

      // 텍스트 바인딩 업데이트
      const textBindMatch = nodeName.match(/text-bind:(\w+)/);
      if (textBindMatch && bindings.text?.[textBindMatch[1]] !== undefined) {
        if (node.type === 'TEXT') {
          node.characters = bindings.text[textBindMatch[1]];
        }
      }

      // 가시성 바인딩 업데이트
      const visibleBindMatch = nodeName.match(/visible-bind:(\w+)/);
      if (visibleBindMatch && bindings.visible?.[visibleBindMatch[1]] !== undefined) {
        node.visible = bindings.visible[visibleBindMatch[1]];
      }

      // 자식 노드들에 대해서도 바인딩 업데이트 수행
      if ('children' in node) {
        node.children.forEach(child => updateNodeBindings(child));
      }
    }

    // 인스턴스의 모든 자식 노드에 대해 바인딩 업데이트 수행
    updateNodeBindings(instance);

  } catch (error) {
    console.error('Error updating bindings:', error);
    throw error;
  }
}

// 사용 예시:
// const buttonInstance = createComponentInstance(buttonComponentSet, {
//   size: 'md',
//   style: 'primary'
// });
//
// updateBindings(buttonInstance, {
//   text: {
//     label: '클릭하세요',
//     description: '이 버튼을 클릭하면 작업이 시작됩니다.'
//   },
//   visible: {
//     icon: true,
//     badge: false
//   }
// }); 