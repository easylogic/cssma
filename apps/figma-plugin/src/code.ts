
import { handleCreateDesignSystem } from './handlers/create';

figma.showUI(__html__, {
    width: 480,
    height: 600,
});


// 메시지 핸들러
figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'create-design-system':
      handleCreateDesignSystem();
      break;
  }
}; 