import { CheckboxVariant } from '../types/checkbox';
import { CHECKBOX_SIZES, CHECKBOX_STYLES, CHECKBOX_VARIANTS } from '../constants/checkboxStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private checkboxSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getCheckboxSet(): ComponentSetNode | null {
    return this.checkboxSet;
  }

  setCheckboxSet(set: ComponentSetNode): void {
    this.checkboxSet = set;
  }
}

export const checkboxHandlers = {
  createCheckbox: async (variant: CheckboxVariant) => {
    const size = CHECKBOX_SIZES[variant.size || 'medium'];
    const state = variant.state || 'default';

    const checkbox = figma.createComponent();
    checkbox.name = `size=${variant.size || 'medium'}, state=${state}, checked=${variant.checked}, indeterminate=${variant.indeterminate}`;
    
    // Add ARIA role and attributes
    checkbox.setPluginData('role', 'checkbox');
    checkbox.setPluginData('aria-checked', variant.checked ? 'true' : (variant.indeterminate ? 'mixed' : 'false'));
    if (variant.state === 'disabled') {
      checkbox.setPluginData('aria-disabled', 'true');
    }
    
    await setupCheckboxLayout(checkbox, size);
    await addCheckboxBox(checkbox, size, variant);
    await addCheckboxLabel(checkbox, size, variant);

    // Add keyboard interaction hints
    checkbox.setPluginData('keyboardShortcut', 'Space');
    checkbox.setPluginData('tabIndex', '0');

    return checkbox;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getCheckboxSet()) return cache.getCheckboxSet();

    const components: ComponentNode[] = [];
    
    for (const variant of CHECKBOX_VARIANTS) {
      const component = await checkboxHandlers.createCheckbox(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Checkbox";

    // Add component properties with improved descriptions
    componentSet.addComponentProperty('label', 'TEXT', 'Label text for the checkbox');
    componentSet.addComponentProperty('state', 'VARIANT', 'Visual and interaction state');
    componentSet.addComponentProperty('size', 'VARIANT', 'Size variant of the checkbox');
    componentSet.addComponentProperty('checked', 'BOOLEAN', 'Whether the checkbox is checked');
    componentSet.addComponentProperty('indeterminate', 'BOOLEAN', 'Whether the checkbox is in an indeterminate state');

    setupComponentSetLayout(componentSet);

    cache.setCheckboxSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: CheckboxVariant, props: { label?: string } = {}) => {
    const component = ComponentCache.getInstance().getCheckboxSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      state: variant.state || 'default',
      checked: variant.checked || false,
      indeterminate: variant.indeterminate || false
    });

    if (props.label) {
      const label = component.findOne(node => node.name === "label") as TextNode;
      if (label) {
        label.characters = props.label;
        // Add ARIA label
        component.setPluginData('aria-label', props.label);
      }
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Checkbox",
      description: "Checkboxes allow users to select one or multiple items from a list of options.",
      anatomy: {
        parts: [
          { name: "Box", description: "The interactive square that shows the checked state" },
          { name: "Check", description: "The icon that appears when checked" },
          { name: "Label", description: "The text that describes the checkbox option" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the checkbox",
          options: ["small", "medium"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the checkbox",
          options: ["default", "hover", "pressed", "disabled"]
        },
        {
          name: "checked",
          type: "boolean",
          default: "false",
          description: "Whether the checkbox is checked"
        },
        {
          name: "indeterminate",
          type: "boolean",
          default: "false",
          description: "Whether the checkbox is in an indeterminate state"
        }
      ],
      variants: [
        {
          title: "States",
          description: "Different states of the checkbox.",
          examples: [
            await checkboxHandlers.createInstance(
              { state: 'default' },
              { label: "Default" }
            ),
            await checkboxHandlers.createInstance(
              { state: 'hover' },
              { label: "Hover" }
            ),
            await checkboxHandlers.createInstance(
              { state: 'pressed' },
              { label: "Pressed" }
            ),
            await checkboxHandlers.createInstance(
              { state: 'disabled' },
              { label: "Disabled" }
            )
          ]
        },
        {
          title: "Checked States",
          description: "Checked state variations.",
          examples: [
            await checkboxHandlers.createInstance(
              { checked: true },
              { label: "Checked" }
            ),
            await checkboxHandlers.createInstance(
              { checked: true, state: 'disabled' },
              { label: "Checked Disabled" }
            ),
            await checkboxHandlers.createInstance(
              { indeterminate: true },
              { label: "Indeterminate" }
            )
          ]
        }
      ],
      usage: {
        description: "Use checkboxes when users need to select multiple items from a list or toggle a single option on/off.",
        examples: [
          {
            title: "Form Options",
            description: "Use checkboxes in forms for multiple selections.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Form Options Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 12;
              container.fills = [];

              const checkboxes = [
                await checkboxHandlers.createInstance(
                  { state: 'default' },
                  { label: "Send me email updates" }
                ),
                await checkboxHandlers.createInstance(
                  { state: 'default', checked: true },
                  { label: "Subscribe to newsletter" }
                ),
                await checkboxHandlers.createInstance(
                  { state: 'disabled' },
                  { label: "Premium features (unavailable)" }
                )
              ];

              checkboxes.forEach(checkbox => container.appendChild(checkbox!));
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
async function setupCheckboxLayout(checkbox: ComponentNode, size: typeof CHECKBOX_SIZES[keyof typeof CHECKBOX_SIZES]) {
  checkbox.layoutMode = "HORIZONTAL";
  checkbox.itemSpacing = size.spacing;
  checkbox.counterAxisAlignItems = "CENTER";
}

async function addCheckboxBox(checkbox: ComponentNode, size: typeof CHECKBOX_SIZES[keyof typeof CHECKBOX_SIZES], variant: CheckboxVariant) {
  const style = CHECKBOX_STYLES[variant.state || 'default'];

  const box = figma.createFrame();
  box.name = "box";
  box.resize(size.size, size.size);
  box.fills = [variables.bindVariable(style.box.background)];
  box.strokes = [variables.bindVariable(style.box.border)];
  box.strokeWeight = 1;
  box.cornerRadius = 4;

  if (variant.checked || variant.indeterminate) {
    const check = figma.createFrame();
    check.name = variant.indeterminate ? "indeterminate" : "check";
    check.resize(size.size - 8, size.size - 8);
    check.x = check.y = 4;
    check.fills = [variables.bindVariable(style.box.check)];
    
    if (variant.indeterminate) {
      check.resize(size.size - 8, 2);
      check.y = (size.size - 2) / 2;
    }

    box.appendChild(check);
  }

  checkbox.appendChild(box);
}

async function addCheckboxLabel(checkbox: ComponentNode, size: typeof CHECKBOX_SIZES[keyof typeof CHECKBOX_SIZES], variant: CheckboxVariant) {
  const style = CHECKBOX_STYLES[variant.state || 'default'];

  const label = await createHandlers.text({
    text: "Checkbox label",
    fontSize: size.fontSize,
    fills: [variables.bindVariable(style.text)]
  });
  label.name = "label";

  checkbox.appendChild(label);
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