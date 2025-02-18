import { BadgeVariant } from '../types/badge';
import { BADGE_SIZES, BADGE_STYLES, BADGE_VARIANTS } from '../constants/badgeStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private badgeSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getBadgeSet(): ComponentSetNode | null {
    return this.badgeSet;
  }

  setBadgeSet(set: ComponentSetNode): void {
    this.badgeSet = set;
  }
}

export const badgeHandlers = {
  createBadge: async (variant: BadgeVariant) => {
    const size = BADGE_SIZES[variant.size || 'medium'];
    const state = variant.state || 'default';
    const shape = variant.shape || 'text';

    const badge = figma.createComponent();
    badge.name = `size=${variant.size || 'medium'}, type=${variant.type || 'default'}, variant=${variant.variant || 'filled'}, state=${state}, shape=${shape}`;
    
    await setupBadgeLayout(badge, size);
    await applyBadgeStyle(badge, variant);

    if (shape === 'text') {
      await addBadgeText(badge, size, variant);
    } else {
      await addBadgeDot(badge, size, variant);
    }

    return badge;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getBadgeSet()) return cache.getBadgeSet();

    const components: ComponentNode[] = [];
    
    // Create components for each variant
    for (const variant of BADGE_VARIANTS) {
      const component = await badgeHandlers.createBadge(variant);
      components.push(component);
    }

    // Combine components as variants
    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Badge";

    // Add component properties
    componentSet.addComponentProperty('content', 'TEXT', '1');
    componentSet.addComponentProperty('shape', 'VARIANT', 'text');
    componentSet.addComponentProperty('position', 'VARIANT', 'top-right');

    // Set up layout
    setupComponentSetLayout(componentSet);

    // Cache the component set
    cache.setBadgeSet(componentSet);

    return componentSet;
  },

  createInstance: async (variant: BadgeVariant, props: { text?: string } = {}) => {
    const component = ComponentCache.getInstance().getBadgeSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      type: variant.type || 'default',
      variant: variant.variant || 'filled',
      state: variant.state || 'default',
      shape: variant.shape || 'text',
      position: variant.position || 'top-right'
    });

    if (props.text && variant.shape === 'text') {
      const textNode = component.findOne(node => node.type === "TEXT") as TextNode;
      if (textNode) textNode.characters = props.text;
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Badge",
      description: "Badges are small visual indicators for numeric values, status, or labels.",
      anatomy: {
        parts: [
          { name: "Container", description: "The wrapper that holds the badge content" },
          { name: "Content", description: "Text or dot that represents the badge value" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the badge",
          options: ["small", "medium"]
        },
        {
          name: "type",
          type: "enum",
          default: "default",
          description: "The type of the badge",
          options: ["default", "primary", "success", "warning", "danger"]
        },
        {
          name: "variant",
          type: "enum",
          default: "filled",
          description: "The variant of the badge",
          options: ["filled", "outlined", "ghost"]
        },
        {
          name: "shape",
          type: "enum",
          default: "text",
          description: "The shape of the badge",
          options: ["text", "dot"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the badge",
          options: ["default", "hover", "pressed", "disabled"]
        }
      ],
      variants: [
        {
          title: "Types",
          description: "Different types for different contexts.",
          examples: [
            await badgeHandlers.createInstance({ type: 'default', variant: 'filled', shape: 'text' }, { text: "Default" }),
            await badgeHandlers.createInstance({ type: 'primary', variant: 'filled', shape: 'text' }, { text: "Primary" }),
            await badgeHandlers.createInstance({ type: 'success', variant: 'filled', shape: 'text' }, { text: "Success" }),
            await badgeHandlers.createInstance({ type: 'warning', variant: 'filled', shape: 'text' }, { text: "Warning" }),
            await badgeHandlers.createInstance({ type: 'danger', variant: 'filled', shape: 'text' }, { text: "Danger" })
          ]
        },
        {
          title: "Shapes",
          description: "Badges can be displayed as text or dots.",
          examples: [
            await badgeHandlers.createInstance({ type: 'primary', variant: 'filled', shape: 'text' }, { text: "99+" }),
            await badgeHandlers.createInstance({ type: 'primary', variant: 'filled', shape: 'dot' })
          ]
        },
        {
          title: "Sizes",
          description: "Badges come in two sizes.",
          examples: [
            await badgeHandlers.createInstance({ size: 'small', type: 'primary', shape: 'text' }, { text: "Small" }),
            await badgeHandlers.createInstance({ size: 'medium', type: 'primary', shape: 'text' }, { text: "Medium" })
          ]
        }
      ],
      usage: {
        description: "Use badges to highlight status, show counts, or emphasize small pieces of information.",
        examples: [
          {
            title: "Status Indicators",
            description: "Use badges to show status information.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Status Indicators Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const badges = [
                await badgeHandlers.createInstance(
                  { type: 'success', variant: 'filled', shape: 'text' },
                  { text: "Active" }
                ),
                await badgeHandlers.createInstance(
                  { type: 'warning', variant: 'filled', shape: 'text' },
                  { text: "Pending" }
                ),
                await badgeHandlers.createInstance(
                  { type: 'danger', variant: 'filled', shape: 'text' },
                  { text: "Failed" }
                )
              ];

              badges.forEach(badge => container.appendChild(badge!));
              return container;
            })()
          },
          {
            title: "Notification Badges",
            description: "Use badges to show notification counts.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Notification Badges Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 24;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const badges = [
                await badgeHandlers.createInstance(
                  { size: 'small', type: 'primary', variant: 'filled', shape: 'dot' }
                ),
                await badgeHandlers.createInstance(
                  { size: 'small', type: 'primary', variant: 'filled', shape: 'text' },
                  { text: "3" }
                ),
                await badgeHandlers.createInstance(
                  { size: 'small', type: 'primary', variant: 'filled', shape: 'text' },
                  { text: "99+" }
                )
              ];

              badges.forEach(badge => container.appendChild(badge!));
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
async function setupBadgeLayout(badge: ComponentNode, size: typeof BADGE_SIZES[keyof typeof BADGE_SIZES]) {
  badge.layoutMode = "HORIZONTAL";
  badge.counterAxisAlignItems = "CENTER";
  badge.primaryAxisAlignItems = "CENTER";
  badge.paddingLeft = badge.paddingRight = size.padding;
  badge.cornerRadius = size.height / 2;
}

async function applyBadgeStyle(badge: ComponentNode, variant: BadgeVariant) {
  const styleKey = `${variant.type}-${variant.variant}-${variant.state}` as keyof typeof BADGE_STYLES;
  const style = BADGE_STYLES[styleKey];

  if (variant.variant === 'outlined') {
    badge.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    badge.strokes = [variables.bindVariable(style.border)];
    badge.strokeWeight = 1;
    badge.strokeAlign = 'INSIDE';
  } else {
    badge.fills = [variables.bindVariable(style.background)];
    badge.strokes = [];
  }

  if (variant.state === 'disabled') {
    badge.opacity = 0.5;
  }
}

async function addBadgeText(badge: ComponentNode, size: typeof BADGE_SIZES[keyof typeof BADGE_SIZES], variant: BadgeVariant) {
  const styleKey = `${variant.type}-${variant.variant}-${variant.state}` as keyof typeof BADGE_STYLES;
  const style = BADGE_STYLES[styleKey];

  const text = await createHandlers.text({
    text: "1",
    fontSize: size.fontSize,
    fills: [variables.bindVariable(style.text)],
    textAlignHorizontal: "CENTER"
  });

  badge.appendChild(text);
}

async function addBadgeDot(badge: ComponentNode, size: typeof BADGE_SIZES[keyof typeof BADGE_SIZES], variant: BadgeVariant) {
  const styleKey = `${variant.type}-${variant.variant}-${variant.state}` as keyof typeof BADGE_STYLES;
  const style = BADGE_STYLES[styleKey];

  const dot = figma.createEllipse();
  dot.resize(size.dotSize, size.dotSize);
  dot.fills = [variables.bindVariable(style.background)];

  badge.appendChild(dot);
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