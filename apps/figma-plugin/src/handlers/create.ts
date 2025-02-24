
import { createHandlers } from './createBase';
// import { buttonHandlers } from './createButton';
// import { cardHandlers } from './createCard';
import { selectHandlers } from './createSelect';
import { progressHandlers } from './createProgress';
import { tooltipHandlers } from './createTooltip';
import { paginationHandlers } from './createPagination';
import { inputHandlers } from './createInput';
import { checkboxHandlers } from './createCheckbox';
import { radioHandlers } from './createRadio';
import { switchHandlers } from './createSwitch';
import { tagHandlers } from './createTag'; 
import { badgeHandlers } from './createBadge';
import { avatarHandlers } from './createAvatar';
import { breadcrumbHandlers } from './createBreadcrumb';
import { alertHandlers } from './createAlert';
import { dividerHandlers } from './createDivider';
import { formHandlers } from './createForm';
import { textHandlers } from './createText';
import { AlertVariant, BadgeVariant, ButtonVariant, InputVariant } from '../types';
import { variables } from '@/variables/manager';
import { buttonHandlers } from './button';
import { iconHandlers } from './icon';
import { cardHandlers } from './card';

// 기존 함수를 async로 변경하고 모든 컴포넌트 세트를 생성
export async function handleCreateDesignSystem() {
  try {
    // 기존 페이지들 찾기
    const pages = figma.root.children;
    let componentsPage = pages.find(page => page.name === "Components");
    let docsPage = pages.find(page => page.name === "Documentation");


    // Components Page 생성
    if (!componentsPage) {
      componentsPage = figma.createPage();
      componentsPage.name = "Components";
    }

    // Documentation Page 생성
    if (!docsPage) {
      docsPage = figma.createPage();
      docsPage.name = "Documentation";
    }

    [componentsPage, docsPage].forEach(page => {
      page.children.forEach(child => {
        child.remove();
      });
    });

    // 기존 variables 삭제
    const collections = figma.variables.getLocalVariableCollections();
    collections.forEach(collection => {
      collection.remove();
    });

    // 컬러 변수 생성
    await variables.initialize();

    figma.currentPage = componentsPage;

    const list = [
      iconHandlers,
      buttonHandlers,
      cardHandlers,
      // avatarHandlers,
      // badgeHandlers,
      // breadcrumbHandlers,
      // alertHandlers,
      // textHandlers,
      // tooltipHandlers,
      // cardHandlers,
      // dividerHandlers,
      // inputHandlers,
      // switchHandlers
      // tagHandlers
    ];

    // Components Page에 컴포넌트 세트 생성
    let x = 0;
    for await (const handler of list) {
      try {
        let componentSet: ComponentSetNode | ComponentSetNode[] = await handler.createComponentSet() as ComponentSetNode | ComponentSetNode[];

        if (!Array.isArray(componentSet)) {
          componentSet = [componentSet];
        }

        componentSet.forEach(set => {
          componentsPage.appendChild(set);
          set.x = x;
          x += set.width + 40;
        });
      } catch (error) {
        console.error('Error creating component set:', error);
      }
    }

    // // Documentation Page에 문서 프레임 생성
    // let lastY = 0;
    // for await (const handler of list) {
    //   try {
    //     if (handler.createPage) {
    //       const docFrame = await handler.createPage();
    //       if (docFrame) {
    //         docsPage.appendChild(docFrame);
    //         docFrame.x = 0;
    //         docFrame.y = lastY;
    //         lastY = docFrame.y + docFrame.height + 100;
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error creating documentation:', error);
    //   }
    // }

    // Components 페이지로 이동하고 모든 컴포넌트 선택
    figma.currentPage = componentsPage;
    // 현재 페이지가 변경된 후에 selection 설정
    const componentsToSelect = [...componentsPage.children];
    if (componentsToSelect.length > 0) {
      figma.currentPage.selection = componentsToSelect;
      figma.viewport.scrollAndZoomIntoView(componentsToSelect);
    }

    figma.notify('Component sets and documentation created successfully');

  } catch (error) {
    console.error('Error creating component sets:', error);
    figma.notify('Error creating component sets');
  }
}

export { createHandlers }; 