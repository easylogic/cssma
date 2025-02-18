import { InputVariant } from '../types/input';
import { INPUT_SIZES, INPUT_STYLES, INPUT_VARIANTS } from '../constants/inputStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private inputSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getInputSet(): ComponentSetNode | null {
    return this.inputSet;
  }

  setInputSet(set: ComponentSetNode): void {
    this.inputSet = set;
  }
}

export const inputHandlers = {
  createInput: async (variant: InputVariant) => {
    const size = INPUT_SIZES[variant.size || 'medium'];
    const state = variant.state || 'default';

    const input = figma.createComponent();
    input.name = `size=${variant.size || 'medium'}, state=${state}, hasIcon=${variant.hasIcon}, hasHelper=${variant.hasHelper}`;
    
    await setupInputLayout(input, size, variant);
    await addInputField(input, size, variant);
    if (variant.hasHelper) {
      await addHelperText(input, size, variant);
    }

    return input;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getInputSet()) return cache.getInputSet();

    const components: ComponentNode[] = [];
    
    for (const variant of INPUT_VARIANTS) {
      const component = await inputHandlers.createInput(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Input";

    // Add component properties
    componentSet.addComponentProperty('placeholder', 'TEXT', 'Enter text');
    componentSet.addComponentProperty('helper', 'TEXT', 'Helper text');
    componentSet.addComponentProperty('state', 'VARIANT', 'default');
    componentSet.addComponentProperty('hasIcon', 'BOOLEAN', false);

    setupComponentSetLayout(componentSet);

    cache.setInputSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: InputVariant, props: { 
    placeholder?: string;
    helper?: string;
    icon?: string;
  } = {}) => {
    const component = ComponentCache.getInstance().getInputSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      state: variant.state || 'default',
      hasIcon: variant.hasIcon || false,
      hasHelper: variant.hasHelper || false
    });

    if (props.placeholder) {
      const placeholder = component.findOne(node => node.name === "placeholder") as TextNode;
      if (placeholder) placeholder.characters = props.placeholder;
    }

    if (props.helper && variant.hasHelper) {
      const helper = component.findOne(node => node.name === "helper") as TextNode;
      if (helper) helper.characters = props.helper;
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Input",
      description: "Input fields allow users to enter and edit text.",
      anatomy: {
        parts: [
          { name: "Container", description: "The wrapper that holds the input field" },
          { name: "Field", description: "The text input area" },
          { name: "Placeholder", description: "Hint text that appears when the field is empty" },
          { name: "Helper Text", description: "Additional information or error message below the field" },
          { name: "Icon", description: "Optional icon for additional context" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the input field",
          options: ["small", "medium"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the input field",
          options: ["default", "hover", "focused", "disabled", "error"]
        },
        {
          name: "hasIcon",
          type: "boolean",
          default: false,
          description: "Whether the input has an icon"
        },
        {
          name: "hasHelper",
          type: "boolean",
          default: false,
          description: "Whether the input has helper text"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Input fields come in two sizes.",
          examples: [
            await inputHandlers.createInstance(
              { size: 'small' },
              { placeholder: "Small input" }
            ),
            await inputHandlers.createInstance(
              { size: 'medium' },
              { placeholder: "Medium input" }
            )
          ]
        },
        {
          title: "States",
          description: "Different states for various interactions.",
          examples: [
            await inputHandlers.createInstance(
              { state: 'default' },
              { placeholder: "Default" }
            ),
            await inputHandlers.createInstance(
              { state: 'hover' },
              { placeholder: "Hover" }
            ),
            await inputHandlers.createInstance(
              { state: 'focused' },
              { placeholder: "Focused" }
            ),
            await inputHandlers.createInstance(
              { state: 'disabled' },
              { placeholder: "Disabled" }
            ),
            await inputHandlers.createInstance(
              { state: 'error', hasHelper: true },
              { placeholder: "Error", helper: "This field is required" }
            )
          ]
        }
      ],
      usage: {
        description: "Use input fields to collect user data or allow users to search.",
        examples: [
          {
            title: "Form Fields",
            description: "Basic form input with placeholder and helper text.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Form Fields Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 24;
              container.fills = [];

              const inputs = [
                await inputHandlers.createInstance(
                  { state: 'default' },
                  { placeholder: "Enter your name" }
                ),
                await inputHandlers.createInstance(
                  { state: 'default', hasHelper: true },
                  { 
                    placeholder: "Enter your email",
                    helper: "We'll never share your email"
                  }
                ),
                await inputHandlers.createInstance(
                  { state: 'error', hasHelper: true },
                  { 
                    placeholder: "Enter password",
                    helper: "Password must be at least 8 characters"
                  }
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
async function setupInputLayout(input: ComponentNode, size: typeof INPUT_SIZES[keyof typeof INPUT_SIZES], variant: InputVariant) {
  input.layoutMode = "VERTICAL";
  input.itemSpacing = 4;
  input.counterAxisSizingMode = "FIXED";
  
  const totalHeight = variant.hasHelper ? 
    size.height + size.helperTextSize + 8 : // 8은 spacing
    size.height;
  
  input.resize(320, totalHeight);
}

async function addInputField(input: ComponentNode, size: typeof INPUT_SIZES[keyof typeof INPUT_SIZES], variant: InputVariant) {
  const style = INPUT_STYLES[variant.state || 'default'];

  const field = figma.createFrame();
  field.name = "field";
  field.layoutMode = "HORIZONTAL";
  field.counterAxisAlignItems = "CENTER";
  field.itemSpacing = 8;
  field.paddingLeft = field.paddingRight = size.padding;
  field.resize(320, size.height);
  field.fills = [variables.bindVariable(style.background)];
  field.strokes = [variables.bindVariable(style.border)];
  field.strokeWeight = 1;
  field.cornerRadius = 6;

  const placeholder = await createHandlers.text({
    text: "Enter text",
    fontSize: size.fontSize,
    fills: [variables.bindVariable(style.placeholder)]
  });
  placeholder.name = "placeholder";
  placeholder.layoutAlign = "STRETCH";

  if (variant.hasIcon) {
    const icon = figma.createFrame();
    icon.name = "icon";
    icon.resize(size.iconSize, size.iconSize);
    icon.fills = [variables.bindVariable(style.placeholder)];
    
    if (variant.iconPosition === 'right') {
      field.appendChild(placeholder);
      field.appendChild(icon);
    } else {
      field.appendChild(icon);
      field.appendChild(placeholder);
    }
  } else {
    field.appendChild(placeholder);
  }

  if (variant.state !== 'disabled') {
    const hoverStyle = INPUT_STYLES['hover'];
    field.reactions = [{
      trigger: { type: "HOVER" },
      action: {
        type: "NODE",
        transition: { type: "SMART_ANIMATE" },
        fills: [variables.bindVariable(hoverStyle.background)],
        strokes: [variables.bindVariable(hoverStyle.border)]
      }
    }];
  }

  input.appendChild(field);
}

async function addHelperText(input: ComponentNode, size: typeof INPUT_SIZES[keyof typeof INPUT_SIZES], variant: InputVariant) {
  const style = INPUT_STYLES[variant.state || 'default'];

  const helper = await createHandlers.text({
    text: variant.state === 'error' ? "Error message" : "Helper text",
    fontSize: size.helperTextSize,
    fills: [variables.bindVariable(style.helper)]
  });
  helper.name = "helper";

  input.appendChild(helper);
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