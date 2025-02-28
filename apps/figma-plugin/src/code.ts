import { figmaToStyle } from 'css-to-figma';
import { handleCreateDesignSystem } from './handlers/create';
import { frameHandlers } from './handlers/createFrame';

figma.showUI(__html__, {
    width: 480,
    height: 1200,
});

// 메시지 핸들러
figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'create-design-system':
      handleCreateDesignSystem();
      break;

    case 'analyze-design':
      try {

        function getTailwindJSON(node: any) {
          const tailwind = figmaToStyle(node);

          let data: any = {
            name: node.name,
            styles: tailwind,
            type: node.type,
            children: node.children?.map(getTailwindJSON) || [],
          }

          if (node.type === 'VECTOR') {
            data.paths = (node as VectorNode).vectorPaths?.map(path => path.data) || [];
          }

          return data;
        }

        const tailwind = getTailwindJSON(figma.currentPage.selection[0]);
        console.log(JSON.stringify(tailwind, null, 2));
      } catch (error: any) {
        console.error('Error analyzing design:', error);
      }
      break;

    case 'create-design':
      try {
        console.log('Creating design with spec:', msg.designSpec);
        let startX = 0;
        const list = msg.designSpec.map(async (item: any) => {
          console.log('Creating design with spec:', item.name);
          
          // Figma 프레임 생성
          const frame = await frameHandlers.createFrame(item.designSpec);
          
          // 생성된 프레임을 뷰포트 중앙에 배치 
          figma.viewport.scrollAndZoomIntoView([frame!]);
          
          // 선택 상태로 만들기
          figma.currentPage.selection = [frame!];

          frame!.x = startX;
          frame!.y = 0;

          startX += frame?.width ?? 0 + 200;
        });
        await Promise.all(list).then(() => {
          console.log('All frames created successfully');
        }).catch((error) => {
          console.error('Error creating frames:', error);
        });
        // UI에 성공 메시지 전송
        figma.ui.postMessage({
          type: 'design-created', 
          success: true
        });

        figma.notify('디자인이 생성되었습니다!');
      } catch (error: any) { // 타입 명시
        console.error('Error creating design:', error);
        // UI에 에러 메시지 전송
        figma.ui.postMessage({ 
          type: 'design-created',
          success: false,
          error: error.message || '알 수 없는 오류'
        });
        
        figma.notify('디자인 생성 중 오류가 발생했습니다.', { error: true });
      }
      break;
  }
}; 