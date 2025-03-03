import { applyStyles } from './apply/applyStyles';
import { findVariableByName } from './utils/figma-variable';

/**
 * Node data type definition
 */
export interface NodeData {
  type: string;                    // Node type (FRAME, TEXT, RECTANGLE, etc.)
  name?: string;                   // Node name
  styles?: string;                 // Tailwind CSS style string
  text?: string;                   // Text content for text nodes
  children?: NodeData[];           // Child node data
  props?: Record<string, any>;     // Additional properties
  data?: Record<string, any>;      // Data properties (for data binding)
  vectorPaths?: any[];             // Path data for vector nodes
}

/**
 * Vector node data interface
 */
export interface VectorNodeData extends NodeData {
  type: 'VECTOR';
  paths: string[];                 // Array of SVG path data
  windingRule?: 'NONZERO' | 'EVENODD'; // Path fill rule
}

// Node creation functions by type
function createFrameNode(props: Record<string, any> = {}): FrameNode {
  const node = figma.createFrame();
  if (props.name) node.name = props.name;
  return node;
}

function createTextNode(props: Record<string, any> = {}): TextNode {
  const node = figma.createText();
  if (props.name) node.name = props.name;
  
  // Handle text content with potential bindings
  if (props.text) {
    // If this is within a component, store the binding expression
    if (props.text.match(/\{\{([^}]+)\}\}/)) {
      // noop
      // already handled in createComponentSetNode
    } else {
      node.characters = props.text;
    }
  }
  
  return node;
}

function createRectangleNode(props: Record<string, any> = {}): RectangleNode {
  const node = figma.createRectangle();
  if (props.name) node.name = props.name;
  return node;
}

function createEllipseNode(props: Record<string, any> = {}): EllipseNode {
  const node = figma.createEllipse();
  if (props.name) node.name = props.name;
  return node;
}

function createPolygonNode(props: Record<string, any> = {}): PolygonNode {
  const node = figma.createPolygon();
  if (props.name) node.name = props.name;
  return node;
}

function createStarNode(props: Record<string, any> = {}): StarNode {
  const node = figma.createStar();
  if (props.name) node.name = props.name;
  return node;
}

function createVectorNode(props: Record<string, any> = {}): VectorNode {
  const node = figma.createVector();
  if (props.name) node.name = props.name;
  if (props.paths) node.vectorPaths = props.paths;
  return node;
}

function createLineNode(props: Record<string, any> = {}): LineNode {
  const node = figma.createLine();
  if (props.name) node.name = props.name;
  return node;
}

function createComponentNode(props: Record<string, any> = {}): ComponentNode {
  const node = figma.createComponent();
  
  // Handle variant properties in the name
  if (props.variantProperties) {
    const variantName = Object.entries(props.variantProperties)
      .map(([key, value]) => `${key}=${value}`)
      .join(', ');
    node.name = variantName;
  } else if (props.name) {
    node.name = props.name;
  }

  // Set other properties
  if (props.description) node.description = props.description;
  if (props.documentationLinks) node.documentationLinks = props.documentationLinks;

  return node;
}

function createComponentSetNode(props: Record<string, any> = {}): ComponentSetNode {
  // Create component variants first
  const children = props.children.map((childInfo: any) => {
    // Ensure each child is a component and has variant properties
    if (childInfo.type !== 'COMPONENT') {
      childInfo.type = 'COMPONENT';
    }
    
    // Each child component should have its variant properties set
    if (childInfo.variantProperties) {
      const component = createNodeForData(childInfo);
      return component;
    }
    
    throw new Error('Each child of a ComponentSet must have variantProperties defined');
  });

  // Combine as variants
  const node = figma.combineAsVariants(children, figma.currentPage);
  
  // Set writable properties
  if (props.name) node.name = props.name;
  if (props.description) node.description = props.description;
  if (props.documentationLinks) node.documentationLinks = props.documentationLinks;

  // Add component properties to ComponentSet
  if (props.componentProperties) {
    Object.entries(props.componentProperties).forEach(([key, property]: [string, any]) => {
      node.addComponentProperty(key, property.type, property.defaultValue, {
        preferredValues: property.preferredValues
      });
    });
  }

  return node;
}

function createInstanceNode(props: Record<string, any> = {}): InstanceNode {
  const component = findComponentByName(props.componentName);
  if (!component) {
    throw new Error(`Component with name ${props.componentName} not found`);
  }
  
  const node = component.createInstance();
  if (props.name) node.name = props.name;
  
  // Handle variant properties if provided
  if (props.variantProperties && 'setProperties' in node) {
    node.setProperties(props.variantProperties);
  }
  
  return node;
}

// Node creation map
const nodeCreators: Record<string, (props: Record<string, any>) => SceneNode> = {
  'FRAME': createFrameNode,
  'TEXT': createTextNode,
  'RECTANGLE': createRectangleNode,
  'ELLIPSE': createEllipseNode,
  'POLYGON': createPolygonNode,
  'STAR': createStarNode,
  'VECTOR': createVectorNode,
  'LINE': createLineNode,
  'COMPONENT': createComponentNode,
  'COMPONENT_SET': createComponentSetNode,
  'INSTANCE': createInstanceNode,
};

// Simplified createElement function
function createElement(
  nodeType: string,
  styles: string = '',
  children?: (SceneNode | string)[] | SceneNode | string,
  props: Record<string, any> = {}
): SceneNode {
  const creator = nodeCreators[nodeType];
  if (!creator) {
    throw new Error(`Unsupported node type: ${nodeType}`);
  }

  const node = creator(props);
  
  // Apply styles
  if (styles) {
    applyStyles(node, styles);
  }
    
  // Add child nodes
  if (children) {
    if (!('appendChild' in node)) {
      throw new Error(`${nodeType} node cannot have children.`);
    }
    
    const frameNode = node as FrameNode;
    
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          const textNode = createTextNode({ text: child });
          frameNode.appendChild(textNode);
        } else {
          frameNode.appendChild(child);
        }
      });
    } else if (typeof children === 'string') {
      const textNode = createTextNode({ text: children });
      frameNode.appendChild(textNode);
    } else {
      frameNode.appendChild(children);
    }
  }
  
  return node;
}

/**
 * Creates a frame with multiple child nodes.
 * @param styles Style string to apply (Tailwind CSS format)
 * @param children Child nodes
 * @param props Additional properties (optional)
 * @returns Created frame node
 */
export function createFrame(
  styles: string = '',
  children?: (SceneNode | string)[] | SceneNode | string,
  props: Record<string, any> = {}
): FrameNode {
  return createElement('FRAME', styles, children, props) as FrameNode;
}

/**
 * Creates a text node.
 * @param text Text content
 * @param styles Style string to apply (Tailwind CSS format)
 * @param props Additional properties (optional)
 * @returns Created text node
 */
export function createText(
  text: string,
  styles: string = '',
  props: Record<string, any> = {}
): TextNode {
  return createElement('TEXT', styles, undefined, { ...props, text }) as TextNode;
}



// Add this function before setupTextNodeBinding
async function setupTextNodeBinding(textNode: TextNode, text: string, parent: BaseNode): Promise<void> {
  // Find the closest component set ancestor
  let current: BaseNode | null = parent;
  while (current && !['COMPONENT_SET'].includes(current.type)) {
    current = current.parent;
  }
  
  if (current && (current.type === 'COMPONENT_SET')) {
    const match = text.match(/\{\{([^}]+)\}\}/);
    if (match) {
      const propertyName = match[1].trim();
      
      // Try to find and bind variable first
      const variable = await findVariableByName(propertyName);
      if (variable) {
        textNode.setBoundVariable("characters", variable);
        return;
      }

      // If no variable found, try component property binding
      const obj = (current as ComponentSetNode).componentPropertyDefinitions;
      for(let key in obj) {
        const [name, id] = key.split('#');
        if(name === propertyName) {
          textNode.componentPropertyReferences = {
            characters: key
          };
          break;
        }
      }
    }
  }
}

/**
 * Creates a Figma node based on node data.
 * 
 * @param data Node data
 * @param parent Optional parent node to append to
 * @returns Created Figma node
 * 
 * @example
 * ```typescript
 * // Create a simple card component
 * const cardData = {
 *   type: 'FRAME',
 *   name: 'Card',
 *   styles: 'flex-col bg-white rounded-lg p-[16] gap-[8]',
 *   children: [
 *     {
 *       type: 'FRAME',
 *       name: 'Image',
 *       styles: 'w-full h-[150] bg-gray-200 rounded-md'
 *     },
 *     {
 *       type: 'TEXT',
 *       name: 'Title',
 *       styles: 'text-xl font-bold',
 *       text: 'Card Title'
 *     },
 *     {
 *       type: 'TEXT',
 *       name: 'Description',
 *       styles: 'text-sm text-gray-600',
 *       text: 'Card description text.'
 *     }
 *   ]
 * };
 * 
 * const cardNode = createNodeForData(cardData);
 * figma.currentPage.appendChild(cardNode);
 * 
 * // Create a vector node
 * const iconData = {
 *   type: 'VECTOR',
 *   name: 'Arrow Icon',
 *   styles: 'stroke-black stroke-2 fill-transparent',
 *   paths: [
 *     "M10 10L20 20M20 20L10 30",
 *     "M30 20H50"
 *   ]
 * };
 * 
 * const iconNode = createNodeForData(iconData);
 * figma.currentPage.appendChild(iconNode);
 * ```
 */
export function createNodeForData(data: NodeData, parent?: BaseNode & ChildrenMixin): SceneNode {
  // 1. Create the node first
  const { type, name, styles = '', children, text, props = {} } = data;
  
  // Set node properties
  const nodeProps: Record<string, any> = { ...props };
  if (name) {
    nodeProps.name = name;
  }
  
  // Special handling for text nodes
  if (type === 'TEXT' && text) {
    nodeProps.text = text;
  }

  // Create base node
  const node = createElement(type, '', undefined, nodeProps);

  // 4. Append to parent if provided
  if (parent) {
    parent.appendChild(node);
    
    // Handle text binding after appending to parent
    if (type === 'TEXT' && text && text.match(/\{\{([^}]+)\}\}/)) {
      setupTextNodeBinding(node as TextNode, text, parent);
    }
  }
  
  // 2. Apply styles (including layout mode) before adding children
  if (styles) {
    applyStyles(node, styles);
  }
  
  // 3. Create and append children after parent's layout is set
  if (children && children.length > 0 && 'appendChild' in node) {
    children.forEach(childData => {
      createNodeForData(childData, node as BaseNode & ChildrenMixin);
    });
  }

  return node;
}

/**
 * Creates multiple Figma nodes based on an array of node data.
 * 
 * @param dataArray Array of node data
 * @returns Array of created Figma nodes
 */
export function createNodesForDataArray(dataArray: NodeData[]): SceneNode[] {
  return dataArray.map(data => createNodeForData(data));
}

/**
 * Creates a component based on component data.
 * 
 * @param componentData Component data
 * @returns Created component node
 */
export function createComponentFromData(componentData: NodeData): ComponentNode {
  if (componentData.type !== 'COMPONENT') {
    componentData.type = 'COMPONENT';
  }
  return createNodeForData(componentData) as ComponentNode;
}

/**
 * Creates an instance based on a component node.
 * 
 * @param componentNode Component node
 * @param instanceData Instance data (optional)
 * @returns Created instance node
 */
export function createInstanceFromComponent(
  componentNode: ComponentNode,
  instanceData?: Partial<NodeData>
): InstanceNode {
  const instance = componentNode.createInstance();
  
  if (instanceData) {
    const { name, styles, props } = instanceData;
    
    if (name) {
      instance.name = name;
    }
    
    if (styles) {
      // Apply styles
      applyStyles(instance, styles);
    }
    
    if (props) {
      // Apply additional properties
      Object.entries(props).forEach(([key, value]) => {
        if (key in instance) {
          (instance as any)[key] = value;
        }
      });
    }
  }
  
  return instance;
}

/**
 * Creates a node with data binding based on template and data.
 * 
 * @param template Template data
 * @param data Data to bind
 * @returns Created Figma node
 */
export function createNodeWithDataBinding(template: NodeData, data: Record<string, any>): SceneNode {
  // Clone template
  const clonedTemplate = JSON.parse(JSON.stringify(template));
  
  // Data binding processor function
  function processDataBinding(nodeData: NodeData, bindingData: Record<string, any>): void {
    // Process text binding
    if (nodeData.text && typeof nodeData.text === 'string') {
      nodeData.text = nodeData.text.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const trimmedKey = key.trim();
        // Check if it's a component property reference
        if (trimmedKey.startsWith('componentProperties.')) {
          const propertyKey = trimmedKey.replace('componentProperties.', '');
          return bindingData[propertyKey] !== undefined ? String(bindingData[propertyKey]) : match;
        }
        return bindingData[trimmedKey] !== undefined ? String(bindingData[trimmedKey]) : match;
      });
    }
    
    // Process style binding
    if (nodeData.styles && typeof nodeData.styles === 'string') {
      nodeData.styles = nodeData.styles.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const trimmedKey = key.trim();
        return bindingData[trimmedKey] !== undefined ? String(bindingData[trimmedKey]) : match;
      });
    }
    
    // Process vector path binding
    if (nodeData.type === 'VECTOR' && (nodeData as VectorNodeData).paths) {
      const vectorData = nodeData as VectorNodeData;
      vectorData.paths = vectorData.paths.map(path => 
        path.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
          const trimmedKey = key.trim();
          return bindingData[trimmedKey] !== undefined ? String(bindingData[trimmedKey]) : match;
        })
      );
    }
    
    // Process child node binding
    if (nodeData.children && nodeData.children.length > 0) {
      // Process array binding
      if (nodeData.data && nodeData.data.forEach) {
        const forEachKey = nodeData.data.forEach;
        const arrayData = bindingData[forEachKey];
        
        if (Array.isArray(arrayData) && arrayData.length > 0) {
          const templateChild = nodeData.children[0];
          nodeData.children = arrayData.map(item => {
            const clonedChild = JSON.parse(JSON.stringify(templateChild));
            processDataBinding(clonedChild, item);
            return clonedChild;
          });
        }
      } else {
        // Process regular child nodes
        nodeData.children.forEach(child => {
          processDataBinding(child, bindingData);
        });
      }
    }
    
    // Process conditional rendering
    if (nodeData.data && nodeData.data.if) {
      const condition = nodeData.data.if;
      const conditionResult = evaluateCondition(condition, bindingData);
      
      if (!conditionResult) {
        nodeData.type = 'HIDDEN';
      }
    }
  }
  
  // Condition evaluator function
  function evaluateCondition(condition: string, data: Record<string, any>): boolean {
    try {
      // Simple condition evaluation (use safer method in production)
      const conditionWithValues = condition.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const trimmedKey = key.trim();
        return JSON.stringify(data[trimmedKey]);
      });
      
      // eslint-disable-next-line no-new-func
      return new Function(`return ${conditionWithValues}`)();
    } catch (error) {
      console.error('Error evaluating condition:', error);
      return false;
    }
  }
  
  // Process data binding
  processDataBinding(clonedTemplate, data);
  
  // Don't create 'HIDDEN' type nodes
  if (clonedTemplate.type === 'HIDDEN') {
    return createFrame('w-[0] h-[0] opacity-0');
  }
  
  // Create node
  return createNodeForData(clonedTemplate);
}

/**
 * Creates a list node based on data.
 * 
 * @param containerTemplate Container template
 * @param itemTemplate Item template
 * @param dataArray Array of data
 * @returns Created list node
 */
export function createListFromData(
  containerTemplate: NodeData,
  itemTemplate: NodeData,
  dataArray: Record<string, any>[]
): SceneNode {
  // Clone container
  const clonedContainer = JSON.parse(JSON.stringify(containerTemplate));
  
  // Create items
  clonedContainer.children = dataArray.map(itemData => {
    const clonedItem = JSON.parse(JSON.stringify(itemTemplate));
    return createNodeWithDataBinding(clonedItem, itemData);
  });
  
  // Create container node
  return createNodeForData(clonedContainer);
}

/**
 * Converts SVG path string to Figma vector node.
 * 
 * @param svgPath SVG path string
 * @param styles Style string to apply (optional)
 * @param props Additional properties (optional)
 * @returns Created vector node
 * 
 * @example
 * ```typescript
 * // Create an arrow icon
 * const arrowIcon = createVectorFromSVGPath(
 *   "M10 10L20 20M20 20L10 30",
 *   "stroke-black stroke-2 fill-transparent"
 * );
 * figma.currentPage.appendChild(arrowIcon);
 * ```
 */
export function createVectorFromSVGPath(
  svgPath: string,
  styles: string = '',
  props: Record<string, any> = {}
): VectorNode {
  const vectorData: VectorNodeData = {
    type: 'VECTOR',
    styles,
    paths: [svgPath],
    props
  };
  
  return createNodeForData(vectorData) as VectorNode;
}

/**
 * Converts multiple SVG path strings to Figma vector node.
 * 
 * @param svgPaths Array of SVG path strings
 * @param styles Style string to apply (optional)
 * @param props Additional properties (optional)
 * @returns Created vector node
 * 
 * @example
 * ```typescript
 * // Create a complex icon
 * const complexIcon = createVectorFromSVGPaths(
 *   [
 *     "M10 10L20 20M20 20L10 30", // First path
 *     "M30 20H50"                 // Second path
 *   ],
 *   "stroke-black stroke-2 fill-transparent"
 * );
 * figma.currentPage.appendChild(complexIcon);
 * ```
 */
export function createVectorFromSVGPaths(
  svgPaths: string[],
  styles: string = '',
  props: Record<string, any> = {}
): VectorNode {
  const vectorData: VectorNodeData = {
    type: 'VECTOR',
    styles,
    paths: svgPaths,
    props
  };
  
  return createNodeForData(vectorData) as VectorNode;
}

// Add this function before createElement
function findComponentByName(name: string) {
  // 1. First try to find ComponentSet
  const componentSet = figma.currentPage.findOne(node => 
    node.type === "COMPONENT_SET" && node.name === name
  ) as ComponentSetNode;

  if (componentSet) {
    return {
      type: 'COMPONENT_SET',
      node: componentSet,
      createInstance: () => componentSet.defaultVariant.createInstance()
    };
  }

  // 2. If no ComponentSet, try to find single Component
  const component = figma.currentPage.findOne(node => 
    node.type === "COMPONENT" && node.name === name
  ) as ComponentNode;

  if (component) {
    return {
      type: 'COMPONENT',
      node: component,
      createInstance: () => component.createInstance()
    };
  }

  return null;
} 