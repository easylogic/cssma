import { TagVariantProps } from '../types/tag';
import { TAG_SIZES, TAG_STYLES, TAG_VARIANTS } from '../constants/tagStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private tagSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getTagSet(): ComponentSetNode | null {
    return this.tagSet;
  }

  setTagSet(set: ComponentSetNode): void {
    this.tagSet = set;
  }
}

export const tagHandlers = {
  createTag: async (variant: TagVariantProps) => {
    const size = TAG_SIZES[variant.size || 'medium'];
    const style = TAG_STYLES[variant.variant || 'filled'][variant.status || 'default'];
    const shape = variant.shape || 'rounded';
    const isInteractive = variant.interactive || variant.removable;
    const state = variant.disabled ? 'disabled' : 'default';

    // Create tag component
    const tag = figma.createComponent();
    tag.name = `size=${variant.size || 'medium'}, variant=${variant.variant || 'filled'}, status=${variant.status || 'default'}, shape=${shape}`;
    
    // Add ARIA attributes
    tag.setPluginData('role', variant.role || (isInteractive ? 'button' : 'status'));
    if (variant.ariaLabel) {
      tag.setPluginData('aria-label', variant.ariaLabel);
    }
    if (variant.disabled) {
      tag.setPluginData('aria-disabled', 'true');
    }

    // Set layout
    tag.layoutMode = "HORIZONTAL";
    variables.setBindVariable(tag, 'itemSpacing', size.spacing);
    variables.setBindVariable(tag, 'paddingLeft', size.paddingHorizontal);
    variables.setBindVariable(tag, 'paddingRight', size.paddingHorizontal);
    variables.setBindVariable(tag, 'paddingTop', size.paddingVertical);
    variables.setBindVariable(tag, 'paddingBottom', size.paddingVertical);
    variables.setBindVariable(tag, 'topLeftRadius', size.borderRadius[shape]);
    variables.setBindVariable(tag, 'topRightRadius', size.borderRadius[shape]);
    variables.setBindVariable(tag, 'bottomLeftRadius', size.borderRadius[shape]);
    variables.setBindVariable(tag, 'bottomRightRadius', size.borderRadius[shape]);
    variables.setBindVariable(tag, 'width', 1);
    variables.setBindVariable(tag, 'height', size.height);
    tag.primaryAxisSizingMode = "AUTO";
    tag.counterAxisSizingMode = "AUTO";

    // Set background and border
    tag.fills = [variables.bindVariable(style.background[state])];
    if (variant.variant !== 'ghost') {
      tag.strokes = [variables.bindVariable(style.border[state])];
      variables.setBindVariable(tag, 'strokeWeight', 'border/width/default');
    }

    // Add icon if needed
    if (variant.icon) {
      const icon = figma.createFrame();
      icon.name = "Icon";
      variables.setBindVariable(icon, 'width', size.iconSize);
      variables.setBindVariable(icon, 'height', size.iconSize);
      icon.fills = [variables.bindVariable(style.icon[state])];
      tag.appendChild(icon);
    }

    // Add label
    const label = await createHandlers.text({
      text: variant.label || 'Tag',
      fontSize: 10,
      fills: [variables.bindVariable(style.text[state])]
    });
    variables.setBindVariable(label, 'fontSize', size.fontSize);
    label.name = "label";
    tag.appendChild(label);

    // Add remove button if needed
    if (variant.removable && !variant.disabled) {
      const removeButton = figma.createFrame();
      removeButton.name = "RemoveButton";
      variables.setBindVariable(removeButton, 'width', size.iconSize);
      variables.setBindVariable(removeButton, 'height', size.iconSize);
      removeButton.fills = [variables.bindVariable(style.icon[state])];
      removeButton.setPluginData('role', 'button');
      removeButton.setPluginData('aria-label', 'Remove tag');
      tag.appendChild(removeButton);
    }

    return tag;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getTagSet()) return cache.getTagSet();

    const components: ComponentNode[] = [];
    
    for (const variant of TAG_VARIANTS) {
      const component = await tagHandlers.createTag(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Tag";

    // Add component properties
    console.log('label', 'TEXT', 'The label text');
    componentSet.addComponentProperty('label', 'TEXT', 'The label text');
    console.log('icon', 'TEXT', 'The icon name');
    componentSet.addComponentProperty('icon', 'TEXT', 'The icon name');
    console.log('removable', 'BOOLEAN', false);
    componentSet.addComponentProperty('removable', 'BOOLEAN', false);
    console.log('interactive', 'BOOLEAN', false);
    componentSet.addComponentProperty('interactive', 'BOOLEAN', false);
    console.log('disabled', 'BOOLEAN', false);
    componentSet.addComponentProperty('disabled', 'BOOLEAN', false);

    setupComponentSetLayout(componentSet);

    cache.setTagSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: TagVariantProps, props: { label?: string } = {}) => {
    const component = ComponentCache.getInstance().getTagSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      variant: variant.variant || 'filled',
      status: variant.status || 'default',
      shape: variant.shape || 'rounded',
      label: props.label || variant.label || 'Tag',
      icon: variant.icon || '',
      removable: variant.removable ?? false,
      interactive: variant.interactive ?? false,
      disabled: variant.disabled ?? false
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Tag",
      description: "Tags help users categorize, organize and find content quickly.",
      anatomy: {
        parts: [
          { name: "Container", description: "The main container that holds the tag content" },
          { name: "Icon", description: "Optional icon to provide visual context" },
          { name: "Label", description: "Text content of the tag" },
          { name: "Remove", description: "Optional button to remove the tag" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the tag",
          options: ["small", "medium", "large"]
        },
        {
          name: "variant",
          type: "enum",
          default: "filled",
          description: "The visual style of the tag",
          options: ["filled", "outlined", "ghost"]
        },
        {
          name: "status",
          type: "enum",
          default: "default",
          description: "The status of the tag",
          options: ["default", "info", "success", "warning", "error"]
        },
        {
          name: "shape",
          type: "enum",
          default: "rounded",
          description: "The shape of the tag",
          options: ["rounded", "circular"]
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
        },
        {
          name: "removable",
          type: "boolean",
          default: "false",
          description: "Whether the tag can be removed"
        },
        {
          name: "interactive",
          type: "boolean",
          default: "false",
          description: "Whether the tag is interactive"
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Whether the tag is disabled"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of tags.",
          examples: [
            await tagHandlers.createInstance(
              { size: 'small' },
              { label: "Small tag" }
            ),
            await tagHandlers.createInstance(
              { size: 'medium' },
              { label: "Medium tag" }
            ),
            await tagHandlers.createInstance(
              { size: 'large' },
              { label: "Large tag" }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different visual styles of tags.",
          examples: [
            await tagHandlers.createInstance(
              { variant: 'filled' },
              { label: "Filled tag" }
            ),
            await tagHandlers.createInstance(
              { variant: 'outlined' },
              { label: "Outlined tag" }
            ),
            await tagHandlers.createInstance(
              { variant: 'ghost' },
              { label: "Ghost tag" }
            )
          ]
        },
        {
          title: "Statuses",
          description: "Different status styles of tags.",
          examples: [
            await tagHandlers.createInstance(
              { status: 'info' },
              { label: "Info" }
            ),
            await tagHandlers.createInstance(
              { status: 'success' },
              { label: "Success" }
            ),
            await tagHandlers.createInstance(
              { status: 'warning' },
              { label: "Warning" }
            ),
            await tagHandlers.createInstance(
              { status: 'error' },
              { label: "Error" }
            )
          ]
        },
        {
          title: "Shapes",
          description: "Different shapes of tags.",
          examples: [
            await tagHandlers.createInstance(
              { shape: 'rounded' },
              { label: "Rounded" }
            ),
            await tagHandlers.createInstance(
              { shape: 'circular' },
              { label: "Circular" }
            )
          ]
        },
        {
          title: "With Icons",
          description: "Tags with different icons.",
          examples: [
            await tagHandlers.createInstance(
              { icon: 'info', status: 'info' },
              { label: "Information" }
            ),
            await tagHandlers.createInstance(
              { icon: 'check', status: 'success' },
              { label: "Completed" }
            ),
            await tagHandlers.createInstance(
              { icon: 'warning', status: 'warning' },
              { label: "Warning" }
            ),
            await tagHandlers.createInstance(
              { icon: 'error', status: 'error' },
              { label: "Error" }
            )
          ]
        }
      ],
      usage: {
        description: "Use tags to categorize content, show status, or create interactive elements.",
        examples: [
          {
            title: "Category Tags",
            description: "Using tags to categorize content.",
            component: await (async () => {
              const container = figma.createComponent();
              container.name = "Category Tags Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 8;
              container.fills = [];
              container.resize(400, 40);
              container.primaryAxisAlignItems = "CENTER";
              container.counterAxisAlignItems = "CENTER";

              const tags = [
                await tagHandlers.createInstance(
                  { variant: 'filled', status: 'info', icon: 'tag' },
                  { label: "Design" }
                ),
                await tagHandlers.createInstance(
                  { variant: 'filled', status: 'success', icon: 'code' },
                  { label: "Development" }
                ),
                await tagHandlers.createInstance(
                  { variant: 'filled', status: 'warning', icon: 'brush' },
                  { label: "UI/UX" }
                )
              ];

              tags.forEach(tag => tag && container.appendChild(tag));
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
  componentSet.fills = [variables.bindVariable('surface/color/default')];
} 