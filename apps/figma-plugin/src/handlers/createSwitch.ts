import { SwitchVariantProps } from '../types/switch';
import { SWITCH_SIZES, SWITCH_STYLES, SWITCH_VARIANTS } from '../constants/switchStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private switchSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getSwitchSet(): ComponentSetNode | null {
    return this.switchSet;
  }

  setSwitchSet(set: ComponentSetNode): void {
    this.switchSet = set;
  }
}

export const switchHandlers = {
  createSwitch: async (variant: SwitchVariantProps) => {
    const size = SWITCH_SIZES[variant.size || 'medium'];
    const style = SWITCH_STYLES[variant.status || 'default'];
    const state = variant.state || 'default';
    const checked = variant.checked || false;

    // Create switch component
    const switchComponent = figma.createComponent();
    switchComponent.name = `size=${variant.size || 'medium'}, state=${state}, status=${variant.status || 'default'}, checked=${checked}`;
    
    // Add ARIA attributes
    switchComponent.setPluginData('role', variant.role || 'switch');
    switchComponent.setPluginData('aria-checked', checked.toString());
    if (variant.ariaLabel) {
      switchComponent.setPluginData('aria-label', variant.ariaLabel);
    }
    if (variant.required) {
      switchComponent.setPluginData('aria-required', 'true');
    }
    if (variant.state === 'disabled') {
      switchComponent.setPluginData('aria-disabled', 'true');
    }

    // Create container
    const container = figma.createFrame();
    container.name = "Container";
    container.layoutMode = "HORIZONTAL";
    container.itemSpacing = size.spacing;
    container.fills = [];
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "AUTO";

    // Create label if needed
    if (variant.label) {
      const labelContainer = figma.createFrame();
      labelContainer.name = "LabelContainer";
      labelContainer.layoutMode = "VERTICAL";
      labelContainer.itemSpacing = size.labelSpacing;
      labelContainer.fills = [];
      labelContainer.layoutGrow = 1;

      const label = await createHandlers.text({
        text: variant.label,
        fontSize: size.fontSize,
        fills: [variables.bindVariable(style.text[state === 'disabled' ? 'disabled' : 'default'])]
      });
      label.name = "label";

      if (variant.required) {
        const requiredMark = await createHandlers.text({
          text: '*',
          fontSize: size.fontSize,
          fills: [variables.bindVariable('semantic/text/error')]
        });
        requiredMark.name = "requiredMark";
        labelContainer.appendChild(requiredMark);
      }

      labelContainer.appendChild(label);

      if (variant.description) {
        const description = await createHandlers.text({
          text: variant.description,
          fontSize: size.descriptionFontSize,
          fills: [variables.bindVariable(style.description[state === 'disabled' ? 'disabled' : 'default'])]
        });
        description.name = "description";
        labelContainer.appendChild(description);
      }

      if (variant.labelPosition === 'left') {
        container.appendChild(labelContainer);
      }
    }

    // Create switch track
    const track = figma.createFrame();
    track.name = "Track";
    track.resize(size.width, size.height);
    track.cornerRadius = size.height / 2;
    track.fills = [variables.bindVariable(style.track[checked ? 'checked' : 'unchecked'][state])];

    // Create thumb
    const thumb = figma.createFrame();
    thumb.name = "Thumb";
    thumb.resize(size.thumbSize, size.thumbSize);
    thumb.cornerRadius = size.thumbSize / 2;
    thumb.x = checked ? size.width - size.thumbSize - size.thumbOffset : size.thumbOffset;
    thumb.y = size.thumbOffset;
    thumb.fills = [variables.bindVariable(style.thumb[checked ? 'checked' : 'unchecked'][state])];

    // Add loading indicator if needed
    if (variant.loading) {
      const loadingIndicator = figma.createFrame();
      loadingIndicator.name = "LoadingIndicator";
      loadingIndicator.resize(size.thumbSize * 0.6, size.thumbSize * 0.6);
      loadingIndicator.x = (size.thumbSize - loadingIndicator.width) / 2;
      loadingIndicator.y = (size.thumbSize - loadingIndicator.height) / 2;
      loadingIndicator.fills = [variables.bindVariable(style.thumb[checked ? 'checked' : 'unchecked'][state])];
      thumb.appendChild(loadingIndicator);
    }

    track.appendChild(thumb);
    container.appendChild(track);

    // Add label after switch if position is right
    if (variant.label && variant.labelPosition !== 'left') {
      const labelContainer = figma.createFrame();
      labelContainer.name = "LabelContainer";
      labelContainer.layoutMode = "VERTICAL";
      labelContainer.itemSpacing = size.labelSpacing;
      labelContainer.fills = [];
      labelContainer.layoutGrow = 1;

      const label = await createHandlers.text({
        text: variant.label,
        fontSize: size.fontSize,
        fills: [variables.bindVariable(style.text[state === 'disabled' ? 'disabled' : 'default'])]
      });
      label.name = "label";

      if (variant.required) {
        const requiredMark = await createHandlers.text({
          text: '*',
          fontSize: size.fontSize,
          fills: [variables.bindVariable('semantic/text/error')]
        });
        requiredMark.name = "requiredMark";
        labelContainer.appendChild(requiredMark);
      }

      labelContainer.appendChild(label);

      if (variant.description) {
        const description = await createHandlers.text({
          text: variant.description,
          fontSize: size.descriptionFontSize,
          fills: [variables.bindVariable(style.description[state === 'disabled' ? 'disabled' : 'default'])]
        });
        description.name = "description";
        labelContainer.appendChild(description);
      }

      container.appendChild(labelContainer);
    }

    switchComponent.appendChild(container);
    return switchComponent;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getSwitchSet()) return cache.getSwitchSet();

    const components: ComponentNode[] = [];
    
    for (const variant of SWITCH_VARIANTS) {
      const component = await switchHandlers.createSwitch(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Switch";

    // Add component properties
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the switch');
    componentSet.addComponentProperty('state', 'VARIANT', 'The state of the switch');
    componentSet.addComponentProperty('status', 'VARIANT', 'The status of the switch');
    componentSet.addComponentProperty('checked', 'BOOLEAN', 'Whether the switch is checked');
    componentSet.addComponentProperty('label', 'TEXT', 'The label text');
    componentSet.addComponentProperty('labelPosition', 'VARIANT', 'The position of the label');
    componentSet.addComponentProperty('description', 'TEXT', 'The description text');
    componentSet.addComponentProperty('required', 'BOOLEAN', 'Whether the switch is required');
    componentSet.addComponentProperty('loading', 'BOOLEAN', 'Whether the switch is loading');

    setupComponentSetLayout(componentSet);

    cache.setSwitchSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: SwitchVariantProps, props: { 
    label?: string;
    description?: string;
  } = {}) => {
    const component = ComponentCache.getInstance().getSwitchSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      state: variant.state || 'default',
      status: variant.status || 'default',
      checked: variant.checked ?? false,
      label: props.label || variant.label || '',
      labelPosition: variant.labelPosition || 'right',
      description: props.description || variant.description || '',
      required: variant.required ?? false,
      loading: variant.loading ?? false
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Switch",
      description: "Switches toggle the state of a single setting on or off.",
      anatomy: {
        parts: [
          { name: "Track", description: "The background track that shows the switch state" },
          { name: "Thumb", description: "The movable thumb that indicates the current position" },
          { name: "Label", description: "Optional text label for the switch" },
          { name: "Description", description: "Optional description text" },
          { name: "Loading", description: "Optional loading indicator" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the switch",
          options: ["small", "medium", "large"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the switch",
          options: ["default", "hover", "pressed", "disabled"]
        },
        {
          name: "status",
          type: "enum",
          default: "default",
          description: "The status of the switch",
          options: ["default", "success", "error"]
        },
        {
          name: "checked",
          type: "boolean",
          default: "false",
          description: "Whether the switch is checked"
        },
        {
          name: "label",
          type: "string",
          description: "The label text"
        },
        {
          name: "labelPosition",
          type: "enum",
          default: "right",
          description: "The position of the label",
          options: ["left", "right"]
        },
        {
          name: "description",
          type: "string",
          description: "The description text"
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Whether the switch is required"
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Whether the switch is loading"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of switches.",
          examples: [
            await switchHandlers.createInstance(
              { size: 'small' },
              { label: "Small switch" }
            ),
            await switchHandlers.createInstance(
              { size: 'medium' },
              { label: "Medium switch" }
            ),
            await switchHandlers.createInstance(
              { size: 'large' },
              { label: "Large switch" }
            )
          ]
        },
        {
          title: "States",
          description: "Different states of switches.",
          examples: [
            await switchHandlers.createInstance(
              { state: 'default' },
              { label: "Default state" }
            ),
            await switchHandlers.createInstance(
              { state: 'hover' },
              { label: "Hover state" }
            ),
            await switchHandlers.createInstance(
              { state: 'pressed' },
              { label: "Pressed state" }
            ),
            await switchHandlers.createInstance(
              { state: 'disabled' },
              { label: "Disabled state" }
            )
          ]
        },
        {
          title: "Statuses",
          description: "Different status styles of switches.",
          examples: [
            await switchHandlers.createInstance(
              { status: 'default', checked: true },
              { label: "Default status" }
            ),
            await switchHandlers.createInstance(
              { status: 'success', checked: true },
              { label: "Success status" }
            ),
            await switchHandlers.createInstance(
              { status: 'error', checked: false },
              { label: "Error status" }
            )
          ]
        },
        {
          title: "Label Positions",
          description: "Different label positions.",
          examples: [
            await switchHandlers.createInstance(
              { labelPosition: 'right' },
              { label: "Label on right" }
            ),
            await switchHandlers.createInstance(
              { labelPosition: 'left' },
              { label: "Label on left" }
            )
          ]
        },
        {
          title: "With Description",
          description: "Switches with additional description text.",
          examples: [
            await switchHandlers.createInstance(
              { checked: false },
              { 
                label: "Feature switch",
                description: "Enable or disable this feature"
              }
            ),
            await switchHandlers.createInstance(
              { checked: true },
              { 
                label: "Feature switch",
                description: "Enable or disable this feature"
              }
            )
          ]
        }
      ],
      usage: {
        description: "Use switches to toggle features or settings on and off.",
        examples: [
          {
            title: "Settings Panel",
            description: "Using switches in a settings panel.",
            component: await (async () => {
              const container = figma.createComponent();
              container.name = "Settings Panel Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.resize(300, 1);
              container.primaryAxisSizingMode = "AUTO";
              container.counterAxisSizingMode = "FIXED";

              const switches = [
                await switchHandlers.createInstance(
                  { checked: true, status: 'success' },
                  { 
                    label: "Notifications",
                    description: "Receive notifications for important updates"
                  }
                ),
                await switchHandlers.createInstance(
                  { checked: false },
                  { 
                    label: "Dark mode",
                    description: "Use dark theme throughout the application"
                  }
                ),
                await switchHandlers.createInstance(
                  { checked: false, status: 'error' },
                  { 
                    label: "Beta features",
                    description: "Enable experimental features (not recommended)"
                  }
                )
              ];

              switches.forEach(switchInstance => switchInstance && container.appendChild(switchInstance));
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