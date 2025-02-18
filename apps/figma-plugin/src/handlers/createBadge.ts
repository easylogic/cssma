import { BadgeVariantProps } from '../types/badge';
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
  createBadge: async (variant: BadgeVariantProps) => {
    const size = BADGE_SIZES[(variant.size || 'medium') as keyof typeof BADGE_SIZES];
    const styleKey = `${variant.status || 'default'}-${variant.variant || 'filled'}` as keyof typeof BADGE_STYLES;
    const style = BADGE_STYLES[styleKey];

    // Create badge component
    const badge = figma.createComponent();
    const shape = variant.shape || 'rounded';
    badge.name = `size=${variant.size || 'medium'}, variant=${variant.variant || 'filled'}, status=${variant.status || 'default'}, shape=${shape}`;

    // Set layout
    badge.layoutMode = "HORIZONTAL";
    badge.counterAxisAlignItems = "CENTER";
    badge.primaryAxisAlignItems = "CENTER";

    // Set size
    variables.setBindVariable(badge, 'height', size.height);

    // Set padding
    variables.setBindVariable(badge, 'paddingLeft', size.paddingHorizontal);
    variables.setBindVariable(badge, 'paddingRight', size.paddingHorizontal);
    variables.setBindVariable(badge, 'paddingTop', size.paddingVertical);
    variables.setBindVariable(badge, 'paddingBottom', size.paddingVertical);
    variables.setBindVariable(badge, 'itemSpacing', size.spacing);

    // Set border radius based on shape
    const borderRadius = size.borderRadius[shape];
    
    variables.setBindVariable(badge, 'topLeftRadius', borderRadius);
    variables.setBindVariable(badge, 'topRightRadius', borderRadius);
    variables.setBindVariable(badge, 'bottomLeftRadius', borderRadius);
    variables.setBindVariable(badge, 'bottomRightRadius', borderRadius);

    // Set background and border
    badge.fills = [variables.bindVariable(style.background)];
    if (variant.variant === 'outlined') {
      badge.strokes = [variables.bindVariable(style.border)];
      variables.setBindVariable(badge, 'strokeWeight', 'border/width/default');
      badge.strokeAlign = 'INSIDE';
    }

    // Add icon if needed
    if (variant.icon) {
      const icon = figma.createFrame();
      icon.name = "Icon";
      variables.setBindVariable(icon, 'width', size.iconSize);
      variables.setBindVariable(icon, 'height', size.iconSize);
      icon.fills = [variables.bindVariable(style.text)];
      badge.appendChild(icon);
    }

    // Add label
    const text = await createHandlers.text({
      text: variant.label || 'Badge',
      fills: [variables.bindVariable(style.text)]
    });
    variables.setBindVariable(text, 'fontSize', size.fontSize);
    variables.setBindVariable(text, 'lineHeight', size.lineHeight);
    text.name = "label";
    badge.appendChild(text);

    badge.primaryAxisSizingMode = "AUTO";
    badge.counterAxisSizingMode = "AUTO";

    return badge;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getBadgeSet()) return cache.getBadgeSet();

    const components: ComponentNode[] = [];
    
    for (const variant of BADGE_VARIANTS) {
      const component = await badgeHandlers.createBadge(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Badge";
    setupComponentSetLayout(componentSet);

    cache.setBadgeSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: BadgeVariantProps, props: { label?: string } = {}) => {
    const component = ComponentCache.getInstance().getBadgeSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      variant: variant.variant || 'filled',
      status: variant.status || 'default',
      label: props.label || variant.label || 'Badge',
      icon: variant.icon || ''
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Badge",
      description: "Badges are used to highlight status, show counts, or emphasize small pieces of information.",
      anatomy: {
        parts: [
          { name: "Container", description: "The main wrapper that holds the badge content" },
          { name: "Icon", description: "Optional icon to provide visual context" },
          { name: "Label", description: "Text content of the badge" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the badge",
          options: ["small", "medium", "large"]
        },
        {
          name: "variant",
          type: "enum",
          default: "filled",
          description: "The visual style of the badge",
          options: ["filled", "outlined"]
        },
        {
          name: "status",
          type: "enum",
          default: "default",
          description: "The status of the badge",
          options: ["default", "info", "success", "warning", "error"]
        },
        {
          name: "label",
          type: "string",
          description: "The label text"
        },
        {
          name: "icon",
          type: "string",
          description: "The icon name"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of badges.",
          examples: [
            await badgeHandlers.createInstance(
              { size: 'small' },
              { label: "Small" }
            ),
            await badgeHandlers.createInstance(
              { size: 'medium' },
              { label: "Medium" }
            ),
            await badgeHandlers.createInstance(
              { size: 'large' },
              { label: "Large" }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different visual styles of badges.",
          examples: [
            await badgeHandlers.createInstance(
              { variant: 'filled' },
              { label: "Filled" }
            ),
            await badgeHandlers.createInstance(
              { variant: 'outlined' },
              { label: "Outlined" }
            )
          ]
        },
        {
          title: "Statuses",
          description: "Different status styles of badges.",
          examples: [
            await badgeHandlers.createInstance(
              { status: 'info' },
              { label: "Info" }
            ),
            await badgeHandlers.createInstance(
              { status: 'success' },
              { label: "Success" }
            ),
            await badgeHandlers.createInstance(
              { status: 'warning' },
              { label: "Warning" }
            ),
            await badgeHandlers.createInstance(
              { status: 'error' },
              { label: "Error" }
            )
          ]
        },
        {
          title: "With Icons",
          description: "Badges with different icons.",
          examples: [
            await badgeHandlers.createInstance(
              { status: 'info', icon: 'info' },
              { label: "Info" }
            ),
            await badgeHandlers.createInstance(
              { status: 'success', icon: 'check' },
              { label: "Success" }
            ),
            await badgeHandlers.createInstance(
              { status: 'warning', icon: 'warning' },
              { label: "Warning" }
            ),
            await badgeHandlers.createInstance(
              { status: 'error', icon: 'error' },
              { label: "Error" }
            )
          ]
        }
      ],
      usage: {
        description: "Use badges to highlight status, show counts, or emphasize small pieces of information.",
        examples: [
          {
            title: "Status Indicators",
            description: "Using badges to show status.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Status Indicators Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const badges = [
                await badgeHandlers.createInstance(
                  { variant: 'filled', status: 'success', icon: 'check' },
                  { label: "Active" }
                ),
                await badgeHandlers.createInstance(
                  { variant: 'filled', status: 'warning', icon: 'warning' },
                  { label: "Pending" }
                ),
                await badgeHandlers.createInstance(
                  { variant: 'filled', status: 'error', icon: 'error' },
                  { label: "Failed" }
                )
              ];

              badges.forEach(badge => badge && container.appendChild(badge));
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
  componentSet.resize(1200, componentSet.height);
  componentSet.primaryAxisSizingMode = "FIXED";
  componentSet.counterAxisSizingMode = "AUTO";
  componentSet.fills = [variables.bindVariable('surface/color/white')];
} 