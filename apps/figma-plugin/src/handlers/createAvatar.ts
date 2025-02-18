import { AvatarVariantProps } from '../types/avatar';
import { AVATAR_SIZES, AVATAR_STYLES, AVATAR_VARIANTS } from '../constants/avatarStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private avatarSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getAvatarSet(): ComponentSetNode | null {
    return this.avatarSet;
  }

  setAvatarSet(set: ComponentSetNode): void {
    this.avatarSet = set;
  }
}

export const avatarHandlers = {
  createAvatar: async (variant: AvatarVariantProps) => {
    const size = AVATAR_SIZES[variant.size || 'medium'];

    // Create avatar component
    const avatar = figma.createComponent();
    avatar.name = `size=${variant.size || 'medium'}, variant=${variant.variant || 'circle'}, hasImage=${variant.hasImage}, status=${variant.status || 'none'}`;
    
    // Add ARIA attributes
    avatar.setPluginData('role', variant.role || 'img');
    if (variant.ariaLabel) {
      avatar.setPluginData('aria-label', variant.ariaLabel);
    }

    // Set layout
    avatar.resize(size.size, size.size);
    avatar.cornerRadius = variant.variant === 'square' ? size.borderRadius / 2 : size.borderRadius;
    avatar.clipsContent = true;

    // Set background
    avatar.fills = [variables.bindVariable(variant.hasImage ? AVATAR_STYLES.background.default : AVATAR_STYLES.background.placeholder)];
    avatar.strokes = [variables.bindVariable(AVATAR_STYLES.border.default)];
    avatar.strokeWeight = 1;

    // Add placeholder or initials if no image
    if (!variant.hasImage) {
      const initials = await createHandlers.text({
        text: variant.initials || 'UI',
        fontSize: size.fontSize,
        fills: [variables.bindVariable(AVATAR_STYLES.text.default)],
        textAutoResize: "NONE",
      });
      initials.name = "initials";
      initials.textAlignHorizontal = "CENTER";
      initials.textAlignVertical = "CENTER";
      initials.resize(size.size, size.size);
      avatar.appendChild(initials);
    }

    // Add status indicator if needed
    if (variant.status) {
      const statusStyle = AVATAR_STYLES.status[variant.status];
      const statusContainer = figma.createFrame();
      statusContainer.name = "Status";
      statusContainer.resize(size.statusSize, size.statusSize);
      statusContainer.x = size.size - size.statusSize - size.statusOffset;
      statusContainer.y = size.size - size.statusSize - size.statusOffset;
      statusContainer.cornerRadius = size.statusSize / 2;
      statusContainer.fills = [variables.bindVariable(statusStyle.background)];
      statusContainer.strokes = [variables.bindVariable(statusStyle.border)];
      statusContainer.strokeWeight = 1.5;
      statusContainer.setPluginData('role', 'status');
      statusContainer.setPluginData('aria-label', `Status: ${variant.status}`);

      avatar.appendChild(statusContainer);
    }

    return avatar;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getAvatarSet()) return cache.getAvatarSet();

    const components: ComponentNode[] = [];
    
    for (const variant of AVATAR_VARIANTS) {
      const component = await avatarHandlers.createAvatar(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Avatar";

    // Add component properties
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the avatar');
    componentSet.addComponentProperty('variant', 'VARIANT', 'The shape of the avatar (circle or square)');
    componentSet.addComponentProperty('hasImage', 'BOOLEAN', 'Whether the avatar has an image');
    componentSet.addComponentProperty('status', 'VARIANT', 'The status indicator (online, offline, away, busy)');
    componentSet.addComponentProperty('initials', 'TEXT', 'The initials to show when no image is present');

    setupComponentSetLayout(componentSet);

    cache.setAvatarSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: AvatarVariantProps, props: { initials?: string } = {}) => {
    const component = ComponentCache.getInstance().getAvatarSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      variant: variant.variant || 'circle',
      hasImage: variant.hasImage ?? false,
      status: variant.status || 'none',
    });

    if (props.initials && !variant.hasImage) {
      const initials = component.findOne(node => node.name === "initials") as TextNode;
      if (initials) initials.characters = props.initials;
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Avatar",
      description: "Avatars represent users or entities with images or initials.",
      anatomy: {
        parts: [
          { name: "Container", description: "The main container that holds the avatar content" },
          { name: "Image", description: "Optional user image or profile picture" },
          { name: "Initials", description: "Fallback text shown when no image is available" },
          { name: "Status", description: "Optional indicator showing the user's status" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the avatar",
          options: ["xsmall", "small", "medium", "large", "xlarge"]
        },
        {
          name: "variant",
          type: "enum",
          default: "circle",
          description: "The shape of the avatar",
          options: ["circle", "square"]
        },
        {
          name: "hasImage",
          type: "boolean",
          default: "false",
          description: "Whether the avatar has an image"
        },
        {
          name: "status",
          type: "enum",
          default: "none",
          description: "The status indicator",
          options: ["none", "online", "offline", "away", "busy"]
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of avatars.",
          examples: [
            await avatarHandlers.createInstance(
              { size: 'xsmall', hasImage: false },
              { initials: "XS" }
            ),
            await avatarHandlers.createInstance(
              { size: 'small', hasImage: false },
              { initials: "SM" }
            ),
            await avatarHandlers.createInstance(
              { size: 'medium', hasImage: false },
              { initials: "MD" }
            ),
            await avatarHandlers.createInstance(
              { size: 'large', hasImage: false },
              { initials: "LG" }
            ),
            await avatarHandlers.createInstance(
              { size: 'xlarge', hasImage: false },
              { initials: "XL" }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different shapes of avatars.",
          examples: [
            await avatarHandlers.createInstance(
              { variant: 'circle', hasImage: false },
              { initials: "CI" }
            ),
            await avatarHandlers.createInstance(
              { variant: 'square', hasImage: false },
              { initials: "SQ" }
            )
          ]
        },
        {
          title: "Status",
          description: "Avatars with different status indicators.",
          examples: [
            await avatarHandlers.createInstance(
              { status: 'online', hasImage: false },
              { initials: "ON" }
            ),
            await avatarHandlers.createInstance(
              { status: 'offline', hasImage: false },
              { initials: "OF" }
            ),
            await avatarHandlers.createInstance(
              { status: 'away', hasImage: false },
              { initials: "AW" }
            ),
            await avatarHandlers.createInstance(
              { status: 'busy', hasImage: false },
              { initials: "BS" }
            )
          ]
        }
      ],
      usage: {
        description: "Use avatars to represent users in user interfaces.",
        examples: [
          {
            title: "User List",
            description: "Avatars in a user list with different statuses.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "User List Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];

              const avatars = [
                await avatarHandlers.createInstance(
                  { status: 'online', hasImage: false },
                  { initials: "JD" }
                ),
                await avatarHandlers.createInstance(
                  { status: 'busy', hasImage: false },
                  { initials: "AS" }
                ),
                await avatarHandlers.createInstance(
                  { status: 'away', hasImage: false },
                  { initials: "RK" }
                ),
                await avatarHandlers.createInstance(
                  { status: 'offline', hasImage: false },
                  { initials: "MT" }
                )
              ];

              avatars.forEach(avatar => container.appendChild(avatar!));
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