import { createNodeForData, createNodeWithDataBinding, createListFromData, NodeData } from '../createNodeForData';

/**
 * 간단한 카드 컴포넌트 예제
 */
export function cardExample() {
  // 카드 데이터 정의
  const cardData: NodeData = {
    type: 'FRAME',
    name: 'Card',
    styles: 'flex-col bg-white rounded-lg p-[16] gap-[8]',
    children: [
      {
        type: 'FRAME',
        name: 'Image',
        styles: 'w-full h-[150] bg-gray-200 rounded-md'
      },
      {
        type: 'TEXT',
        name: 'Title',
        styles: 'text-xl font-bold',
        text: '카드 제목'
      },
      {
        type: 'TEXT',
        name: 'Description',
        styles: 'text-sm text-gray-600',
        text: '카드 설명 텍스트입니다.'
      }
    ]
  };
  
  // 카드 노드 생성
  const cardNode = createNodeForData(cardData);
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(cardNode);
  
  return cardNode;
}

/**
 * 데이터 바인딩 예제
 */
export function dataBindingExample() {
  // 카드 템플릿 정의
  const cardTemplate: NodeData = {
    type: 'FRAME',
    name: 'Card',
    styles: 'flex-col bg-{{backgroundColor}} rounded-lg p-[16] gap-[8]',
    children: [
      {
        type: 'FRAME',
        name: 'Image',
        styles: 'w-full h-[150] bg-{{imageColor}} rounded-md'
      },
      {
        type: 'TEXT',
        name: 'Title',
        styles: 'text-xl font-bold text-{{textColor}}',
        text: '{{title}}'
      },
      {
        type: 'TEXT',
        name: 'Description',
        styles: 'text-sm text-gray-600',
        text: '{{description}}'
      }
    ]
  };
  
  // 데이터 정의
  const cardData = {
    backgroundColor: 'white',
    imageColor: 'blue-500',
    textColor: 'gray-800',
    title: '데이터 바인딩 카드',
    description: '이 카드는 데이터 바인딩으로 생성되었습니다.'
  };
  
  // 데이터 바인딩된 카드 노드 생성
  const cardNode = createNodeWithDataBinding(cardTemplate, cardData);
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(cardNode);
  
  return cardNode;
}

/**
 * 리스트 생성 예제
 */
export function listExample() {
  // 리스트 컨테이너 템플릿
  const listContainerTemplate: NodeData = {
    type: 'FRAME',
    name: 'List Container',
    styles: 'flex-col bg-gray-100 rounded-lg p-[16] gap-[12]'
  };
  
  // 리스트 아이템 템플릿
  const listItemTemplate: NodeData = {
    type: 'FRAME',
    name: 'List Item',
    styles: 'flex-row w-full h-[80] bg-white rounded-lg p-[12] gap-[12] items-center',
    children: [
      {
        type: 'FRAME',
        name: 'Avatar',
        styles: 'w-[56] h-[56] bg-{{color}} rounded-full'
      },
      {
        type: 'FRAME',
        name: 'Content',
        styles: 'flex-col gap-[4]',
        children: [
          {
            type: 'TEXT',
            name: 'Name',
            styles: 'font-medium',
            text: '{{name}}'
          },
          {
            type: 'TEXT',
            name: 'Email',
            styles: 'text-sm text-gray-600',
            text: '{{email}}'
          }
        ]
      }
    ]
  };
  
  // 리스트 데이터
  const listData = [
    {
      name: '홍길동',
      email: 'hong@example.com',
      color: 'red-200'
    },
    {
      name: '김철수',
      email: 'kim@example.com',
      color: 'blue-200'
    },
    {
      name: '이영희',
      email: 'lee@example.com',
      color: 'green-200'
    }
  ];
  
  // 리스트 노드 생성
  const listNode = createNodeForData({
    type: 'FRAME',
    name: 'List Container',
    styles: 'flex-col bg-gray-100 rounded-lg p-[16] gap-[12]',
    children: listData.map(item => ({
      type: 'FRAME',
      name: `List Item - ${item.name}`,
      styles: 'flex-row w-full h-[80] bg-white rounded-lg p-[12] gap-[12] items-center',
      children: [
        {
          type: 'FRAME',
          name: 'Avatar',
          styles: `w-[56] h-[56] bg-${item.color} rounded-full`
        },
        {
          type: 'FRAME',
          name: 'Content',
          styles: 'flex-col gap-[4]',
          children: [
            {
              type: 'TEXT',
              name: 'Name',
              styles: 'font-medium',
              text: item.name
            },
            {
              type: 'TEXT',
              name: 'Email',
              styles: 'text-sm text-gray-600',
              text: item.email
            }
          ]
        }
      ]
    }))
  });
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(listNode);
  
  return listNode;
}

/**
 * 조건부 렌더링 예제
 */
export function conditionalRenderingExample() {
  // 알림 템플릿 정의
  const notificationTemplate: NodeData = {
    type: 'FRAME',
    name: 'Notification',
    styles: 'flex-row w-[300] p-[12] gap-[12] items-center rounded-lg',
    children: [
      {
        type: 'FRAME',
        name: 'Icon',
        styles: 'w-[24] h-[24] bg-{{iconColor}} rounded-full',
        data: {
          if: '{{type}} !== "info"'
        }
      },
      {
        type: 'TEXT',
        name: 'Message',
        styles: 'text-sm',
        text: '{{message}}'
      },
      {
        type: 'FRAME',
        name: 'Close Button',
        styles: 'w-[16] h-[16] bg-gray-400 rounded-full',
        data: {
          if: '{{dismissible}} === true'
        }
      }
    ]
  };
  
  // 알림 데이터 (성공)
  const successData = {
    type: 'success',
    message: '작업이 성공적으로 완료되었습니다.',
    iconColor: 'green-500',
    dismissible: true
  };
  
  // 알림 데이터 (오류)
  const errorData = {
    type: 'error',
    message: '오류가 발생했습니다. 다시 시도해주세요.',
    iconColor: 'red-500',
    dismissible: true
  };
  
  // 알림 데이터 (정보)
  const infoData = {
    type: 'info',
    message: '참고 정보입니다.',
    iconColor: 'blue-500',
    dismissible: false
  };
  
  // 알림 노드 생성
  const successNode = createNodeWithDataBinding(notificationTemplate, successData);
  successNode.y = 0;
  
  const errorNode = createNodeWithDataBinding(notificationTemplate, errorData);
  errorNode.y = 60;
  
  const infoNode = createNodeWithDataBinding(notificationTemplate, infoData);
  infoNode.y = 120;
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(successNode);
  figma.currentPage.appendChild(errorNode);
  figma.currentPage.appendChild(infoNode);
  
  return [successNode, errorNode, infoNode];
}

/**
 * 복잡한 UI 예제 (대시보드)
 */
export function dashboardExample() {
  // 대시보드 데이터 정의
  const dashboardData: NodeData = {
    type: 'FRAME',
    name: 'Dashboard',
    styles: 'flex-col w-[800] h-[600] bg-gray-100 p-[24] gap-[24]',
    children: [
      // 헤더
      {
        type: 'FRAME',
        name: 'Header',
        styles: 'flex-row w-full justify-between items-center',
        children: [
          {
            type: 'TEXT',
            name: 'Title',
            styles: 'text-2xl font-bold',
            text: '대시보드'
          },
          {
            type: 'FRAME',
            name: 'User Profile',
            styles: 'flex-row items-center gap-[8]',
            children: [
              {
                type: 'TEXT',
                name: 'Username',
                styles: 'text-sm font-medium',
                text: '사용자'
              },
              {
                type: 'FRAME',
                name: 'Avatar',
                styles: 'w-[32] h-[32] bg-blue-500 rounded-full'
              }
            ]
          }
        ]
      },
      
      // 통계 카드 컨테이너
      {
        type: 'FRAME',
        name: 'Stats Container',
        styles: 'flex-row w-full gap-[16]',
        children: [
          // 통계 카드 1
          {
            type: 'FRAME',
            name: 'Stat Card 1',
            styles: 'flex-col flex-1 bg-white rounded-lg p-[16] gap-[8]',
            children: [
              {
                type: 'TEXT',
                name: 'Stat Title 1',
                styles: 'text-sm text-gray-600',
                text: '총 사용자'
              },
              {
                type: 'TEXT',
                name: 'Stat Value 1',
                styles: 'text-2xl font-bold',
                text: '1,234'
              },
              {
                type: 'TEXT',
                name: 'Stat Change 1',
                styles: 'text-xs text-green-500',
                text: '↑ 5.2% 증가'
              }
            ]
          },
          
          // 통계 카드 2
          {
            type: 'FRAME',
            name: 'Stat Card 2',
            styles: 'flex-col flex-1 bg-white rounded-lg p-[16] gap-[8]',
            children: [
              {
                type: 'TEXT',
                name: 'Stat Title 2',
                styles: 'text-sm text-gray-600',
                text: '총 매출'
              },
              {
                type: 'TEXT',
                name: 'Stat Value 2',
                styles: 'text-2xl font-bold',
                text: '₩9,876,543'
              },
              {
                type: 'TEXT',
                name: 'Stat Change 2',
                styles: 'text-xs text-green-500',
                text: '↑ 12.3% 증가'
              }
            ]
          },
          
          // 통계 카드 3
          {
            type: 'FRAME',
            name: 'Stat Card 3',
            styles: 'flex-col flex-1 bg-white rounded-lg p-[16] gap-[8]',
            children: [
              {
                type: 'TEXT',
                name: 'Stat Title 3',
                styles: 'text-sm text-gray-600',
                text: '신규 주문'
              },
              {
                type: 'TEXT',
                name: 'Stat Value 3',
                styles: 'text-2xl font-bold',
                text: '567'
              },
              {
                type: 'TEXT',
                name: 'Stat Change 3',
                styles: 'text-xs text-red-500',
                text: '↓ 2.1% 감소'
              }
            ]
          }
        ]
      },
      
      // 차트 및 테이블 컨테이너
      {
        type: 'FRAME',
        name: 'Content Container',
        styles: 'flex-row w-full flex-1 gap-[16]',
        children: [
          // 차트 영역
          {
            type: 'FRAME',
            name: 'Chart Area',
            styles: 'flex-col flex-[2] bg-white rounded-lg p-[16] gap-[16]',
            children: [
              {
                type: 'TEXT',
                name: 'Chart Title',
                styles: 'text-lg font-medium',
                text: '월별 매출 추이'
              },
              {
                type: 'FRAME',
                name: 'Chart',
                styles: 'w-full flex-1 bg-gray-50 rounded-md'
              }
            ]
          },
          
          // 테이블 영역
          {
            type: 'FRAME',
            name: 'Table Area',
            styles: 'flex-col flex-1 bg-white rounded-lg p-[16] gap-[16]',
            children: [
              {
                type: 'TEXT',
                name: 'Table Title',
                styles: 'text-lg font-medium',
                text: '최근 거래'
              },
              {
                type: 'FRAME',
                name: 'Table Header',
                styles: 'flex-row w-full py-[8] border-b border-gray-200',
                children: [
                  {
                    type: 'TEXT',
                    name: 'Header 1',
                    styles: 'flex-1 text-sm font-medium',
                    text: '거래 ID'
                  },
                  {
                    type: 'TEXT',
                    name: 'Header 2',
                    styles: 'flex-1 text-sm font-medium',
                    text: '금액'
                  },
                  {
                    type: 'TEXT',
                    name: 'Header 3',
                    styles: 'flex-1 text-sm font-medium',
                    text: '상태'
                  }
                ]
              },
              {
                type: 'FRAME',
                name: 'Table Row 1',
                styles: 'flex-row w-full py-[8] border-b border-gray-200',
                children: [
                  {
                    type: 'TEXT',
                    name: 'Cell 1-1',
                    styles: 'flex-1 text-sm',
                    text: '#12345'
                  },
                  {
                    type: 'TEXT',
                    name: 'Cell 1-2',
                    styles: 'flex-1 text-sm',
                    text: '₩123,456'
                  },
                  {
                    type: 'TEXT',
                    name: 'Cell 1-3',
                    styles: 'flex-1 text-sm text-green-500',
                    text: '완료'
                  }
                ]
              },
              {
                type: 'FRAME',
                name: 'Table Row 2',
                styles: 'flex-row w-full py-[8] border-b border-gray-200',
                children: [
                  {
                    type: 'TEXT',
                    name: 'Cell 2-1',
                    styles: 'flex-1 text-sm',
                    text: '#12346'
                  },
                  {
                    type: 'TEXT',
                    name: 'Cell 2-2',
                    styles: 'flex-1 text-sm',
                    text: '₩78,900'
                  },
                  {
                    type: 'TEXT',
                    name: 'Cell 2-3',
                    styles: 'flex-1 text-sm text-yellow-500',
                    text: '진행 중'
                  }
                ]
              },
              {
                type: 'FRAME',
                name: 'Table Row 3',
                styles: 'flex-row w-full py-[8]',
                children: [
                  {
                    type: 'TEXT',
                    name: 'Cell 3-1',
                    styles: 'flex-1 text-sm',
                    text: '#12347'
                  },
                  {
                    type: 'TEXT',
                    name: 'Cell 3-2',
                    styles: 'flex-1 text-sm',
                    text: '₩45,678'
                  },
                  {
                    type: 'TEXT',
                    name: 'Cell 3-3',
                    styles: 'flex-1 text-sm text-red-500',
                    text: '취소'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  
  // 대시보드 노드 생성
  const dashboardNode = createNodeForData(dashboardData);
  
  // 현재 페이지에 추가
  figma.currentPage.appendChild(dashboardNode);
  
  return dashboardNode;
} 