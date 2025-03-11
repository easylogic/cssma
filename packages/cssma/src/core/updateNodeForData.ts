import { createNodeForData, NodeData } from "./createNodeForData";
import { applyCssStyles } from "../apply/applyCssStyles";

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

  // replace 모드인 경우 모든 자식 제거
  if (updateMode === 'replace') {
    [...node.children].forEach(child => child.remove());
    // replace 모드에서는 기존 노드를 재사용하지 않음
    const updatedChildren: SceneNode[] = [];
    
    for(let i = 0; i < children.length; i++) {
      const childData = children[i];
      const childNode = await createNodeForData(childData, node);
      updatedChildren.push(childNode);
    }

    // 순서대로 추가
    updatedChildren.forEach((child, index) => {
      node.insertChild(index, child);
    });
    return;
  }

  // 현재 자식 노드들의 맵 생성 (update/merge 모드)
  const existingChildrenMap = new Map();
  node.children.forEach(child => {
    existingChildrenMap.set(child, child);
  });

  // 새로운 순서로 자식 노드 업데이트
  const updatedChildren: SceneNode[] = [];
  
  for(let i = 0; i < children.length; i++) {
    const childData = children[i];
    let childNode: SceneNode | undefined;

    // 기존 노드 중에서 매칭되는 노드 찾기
    for (const [existing] of existingChildrenMap) {
      if (existing.type === childData.type) {
        childNode = existing;
        existingChildrenMap.delete(existing);
        break;
      }
    }

    if (childNode) {
      // 기존 노드 업데이트
      await updateNodeForData(childNode, childData, {
        ...options,
        updateMode: childData.children ? 'update' : options.updateMode
      });
    } else {
      // 새 노드 생성
      childNode = await createNodeForData(childData, node);
    }

    updatedChildren.push(childNode);
  }

  // 순서 재배치
  updatedChildren.forEach((child, index) => {
    node.insertChild(index, child);
  });

  // 남은 자식 노드 처리
  if (updateMode !== 'merge') {
    const remainingChildren = Array.from(existingChildrenMap.keys());
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
  // 노드들을 순서대로 재배치
  nodes.forEach((node, i) => {
    const targetIndex = startIndex + i;
    // 현재 노드의 위치가 목표 위치와 다른 경우에만 이동
    if (parent.children.indexOf(node) !== targetIndex) {
      // 노드를 일단 제거했다가
      node.remove();
      // 원하는 위치에 다시 삽입
      parent.insertChild(targetIndex, node);
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
    // Type validation
    if (data.type && data.type !== node.type) {
      console.warn(`Type mismatch: Cannot update ${node.type} node with ${data.type} data. Node structure will be preserved.`);
      return node;  // 타입이 다른 경우 노드를 그대로 유지
    }

    // 1. Update name if provided
    if (data.name) {
      node.name = data.name;
    }

    // 2. Update styles if provided
    if (data.styles) {
      await applyCssStyles(node, data.styles);
    }

    // 3. Update text content for text nodes
    if (isTextNode(node)) {
      updateText(node, data);
    }

    // 4. Update children for container nodes
    if (hasChildren(node) && data.children) {
      await updateChildren(node, data, options);
    }

    return node;
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
