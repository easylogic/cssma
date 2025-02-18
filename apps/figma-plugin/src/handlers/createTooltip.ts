import { TooltipVariantProps } from '../types/tooltip';
import { TOOLTIP_SIZES, TOOLTIP_STYLES, TOOLTIP_VARIANTS } from '../constants/tooltipStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private tooltipSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getTooltipSet(): ComponentSetNode | null {
    return this.tooltipSet;
  }

  setTooltipSet(set: ComponentSetNode): void {
    this.tooltipSet = set;
  }
}

export const tooltipHandlers = {
  createTooltip: async (variant: TooltipVariantProps) => {
    const size = TOOLTIP_SIZES[variant.size || 'medium'];
    const style = TOOLTIP_STYLES[variant.theme || 'light'];
    const placement = variant.placement || 'top';

    // Create tooltip component
    const tooltip = figma.createComponent();
    tooltip.name = `placement=${placement}, theme=${variant.theme || 'light'}, size=${variant.size || 'medium'}, hasArrow=${variant.hasArrow}, trigger=${variant.trigger || 'hover'}`;
    
    // Add ARIA attributes
    tooltip.setPluginData('role', variant.role || 'tooltip');
    if (variant.ariaLabel) {
      tooltip.setPluginData('aria-label', variant.ariaLabel);
    }

    // Set layout
    tooltip.layoutMode = "VERTICAL";
    tooltip.itemSpacing = size.padding / 2;
    tooltip.paddingLeft = tooltip.paddingRight = size.padding;
    tooltip.paddingTop = tooltip.paddingBottom = size.padding;
    tooltip.cornerRadius = size.borderRadius;
    tooltip.resize(size.maxWidth, 1);
    tooltip.primaryAxisSizingMode = "AUTO";
    tooltip.counterAxisSizingMode = "AUTO";

    // Set background and border
    tooltip.fills = [variables.bindVariable(style.background.default)];
    tooltip.strokes = [variables.bindVariable(style.border.default)];
    tooltip.strokeWeight = 1;
    tooltip.effects = [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 2 },
        radius: 4,
        spread: 0,
        visible: true,
        blendMode: "NORMAL",
      }
    ];

    // Add content
    const content = await createHandlers.text({
      text: 'Tooltip content',
      fontSize: size.fontSize,
      fills: [variables.bindVariable(style.text.default)],
      textAutoResize: "HEIGHT"
    });
    content.name = "content";
    content.textAlignHorizontal = "CENTER";
    tooltip.appendChild(content);

    // Add arrow if needed
    if (variant.hasArrow) {
      const arrow = figma.createVector();
      arrow.name = "arrow";
      arrow.resize(size.arrowSize, size.arrowSize);
      
      // Set arrow position and rotation based on placement
      if (placement.startsWith('top')) {
        arrow.y = tooltip.height;
        arrow.rotation = 180;
      } else if (placement.startsWith('right')) {
        arrow.x = -size.arrowSize;
        arrow.rotation = 90;
      } else if (placement.startsWith('bottom')) {
        arrow.y = -size.arrowSize;
        arrow.rotation = 0;
      } else if (placement.startsWith('left')) {
        arrow.x = tooltip.width;
        arrow.rotation = -90;
      }

      // Set arrow style
      arrow.fills = [variables.bindVariable(style.background.default)];
      arrow.strokes = [variables.bindVariable(style.border.default)];
      arrow.strokeWeight = 1;

      // Create arrow path
      arrow.vectorNetwork = {
        vertices: [
          { x: size.arrowSize / 2, y: 0 },
          { x: size.arrowSize, y: size.arrowSize },
          { x: 0, y: size.arrowSize }
        ],
        segments: [
          { start: 0, end: 1 },
          { start: 1, end: 2 },
          { start: 2, end: 0 }
        ]
      };

      tooltip.appendChild(arrow);
    }

    return tooltip;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getTooltipSet()) return cache.getTooltipSet();

    const components: ComponentNode[] = [];
    
    for (const variant of TOOLTIP_VARIANTS) {
      const component = await tooltipHandlers.createTooltip(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Tooltip";

    // Add component properties
    componentSet.addComponentProperty('placement', 'VARIANT', 'The placement of the tooltip');
    componentSet.addComponentProperty('theme', 'VARIANT', 'The visual theme of the tooltip');
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the tooltip');
    componentSet.addComponentProperty('hasArrow', 'BOOLEAN', 'Whether to show an arrow');
    componentSet.addComponentProperty('trigger', 'VARIANT', 'The trigger behavior');
    componentSet.addComponentProperty('content', 'TEXT', 'The tooltip content');

    setupComponentSetLayout(componentSet);

    cache.setTooltipSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: TooltipVariantProps, props: { content?: string } = {}) => {
    const component = ComponentCache.getInstance().getTooltipSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      placement: variant.placement || 'top',
      theme: variant.theme || 'light',
      size: variant.size || 'medium',
      hasArrow: variant.hasArrow ?? true,
      trigger: variant.trigger || 'hover'
    });

    if (props.content) {
      const content = component.findOne(node => node.name === "content") as TextNode;
      if (content) {
        content.characters = props.content;
        component.setPluginData('aria-label', props.content);
      }
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Tooltip",
      description: "Tooltips provide additional information about an element when users hover over, focus on, or tap it.",
      anatomy: {
        parts: [
          { name: "Container", description: "The main container that holds the tooltip content" },
          { name: "Content", description: "The text content of the tooltip" },
          { name: "Arrow", description: "Optional arrow that points to the target element" }
        ]
      },
      properties: [
        {
          name: "placement",
          type: "enum",
          default: "top",
          description: "The placement of the tooltip",
          options: ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"]
        },
        {
          name: "theme",
          type: "enum",
          default: "light",
          description: "The visual theme of the tooltip",
          options: ["light", "dark", "custom"]
        },
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the tooltip",
          options: ["small", "medium", "large"]
        },
        {
          name: "hasArrow",
          type: "boolean",
          default: "true",
          description: "Whether to show an arrow"
        },
        {
          name: "trigger",
          type: "enum",
          default: "hover",
          description: "The trigger behavior",
          options: ["hover", "focus", "click", "manual"]
        }
      ],
      variants: [
        {
          title: "Placements",
          description: "Different placements of tooltips.",
          examples: [
            await tooltipHandlers.createInstance(
              { placement: 'top' },
              { content: "Top tooltip" }
            ),
            await tooltipHandlers.createInstance(
              { placement: 'right' },
              { content: "Right tooltip" }
            ),
            await tooltipHandlers.createInstance(
              { placement: 'bottom' },
              { content: "Bottom tooltip" }
            ),
            await tooltipHandlers.createInstance(
              { placement: 'left' },
              { content: "Left tooltip" }
            )
          ]
        },
        {
          title: "Themes",
          description: "Different visual themes of tooltips.",
          examples: [
            await tooltipHandlers.createInstance(
              { theme: 'light' },
              { content: "Light theme" }
            ),
            await tooltipHandlers.createInstance(
              { theme: 'dark' },
              { content: "Dark theme" }
            ),
            await tooltipHandlers.createInstance(
              { theme: 'custom' },
              { content: "Custom theme" }
            )
          ]
        },
        {
          title: "Sizes",
          description: "Different sizes of tooltips.",
          examples: [
            await tooltipHandlers.createInstance(
              { size: 'small' },
              { content: "Small tooltip" }
            ),
            await tooltipHandlers.createInstance(
              { size: 'medium' },
              { content: "Medium tooltip" }
            ),
            await tooltipHandlers.createInstance(
              { size: 'large' },
              { content: "Large tooltip with more content that wraps to multiple lines" }
            )
          ]
        }
      ],
      usage: {
        description: "Use tooltips to provide additional context or information about UI elements.",
        examples: [
          {
            title: "Button with Tooltip",
            description: "A button that shows a tooltip on hover.",
            component: await (async () => {
              const container = figma.createComponent();
              container.name = "Button with Tooltip Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 8;
              container.fills = [];
              container.resize(200, 40);
              container.primaryAxisAlignItems = "CENTER";
              container.counterAxisAlignItems = "CENTER";

              const tooltip = await tooltipHandlers.createInstance(
                { placement: 'top', theme: 'dark', size: 'small' },
                { content: "Click to save changes" }
              );

              if (tooltip) container.appendChild(tooltip);
              return container;
            })()
          }
        ]
      }
    };

    return createComponentPage(pageData);
  }
};

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