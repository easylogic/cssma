/**
 * 토큰 기반 컴팩트 JSON 구조를 위한 타입 정의
 */

/**
 * 컴팩트 노드 데이터 구조
 * 토큰 기반 스타일링을 사용한 간결한 JSON 구조
 */
export interface CompactNodeData {
  /**
   * 노드 타입 (Figma API와 동일)
   * "FRAME", "TEXT", "RECTANGLE", "ELLIPSE", "LINE", "VECTOR" 등
   */
  type: string;
  
  /**
   * 노드 이름 (선택적)
   */
  name?: string;
  
  /**
   * 스타일 클래스 배열
   * 사전 정의된 토큰과 임의 값 지원
   * (예: ["bg-white", "p-4", "rounded-md", "bg-[#FF5733]"])
   */
  styles?: string[];
  
  /**
   * TEXT 노드 전용: 텍스트 콘텐츠
   */
  text?: string;
  
  /**
   * 자식 노드 배열
   */
  children?: CompactNodeData[];
  
  /**
   * 너비 (선택적)
   */
  width?: number | string;
  
  /**
   * 높이 (선택적)
   */
  height?: number | string;
  
  /**
   * 필수 노드 속성
   * 스타일 클래스로 표현할 수 없거나,
   * 직접 지정해야 하는 속성들
   */
  properties?: Record<string, any>;
}

/**
 * 컴팩트 프레임 구조
 * 디자인 시스템 루트 요소
 */
export interface CompactFrameStructure {
  frame: CompactNodeData;
} 