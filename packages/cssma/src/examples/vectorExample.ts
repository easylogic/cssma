import { createVectorFromSVGPath, createVectorFromSVGPaths, createNodeForData, VectorNodeData, createNodeWithDataBinding } from '../createNodeForData';

/**
 * 간단한 벡터 아이콘 예제
 */
export function simpleVectorExample() {
  // 간단한 화살표 아이콘 생성
  const arrowIcon = createVectorFromSVGPath(
    "M10 10L20 20L10 30",
    "stroke-black stroke-2 fill-transparent"
  );
  
  // 이름 설정
  arrowIcon.name = '화살표 아이콘';
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(arrowIcon);
  
  return arrowIcon;
}

/**
 * 복잡한 벡터 아이콘 예제
 */
export function complexVectorExample() {
  // 여러 경로로 구성된 아이콘 생성
  const complexIcon = createVectorFromSVGPaths(
    [
      "M10 10L20 20M20 20L10 30", // 첫 번째 경로
      "M30 20H50"                 // 두 번째 경로
    ],
    "stroke-blue-500 stroke-2 fill-transparent"
  );
  
  // 이름 설정
  complexIcon.name = '복잡한 아이콘';
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(complexIcon);
  
  return complexIcon;
}

/**
 * JSON 데이터를 사용한 벡터 노드 생성 예제
 */
export function vectorFromDataExample() {
  // 벡터 노드 데이터 정의
  const iconData: VectorNodeData = {
    type: 'VECTOR',
    name: '체크 아이콘',
    styles: 'stroke-green-500 stroke-2 fill-transparent',
    paths: [
      "M5 12L10 17L20 7" // 체크 표시
    ],
    windingRule: 'NONZERO'
  };
  
  // 벡터 노드 생성
  const checkIcon = createNodeForData(iconData) as VectorNode;
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(checkIcon);
  
  return checkIcon;
}

/**
 * SVG 경로 데이터 바인딩 예제
 */
export function vectorDataBindingExample() {
  // 템플릿 정의
  const iconTemplate: VectorNodeData = {
    type: 'VECTOR',
    name: '동적 아이콘',
    styles: 'stroke-{{color}} stroke-{{weight}} fill-transparent',
    paths: [
      "{{path}}"
    ]
  };
  
  // 데이터 정의
  const iconData = {
    color: 'red-500',
    weight: '2',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z'
  };
  
  // 데이터 바인딩된 벡터 노드 생성
  const dynamicIcon = createNodeWithDataBinding(iconTemplate, iconData);
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(dynamicIcon);
  
  return dynamicIcon;
}

/**
 * 일반적인 UI 아이콘 생성 예제
 */
export function commonIconsExample() {
  // 아이콘 간격
  const spacing = 50;
  
  // 메뉴 아이콘
  const menuIcon = createVectorFromSVGPaths(
    [
      "M3 6h18M3 12h18M3 18h18"
    ],
    "stroke-gray-800 stroke-2"
  );
  menuIcon.name = '메뉴 아이콘';
  menuIcon.x = 0;
  
  // 검색 아이콘
  const searchIcon = createVectorFromSVGPaths(
    [
      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ],
    "stroke-gray-800 stroke-2 fill-transparent"
  );
  searchIcon.name = '검색 아이콘';
  searchIcon.x = spacing;
  
  // 알림 아이콘
  const notificationIcon = createVectorFromSVGPaths(
    [
      "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    ],
    "stroke-gray-800 stroke-2 fill-transparent"
  );
  notificationIcon.name = '알림 아이콘';
  notificationIcon.x = spacing * 2;
  
  // 사용자 아이콘
  const userIcon = createVectorFromSVGPaths(
    [
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ],
    "stroke-gray-800 stroke-2 fill-transparent"
  );
  userIcon.name = '사용자 아이콘';
  userIcon.x = spacing * 3;
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(menuIcon);
  figma.currentPage.appendChild(searchIcon);
  figma.currentPage.appendChild(notificationIcon);
  figma.currentPage.appendChild(userIcon);
  
  return [menuIcon, searchIcon, notificationIcon, userIcon];
} 