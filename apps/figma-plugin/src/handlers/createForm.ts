import { FormVariant, FormItemConfig, CreateFormOptions, InputVariant, SelectVariant, CheckboxVariant, RadioVariant, SwitchVariant } from '../types';
import { createHandlers } from './createBase';
import { inputHandlers } from './createInput';
import { selectHandlers } from './createSelect';
import { checkboxHandlers } from './createCheckbox';
import { radioHandlers } from './createRadio';
import { switchHandlers } from './createSwitch';
import { buttonHandlers } from './createButton';
import { bindColorVariable } from '@/variables/createColorVariables';

// Cache for common component sets
const componentCache = {
  formSet: null as ComponentSetNode | null,
};

export const formHandlers = {
  createFormItem: async (item: FormItemConfig, variant: FormVariant) => {
    const sizes = {
      small: { fontSize: 12, spacing: 4, labelWidth: 120 },
      medium: { fontSize: 14, spacing: 8, labelWidth: 140 },
      large: { fontSize: 16, spacing: 12, labelWidth: 160 }
    };

    const size = sizes[variant.size || 'medium'];
    const labelPosition = variant.labelPosition || 'top';

    // Create form item container
    const container = figma.createFrame();
    container.name = `Form Item - ${item.type}`;
    container.layoutMode = labelPosition === 'top' ? "VERTICAL" : "HORIZONTAL";
    container.itemSpacing = size.spacing;
    container.fills = [];
    container.layoutAlign = "STRETCH";

    // Label container
    if (item.label) {
      const labelContainer = figma.createFrame();
      labelContainer.name = "Label Container";
      labelContainer.layoutMode = "HORIZONTAL";
      labelContainer.itemSpacing = 4;
      labelContainer.fills = [];
      
      if (labelPosition === 'left') {
        labelContainer.resize(variant.labelWidth || size.labelWidth, 32);
        labelContainer.layoutAlign = "CENTER";
      } else {
        labelContainer.layoutAlign = "STRETCH";
      }

      // Label text
      const label = await createHandlers.text({
        text: item.label,
        fontSize: size.fontSize,
        fills: [bindColorVariable('semantic/text/default')]
      });

      // Required mark
      if (item.required && variant.showRequiredMark !== false) {
        const requiredMark = await createHandlers.text({
          text: "*",
          fontSize: size.fontSize,
          fills: [bindColorVariable('semantic/status/error/default')]
        });
        labelContainer.appendChild(requiredMark);
      }

      labelContainer.appendChild(label);
      container.appendChild(labelContainer);
    }

    // Field container
    const fieldContainer = figma.createFrame();
    fieldContainer.name = "Field Container";
    fieldContainer.layoutMode = "VERTICAL";
    fieldContainer.itemSpacing = 4;
    fieldContainer.fills = [];
    fieldContainer.layoutAlign = "STRETCH";

    // Create field based on type
    let field;
    const fieldVariant = {
      ...item.variant,
      size: variant.size,
      state: variant.state === 'disabled' ? 'disabled' : (item.variant?.state || 'default')
    };

    switch (item.type) {
      case 'input': {
        // Get or create Input component set
        const inputSet = await inputHandlers.createComponentSet();
        // Find matching variant
        const inputComponent = inputSet.findOne(node => 
          node.name.includes(`size=${fieldVariant.size || 'medium'}`) &&
          node.name.includes(`state=${fieldVariant.state || 'default'}`)
        ) as ComponentNode;
        field = inputComponent?.createInstance();
        break;
      }
      case 'select': {
        const selectSet = await selectHandlers.createComponentSet();
        const selectComponent = selectSet.findOne(node => 
          node.name.includes(`size=${fieldVariant.size || 'medium'}`) &&
          node.name.includes(`state=${fieldVariant.state || 'default'}`)
        ) as ComponentNode;
        field = selectComponent?.createInstance();
        break;
      }
      case 'checkbox': {
        const checkboxSet = await checkboxHandlers.createComponentSet();
        const checkboxComponent = checkboxSet.findOne(node => 
          node.name.includes(`size=${fieldVariant.size || 'medium'}`) &&
          node.name.includes(`state=${fieldVariant.state || 'default'}`)
        ) as ComponentNode;
        field = checkboxComponent?.createInstance();
        break;
      }
      case 'radio': {
        const radioSet = await radioHandlers.createComponentSet();
        const radioComponent = radioSet.findOne(node => 
          node.name.includes(`size=${fieldVariant.size || 'medium'}`) &&
          node.name.includes(`state=${fieldVariant.state || 'default'}`)
        ) as ComponentNode;
        field = radioComponent?.createInstance();
        break;
      }
      case 'switch': {
        const switchSet = await switchHandlers.createComponentSet();
        const switchComponent = switchSet.findOne(node => 
          node.name.includes(`size=${fieldVariant.size || 'medium'}`) &&
          node.name.includes(`state=${fieldVariant.state || 'default'}`)
        ) as ComponentNode;
        field = switchComponent?.createInstance();
        break;
      }
    }

    fieldContainer.appendChild(field);

    // Helper or error text
    if (item.error || item.helper) {
      const helperText = await createHandlers.text({
        text: item.error || item.helper || "",
        fontSize: size.fontSize - 2,
        fills: [bindColorVariable(item.error ? 'semantic/status/error/default' : 'semantic/text/subtle')]
      });
      fieldContainer.appendChild(helperText);
    }

    container.appendChild(fieldContainer);
    return container;
  },

  createForm: async (variant: FormVariant) => {
    // Create form component
    const form = figma.createComponent();
    form.name = `layout=${variant.layout || 'vertical'}, size=${variant.size || 'medium'}, state=${variant.state || 'default'}, labelPosition=${variant.labelPosition || 'top'}`;
    form.layoutMode = "VERTICAL";
    form.itemSpacing = 24;
    form.fills = [];
    form.paddingLeft = form.paddingRight = 24;
    form.paddingTop = form.paddingBottom = 24;
    form.cornerRadius = 8;
    form.strokes = [bindColorVariable('semantic/border/default')];
    form.strokeWeight = 1;

    // Create items container
    const itemsContainer = figma.createFrame();
    itemsContainer.name = "Form Items";
    itemsContainer.layoutMode = "VERTICAL";
    itemsContainer.itemSpacing = 16;
    itemsContainer.fills = [];
    itemsContainer.layoutAlign = "STRETCH";

    // Add form items
    if (variant.items) {
      for (const item of variant.items) {
        const formItem = await formHandlers.createFormItem(item, variant);
        itemsContainer.appendChild(formItem);
      }
    }

    form.appendChild(itemsContainer);

    // Add action buttons if specified
    if (variant.actions) {
      const actionContainer = figma.createFrame();
      actionContainer.name = "Form Actions";
      actionContainer.layoutMode = "HORIZONTAL";
      actionContainer.itemSpacing = 12;
      actionContainer.fills = [];
      actionContainer.layoutAlign = "STRETCH";
      actionContainer.primaryAxisAlignItems = variant.actions.layout === 'start' ? "MIN" : 'MAX';

      // Get button component set
      const buttonSet = await buttonHandlers.createComponentSet();

      // Submit button
      const submitComponent = buttonSet.findOne(node => 
        node.name.includes(`size=${variant.size || 'medium'}`) &&
        node.name.includes(`type=primary`) &&
        node.name.includes(`variant=filled`) &&
        node.name.includes(`state=${variant.state === 'disabled' ? 'disabled' : 'default'}`)
      ) as ComponentNode;
      const submitButton = submitComponent?.createInstance();
      if (submitButton) {
        // Update button text
        const textNode = submitButton.findOne(node => node.type === "TEXT") as TextNode;
        if (textNode) {
          textNode.characters = variant.actions.submitText || 'Submit';
        }
      }

      // Cancel button
      const cancelComponent = buttonSet.findOne(node => 
        node.name.includes(`size=${variant.size || 'medium'}`) &&
        node.name.includes(`type=secondary`) &&
        node.name.includes(`variant=ghost`) &&
        node.name.includes(`state=${variant.state === 'disabled' ? 'disabled' : 'default'}`)
      ) as ComponentNode;
      const cancelButton = cancelComponent?.createInstance();
      if (cancelButton) {
        // Update button text
        const textNode = cancelButton.findOne(node => node.type === "TEXT") as TextNode;
        if (textNode) {
          textNode.characters = variant.actions.cancelText || 'Cancel';
        }
      }

      if (cancelButton) actionContainer.appendChild(cancelButton);
      if (submitButton) actionContainer.appendChild(submitButton);
      form.appendChild(actionContainer);
    }

    return form;
  },

  createComponentSet: async (options: CreateFormOptions = {}) => {
    // Return cached Form component set if available
    if (componentCache.formSet) return componentCache.formSet;

    const defaultVariants: FormVariant[] = [
      // Basic vertical forms
      {
        layout: 'vertical',
        size: 'medium',
        labelPosition: 'top',
        showRequiredMark: true,
        items: [
          { type: 'input', label: 'Username', required: true },
          { type: 'input', label: 'Password', required: true },
          { type: 'checkbox', label: 'Remember me' }
        ],
        actions: {
          submitText: 'Submit',
          cancelText: 'Cancel',
          layout: 'end'
        }
      },

      // Horizontal form
      {
        layout: 'horizontal',
        size: 'medium',
        labelPosition: 'left',
        labelWidth: 140,
        showRequiredMark: true,
        items: [
          { type: 'input', label: 'First Name', required: true },
          { type: 'input', label: 'Last Name', required: true }
        ],
        actions: {
          submitText: 'Save',
          cancelText: 'Cancel',
          layout: 'end'
        }
      },

      // Form with various field types
      {
        layout: 'vertical',
        size: 'medium',
        labelPosition: 'top',
        showRequiredMark: true,
        items: [
          { type: 'input', label: 'Email', required: true },
          { type: 'select', label: 'Country', required: true },
          { type: 'radio', label: 'Gender' },
          { type: 'switch', label: 'Notifications' }
        ],
        actions: {
          submitText: 'Continue',
          cancelText: 'Back',
          layout: 'end'
        }
      },

      // Form with validation states
      {
        layout: 'vertical',
        size: 'medium',
        labelPosition: 'top',
        showRequiredMark: true,
        items: [
          { type: 'input', label: 'Email', required: true, error: 'Please enter a valid email' },
          { type: 'input', label: 'Password', required: true, helper: 'Must be at least 8 characters' }
        ],
        actions: {
          submitText: 'Sign Up',
          cancelText: 'Cancel',
          layout: 'end'
        }
      },

      // Disabled form
      {
        layout: 'vertical',
        size: 'medium',
        state: 'disabled',
        labelPosition: 'top',
        showRequiredMark: true,
        items: [
          { type: 'input', label: 'Username', required: true },
          { type: 'input', label: 'Password', required: true }
        ],
        actions: {
          submitText: 'Submit',
          cancelText: 'Cancel',
          layout: 'end'
        }
      }
    ];

    const variants = options.variants || defaultVariants;
    const components: ComponentNode[] = [];

    // Create components for each variant
    for (const variant of variants) {
      const component = await formHandlers.createForm(variant);
      components.push(component);

      // Adjust component spacing
      if (components.length > 1) {
        component.x = components[components.length - 2].x;
        component.y = components[components.length - 2].y + components[components.length - 2].height + 40;
      }
    }

    // Combine components as variants
    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Form";
    componentSet.layoutMode = "HORIZONTAL";
    componentSet.layoutWrap = "WRAP";
    componentSet.itemSpacing = 40;
    componentSet.counterAxisSpacing = 40;
    componentSet.paddingLeft = componentSet.paddingRight = 40;
    componentSet.paddingTop = componentSet.paddingBottom = 40;
    componentSet.resize(1200, componentSet.height);
    componentSet.primaryAxisSizingMode = "FIXED";
    componentSet.counterAxisSizingMode = "AUTO";

    // Cache the component set
    componentCache.formSet = componentSet;

    return componentSet;
  }
}; 