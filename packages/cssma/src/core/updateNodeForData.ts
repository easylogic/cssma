import { createNodeForData, NodeData } from "./createNodeForData";
import { applyCssStyles } from "../apply/applyCssStyles";

interface UpdateOptions {
  preserveChildren?: boolean;  // 기존 자식 노드 유지 여부
  updateMode?: 'replace' | 'merge' | 'update';  // 자식 노드 업데이트 모드
}

function isTextNode(node: SceneNode): node is TextNode {
  return node.type === "TEXT";
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
    // 기존 자식 노드들을 배열로 복사한 후 제거
    const existingChildren = [...node.children];
    existingChildren.forEach(child => child.remove());
    
    // 새로운 자식 노드 생성 및 추가
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
  const existingChildrenMap = new Map<SceneNode, boolean>();
  node.children.forEach(child => {
    existingChildrenMap.set(child, false); // false는 아직 매칭되지 않았음을 의미
  });

  // 새로운 순서로 자식 노드 업데이트
  const updatedChildren: SceneNode[] = [];
  
  for(let i = 0; i < children.length; i++) {
    const childData = children[i];
    let childNode: SceneNode | undefined;

    // 기존 노드 중에서 매칭되는 노드 찾기
    for (const [existing] of existingChildrenMap) {
      if (existing.type === childData.type && !existingChildrenMap.get(existing)) {
        childNode = existing;
        existingChildrenMap.set(existing, true); // 매칭되었음을 표시
        break;
      }
    }

    if (childNode) {
      // 기존 노드 업데이트
      await updateNodeForData(childNode, childData, {
        ...options,
        updateMode: childData.children ? updateMode : 'update'
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

  // 매칭되지 않은 자식 노드 처리
  if (updateMode !== 'merge') {
    for (const [child, isMatched] of existingChildrenMap) {
      if (!isMatched) {
        if (!preserveChildren) {
          child.remove();
        } else {
          if ('visible' in child) {
            child.visible = false;
          }
        }
      }
    }
  }
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
