import { variables } from '@/variables/manager';
import { CreateFrameOptions, CreateShapeOptions, CreateTextOptions } from '../types';

// 노드를 뷰포트 중앙에 배치하는 유틸리티 함수
export function centerNode(node: SceneNode) {
  const center = figma.viewport.center;
  node.x = center.x - node.width / 2;
  node.y = center.y - node.height / 2;
  
  figma.currentPage.selection = [node];
  figma.viewport.scrollAndZoomIntoView([node]);
}

// 기본 도형, 텍스트 등 공통으로 사용되는 생성 함수들
export const createHandlers = {
  // 기본 도형 생성
  rectangle: () => {
    const rect = figma.createRectangle();
    rect.resize(100, 100);
    centerNode(rect);
    return rect;
  },

  ellipse: () => {
    const ellipse = figma.createEllipse();
    ellipse.resize(100, 100);
    centerNode(ellipse);
    return ellipse;
  },

  // 프레임 생성
  frame: (options: CreateFrameOptions = {}) => {
    const frame = figma.createFrame();
    frame.resize(options.width || 300, options.height || 200);
    
    if (options.name) frame.name = options.name;
    if (options.fills) frame.fills = options.fills;
    if (options.strokes) frame.strokes = options.strokes;
    if (options.effects) frame.effects = options.effects;
    
    centerNode(frame);
    return frame;
  },

  // 텍스트 생성
  text: async (options: CreateTextOptions) => {
    const text = figma.createText();
    
    // 폰트 로드
    if (options.fontName) {
      await figma.loadFontAsync(options.fontName);
    } else {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    }
    
    text.characters = options.text;
    if (options.fontSize) text.fontSize = options.fontSize;
    if (options.fills) text.fills = options.fills;
    if (options.textAlignHorizontal) text.textAlignHorizontal = options.textAlignHorizontal;
    if (options.textAutoResize) text.textAutoResize = options.textAutoResize;
    if (options.layoutSizingHorizontal) text.layoutSizingHorizontal = options.layoutSizingHorizontal;
    
    centerNode(text);
    return text;
  }
};


export interface ComponentPageData {
  title: string;
  description: string;
  anatomy?: {
    image?: ComponentNode;
    parts: Array<{
      name: string;
      description: string;
    }>;
  };
  properties: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
    options?: string[];
  }>;
  variants: Array<{
    title: string;
    description: string;
    examples: (InstanceNode | null)[];
  }>;
  bestPractices?: Array<{
    title: string;
    description: string;
    do?: ComponentNode;
    dont?: ComponentNode;
  }>;
  usage?: {
    description: string;
    examples: Array<{
      title: string;
      description: string;
      component: ComponentNode;
    }>;
  };
}

export async function createComponentPage(data: ComponentPageData) {
  // Create main page frame
  const page = figma.createFrame();
  page.name = `${data.title} Documentation`;
  page.resize(1200, 100);
  page.layoutMode = "VERTICAL";
  page.itemSpacing = 64;
  page.paddingLeft = page.paddingRight = 64;
  page.paddingTop = page.paddingBottom = 64;
  page.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  page.primaryAxisSizingMode = "AUTO";
  page.counterAxisSizingMode = "FIXED";

  // Title Section
  const titleSection = figma.createFrame();
  titleSection.name = "Title Section";
  titleSection.layoutMode = "VERTICAL";
  titleSection.itemSpacing = 16;
  titleSection.fills = [];
  page.appendChild(titleSection);
  titleSection.layoutSizingHorizontal = "FILL";
  titleSection.layoutSizingVertical = "HUG";

  const title = await createHandlers.text({
    text: data.title,
    fontSize: 48,
    fills: [variables.bindVariable('semantic/text/black')],
  });
  titleSection.appendChild(title);
  title.layoutSizingHorizontal = "FILL";
  title.textAlignHorizontal = "LEFT";
  
  const description = await createHandlers.text({
    text: data.description,
    fontSize: 18,
    fills: [variables.bindVariable('semantic/text/subtle')],
  });
  titleSection.appendChild(description);
  description.layoutSizingHorizontal = "FILL";
  description.textAlignHorizontal = "LEFT";

  // Anatomy Section (if provided)
  if (data.anatomy) {
    const anatomySection = figma.createFrame();
    anatomySection.name = "Anatomy";
    anatomySection.layoutMode = "VERTICAL";
    anatomySection.itemSpacing = 24;
    anatomySection.fills = [];
    page.appendChild(anatomySection);
    anatomySection.layoutSizingHorizontal = "FILL";
    anatomySection.layoutSizingVertical = "HUG";

    const anatomyTitle = await createHandlers.text({
      text: "Anatomy",
      fontSize: 32,
      fills: [variables.bindVariable('semantic/text/black')],
    });
    anatomySection.appendChild(anatomyTitle);
    anatomyTitle.layoutSizingHorizontal = "FILL";
    anatomyTitle.textAlignHorizontal = "LEFT";

    if (data.anatomy.image) {
      anatomySection.appendChild(data.anatomy.image);
    }

    const partsList = figma.createFrame();
    partsList.name = "Parts List";
    partsList.layoutMode = "VERTICAL";
    partsList.itemSpacing = 16;
    partsList.fills = [];
    anatomySection.appendChild(partsList);
    partsList.layoutSizingHorizontal = "FILL";
    partsList.layoutSizingVertical = "HUG";

    for (const part of data.anatomy.parts) {
      const partItem = figma.createFrame();
      partItem.layoutMode = "VERTICAL";
      partItem.itemSpacing = 8;
      partItem.fills = [];
      partsList.appendChild(partItem);
      partItem.layoutSizingHorizontal = "FILL";
      partItem.layoutSizingVertical = "HUG";

      const partName = await createHandlers.text({
        text: part.name,
        fontSize: 16,
        fills: [variables.bindVariable('semantic/text/black')],
      });
      partItem.appendChild(partName);
      partName.layoutSizingHorizontal = "FILL";
      partName.textAlignHorizontal = "LEFT";
      
      const partDescription = await createHandlers.text({
        text: part.description,
        fontSize: 14,
        fills: [variables.bindVariable('semantic/text/subtle')],
      });
      partItem.appendChild(partDescription);
      partDescription.layoutSizingHorizontal = "FILL";
      partDescription.textAlignHorizontal = "LEFT";

    }

  }

  // Properties Section
  const propertiesSection = figma.createFrame();
  propertiesSection.name = "Properties";
  propertiesSection.layoutMode = "VERTICAL";
  propertiesSection.itemSpacing = 24;
  propertiesSection.fills = [];
  page.appendChild(propertiesSection);
  propertiesSection.layoutSizingHorizontal = "FILL";
  propertiesSection.layoutSizingVertical = "HUG";

  const propertiesTitle = await createHandlers.text({
    text: "Properties",
    fontSize: 32,
    fills: [variables.bindVariable('semantic/text/black')],
  });
  propertiesSection.appendChild(propertiesTitle);
  propertiesTitle.layoutSizingHorizontal = "FILL";
  propertiesTitle.textAlignHorizontal = "LEFT";

  for (const prop of data.properties) {
    const propItem = figma.createFrame();
    propItem.layoutMode = "VERTICAL";
    propItem.itemSpacing = 8;
    propItem.fills = [];
    propItem.paddingBottom = 16;
    propertiesSection.appendChild(propItem);
    propItem.layoutSizingHorizontal = "FILL";
    propItem.layoutSizingVertical = "HUG";

    const propHeader = figma.createFrame();
    propHeader.layoutMode = "HORIZONTAL";
    propHeader.itemSpacing = 8;
    propHeader.fills = [];
    propItem.appendChild(propHeader);
    propHeader.layoutSizingHorizontal = "FILL";
    propHeader.layoutSizingVertical = "HUG";

    const propName = await createHandlers.text({
      text: prop.name,
      fontSize: 16,
      fills: [variables.bindVariable('semantic/text/black')],
    });
    propHeader.appendChild(propName);
    propName.layoutSizingHorizontal = "FILL";
    propName.textAlignHorizontal = "LEFT";

    const propType = await createHandlers.text({
      text: prop.type,
      fontSize: 14,
      fills: [variables.bindVariable('semantic/text/subtle')],
    });
    propHeader.appendChild(propType);
    propType.layoutSizingHorizontal = "FILL";
    propType.textAlignHorizontal = "LEFT";

    if (prop.default) {
      const propDefault = await createHandlers.text({
        text: `Default: ${prop.default}`,
        fontSize: 14,
        fills: [variables.bindVariable('semantic/text/subtle')],
      });
      propHeader.appendChild(propDefault);
    }

    propHeader.appendChild(propName);
    propHeader.appendChild(propType);

    const propDescription = await createHandlers.text({
      text: prop.description,
      fontSize: 14,
      fills: [variables.bindVariable('semantic/text/subtle')],
    });
    propItem.appendChild(propDescription);
    propDescription.layoutSizingHorizontal = "FILL";
    propDescription.textAlignHorizontal = "LEFT";

    if (prop.options) {
      const optionsText = await createHandlers.text({
        text: `Options: ${prop.options.join(', ')}`,
        fontSize: 14,
        fills: [variables.bindVariable('semantic/text/subtle')],
      });
      propItem.appendChild(optionsText);
    }

  }

  // Variants Section
  const variantsSection = figma.createFrame();
  variantsSection.name = "Variants";
  variantsSection.layoutMode = "VERTICAL";
  variantsSection.itemSpacing = 40;
  variantsSection.fills = [];
  page.appendChild(variantsSection);
  variantsSection.layoutSizingHorizontal = "FILL";
  variantsSection.layoutSizingVertical = "HUG";

  const variantsTitle = await createHandlers.text({
    text: "Variants",
    fontSize: 32,
    fills: [variables.bindVariable('semantic/text/black')],
  });
  variantsSection.appendChild(variantsTitle);
  variantsTitle.layoutSizingHorizontal = "FILL";
  variantsTitle.textAlignHorizontal = "LEFT";

  for (const variant of data.variants) {
    const variantGroup = figma.createFrame();
    
    variantGroup.name = variant.title;
    variantGroup.layoutMode = "VERTICAL";
    variantGroup.itemSpacing = 16;
    variantGroup.fills = [];
    variantsSection.appendChild(variantGroup);
    variantGroup.layoutSizingHorizontal = "FILL";
    variantGroup.layoutSizingVertical = "HUG";

    const variantTitle = await createHandlers.text({
      text: variant.title,
      fontSize: 24,
      fills: [variables.bindVariable('semantic/text/black')],
    });
    variantGroup.appendChild(variantTitle);
    variantTitle.layoutSizingHorizontal = "FILL";
    variantTitle.textAlignHorizontal = "LEFT";

    const variantDescription = await createHandlers.text({
      text: variant.description,
      fontSize: 14,
      fills: [variables.bindVariable('semantic/text/subtle')],
    });
    variantGroup.appendChild(variantDescription);
    variantDescription.layoutSizingHorizontal = "FILL";
    variantDescription.textAlignHorizontal = "LEFT";

    const examplesContainer = figma.createFrame();
    examplesContainer.name = "Examples";
    examplesContainer.layoutMode = "HORIZONTAL";
    examplesContainer.layoutWrap = "WRAP";
    examplesContainer.itemSpacing = 24;
    examplesContainer.fills = [];
    examplesContainer.paddingTop = examplesContainer.paddingBottom = 24;
    variantGroup.appendChild(examplesContainer);
    examplesContainer.layoutSizingHorizontal = "FILL";
    examplesContainer.layoutSizingVertical = "HUG";

    const validExamples = variant.examples.filter(Boolean);

    for (const example of validExamples) {
      if (example) {
        examplesContainer.appendChild(example);
      }
    }

  }

  // Best Practices Section (if provided)
  if (data.bestPractices) {
    const bestPracticesSection = figma.createFrame();
    bestPracticesSection.name = "Best Practices";
    bestPracticesSection.layoutMode = "VERTICAL";
    bestPracticesSection.itemSpacing = 32;
    bestPracticesSection.fills = [];
    page.appendChild(bestPracticesSection);
    bestPracticesSection.layoutSizingHorizontal = "FILL";
    bestPracticesSection.layoutSizingVertical = "HUG";

    const bestPracticesTitle = await createHandlers.text({
      text: "Best Practices",
      fontSize: 32,
      fills: [variables.bindVariable('semantic/text/black')],
    });
    bestPracticesSection.appendChild(bestPracticesTitle);
    bestPracticesTitle.layoutSizingHorizontal = "FILL";
    bestPracticesTitle.textAlignHorizontal = "LEFT";

    for (const practice of data.bestPractices) {
      const practiceGroup = figma.createFrame();
      practiceGroup.name = practice.title;
      practiceGroup.layoutMode = "VERTICAL";
      practiceGroup.itemSpacing = 16;
      practiceGroup.fills = [];
      bestPracticesSection.appendChild(practiceGroup);
      practiceGroup.layoutSizingHorizontal = "FILL";
      practiceGroup.layoutSizingVertical = "HUG";

      const practiceTitle = await createHandlers.text({
        text: practice.title,
        fontSize: 20,
        fills: [variables.bindVariable('semantic/text/black')],
      });
      practiceGroup.appendChild(practiceTitle);
      practiceTitle.layoutSizingHorizontal = "FILL";
      practiceTitle.textAlignHorizontal = "LEFT";
      
      const practiceDescription = await createHandlers.text({
        text: practice.description,
        fontSize: 14,
        fills: [variables.bindVariable('semantic/text/subtle')],
      });
      practiceGroup.appendChild(practiceDescription);
      practiceDescription.layoutSizingHorizontal = "FILL";
      practiceDescription.textAlignHorizontal = "LEFT";

      if (practice.do || practice.dont) {
        const examplesContainer = figma.createFrame();
        examplesContainer.name = "Examples";
        examplesContainer.layoutMode = "HORIZONTAL";
        examplesContainer.itemSpacing = 40;
        examplesContainer.fills = [];
        examplesContainer.paddingTop = examplesContainer.paddingBottom = 24;
        practiceGroup.appendChild(examplesContainer);
        examplesContainer.layoutSizingHorizontal = "FILL";
        examplesContainer.layoutSizingVertical = "HUG";

        if (practice.do) {
          const doGroup = figma.createFrame();
          doGroup.name = "Do";
          doGroup.layoutMode = "VERTICAL";
          doGroup.itemSpacing = 8;
          doGroup.fills = [];
          doGroup.layoutSizingVertical = "HUG";

          const doLabel = await createHandlers.text({
            text: "Do",
            fontSize: 14,
            fills: [variables.bindVariable('semantic/status/success/default')],
          });

          doGroup.appendChild(doLabel);
          doGroup.appendChild(practice.do);
          examplesContainer.appendChild(doGroup);
        }

        if (practice.dont) {
          const dontGroup = figma.createFrame();
          dontGroup.name = "Don't";
          dontGroup.layoutMode = "VERTICAL";
          dontGroup.itemSpacing = 8;
          dontGroup.fills = [];
          dontGroup.layoutSizingVertical = "HUG";

          const dontLabel = await createHandlers.text({
            text: "Don't",
            fontSize: 14,
            fills: [variables.bindVariable('semantic/status/error/default')],
          });

          dontGroup.appendChild(dontLabel);
          dontGroup.appendChild(practice.dont);
          examplesContainer.appendChild(dontGroup);
        }

        practiceGroup.appendChild(practiceTitle);
        practiceGroup.appendChild(practiceDescription);
        practiceGroup.appendChild(examplesContainer);
      }

      bestPracticesSection.appendChild(practiceGroup);
    }

  }

  // Usage Section (if provided)
  if (data.usage) {
    const usageSection = figma.createFrame();
    usageSection.name = "Usage";
    usageSection.layoutMode = "VERTICAL";
    usageSection.itemSpacing = 32;
    usageSection.fills = [];
    page.appendChild(usageSection);
    usageSection.layoutSizingHorizontal = "FILL";
    usageSection.layoutSizingVertical = "HUG";

    const usageTitle = await createHandlers.text({
      text: "Usage",
      fontSize: 32,
      fills: [variables.bindVariable('semantic/text/black')],
    });
    usageSection.appendChild(usageTitle);
    usageTitle.layoutSizingHorizontal = "FILL";
    usageTitle.textAlignHorizontal = "LEFT";
    
    const usageDescription = await createHandlers.text({
      text: data.usage.description,
      fontSize: 16,
      fills: [variables.bindVariable('semantic/text/subtle')],
    });
    usageSection.appendChild(usageDescription);
    usageDescription.layoutSizingHorizontal = "FILL";
    usageDescription.textAlignHorizontal = "LEFT";

    for (const example of data.usage.examples) {
      const exampleGroup = figma.createFrame();
      exampleGroup.name = example.title;
      exampleGroup.layoutMode = "VERTICAL";
      exampleGroup.itemSpacing = 16;
      exampleGroup.fills = [];
      exampleGroup.paddingTop = exampleGroup.paddingBottom = 24;
      usageSection.appendChild(exampleGroup);
      exampleGroup.layoutSizingHorizontal = "FILL";
      exampleGroup.layoutSizingVertical = "HUG";

      const exampleTitle = await createHandlers.text({
        text: example.title,
        fontSize: 20,
        fills: [variables.bindVariable('semantic/text/black')],
      });
      exampleGroup.appendChild(exampleTitle);
      exampleTitle.layoutSizingHorizontal = "FILL";
      exampleTitle.textAlignHorizontal = "LEFT";
      
      const exampleDescription = await createHandlers.text({
        text: example.description,
        fontSize: 14,
        fills: [variables.bindVariable('semantic/text/subtle')],
      });
      exampleGroup.appendChild(exampleDescription);
      exampleDescription.layoutSizingHorizontal = "FILL";
      exampleDescription.textAlignHorizontal = "LEFT";

      if (example.component) {
        exampleGroup.appendChild(example.component);
      }

    }

  }

  return page;
}
