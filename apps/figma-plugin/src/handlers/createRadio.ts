import { RadioVariant } from '../types/radio';
import { RADIO_SIZES, RADIO_STYLES, RADIO_VARIANTS } from '../constants/radioStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private radioSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getRadioSet(): ComponentSetNode | null {
    return this.radioSet;
  }

  setRadioSet(set: ComponentSetNode): void {
    this.radioSet = set;
  }
}

export const radioHandlers = {
  createRadio: async (variant: RadioVariant) => {
    const size = RADIO_SIZES[variant.size || 'medium'];
    const state = variant.state || 'default';

    const radio = figma.createComponent();
    radio.name = `size=${variant.size || 'medium'}, state=${state}, checked=${variant.checked}`;
    
    await setupRadioLayout(radio, size);
    await addRadioCircle(radio, size, variant);
    await addRadioLabel(radio, size, variant);

    return radio;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getRadioSet()) return cache.getRadioSet();

    const components: ComponentNode[] = [];
    
    for (const variant of RADIO_VARIANTS) {
      const component = await radioHandlers.createRadio(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Radio";

    // Add component properties
    componentSet.addComponentProperty('label', 'TEXT', 'Radio label');
    componentSet.addComponentProperty('state', 'VARIANT', 'default');
    componentSet.addComponentProperty('size', 'VARIANT', 'medium');
    componentSet.addComponentProperty('checked', 'BOOLEAN', false);

    setupComponentSetLayout(componentSet);

    cache.setRadioSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: RadioVariant, props: { label?: string } = {}) => {
    const component = ComponentCache.getInstance().getRadioSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      state: variant.state || 'default',
      checked: variant.checked || false
    });

    if (props.label) {
      const label = component.findOne(node => node.name === "label") as TextNode;
      if (label) label.characters = props.label;
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Radio",
      description: "Radio buttons allow users to select a single option from a list of choices.",
      anatomy: {
        parts: [
          { name: "Circle", description: "The interactive circle that shows the selected state" },
          { name: "Dot", description: "The inner circle that appears when selected" },
          { name: "Label", description: "The text that describes the radio option" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the radio button",
          options: ["small", "medium"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the radio button",
          options: ["default", "hover", "pressed", "disabled"]
        },
        {
          name: "checked",
          type: "boolean",
          default: "false",
          description: "Whether the radio button is selected"
        }
      ],
      variants: [
        {
          title: "States",
          description: "Different states of the radio button.",
          examples: [
            await radioHandlers.createInstance(
              { state: 'default' },
              { label: "Default" }
            ),
            await radioHandlers.createInstance(
              { state: 'hover' },
              { label: "Hover" }
            ),
            await radioHandlers.createInstance(
              { state: 'pressed' },
              { label: "Pressed" }
            ),
            await radioHandlers.createInstance(
              { state: 'disabled' },
              { label: "Disabled" }
            )
          ]
        },
        {
          title: "Selected States",
          description: "Selected state variations.",
          examples: [
            await radioHandlers.createInstance(
              { checked: true },
              { label: "Selected" }
            ),
            await radioHandlers.createInstance(
              { checked: true, state: 'disabled' },
              { label: "Selected Disabled" }
            )
          ]
        }
      ],
      usage: {
        description: "Use radio buttons when users need to select exactly one option from a list of mutually exclusive choices.",
        examples: [
          {
            title: "Option Group",
            description: "Use radio buttons for mutually exclusive options.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Option Group Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 12;
              container.fills = [];

              const radios = [
                await radioHandlers.createInstance(
                  { checked: true },
                  { label: "Option 1" }
                ),
                await radioHandlers.createInstance(
                  { checked: false },
                  { label: "Option 2" }
                ),
                await radioHandlers.createInstance(
                  { checked: false },
                  { label: "Option 3" }
                )
              ];

              radios.forEach(radio => container.appendChild(radio!));
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
async function setupRadioLayout(radio: ComponentNode, size: typeof RADIO_SIZES[keyof typeof RADIO_SIZES]) {
  radio.layoutMode = "HORIZONTAL";
  radio.itemSpacing = size.spacing;
  radio.counterAxisAlignItems = "CENTER";
}

async function addRadioCircle(radio: ComponentNode, size: typeof RADIO_SIZES[keyof typeof RADIO_SIZES], variant: RadioVariant) {
  const style = RADIO_STYLES[variant.state || 'default'];

  const circle = figma.createFrame();
  circle.name = "circle";
  circle.resize(size.size, size.size);
  circle.fills = [variables.bindVariable(style.circle.background)];
  circle.strokes = [variables.bindVariable(style.circle.border)];
  circle.strokeWeight = 1;
  circle.cornerRadius = size.size / 2; // Make it circular

  if (variant.checked) {
    const dot = figma.createFrame();
    dot.name = "dot";
    dot.resize(size.dotSize, size.dotSize);
    dot.x = (size.size - size.dotSize) / 2;
    dot.y = (size.size - size.dotSize) / 2;
    dot.fills = [variables.bindVariable(style.circle.dot)];
    dot.cornerRadius = size.dotSize / 2; // Make it circular

    circle.appendChild(dot);
  }

  radio.appendChild(circle);
}

async function addRadioLabel(radio: ComponentNode, size: typeof RADIO_SIZES[keyof typeof RADIO_SIZES], variant: RadioVariant) {
  const style = RADIO_STYLES[variant.state || 'default'];

  const label = await createHandlers.text({
    text: "Radio label",
    fontSize: size.fontSize,
    fills: [variables.bindVariable(style.text)]
  });
  label.name = "label";

  radio.appendChild(label);
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