import { SelectVariantProps } from '../types/select';
import { SELECT_SIZES, SELECT_STYLES, SELECT_VARIANTS } from '../constants/selectStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private selectSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getSelectSet(): ComponentSetNode | null {
    return this.selectSet;
  }

  setSelectSet(set: ComponentSetNode): void {
    this.selectSet = set;
  }
}

export const selectHandlers = {
  createSelect: async (variant: SelectVariantProps) => {
    const size = SELECT_SIZES[variant.size || 'medium'];
    const style = SELECT_STYLES[variant.variant || 'outlined'];
    const state = variant.state || 'default';

    // Create select component
    const select = figma.createComponent();
    select.name = `size=${variant.size || 'medium'}, variant=${variant.variant || 'outlined'}, state=${state}`;
    
    // Add ARIA attributes
    select.setPluginData('role', variant.role || 'combobox');
    if (variant.ariaLabel) {
      select.setPluginData('aria-label', variant.ariaLabel);
    }
    if (variant.required) {
      select.setPluginData('aria-required', 'true');
    }
    if (variant.disabled) {
      select.setPluginData('aria-disabled', 'true');
    }
    if (variant.multiple) {
      select.setPluginData('aria-multiselectable', 'true');
    }

    // Set layout
    select.layoutMode = "VERTICAL";
    select.itemSpacing = size.spacing;
    select.resize(280, 1);
    select.primaryAxisSizingMode = "AUTO";
    select.counterAxisSizingMode = "FIXED";

    // Add label if needed
    if (variant.label) {
      const labelContainer = figma.createFrame();
      labelContainer.name = "Label";
      labelContainer.layoutMode = "HORIZONTAL";
      labelContainer.itemSpacing = size.labelSpacing;
      labelContainer.fills = [];
      labelContainer.layoutAlign = "STRETCH";

      const label = await createHandlers.text({
        text: variant.label,
        fontSize: size.fontSize - 2,
        fills: [variables.bindVariable(style.label[state])]
      });
      label.name = "labelText";

      if (variant.required) {
        const requiredMark = await createHandlers.text({
          text: '*',
          fontSize: size.fontSize - 2,
          fills: [variables.bindVariable('semantic/text/error')]
        });
        requiredMark.name = "requiredMark";
        labelContainer.appendChild(requiredMark);
      }

      labelContainer.appendChild(label);
      select.appendChild(labelContainer);
    }

    // Create input container
    const inputContainer = figma.createFrame();
    inputContainer.name = "Input";
    inputContainer.layoutMode = "HORIZONTAL";
    inputContainer.itemSpacing = size.spacing;
    inputContainer.paddingLeft = inputContainer.paddingRight = size.padding;
    inputContainer.paddingTop = inputContainer.paddingBottom = size.padding;
    inputContainer.cornerRadius = size.borderRadius;
    inputContainer.resize(280, size.height);
    inputContainer.layoutAlign = "STRETCH";
    inputContainer.fills = [variables.bindVariable(style.background[state])];
    inputContainer.strokes = [variables.bindVariable(style.border[state])];
    inputContainer.strokeWeight = 1;

    // Add placeholder or value
    const text = await createHandlers.text({
      text: variant.placeholder || 'Select option',
      fontSize: size.fontSize,
      fills: [variables.bindVariable(variant.placeholder ? style.text.placeholder : style.text[state])]
    });
    text.name = "text";
    text.layoutGrow = 1;
    inputContainer.appendChild(text);

    // Add icons
    if (variant.clearable) {
      const clearIcon = figma.createFrame();
      clearIcon.name = "ClearIcon";
      clearIcon.resize(size.iconSize, size.iconSize);
      clearIcon.fills = [variables.bindVariable(style.icon[state])];
      inputContainer.appendChild(clearIcon);
    }

    if (variant.loading) {
      const loadingIcon = figma.createFrame();
      loadingIcon.name = "LoadingIcon";
      loadingIcon.resize(size.iconSize, size.iconSize);
      loadingIcon.fills = [variables.bindVariable(style.icon[state])];
      inputContainer.appendChild(loadingIcon);
    }

    const chevronIcon = figma.createFrame();
    chevronIcon.name = "ChevronIcon";
    chevronIcon.resize(size.iconSize, size.iconSize);
    chevronIcon.fills = [variables.bindVariable(style.icon[state])];
    inputContainer.appendChild(chevronIcon);

    select.appendChild(inputContainer);

    // Add helper or error text if needed
    if (variant.helperText || variant.errorText) {
      const helperContainer = figma.createFrame();
      helperContainer.name = "Helper";
      helperContainer.layoutMode = "HORIZONTAL";
      helperContainer.itemSpacing = size.spacing;
      helperContainer.fills = [];
      helperContainer.layoutAlign = "STRETCH";

      const helperText = await createHandlers.text({
        text: variant.errorText || variant.helperText || '',
        fontSize: size.fontSize - 2,
        fills: [variables.bindVariable(variant.errorText ? style.helper.error : style.helper.default)]
      });
      helperText.name = "helperText";
      helperContainer.appendChild(helperText);

      select.appendChild(helperContainer);
    }

    // Create dropdown menu
    if (state === 'focused') {
      const menu = figma.createFrame();
      menu.name = "Menu";
      menu.layoutMode = "VERTICAL";
      menu.itemSpacing = 1;
      menu.fills = [variables.bindVariable(style.menu.background)];
      menu.strokes = [variables.bindVariable(style.menu.border)];
      menu.strokeWeight = 1;
      menu.cornerRadius = size.borderRadius;
      menu.layoutAlign = "STRETCH";
      menu.resize(280, size.menuMaxHeight);
      menu.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 4 },
          radius: 8,
          spread: 0,
          visible: true,
          blendMode: "NORMAL",
        }
      ];

      // Add sample options
      const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', selected: true },
        { value: '3', label: 'Option 3', disabled: true },
      ];

      for (const option of options) {
        const optionContainer = figma.createFrame();
        optionContainer.name = `Option_${option.value}`;
        optionContainer.layoutMode = "HORIZONTAL";
        optionContainer.itemSpacing = size.spacing;
        optionContainer.paddingLeft = optionContainer.paddingRight = size.optionPadding;
        optionContainer.paddingTop = optionContainer.paddingBottom = size.optionPadding;
        optionContainer.resize(280, size.optionHeight);
        optionContainer.layoutAlign = "STRETCH";
        optionContainer.fills = [variables.bindVariable(
          option.disabled ? style.menu.optionBackground.disabled :
          option.selected ? style.menu.optionBackground.selected :
          style.menu.optionBackground.default
        )];

        const optionText = await createHandlers.text({
          text: option.label,
          fontSize: size.fontSize,
          fills: [variables.bindVariable(
            option.disabled ? style.menu.optionText.disabled :
            option.selected ? style.menu.optionText.selected :
            style.menu.optionText.default
          )]
        });
        optionText.name = "optionText";
        optionText.layoutGrow = 1;

        if (option.selected) {
          const checkIcon = figma.createFrame();
          checkIcon.name = "CheckIcon";
          checkIcon.resize(size.iconSize, size.iconSize);
          checkIcon.fills = [variables.bindVariable(style.menu.optionIcon.selected)];
          optionContainer.appendChild(checkIcon);
        }

        optionContainer.appendChild(optionText);
        menu.appendChild(optionContainer);
      }

      select.appendChild(menu);
    }

    return select;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getSelectSet()) return cache.getSelectSet();

    const components: ComponentNode[] = [];
    
    for (const variant of SELECT_VARIANTS) {
      const component = await selectHandlers.createSelect(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Select";

    // Add component properties
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the select');
    componentSet.addComponentProperty('variant', 'VARIANT', 'The visual style of the select');
    componentSet.addComponentProperty('state', 'VARIANT', 'The state of the select');
    componentSet.addComponentProperty('label', 'TEXT', 'The label text');
    componentSet.addComponentProperty('placeholder', 'TEXT', 'The placeholder text');
    componentSet.addComponentProperty('helperText', 'TEXT', 'The helper text');
    componentSet.addComponentProperty('errorText', 'TEXT', 'The error message');
    componentSet.addComponentProperty('required', 'BOOLEAN', 'Whether the select is required');
    componentSet.addComponentProperty('disabled', 'BOOLEAN', 'Whether the select is disabled');
    componentSet.addComponentProperty('multiple', 'BOOLEAN', 'Whether multiple options can be selected');
    componentSet.addComponentProperty('clearable', 'BOOLEAN', 'Whether the value can be cleared');
    componentSet.addComponentProperty('searchable', 'BOOLEAN', 'Whether the options can be searched');
    componentSet.addComponentProperty('loading', 'BOOLEAN', 'Whether the select is loading');

    setupComponentSetLayout(componentSet);

    cache.setSelectSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: SelectVariantProps, props: { 
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
    options?: { value: string; label: string; selected?: boolean; disabled?: boolean; }[];
  } = {}) => {
    const component = ComponentCache.getInstance().getSelectSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      variant: variant.variant || 'outlined',
      state: variant.state || 'default',
      label: props.label || variant.label || '',
      placeholder: props.placeholder || variant.placeholder || '',
      helperText: props.helperText || variant.helperText || '',
      errorText: props.errorText || variant.errorText || '',
      required: variant.required ?? false,
      disabled: variant.disabled ?? false,
      multiple: variant.multiple ?? false,
      clearable: variant.clearable ?? false,
      searchable: variant.searchable ?? false,
      loading: variant.loading ?? false
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Select",
      description: "Select components allow users to choose one or multiple options from a dropdown list.",
      anatomy: {
        parts: [
          { name: "Label", description: "Optional text label above the select" },
          { name: "Input", description: "The main input container showing the selected value" },
          { name: "Placeholder", description: "Text shown when no value is selected" },
          { name: "Icons", description: "Visual indicators for clearing, loading, and expanding" },
          { name: "Menu", description: "Dropdown list containing the options" },
          { name: "Option", description: "Individual selectable items in the menu" },
          { name: "Helper", description: "Optional text below the select for additional information" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the select",
          options: ["small", "medium", "large"]
        },
        {
          name: "variant",
          type: "enum",
          default: "outlined",
          description: "The visual style of the select",
          options: ["outlined", "filled"]
        },
        {
          name: "state",
          type: "enum",
          default: "default",
          description: "The state of the select",
          options: ["default", "hover", "focused", "disabled", "error"]
        },
        {
          name: "label",
          type: "string",
          description: "The label text"
        },
        {
          name: "placeholder",
          type: "string",
          description: "The placeholder text"
        },
        {
          name: "helperText",
          type: "string",
          description: "The helper text"
        },
        {
          name: "errorText",
          type: "string",
          description: "The error message"
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Whether the select is required"
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Whether the select is disabled"
        },
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          description: "Whether multiple options can be selected"
        },
        {
          name: "clearable",
          type: "boolean",
          default: "false",
          description: "Whether the value can be cleared"
        },
        {
          name: "searchable",
          type: "boolean",
          default: "false",
          description: "Whether the options can be searched"
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Whether the select is loading"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of select components.",
          examples: [
            await selectHandlers.createInstance(
              { size: 'small' },
              { placeholder: "Small select" }
            ),
            await selectHandlers.createInstance(
              { size: 'medium' },
              { placeholder: "Medium select" }
            ),
            await selectHandlers.createInstance(
              { size: 'large' },
              { placeholder: "Large select" }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different visual styles of select components.",
          examples: [
            await selectHandlers.createInstance(
              { variant: 'outlined' },
              { placeholder: "Outlined select" }
            ),
            await selectHandlers.createInstance(
              { variant: 'filled' },
              { placeholder: "Filled select" }
            )
          ]
        },
        {
          title: "States",
          description: "Different states of select components.",
          examples: [
            await selectHandlers.createInstance(
              { state: 'default' },
              { placeholder: "Default state" }
            ),
            await selectHandlers.createInstance(
              { state: 'hover' },
              { placeholder: "Hover state" }
            ),
            await selectHandlers.createInstance(
              { state: 'focused' },
              { placeholder: "Focused state" }
            ),
            await selectHandlers.createInstance(
              { state: 'disabled' },
              { placeholder: "Disabled state" }
            ),
            await selectHandlers.createInstance(
              { state: 'error' },
              { placeholder: "Error state", errorText: "This field is required" }
            )
          ]
        },
        {
          title: "With Label and Helper",
          description: "Select components with additional text elements.",
          examples: [
            await selectHandlers.createInstance(
              { label: "Label" },
              { placeholder: "With label" }
            ),
            await selectHandlers.createInstance(
              { label: "Label", helperText: "Helper text" },
              { placeholder: "With helper text" }
            ),
            await selectHandlers.createInstance(
              { label: "Label", required: true },
              { placeholder: "Required field" }
            )
          ]
        }
      ],
      usage: {
        description: "Use select components when users need to choose one or multiple options from a list.",
        examples: [
          {
            title: "Form Field",
            description: "A typical form field with a select component.",
            component: await (async () => {
              const container = figma.createComponent();
              container.name = "Form Field Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 24;
              container.fills = [];
              container.resize(280, 1);
              container.primaryAxisSizingMode = "AUTO";
              container.counterAxisSizingMode = "FIXED";

              const select = await selectHandlers.createInstance(
                {
                  label: "Country",
                  required: true,
                  helperText: "Select your country of residence"
                },
                { placeholder: "Select a country" }
              );

              if (select) container.appendChild(select);
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