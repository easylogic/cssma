import { createElement, createFrame, createText } from './createElement';

/**
 * 노드 데이터 타입 정의
 */
export interface NodeData {
  type: string;                    // 노드 타입 (FRAME, TEXT, RECTANGLE 등)
  name?: string;                   // 노드 이름
  styles?: string;                 // Tailwind CSS 스타일 문자열
  text?: string;                   // 텍스트 노드의 경우 텍스트 내용
  children?: NodeData[];           // 자식 노드 데이터
  props?: Record<string, any>;     // 추가 속성
  data?: Record<string, any>;      // 데이터 속성 (데이터 바인딩용)
  vectorPaths?: any[];             // 벡터 노드의 경우 경로 데이터
}

/**
 * 데이터를 기반으로 Figma 노드를 생성합니다.
 * 
 * @param data 노드 데이터
 * @param parentData 부모 노드 데이터 (선택적)
 * @returns 생성된 Figma 노드
 * 
 * @example
 * ```typescript
 * // 간단한 카드 컴포넌트 생성
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
 *       text: '카드 제목'
 *     },
 *     {
 *       type: 'TEXT',
 *       name: 'Description',
 *       styles: 'text-sm text-gray-600',
 *       text: '카드 설명 텍스트입니다.'
 *     }
 *   ]
 * };
 * 
 * const cardNode = createNodeForData(cardData);
 * figma.currentPage.appendChild(cardNode);
 * ```
 */
export function createNodeForData(data: NodeData, parentData?: NodeData): SceneNode {
  // 기본 속성 설정
  const { type, name, styles = '', children, text, props = {}, vectorPaths } = data;
  
  // 노드 속성 설정
  const nodeProps: Record<string, any> = { ...props };
  if (name) {
    nodeProps.name = name;
  }
  
  // 텍스트 노드 특수 처리
  if (type === 'TEXT' && text) {
    nodeProps.text = text;
  }
  
  // 벡터 노드 특수 처리
  if (type === 'VECTOR' && vectorPaths) {
    nodeProps.vectorPaths = vectorPaths;
  }
  
  // 자식 노드 처리
  let childNodes: (SceneNode | string)[] | undefined;
  if (children && children.length > 0) {
    childNodes = children.map(childData => createNodeForData(childData, data));
  }
  
  // 노드 생성
  return createElement(type as any, styles, childNodes, nodeProps);
}

/**
 * 데이터 배열을 기반으로 여러 Figma 노드를 생성합니다.
 * 
 * @param dataArray 노드 데이터 배열
 * @returns 생성된 Figma 노드 배열
 */
export function createNodesForDataArray(dataArray: NodeData[]): SceneNode[] {
  return dataArray.map(data => createNodeForData(data));
}

/**
 * 데이터 객체를 기반으로 컴포넌트를 생성합니다.
 * 
 * @param componentData 컴포넌트 데이터
 * @returns 생성된 컴포넌트 노드
 */
export function createComponentFromData(componentData: NodeData): ComponentNode {
  if (componentData.type !== 'COMPONENT') {
    componentData.type = 'COMPONENT';
  }
  return createNodeForData(componentData) as ComponentNode;
}

/**
 * 데이터 객체를 기반으로 인스턴스를 생성합니다.
 * 
 * @param componentNode 컴포넌트 노드
 * @param instanceData 인스턴스 데이터 (선택적)
 * @returns 생성된 인스턴스 노드
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
      // 스타일 적용
      const styleProps = props || {};
      createElement('INSTANCE', styles, undefined, { ...styleProps, node: instance });
    }
    
    if (props) {
      // 추가 속성 적용
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
 * 데이터 객체를 기반으로 데이터 바인딩된 노드를 생성합니다.
 * 
 * @param template 템플릿 데이터
 * @param data 바인딩할 데이터
 * @returns 생성된 Figma 노드
 */
export function createNodeWithDataBinding(template: NodeData, data: Record<string, any>): SceneNode {
  // 템플릿 복제
  const clonedTemplate = JSON.parse(JSON.stringify(template));
  
  // 데이터 바인딩 처리 함수
  function processDataBinding(nodeData: NodeData, bindingData: Record<string, any>): void {
    // 텍스트 바인딩 처리
    if (nodeData.text && typeof nodeData.text === 'string') {
      nodeData.text = nodeData.text.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const trimmedKey = key.trim();
        return bindingData[trimmedKey] !== undefined ? String(bindingData[trimmedKey]) : match;
      });
    }
    
    // 스타일 바인딩 처리
    if (nodeData.styles && typeof nodeData.styles === 'string') {
      nodeData.styles = nodeData.styles.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const trimmedKey = key.trim();
        return bindingData[trimmedKey] !== undefined ? String(bindingData[trimmedKey]) : match;
      });
    }
    
    // 자식 노드 바인딩 처리
    if (nodeData.children && nodeData.children.length > 0) {
      // 배열 바인딩 처리
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
        // 일반 자식 노드 바인딩
        nodeData.children.forEach(child => {
          processDataBinding(child, bindingData);
        });
      }
    }
    
    // 조건부 렌더링 처리
    if (nodeData.data && nodeData.data.if) {
      const condition = nodeData.data.if;
      const conditionResult = evaluateCondition(condition, bindingData);
      
      if (!conditionResult) {
        nodeData.type = 'HIDDEN';
      }
    }
  }
  
  // 조건식 평가 함수
  function evaluateCondition(condition: string, data: Record<string, any>): boolean {
    try {
      // 간단한 조건식 평가 (실제 구현에서는 더 안전한 방법 사용 필요)
      const conditionWithValues = condition.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const trimmedKey = key.trim();
        return JSON.stringify(data[trimmedKey]);
      });
      
      // eslint-disable-next-line no-new-func
      return new Function(`return ${conditionWithValues}`)();
    } catch (error) {
      console.error('조건식 평가 오류:', error);
      return false;
    }
  }
  
  // 데이터 바인딩 처리
  processDataBinding(clonedTemplate, data);
  
  // 'HIDDEN' 타입 노드는 생성하지 않음
  if (clonedTemplate.type === 'HIDDEN') {
    return createFrame('w-[0] h-[0] opacity-0');
  }
  
  // 노드 생성
  return createNodeForData(clonedTemplate);
}

/**
 * 데이터 객체를 기반으로 리스트 노드를 생성합니다.
 * 
 * @param containerTemplate 컨테이너 템플릿
 * @param itemTemplate 아이템 템플릿
 * @param dataArray 데이터 배열
 * @returns 생성된 리스트 노드
 */
export function createListFromData(
  containerTemplate: NodeData,
  itemTemplate: NodeData,
  dataArray: Record<string, any>[]
): SceneNode {
  // 컨테이너 복제
  const clonedContainer = JSON.parse(JSON.stringify(containerTemplate));
  
  // 아이템 생성
  clonedContainer.children = dataArray.map(itemData => {
    const clonedItem = JSON.parse(JSON.stringify(itemTemplate));
    return createNodeWithDataBinding(clonedItem, itemData);
  });
  
  // 컨테이너 노드 생성
  return createNodeForData(clonedContainer);
} 