import type { NodeData, VectorNodeData } from '../core/createNodeForData';

// =============================================================================
// Functional Pattern Builders - Create JSON NodeData structures
// =============================================================================

/**
 * Create a frame NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 * @param children Child nodes data
 */
export function FRAME(name: string, styles: string = '', children: NodeData[] = []): NodeData {
  return {
    type: 'FRAME',
    name,
    styles,
    children
  };
}

/**
 * Create a text NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 * @param text Text content
 */
export function TEXT(name: string, styles: string = '', text: string = ''): NodeData {
  return {
    type: 'TEXT',
    name,
    styles,
    text
  };
}

/**
 * Create a rectangle NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 */
export function RECT(name: string, styles: string = ''): NodeData {
  return {
    type: 'RECTANGLE',
    name,
    styles
  };
}

/**
 * Create an ellipse NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 */
export function ELLIPSE(name: string, styles: string = ''): NodeData {
  return {
    type: 'ELLIPSE',
    name,
    styles
  };
}

/**
 * Create a component NodeData structure
 * @param name Component name
 * @param styles Tailwind CSS styles
 * @param children Child nodes data
 */
export function COMPONENT(name: string, styles: string = '', children: NodeData[] = []): NodeData {
  return {
    type: 'COMPONENT',
    name,
    styles,
    children
  };
}

/**
 * Create a vector NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 * @param paths SVG path data
 */
export function VECTOR(name: string, styles: string = '', paths: string[] = []): VectorNodeData {
  return {
    type: 'VECTOR',
    name,
    styles,
    paths
  };
}

/**
 * Create a polygon NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 */
export function POLYGON(name: string, styles: string = ''): NodeData {
  return {
    type: 'POLYGON',
    name,
    styles
  };
}

/**
 * Create a star NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 */
export function STAR(name: string, styles: string = ''): NodeData {
  return {
    type: 'STAR',
    name,
    styles
  };
}

/**
 * Create a line NodeData structure
 * @param name Node name
 * @param styles Tailwind CSS styles
 */
export function LINE(name: string, styles: string = ''): NodeData {
  return {
    type: 'LINE',
    name,
    styles
  };
}

/**
 * Create a component set NodeData structure with variants
 * @param name Component set name
 * @param variants Array of component variants with their properties
 * @param componentProperties Optional component properties configuration
 */
export function COMPONENT_SET(
  name: string, 
  variants: Array<{
    variantProperties: Record<string, string>;
    styles?: string;
    children?: NodeData[];
  }>,
  componentProperties?: Record<string, {
    type: 'VARIANT' | 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP';
    defaultValue: any;
    preferredValues?: any[];
  }>
): NodeData {
  // Convert variants to component children
  const children = variants.map(variant => ({
    type: 'COMPONENT' as const,
    name: Object.entries(variant.variantProperties)
      .map(([key, value]) => `${key}=${value}`)
      .join(', '),
    styles: variant.styles || '',
    children: variant.children || [],
    props: {
      variantProperties: variant.variantProperties
    }
  }));

  return {
    type: 'COMPONENT_SET',
    name,
    children,
    props: {
      componentProperties
    }
  };
}

/**
 * Create an instance NodeData structure
 * @param name Instance name
 * @param componentName Component name to instantiate
 * @param styles Tailwind CSS styles
 * @param variantProperties Optional variant properties for component set instances
 */
export function INSTANCE(
  name: string, 
  componentName: string, 
  styles: string = '', 
  variantProperties?: Record<string, string>
): NodeData {
  return {
    type: 'INSTANCE',
    name,
    styles,
    props: {
      componentName,
      variantProperties
    }
  };
} 