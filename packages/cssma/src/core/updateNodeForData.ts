import { createNodeForData, NodeData } from "./createNodeForData";
import { applyCssStyles } from "src/apply/applyCssStyles";

interface UpdateOptions {
  preserveChildren?: boolean;  // 기존 자식 노드 유지 여부
  updateMode?: 'replace' | 'merge' | 'update';  // 자식 노드 업데이트 모드
}

// Type Guards
function isFrameNode(node: SceneNode): node is FrameNode {
  return node.type === "FRAME";
}

function isTextNode(node: SceneNode): node is TextNode {
  return node.type === "TEXT";
}

function isComponentNode(node: SceneNode): node is ComponentNode {
  return node.type === "COMPONENT";
}

function isInstanceNode(node: SceneNode): node is InstanceNode {
  return node.type === "INSTANCE";
}

function hasChildren(node: SceneNode): node is FrameNode | ComponentNode | InstanceNode {
  return 'children' in node;
}

/**
 * Updates text content of a node
 */
function updateText(node: TextNode, data: NodeData) {
  if (data.text !== undefined) {
    node.characters = data.text;
  }
}

/**
 * Updates children of a node
 */
async function updateChildren(
  node: FrameNode | ComponentNode | InstanceNode,
  data: NodeData,
  options: UpdateOptions
) {
  const { children = [] } = data;
  const { preserveChildren = true, updateMode = 'update' } = options;

  if (updateMode === 'replace') {
    [...node.children].forEach(child => child.remove());
  }

  const updatedChildren: SceneNode[] = [];

  for(let i = 0; i < children.length; i++) {
    const childData = children[i];
    const existingChild = i < node.children.length ? node.children[i] : null;

    let childNode: SceneNode;

    const needsNewNode = (
        !existingChild || 
        existingChild.type !== childData.type ||
        updateMode === 'replace'
    );

    if (needsNewNode) {
      childNode = await createNodeForData(childData, node);


      if (existingChild) {
       const index = node.children.indexOf(existingChild);
       existingChild.remove();
       node.insertChild(index, childNode);
      } else {
        node.appendChild(childNode);
      }
    } else {
      childNode = existingChild;
      await updateNodeForData(childNode, childData, options);
    }

    updatedChildren.push(childNode);
  }

  if (updateMode !== 'merge') {
    const remainingChildren = node.children.slice(children.length);

    if (!preserveChildren) {
      remainingChildren.forEach(child => child.remove());
    } else {
      remainingChildren.forEach(child => {
        if ('visible' in child) {
          child.visible = false;
        }
      });
    }
  }


  const finalOrder = updatedChildren.filter(child => node.children.includes(child));
  finalOrder.forEach((child, index) => {
    if (node.children.indexOf(child) !== index) {
      node.insertChild(index, child);
    }
  });

}

function needsRecreation(existingChild: SceneNode, newData: NodeData): boolean {
    if (existingChild.type !== newData.type) {
        return true;
    }
    switch (existingChild.type) {
        case 'INSTANCE':
            return (newData.props?.componentId !== undefined && (existingChild as InstanceNode).mainComponent?.id !== newData.props?.componentId);
        case 'VECTOR':
            return newData.props?.paths !== undefined;
        case 'TEXT':
            return newData.props?.textAutoResize !== undefined && (existingChild as TextNode).textAutoResize !== newData.props?.textAutoResize;
        default:
            return false;
    }
}

function updateNodeOrder(
    parent: (FrameNode | ComponentNode | InstanceNode), 
    nodes: SceneNode[],
    startIndex: number = 0
) {
  nodes.forEach((node, i) => {
    const targetIndex = startIndex + i;
    const currentIndex = parent.children.indexOf(node);
    if (currentIndex !== targetIndex) {
      parent.insertChild(targetIndex, node);
    }
  });
}

/**
 * Updates properties of a node
 */
function updateProperties(node: SceneNode, data: NodeData) {
  const { props } = data;
  
  if (!props) return;

  // Update basic properties
  if (props.width !== undefined && 'resize' in node) {
    node.resize(props.width, node.height);
  }
  
  if (props.height !== undefined && 'resize' in node) {
    node.resize(node.width, props.height);
  }

  // Update instance properties
  if (isInstanceNode(node) && props.componentProperties) {
    Object.entries(props.componentProperties).forEach(([key, value]) => {
      if (node.componentProperties && key in node.componentProperties) {
        const prop = node.componentProperties[key];
        if (typeof value === typeof prop.value) {
          node.componentProperties[key] = {
            ...prop,
            value: value as string | boolean
          };
        }
      }
    });
  }

  // Update other properties
  Object.entries(props).forEach(([key, value]) => {
    if (key in node && !['width', 'height', 'componentProperties'].includes(key)) {
      (node as any)[key] = value;
    }
  });
}

/**
 * Updates a Figma node with new data
 */
export async function updateNodeForData(
  node: SceneNode,
  data: NodeData,
  options: UpdateOptions = {}
) {
  try {
    // 1. Update name if provided
    if (data.name) {
      node.name = data.name;
    }

    // 2. Update styles if provided
    if (data.styles) {
      await applyCssStyles(node, data.styles);
    }

    // 3. Update properties
    updateProperties(node, data);

    // 4. Update text content for text nodes
    if (isTextNode(node)) {
      updateText(node, data);
    }

    // 5. Update children for container nodes
    if (hasChildren(node) && data.children) {
      await updateChildren(node, data, options);
    }

  } catch (error) {
    console.error('Error updating node:', {
      nodeType: node.type,
      nodeName: node.name,
      error
    });
    throw error;
  }
}

/**
 * Updates multiple nodes with corresponding data
 */
export async function updateNodesForDataArray(
  nodes: SceneNode[],
  dataArray: NodeData[],
  options?: UpdateOptions
): Promise<void> {
  await Promise.all(nodes.map((node, index) => {
    if (index < dataArray.length) {
      return updateNodeForData(node, dataArray[index], options);
    }
  }));
}

/**
 * Updates node styles only
 */
export async function updateNodeStyles(
  node: SceneNode,
  styles: string
): Promise<void> {
  await updateNodeForData(node, { type: node.type, styles });
}

/**
 * Updates node properties only
 */
export async function updateNodeProperties(
  node: SceneNode,
  props: Record<string, any>
): Promise<void> {
  await updateNodeForData(node, { type: node.type, props });
}

/**
 * Updates text content only
 */
export async function updateTextContent(
  node: TextNode,
  text: string
): Promise<void> {
  await updateNodeForData(node, { type: 'TEXT', text });
}
