import { DividerVariantProps } from '../types/divider';
import { DIVIDER_SIZES, DIVIDER_STYLES, DIVIDER_VARIANTS } from '../constants/dividerStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private dividerSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getDividerSet(): ComponentSetNode | null {
    return this.dividerSet;
  }

  setDividerSet(set: ComponentSetNode): void {
    this.dividerSet = set;
  }
}

export const dividerHandlers = {
  createDivider: async (variant: DividerVariantProps) => {
    const size = DIVIDER_SIZES[variant.size || 'medium'];
    const style = DIVIDER_STYLES[variant.theme || 'default'];
    const isHorizontal = variant.orientation !== 'vertical';

    // Create divider component
    const divider = figma.createComponent();
    divider.name = `orientation=${variant.orientation || 'horizontal'}, variant=${variant.variant || 'solid'}, size=${variant.size || 'medium'}, theme=${variant.theme || 'default'}, hasLabel=${variant.hasLabel}`;
    
    // Add ARIA attributes
    divider.setPluginData('role', variant.role || 'separator');
    divider.setPluginData('aria-orientation', variant.orientation || 'horizontal');
    if (variant.ariaLabel) {
      divider.setPluginData('aria-label', variant.ariaLabel);
    }

    // Set layout
    divider.layoutMode = isHorizontal ? "HORIZONTAL" : "VERTICAL";
    divider.itemSpacing = size.spacing;
    divider.fills = [];
    divider.resize(isHorizontal ? 400 : size.thickness, isHorizontal ? size.thickness : 400);
    divider.primaryAxisSizingMode = isHorizontal ? "FIXED" : "AUTO";
    divider.counterAxisSizingMode = isHorizontal ? "AUTO" : "FIXED";

    if (variant.hasLabel && isHorizontal) {
      // Create container for label and lines
      const container = figma.createFrame();
      container.name = "Container";
      container.layoutMode = "HORIZONTAL";
      container.itemSpacing = size.labelSpacing;
      container.fills = [];
      container.layoutAlign = "STRETCH";
      container.primaryAxisAlignItems = (variant.labelAlignment === 'start' ? 'MIN' : 
                                       variant.labelAlignment === 'end' ? 'MAX' : 'CENTER');

      // Create lines based on label position
      const createLine = () => {
        const line = createDividerLine(variant, size, style);
        line.layoutGrow = 1;
        return line;
      };

      const labelPosition = variant.labelPosition || 'center';
      
      if (labelPosition === 'center') {
        const leftLine = createLine();
        leftLine.name = "LeftLine";
        container.appendChild(leftLine);
      }

      // Create label
      const labelContainer = figma.createFrame();
      labelContainer.name = "LabelContainer";
      labelContainer.layoutMode = "HORIZONTAL";
      labelContainer.itemSpacing = size.labelSpacing / 2;
      labelContainer.fills = [];
      labelContainer.primaryAxisAlignItems = (variant.labelAlignment === 'start' ? 'MIN' : 
                                             variant.labelAlignment === 'end' ? 'MAX' : 'CENTER');

      const label = await createHandlers.text({
        text: variant.label || 'Divider',
        fontSize: size.fontSize,
        fills: [variables.bindVariable(style.text.default)]
      });
      label.name = "label";
      label.textAlignHorizontal = (variant.labelAlignment === 'start' ? 'LEFT' : 
                                    variant.labelAlignment === 'end' ? 'RIGHT' : 'CENTER');
      labelContainer.appendChild(label);
      container.appendChild(labelContainer);

      if (labelPosition === 'center' || labelPosition === 'start') {
        const rightLine = createLine();
        rightLine.name = "RightLine";
        container.appendChild(rightLine);
      }

      divider.appendChild(container);
    } else {
      // Create single line
      const line = createDividerLine(variant, size, style);
      line.name = "Line";
      divider.appendChild(line);
    }

    return divider;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getDividerSet()) return cache.getDividerSet();

    const components: ComponentNode[] = [];
    
    for (const variant of DIVIDER_VARIANTS) {
      const component = await dividerHandlers.createDivider(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Divider";

    // Add component properties
    componentSet.addComponentProperty('orientation', 'VARIANT', 'The orientation of the divider');
    componentSet.addComponentProperty('variant', 'VARIANT', 'The visual style of the divider');
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the divider');
    componentSet.addComponentProperty('theme', 'VARIANT', 'The theme of the divider');
    componentSet.addComponentProperty('hasLabel', 'BOOLEAN', 'Whether to show a label');
    componentSet.addComponentProperty('label', 'TEXT', 'The label text');
    componentSet.addComponentProperty('labelPosition', 'VARIANT', 'The position of the label');
    componentSet.addComponentProperty('labelAlignment', 'VARIANT', 'The alignment of the label');

    setupComponentSetLayout(componentSet);

    cache.setDividerSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: DividerVariantProps, props: { label?: string } = {}) => {
    const component = ComponentCache.getInstance().getDividerSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      orientation: variant.orientation || 'horizontal',
      variant: variant.variant || 'solid',
      size: variant.size || 'medium',
      theme: variant.theme || 'default',
      hasLabel: variant.hasLabel ?? false,
      label: props.label || variant.label || '',
      labelPosition: variant.labelPosition || 'center',
      labelAlignment: variant.labelAlignment || 'center'
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Divider",
      description: "Dividers separate content into clear groups.",
      anatomy: {
        parts: [
          { name: "Line", description: "The main dividing line" },
          { name: "Label", description: "Optional text label" },
          { name: "Container", description: "Container for complex layouts with labels" }
        ]
      },
      properties: [
        {
          name: "orientation",
          type: "enum",
          default: "horizontal",
          description: "The orientation of the divider",
          options: ["horizontal", "vertical"]
        },
        {
          name: "variant",
          type: "enum",
          default: "solid",
          description: "The visual style of the divider",
          options: ["solid", "dashed", "dotted"]
        },
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the divider",
          options: ["small", "medium", "large"]
        },
        {
          name: "theme",
          type: "enum",
          default: "default",
          description: "The theme of the divider",
          options: ["default", "primary", "subtle"]
        },
        {
          name: "hasLabel",
          type: "boolean",
          default: "false",
          description: "Whether to show a label"
        },
        {
          name: "label",
          type: "string",
          description: "The label text"
        },
        {
          name: "labelPosition",
          type: "enum",
          default: "center",
          description: "The position of the label",
          options: ["start", "center", "end"]
        },
        {
          name: "labelAlignment",
          type: "enum",
          default: "center",
          description: "The alignment of the label",
          options: ["start", "center", "end"]
        }
      ],
      variants: [
        {
          title: "Orientations",
          description: "Different orientations of dividers.",
          examples: [
            await dividerHandlers.createInstance(
              { orientation: 'horizontal' }
            ),
            await dividerHandlers.createInstance(
              { orientation: 'vertical' }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different visual styles of dividers.",
          examples: [
            await dividerHandlers.createInstance(
              { variant: 'solid' }
            ),
            await dividerHandlers.createInstance(
              { variant: 'dashed' }
            ),
            await dividerHandlers.createInstance(
              { variant: 'dotted' }
            )
          ]
        },
        {
          title: "Themes",
          description: "Different themes of dividers.",
          examples: [
            await dividerHandlers.createInstance(
              { theme: 'default' }
            ),
            await dividerHandlers.createInstance(
              { theme: 'primary' }
            ),
            await dividerHandlers.createInstance(
              { theme: 'subtle' }
            )
          ]
        },
        {
          title: "With Labels",
          description: "Dividers with different label configurations.",
          examples: [
            await dividerHandlers.createInstance(
              { hasLabel: true, labelPosition: 'center' },
              { label: "Center" }
            ),
            await dividerHandlers.createInstance(
              { hasLabel: true, labelPosition: 'start' },
              { label: "Start" }
            ),
            await dividerHandlers.createInstance(
              { hasLabel: true, labelPosition: 'end' },
              { label: "End" }
            )
          ]
        }
      ],
      usage: {
        description: "Use dividers to create clear visual separation between content sections.",
        examples: [
          {
            title: "Content Sections",
            description: "Using dividers to separate different content sections.",
            component: await (async () => {
              const container = figma.createComponent();
              container.name = "Content Sections Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 24;
              container.fills = [];
              container.resize(400, 1);
              container.primaryAxisSizingMode = "AUTO";
              container.counterAxisSizingMode = "FIXED";

              const sections = [
                { title: "Section 1", content: "Content for section 1" },
                { title: "Section 2", content: "Content for section 2" },
                { title: "Section 3", content: "Content for section 3" }
              ];

              for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                
                if (i > 0) {
                  const divider = await dividerHandlers.createInstance(
                    { 
                      variant: 'solid',
                      size: 'small',
                      theme: i === 1 ? 'primary' : 'default',
                      hasLabel: i === 1,
                      labelPosition: 'center',
                      labelAlignment: 'center'
                    },
                    { label: i === 1 ? 'Featured Section' : undefined }
                  );
                  if (divider) container.appendChild(divider);
                }

                const content = figma.createFrame();
                content.name = `Section ${i + 1}`;
                content.layoutMode = "VERTICAL";
                content.itemSpacing = 8;
                content.fills = [];
                content.layoutAlign = "STRETCH";

                const title = await createHandlers.text({
                  text: section.title,
                  fontSize: 16,
                  fills: [variables.bindVariable('semantic/text/default')]
                });
                
                const text = await createHandlers.text({
                  text: section.content,
                  fontSize: 14,
                  fills: [variables.bindVariable('semantic/text/muted')]
                });

                content.appendChild(title);
                content.appendChild(text);
                container.appendChild(content);
              }

              return container;
            })()
          }
        ]
      }
    };

    return createComponentPage(pageData);
  }
};

// Helper function to create divider line
function createDividerLine(variant: DividerVariantProps, size: typeof DIVIDER_SIZES[keyof typeof DIVIDER_SIZES], style: typeof DIVIDER_STYLES[keyof typeof DIVIDER_STYLES]): FrameNode {
  const line = figma.createFrame();
  const lineStyle = style.line[variant.variant || 'solid'];
  line.fills = [variables.bindVariable(lineStyle.default)];
  
  const isHorizontal = variant.orientation !== 'vertical';
  line.resize(isHorizontal ? 400 : size.thickness, isHorizontal ? size.thickness : 400);

  if (variant.variant === 'dashed') {
    line.strokeWeight = size.thickness;
    line.strokeAlign = "CENTER";
    line.dashPattern = [size.dashLength || 0, size.dashGap || 0];
  } else if (variant.variant === 'dotted') {
    line.strokeWeight = size.thickness;
    line.strokeAlign = "CENTER";
    line.dashPattern = [size.dotSize || 0, size.dotGap || 0];
  }

  return line;
}

function setupComponentSetLayout(componentSet: ComponentSetNode) {
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.layoutWrap = "WRAP";
  componentSet.itemSpacing = 40;
  componentSet.counterAxisSpacing = 40;
  componentSet.paddingLeft = componentSet.paddingRight = 40;
  componentSet.paddingTop = componentSet.paddingBottom = 40;
  componentSet.resize(800, componentSet.height);
  componentSet.primaryAxisSizingMode = "FIXED";
  componentSet.counterAxisSizingMode = "AUTO";
  componentSet.fills = [variables.bindVariable('semantic/bg/default')];
} 