import { AvatarVariantProps, AvatarGroupProps, AvatarComponent, AvatarInstance, AvatarGroupComponent, AvatarExampleContainer, AvatarState } from '../types/avatar';
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
  createAvatar: async (variant: AvatarVariantProps): Promise<AvatarComponent> => {
    const size = AVATAR_SIZES[variant.size || 'medium'];
    const style = AVATAR_STYLES['default'];
    const state = variant.state || 'default';

    // Create avatar component
    const avatar = figma.createComponent() as AvatarComponent;
    avatar.name = `size=${variant.size || 'medium'}, type=${variant.type || 'image'}, state=${state}, shape=${variant.shape || 'circle'}`;
    
    // Setup layout
    await setupAvatarLayout(avatar, size, variant);

    // Apply style
    await applyAvatarStyle(avatar, size, style, state, variant);

    // Add content
    await addAvatarContent(avatar, size, style, state, variant);

    return avatar;
  },

  createAvatarGroup: async (avatars: AvatarVariantProps[], groupProps: AvatarGroupProps = {}): Promise<ComponentNode> => {
    const container = figma.createComponent();
    container.name = "Avatar Group";
    container.layoutMode = "HORIZONTAL";
    container.itemSpacing = -(groupProps.spacing || 4);
    container.fills = [];

    const maxAvatars = groupProps.max || avatars.length;
    const direction = groupProps.direction || 'left';
    const displayedAvatars = avatars.slice(0, maxAvatars);
    const remainingCount = avatars.length - maxAvatars;

    if (direction === 'right') {
      displayedAvatars.reverse();
    }

    // Create displayed avatars
    for (const avatarProps of displayedAvatars) {
      const avatar = await avatarHandlers.createAvatar(avatarProps);
      container.appendChild(avatar);
    }

    // Add count badge if there are more avatars
    if (remainingCount > 0) {
      const countAvatar = await avatarHandlers.createAvatar({
        size: displayedAvatars[0].size || 'medium',
        type: 'initial',
        shape: 'circle',
        initials: `+${remainingCount}`,
        badge: { status: 'online' }
      });
      container.appendChild(countAvatar);
    }

    return container;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getAvatarSet()) return cache.getAvatarSet();

    const components = await createAvatarVariants();
    const componentSet = await combineAvatarVariants(components);

    cache.setAvatarSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: AvatarVariantProps): Promise<InstanceNode | null> => {
    const component = ComponentCache.getInstance().getAvatarSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      type: variant.type || 'image',
      state: variant.state || 'default',
      shape: variant.shape || 'circle'
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Avatar",
      description: "Avatars are used to represent people or entities. They can display images, icons, or initials.",
      anatomy: {
        parts: [
          { name: "Container", description: "The main wrapper that holds the avatar content" },
          { name: "Image", description: "Optional image to represent the entity" },
          { name: "Initial", description: "Text fallback when image is not available" },
          { name: "Icon", description: "Icon fallback when image is not available" },
          { name: "Badge", description: "Optional badge to show status or count" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the avatar",
          options: ["small", "medium", "large"]
        },
        {
          name: "type",
          type: "enum",
          default: "image",
          description: "The type of content to display",
          options: ["image", "initial", "icon"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the avatar",
          options: ["default", "error"]
        },
        {
          name: "shape",
          type: "enum",
          default: "circle",
          description: "The shape of the avatar",
          options: ["circle", "square"]
        },
        {
          name: "badge",
          type: "boolean",
          default: "false",
          description: "Whether to show a badge"
        },
        {
          name: "badgeContent",
          type: "string",
          description: "Content to show in the badge"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of avatars.",
          examples: [
            await avatarHandlers.createInstance({ size: 'small', type: 'image' }),
            await avatarHandlers.createInstance({ size: 'medium', type: 'image' }),
            await avatarHandlers.createInstance({ size: 'large', type: 'image' })
          ]
        },
        {
          title: "Types",
          description: "Different types of avatar content.",
          examples: [
            await avatarHandlers.createInstance({ type: 'image' }),
            await avatarHandlers.createInstance({ type: 'initial', initial: 'JD' }),
            await avatarHandlers.createInstance({ type: 'icon', icon: 'user' })
          ]
        },
        {
          title: "Shapes",
          description: "Different shapes of avatars.",
          examples: [
            await avatarHandlers.createInstance({ shape: 'circle' }),
            await avatarHandlers.createInstance({ shape: 'square' })
          ]
        },
        {
          title: "States",
          description: "Different states of avatars.",
          examples: [
            await avatarHandlers.createInstance({ state: 'default' }),
            await avatarHandlers.createInstance({ state: 'error' })
          ]
        },
        {
          title: "With Badge",
          description: "Avatars with badges.",
          examples: [
            await avatarHandlers.createInstance({ badge: true }),
            await avatarHandlers.createInstance({ badge: true, badgeContent: '3' })
          ]
        },
      ],
      usage: {
        description: "Use avatars to represent users or entities in your interface.",
        examples: [
          {
            title: "User Profile",
            description: "Using avatar in a user profile.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "User Profile Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const avatar = await avatarHandlers.createInstance({
                size: 'large',
                type: 'image'
              });

              if (avatar) container.appendChild(avatar);

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
async function setupAvatarLayout(avatar: ComponentNode, size: typeof AVATAR_SIZES[keyof typeof AVATAR_SIZES], variant: AvatarVariantProps) {
  avatar.layoutMode = "HORIZONTAL";
  avatar.counterAxisAlignItems = "CENTER";
  avatar.primaryAxisAlignItems = "CENTER";
  avatar.clipsContent = true;

  // Set size
  variables.setBindVariable(avatar, 'width', size.size);
  variables.setBindVariable(avatar, 'height', size.size);

  // Set border radius based on shape
  const borderRadius = variant.shape === 'square' ? 0 : size.borderRadius;
  variables.setBindVariable(avatar, 'topLeftRadius', borderRadius);
  variables.setBindVariable(avatar, 'topRightRadius', borderRadius);
  variables.setBindVariable(avatar, 'bottomLeftRadius', borderRadius);
  variables.setBindVariable(avatar, 'bottomRightRadius', borderRadius);

  avatar.primaryAxisSizingMode = "FIXED";
  avatar.counterAxisSizingMode = "FIXED";
}

async function applyAvatarStyle(
  avatar: ComponentNode,
  size: typeof AVATAR_SIZES[keyof typeof AVATAR_SIZES],
  style: typeof AVATAR_STYLES[keyof typeof AVATAR_STYLES],
  state: AvatarState,
  variant: AvatarVariantProps
) {
  // Set background and border
  avatar.fills = [variables.bindVariable(style.background[state])];
  avatar.strokes = [variables.bindVariable(style.border[state])];
  variables.setBindVariable(avatar, 'strokeWeight', size.borderWidth);
  avatar.strokeAlign = 'INSIDE';
}

async function addAvatarContent(
  avatar: ComponentNode,
  size: typeof AVATAR_SIZES[keyof typeof AVATAR_SIZES],
  style: typeof AVATAR_STYLES[keyof typeof AVATAR_STYLES],
  state: AvatarState,
  variant: AvatarVariantProps
) {
  if (variant.type === 'image') {
    const placeholder = figma.createRectangle();
    placeholder.name = "Image";
    variables.setBindVariable(placeholder, 'width', size.size);
    variables.setBindVariable(placeholder, 'height', size.size);
    placeholder.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
    avatar.appendChild(placeholder);
  } else if (variant.type === 'initial') {
    const text = await createHandlers.text({
      text: variant.initials || 'JD',
      fills: [variables.bindVariable(style.text[state])],
      fontSize: parseInt(size.fontSize),
      textAlignHorizontal: "CENTER"
    });
    text.textAlignVertical = "CENTER";
    avatar.appendChild(text);
  } else if (variant.type === 'icon') {
    const icon = figma.createFrame();
    icon.name = "Icon";
    variables.setBindVariable(icon, 'width', size.fontSize);
    variables.setBindVariable(icon, 'height', size.fontSize);
    icon.fills = [variables.bindVariable(style.text[state])];
    avatar.appendChild(icon);
  }
}

async function createAvatarVariants(): Promise<ComponentNode[]> {
  const components: ComponentNode[] = [];
  
  for (const variant of AVATAR_VARIANTS) {
    const component = await avatarHandlers.createAvatar(variant);
    components.push(component);
  }
  
  return components;
}

async function combineAvatarVariants(components: ComponentNode[]): Promise<ComponentSetNode> {
  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = "Avatar";
  setupComponentSetLayout(componentSet);
  return componentSet;
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
  componentSet.fills = [variables.bindVariable('surface/color/white')];
} 