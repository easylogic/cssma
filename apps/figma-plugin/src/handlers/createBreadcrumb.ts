import { BreadcrumbVariant } from '../types/breadcrumb';
import { BREADCRUMB_SIZES, BREADCRUMB_STYLES, BREADCRUMB_VARIANTS } from '../constants/breadcrumbStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private breadcrumbSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getBreadcrumbSet(): ComponentSetNode | null {
    return this.breadcrumbSet;
  }

  setBreadcrumbSet(set: ComponentSetNode): void {
    this.breadcrumbSet = set;
  }
}

export const breadcrumbHandlers = {
  createBreadcrumb: async (variant: BreadcrumbVariant) => {
    const size = BREADCRUMB_SIZES[variant.size || 'medium'];
    const state = variant.state || 'default';

    const breadcrumb = figma.createComponent();
    breadcrumb.name = `size=${variant.size || 'medium'}, state=${state}`;
    
    await setupBreadcrumbLayout(breadcrumb, size);
    await addBreadcrumbItems(breadcrumb, size, variant);

    return breadcrumb;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getBreadcrumbSet()) return cache.getBreadcrumbSet();

    const components: ComponentNode[] = [];
    
    for (const variant of BREADCRUMB_VARIANTS) {
      const component = await breadcrumbHandlers.createBreadcrumb(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Breadcrumb";

    // Add component properties
    componentSet.addComponentProperty('items', 'TEXT', 'Home / Page / Current');

    // Set up layout
    setupComponentSetLayout(componentSet);

    cache.setBreadcrumbSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: BreadcrumbVariant, props: { items?: string[] } = {}) => {
    const component = ComponentCache.getInstance().getBreadcrumbSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      state: variant.state || 'default'
    });

    if (props.items) {
      // Update breadcrumb items
      const itemsContainer = component.findOne(node => node.name === "items") as FrameNode;
      if (itemsContainer) {
        // Clear existing items
        itemsContainer.children.forEach(child => child.remove());
        
        // Add new items
        props.items.forEach((item, index) => {
          const isLast = index === props.items!.length - 1;
          addBreadcrumbItem(itemsContainer, item, isLast, variant);
          
          if (!isLast) {
            addSeparator(itemsContainer, variant);
          }
        });
      }
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Breadcrumb",
      description: "Breadcrumbs help users navigate through the hierarchy of a website and track their current location.",
      anatomy: {
        parts: [
          { name: "Container", description: "Wrapper that holds all breadcrumb items" },
          { name: "Item", description: "Individual navigation link" },
          { name: "Separator", description: "Visual divider between items" },
          { name: "Current", description: "Active/current page indicator" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the breadcrumb",
          options: ["small", "medium"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the breadcrumb",
          options: ["default", "hover", "pressed", "disabled"]
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Breadcrumbs come in two sizes: small and medium.",
          examples: [
            await breadcrumbHandlers.createInstance({ size: 'small', state: 'default' }),
            await breadcrumbHandlers.createInstance({ size: 'medium', state: 'default' })
          ]
        },
        {
          title: "States",
          description: "Different states for interaction feedback.",
          examples: [
            await breadcrumbHandlers.createInstance({ size: 'medium', state: 'default' }),
            await breadcrumbHandlers.createInstance({ size: 'medium', state: 'hover' }),
            await breadcrumbHandlers.createInstance({ size: 'medium', state: 'pressed' }),
            await breadcrumbHandlers.createInstance({ size: 'medium', state: 'disabled' })
          ]
        }
      ],
      usage: {
        description: "Use breadcrumbs to show hierarchy and help users understand where they are in the website structure.",
        examples: [
          {
            title: "Basic Navigation",
            description: "Use breadcrumbs for deep navigation structures.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Basic Navigation Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 16;
              container.fills = [];

              const breadcrumb = await breadcrumbHandlers.createInstance(
                { size: 'medium', state: 'default' },
                { items: ['Home', 'Products', 'Electronics', 'Laptops'] }
              );

              container.appendChild(breadcrumb!);
              return container;
            })()
          },
          {
            title: "With Icons",
            description: "Input fields with different icon positions.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "With Icons Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 24;
              container.fills = [];

              const inputs = [
                await inputHandlers.createInstance(
                  { hasIcon: true, iconPosition: 'left' },
                  { placeholder: "Search" }
                ),
                await inputHandlers.createInstance(
                  { hasIcon: true, iconPosition: 'right' },
                  { placeholder: "Password" }
                )
              ];

              inputs.forEach(input => container.appendChild(input!));
              return container;
            })()
          }
        ]
      }
    };

    return createComponentPage(pageData);
  }
};

// Helper functions
async function setupBreadcrumbLayout(breadcrumb: ComponentNode, size: typeof BREADCRUMB_SIZES[keyof typeof BREADCRUMB_SIZES]) {
  breadcrumb.layoutMode = "HORIZONTAL";
  breadcrumb.counterAxisAlignItems = "CENTER";
  breadcrumb.itemSpacing = size.spacing;
  breadcrumb.paddingLeft = breadcrumb.paddingRight = size.spacing;
}

async function addBreadcrumbItems(breadcrumb: ComponentNode, size: typeof BREADCRUMB_SIZES[keyof typeof BREADCRUMB_SIZES], variant: BreadcrumbVariant) {
  const itemsContainer = figma.createFrame();
  itemsContainer.name = "items";
  itemsContainer.layoutMode = "HORIZONTAL";
  itemsContainer.itemSpacing = size.spacing;
  itemsContainer.fills = [];

  // Add example items
  addBreadcrumbItem(itemsContainer, "Home", false, variant);
  addSeparator(itemsContainer, variant);
  addBreadcrumbItem(itemsContainer, "Page", false, variant);
  addSeparator(itemsContainer, variant);
  addBreadcrumbItem(itemsContainer, "Current", true, variant);

  breadcrumb.appendChild(itemsContainer);
}

function addBreadcrumbItem(container: FrameNode, text: string, isLast: boolean, variant: BreadcrumbVariant) {
  const styleKey = `default-${variant.state || 'default'}` as keyof typeof BREADCRUMB_STYLES;
  const style = BREADCRUMB_STYLES[styleKey];
  const size = BREADCRUMB_SIZES[variant.size || 'medium'];

  // Create clickable container
  const itemContainer = figma.createFrame();
  itemContainer.name = "item-container";
  itemContainer.layoutMode = "HORIZONTAL";
  itemContainer.counterAxisAlignItems = "CENTER";
  itemContainer.fills = [];
  itemContainer.paddingLeft = itemContainer.paddingRight = 4;
  itemContainer.paddingTop = itemContainer.paddingBottom = 2;

  // Create text node
  const item = figma.createText();
  item.name = "item-text";
  item.characters = text;
  item.fontSize = size.fontSize;
  
  if (isLast) {
    item.fills = [variables.bindVariable(style.active)];
  } else {
    item.fills = [variables.bindVariable(style.text)];
  }

  itemContainer.appendChild(item);
  container.appendChild(itemContainer);
}

function addSeparator(container: FrameNode, variant: BreadcrumbVariant) {
  const styleKey = `default-${variant.state || 'default'}` as keyof typeof BREADCRUMB_STYLES;
  const style = BREADCRUMB_STYLES[styleKey];
  const size = BREADCRUMB_SIZES[variant.size || 'medium'];

  const separator = figma.createText();
  separator.name = "separator";
  separator.characters = "/";
  separator.fontSize = size.fontSize;
  separator.fills = [variables.bindVariable(style.separator)];
  separator.opacity = variant.state === 'disabled' ? 0.5 : 1;

  container.appendChild(separator);
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

async function addTooltipContent(tooltip: ComponentNode, size: typeof TOOLTIP_SIZES[keyof typeof TOOLTIP_SIZES], variant: TooltipVariant) {
  const style = TOOLTIP_STYLES['default'];

  const content = figma.createFrame();
  content.name = "content";
  content.layoutMode = "HORIZONTAL";
  content.primaryAxisSizingMode = "AUTO";
  content.counterAxisSizingMode = "AUTO";
  content.fills = [variables.bindVariable(style.background)];
  content.strokes = [variables.bindVariable(style.border)];
  content.strokeWeight = 1;
  content.cornerRadius = 4;
  content.paddingLeft = content.paddingRight = size.padding;
  content.paddingTop = content.paddingBottom = size.padding / 2;

  const text = await createHandlers.text({
    text: "Tooltip text",
    fontSize: size.fontSize,
    fills: [variables.bindVariable(style.text)],
    textAlignHorizontal: "CENTER"
  });

  content.appendChild(text);
  tooltip.appendChild(content);
} 