import { variables } from "@/variables";
import { createHandlers } from "../createBase";
import { buttonHandlers } from "./index";

export class ButtonShowcase {
    private static instance: ButtonShowcase;
    
    private constructor() {}
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new ButtonShowcase();
      }
      return this.instance;
    }
  
    async createShowcase() {
      const frame = figma.createFrame();
      frame.name = "Button Component";
      frame.layoutMode = "VERTICAL";
      frame.itemSpacing = 64;  // 섹션 간 큰 간격
      frame.paddingTop = 40;
      frame.paddingBottom = 40;
      frame.fills = [variables.bindVariable('semantic/bg/default')];
      frame.resize(1400, frame.height);
      frame.primaryAxisSizingMode = "AUTO";
      frame.counterAxisSizingMode = "FIXED";

      const title = await createHandlers.text({
        text: "Button",
        fontSize: 24,
        fontWeight: 600
      });
      frame.appendChild(title);

      const description = await createHandlers.text({
        text: "Buttons allow users to take actions, and make choices, with a single tap.",
        fontSize: 16,
        fills: [variables.bindVariable('text/color/secondary')]
      });
      frame.appendChild(description);
  
      // 1. 개요 섹션
      frame.appendChild(await this.createOverviewSection());
      
      // 2. 타입별 버튼 섹션 (Primary, Secondary, Danger 등)
      frame.appendChild(await this.createTypeSection());
      
      // 3. 변형별 버튼 섹션 (Filled, Outlined, Ghost)
      frame.appendChild(await this.createVariantSection());
      
      // 4. 크기별 버튼 섹션
      frame.appendChild(await this.createSizeSection());
      
      // 5. 상태별 버튼 섹션
      frame.appendChild(await this.createStateSection());
      
      // 6. 아이콘 버튼 섹션
      frame.appendChild(await this.createIconSection());
  
      return frame;
    }
  
    private async createSectionHeader(title: string, description?: string) {
      const header = figma.createFrame();
      header.name = `${title} Header`;
      header.layoutMode = "VERTICAL";
      header.itemSpacing = 8;
      header.fills = [];
  
      const titleText = await createHandlers.text({
        text: title,
        fontSize: 20,
        fontWeight: 600
      });
      header.appendChild(titleText);
  
      if (description) {
        const descText = await createHandlers.text({
          text: description,
          fontSize: 14,
          fills: [variables.bindVariable('text/color/secondary')]
        });
        header.appendChild(descText);
      }
  
      return header;
    }
  
    private async createOverviewSection() {
      const section = figma.createFrame();
      section.name = "Overview";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 24;
      section.fills = [];
  
      const header = await this.createSectionHeader(
        "Button",
        "Buttons allow users to take actions, and make choices, with a single tap."
      );
      section.appendChild(header);
  
      // 기본 버튼 예시들
      const examples = figma.createFrame();
      examples.layoutMode = "HORIZONTAL";
      examples.itemSpacing = 16;
      examples.fills = [];
  
      const primaryButton = await buttonHandlers.createInstance({
        type: 'primary',
        variant: 'filled',
        label: 'Primary Action'
      });
  
      const secondaryButton = await buttonHandlers.createInstance({
        type: 'secondary',
        variant: 'outlined',
        label: 'Secondary'
      });
  
      if (primaryButton) examples.appendChild(primaryButton);
      if (secondaryButton) examples.appendChild(secondaryButton);
  
      section.appendChild(examples);
      return section;
    }
  
    private async createTypeSection() {
      const section = figma.createFrame();
      section.name = "Button Types";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 24;
      section.fills = [];
  
      section.appendChild(await this.createSectionHeader(
        "Types",
        "Different button types for various levels of emphasis"
      ));
  
      const types = ['primary', 'secondary', 'neutral', 'danger'] as const;
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.itemSpacing = 16;
      row.fills = [];
  
      for (const type of types) {
        const button = await buttonHandlers.createInstance({
          type,
          variant: 'filled',
          size: 'medium',
          label: type.charAt(0).toUpperCase() + type.slice(1)
        });
        if (button) row.appendChild(button);
      }
  
      section.appendChild(row);
      return section;
    }
  
    private async createVariantSection() {
      const section = figma.createFrame();
      section.name = "Button Variants";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 24;
      section.fills = [];
  
      section.appendChild(await this.createSectionHeader(
        "Variants",
        "Visual styles that can be applied to any button type"
      ));
  
      const variants = ['filled', 'outlined', 'ghost'] as const;
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.itemSpacing = 16;
      row.fills = [];
  
      for (const variant of variants) {
        const button = await buttonHandlers.createInstance({
          type: 'primary',
          variant,
          size: 'medium',
          label: variant.charAt(0).toUpperCase() + variant.slice(1)
        });
        if (button) row.appendChild(button);
      }
  
      section.appendChild(row);
      return section;
    }
  
    private async createSizeSection() {
      const section = figma.createFrame();
      section.name = "Button Sizes";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 24;
      section.fills = [];
  
      section.appendChild(await this.createSectionHeader(
        "Sizes",
        "Different sizes to accommodate various use cases"
      ));
  
      const sizes = ['small', 'medium', 'large'] as const;
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.itemSpacing = 16;
      row.fills = [];
      row.counterAxisAlignItems = "CENTER";  // 세로 중앙 정렬
  
      for (const size of sizes) {
        const button = await buttonHandlers.createInstance({
          type: 'primary',
          variant: 'filled',
          size,
          label: size.charAt(0).toUpperCase() + size.slice(1)
        });
        if (button) row.appendChild(button);
      }
  
      section.appendChild(row);
      return section;
    }
  
    private async createStateSection() {
      const section = figma.createFrame();
      section.name = "Button States";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 24;
      section.fills = [];
  
      section.appendChild(await this.createSectionHeader(
        "States",
        "Interactive states that provide visual feedback"
      ));
  
      const states = ['default', 'hover', 'pressed', 'disabled'] as const;
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.itemSpacing = 16;
      row.fills = [];
  
      for (const state of states) {
        const button = await buttonHandlers.createInstance({
          type: 'primary',
          variant: 'filled',
          size: 'medium',
          state,
          label: state.charAt(0).toUpperCase() + state.slice(1)
        });
        if (button) row.appendChild(button);
      }
  
      section.appendChild(row);
      return section;
    }
  
    private async createIconSection() {
      const section = figma.createFrame();
      section.name = "Button with Icons";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 24;
      section.fills = [];
  
      section.appendChild(await this.createSectionHeader(
        "Icons",
        "Buttons with icons for enhanced visual communication"
      ));
  
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.itemSpacing = 16;
      row.fills = [];
  
      // 아이콘 왼쪽
      const leftIconButton = await buttonHandlers.createInstance({
        type: 'primary',
        variant: 'filled',
        size: 'medium',
        icon: { name: 'add', position: 'left' },
        label: 'Add item'
      });
  
      // 아이콘 오른쪽
      const rightIconButton = await buttonHandlers.createInstance({
        type: 'primary',
        variant: 'filled',
        size: 'medium',
        icon: { name: 'arrow-right', position: 'right' },
        label: 'Next'
      });
  
      // 아이콘만
      const iconOnlyButton = await buttonHandlers.createInstance({
        type: 'primary',
        variant: 'filled',
        size: 'medium',
        icon: { name: 'add' }
      });
  
      if (leftIconButton) row.appendChild(leftIconButton);
      if (rightIconButton) row.appendChild(rightIconButton);
      if (iconOnlyButton) row.appendChild(iconOnlyButton);
  
      section.appendChild(row);
      return section;
    }
  }
  
  // 사용 예시
  export const createButtonDocumentation = async () => {
    const showcase = ButtonShowcase.getInstance();
    return await showcase.createShowcase();
  };