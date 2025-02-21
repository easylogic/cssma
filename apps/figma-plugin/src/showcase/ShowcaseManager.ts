import { createHandlers } from "@/handlers/createBase";
import { Anatomy, AnatomyComponent, AnatomyImage, AnatomyPart, Guidelines, ShowcaseSection, ShowcaseStructure, Usage } from "./types";
import { variables } from "@/variables";
import { buttonHandlers } from "@/handlers/button";
import { ButtonVariantProps } from "@/types/button";

const handelrs = {
    button: buttonHandlers
}

export class ShowcaseManager<T, V> {
    private static instance: ShowcaseManager<T, V>;
    
    private constructor() {}
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new ShowcaseManager<T, V>();
      }
      return this.instance;
    }
  
    async createShowcase<T, V>(structure: ShowcaseStructure<T, V>) {
      const frame = figma.createFrame();
      frame.name = structure.title;
      frame.layoutMode = "VERTICAL";
      frame.itemSpacing = 40;
      frame.paddingTop = 40;
      frame.paddingBottom = 40;
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
      // 1. 타이틀 섹션
      frame.appendChild(await this.createTitleSection(structure));
  
      // 2. Anatomy 섹션 (있는 경우)
      if (structure.anatomy) {
        frame.appendChild(await this.createAnatomySection(structure.anatomy));
      }
  
      // 3. Guidelines 섹션 (있는 경우)
      if (structure.guidelines) {
        frame.appendChild(await this.createGuidelinesSection(structure.guidelines));
      }
  
      // 4. Usage 섹션 (있는 경우)
      if (structure.usage) {
        frame.appendChild(await this.createUsageSection(structure.usage));
      }
  
      // 5. 컴포넌트 변형 섹션들
      for (const section of structure.sections) {
        frame.appendChild(await this.createComponentSection(section));
      }
  
      return frame;
    }
  
    private async createTitleSection(structure: ShowcaseStructure<T>) {
      const section = figma.createFrame();
      section.name = "Title";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 16;
      section.fills = [];
  
      const title = await createHandlers.text({
        text: structure.title,
        fontSize: 32,
        fontWeight: 600
      });
  
      if (structure.description) {
        const description = await createHandlers.text({
          text: structure.description,
          fontSize: 16,
          fills: [variables.bindVariable('text/color/secondary')]
        });
        section.appendChild(description);
      }
  
      section.appendChild(title);
      return section;
    }
  
    private async createAnatomySection(anatomy: Anatomy) {
      const section = figma.createFrame();
      section.name = "Anatomy";
      section.layoutMode = "VERTICAL";
      section.itemSpacing = 24;
      section.fills = [];
  
      // 이미지 생성
      const imageFrame = await this.createAnatomyImage(anatomy.image);
      section.appendChild(imageFrame);
  
      // 파트 설명 생성
      const partsFrame = await this.createAnatomyParts(anatomy.parts);
      section.appendChild(partsFrame);
  
      return section;
    }
  
    private async createComponentSection(section: ShowcaseSection<T, V>) {
      const frame = figma.createFrame();
      frame.name = section.title;
      frame.layoutMode = "VERTICAL";
      frame.itemSpacing = 24;
      frame.fills = [];
  
      // 섹션 헤더
      const header = await this.createSectionHeader(section);
      frame.appendChild(header);
  
      // 예시들
      const examples = figma.createFrame();
      examples.name = "Examples";
      examples.layoutMode = "HORIZONTAL";
      examples.itemSpacing = 16;
      examples.fills = [];
      examples.counterAxisAlignItems = "CENTER";
  
      for (const example of section.examples) {
        let component;
        
        if (example.handler === 'button') {
            component = await handelrs.button.createInstance(example.variant as ButtonVariantProps, example.props as ButtonVariantProps);
        }
        if (component) examples.appendChild(component);
      }
  
      frame.appendChild(examples);
      return frame;
    }
  
    private async createSectionHeader(section: ShowcaseSection<T, V>) {
        const header = figma.createFrame();
        header.name = `${section.title} Header`;
        header.layoutMode = "VERTICAL";
        header.itemSpacing = 8;
        header.fills = [];
    
        const title = await createHandlers.text({
          text: section.title,
          fontSize: 24,
          fontWeight: 600
        });
        header.appendChild(title);
    
        if (section.description) {
          const description = await createHandlers.text({
            text: section.description,
            fontSize: 14,
            fills: [variables.bindVariable('text/color/secondary')]
          });
          header.appendChild(description);
        }
    
        return header;
      }
    
      private async createAnatomyImage(imageData: AnatomyImage) {
        const frame = figma.createFrame();
        frame.name = imageData.name;
        frame.layoutMode = "VERTICAL";
        frame.itemSpacing = 40;
        frame.fills = [];
        frame.resize(400, 300);  // 기본 크기 설정
    
        // 컴포넌트들을 순회하며 생성
        for (const component of imageData.components) {
          const componentNode = await this.createAnatomyComponent(component);
          if (componentNode) frame.appendChild(componentNode);
        }
    
        return frame;
      }
    
      private async createAnatomyComponent(component: AnatomyComponent) {
        switch (component.type) {
          case "container":
            return await this.createContainerComponent(component);
          case "icon":
            return await this.createIconComponent(component);
          case "text":
            return await this.createTextComponent(component);
          case "vector":
            return await this.createVectorComponent(component);
          default:
            return null;
        }
      }
    
      private async createContainerComponent(component: AnatomyComponent) {
        const frame = figma.createFrame();
        frame.name = component.name;
        
        // 컨테이너 속성 설정
        if (component.props) {
          const { layoutMode, padding, itemSpacing, cornerRadius, fills, ...rest } = component.props;
          
          if (layoutMode) frame.layoutMode = layoutMode;
          if (padding) {
            if (typeof padding === 'number') {
              frame.paddingTop = frame.paddingRight = frame.paddingBottom = frame.paddingLeft = padding;
            } else {
              frame.paddingTop = frame.paddingBottom = padding.vertical || 0;
              frame.paddingLeft = frame.paddingRight = padding.horizontal || 0;
            }
          }
          if (itemSpacing) frame.itemSpacing = itemSpacing;
          if (cornerRadius) frame.cornerRadius = cornerRadius;
          if (fills) frame.fills = fills;
    
          // 나머지 속성들 적용
          for (const key in rest) {
            const value = rest[key];
            if (key in frame) {
              frame[key] = value;
            }
          }
        }
    
        // 자식 컴포넌트 추가
        if (component.children) {
          for (const child of component.children) {
            const childNode = await this.createAnatomyComponent(child);
            if (childNode) frame.appendChild(childNode);
          }
        }
    
        return frame;
      }
    
      private async createIconComponent(component: AnatomyComponent) {
        const frame = figma.createFrame();
        frame.name = component.name;
    
        if (component.props) {
          const { name, size, color } = component.props;
          frame.resize(size || 24, size || 24);
          
          if (color) {
            frame.fills = [{
              type: 'SOLID',
              color: color
            }];
          }
        }
    
        return frame;
      }
    
      private async createTextComponent(component: AnatomyComponent) {
        const { text, fontSize, fontWeight, color } = component.props || {};
        
        return await createHandlers.text({
          text: text || component.name,
          fontSize: fontSize || 14,
          fontWeight: fontWeight || 400,
          fills: [color || variables.bindVariable('text/color/default')]
        });
      }
    
      private async createVectorComponent(component: AnatomyComponent) {
        const vector = figma.createVector();
        vector.name = component.name;
    
        if (component.props) {
          const { stroke, strokeWidth, dashPattern } = component.props;
          
          if (stroke) {
            vector.strokes = [{
              type: 'SOLID',
              color: stroke
            }];
          }
          if (strokeWidth) vector.strokeWeight = strokeWidth;
          if (dashPattern) vector.dashPattern = dashPattern;
        }
    
        return vector;
      }
    
      private async createAnatomyParts(parts: AnatomyPart[]) {
        const frame = figma.createFrame();
        frame.name = "Anatomy Parts";
        frame.layoutMode = "VERTICAL";
        frame.itemSpacing = 16;
        frame.fills = [];
    
        for (const part of parts) {
          const partFrame = figma.createFrame();
          partFrame.name = part.name;
          partFrame.layoutMode = "VERTICAL";
          partFrame.itemSpacing = 4;
          partFrame.fills = [];
    
          const name = await createHandlers.text({
            text: part.name,
            fontSize: 14,
            fontWeight: 600
          });
    
          const description = await createHandlers.text({
            text: part.description,
            fontSize: 12,
            fills: [variables.bindVariable('text/color/secondary')]
          });
    
          partFrame.appendChild(name);
          partFrame.appendChild(description);
          frame.appendChild(partFrame);
        }
    
        return frame;
      }
    
      private async createGuidelinesSection(guidelines: Guidelines) {
        const section = figma.createFrame();
        section.name = "Guidelines";
        section.layoutMode = "VERTICAL";
        section.itemSpacing = 24;
        section.fills = [];
    
        // 규칙들 생성
        for (const rule of guidelines.rules) {
          const ruleFrame = figma.createFrame();
          ruleFrame.name = "Guideline Rule";
          ruleFrame.layoutMode = "HORIZONTAL";
          ruleFrame.itemSpacing = 24;
          ruleFrame.fills = [];
    
          // Do
          const doFrame = await this.createGuidelineItem("Do", rule.do, true);
          ruleFrame.appendChild(doFrame);
    
          // Don't
          const dontFrame = await this.createGuidelineItem("Don't", rule.dont, false);
          ruleFrame.appendChild(dontFrame);
    
          section.appendChild(ruleFrame);
        }
    
        return section;
      }
    
      private async createGuidelineItem(type: "Do" | "Don't", text: string, isPositive: boolean) {
        const frame = figma.createFrame();
        frame.name = type;
        frame.layoutMode = "VERTICAL";
        frame.itemSpacing = 8;
        frame.fills = [];
        frame.paddingTop = 16;
        frame.paddingBottom = 16;
        frame.paddingLeft = 16;
        frame.paddingRight = 16;
        frame.cornerRadius = 8;
    
        // 배경색 설정
        frame.fills = [{
          type: 'SOLID',
          color: isPositive 
            ? { r: 0.9, g: 1, b: 0.9 }  // 연한 초록색
            : { r: 1, g: 0.9, b: 0.9 }  // 연한 빨간색
        }];
    
        const title = await createHandlers.text({
          text: type,
          fontSize: 14,
          fontWeight: 600,
          fills: [variables.bindVariable(isPositive ? 'status/success/default' : 'status/error/default')]
        });
    
        const description = await createHandlers.text({
          text,
          fontSize: 14,
          fills: [variables.bindVariable('text/color/default')]
        });
    
        frame.appendChild(title);
        frame.appendChild(description);
    
        return frame;
      }
    
      private async createUsageSection(usage: Usage) {
        const section = figma.createFrame();
        section.name = "Usage Examples";
        section.layoutMode = "VERTICAL";
        section.itemSpacing = 24;
        section.fills = [];
    
        for (const example of usage.examples) {
          const exampleFrame = figma.createFrame();
          exampleFrame.name = example.title;
          exampleFrame.layoutMode = "VERTICAL";
          exampleFrame.itemSpacing = 8;
          exampleFrame.fills = [];
    
          const title = await createHandlers.text({
            text: example.title,
            fontSize: 14,
            fontWeight: 600
          });
    
          const code = await createHandlers.text({
            text: example.code,
            fontSize: 12,
            fontFamily: 'Source Code Pro'  // 코드용 폰트
          });
    
          exampleFrame.appendChild(title);
          exampleFrame.appendChild(code);
          section.appendChild(exampleFrame);
        }
    
        return section;
      }
    }
  }