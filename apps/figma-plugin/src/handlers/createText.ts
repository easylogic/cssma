import { TextVariant } from '../types';
import { bindColorVariable, createColorVariables } from '@/variables/createColorVariables';

// Cache for common component sets
const componentCache = {
  textSet: null as ComponentSetNode | null,
};

// Define text styles for each variant type
const textStyles = {
  'default': {
    text: 'semantic/text/black'
  },
  'primary': {
    text: 'semantic/action/primary/default'
  },
  'secondary': {
    text: 'semantic/action/secondary/default'
  },
  'success': {
    text: 'semantic/status/success/default'
  },
  'warning': {
    text: 'semantic/status/warning/default'
  },
  'danger': {
    text: 'semantic/status/error/default'
  },
  'disabled': {
    text: 'semantic/text/disabled'
  }
};

export const textHandlers = {
  createTextComponent: async (variant: TextVariant) => {
    const sizes = {
      xs: { fontSize: 12 },
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
      xl: { fontSize: 20 },
      '2xl': { fontSize: 24 },
      '3xl': { fontSize: 30 },
      '4xl': { fontSize: 36 },
      '5xl': { fontSize: 48 },
      '6xl': { fontSize: 60 }
    } as const;

    const size = sizes[variant.size || 'md'];
    const type = variant.type || 'default';
    const weight = variant.weight || 'regular';

    // Create text component
    const component = figma.createComponent();
    component.name = `Text=${variant.size || 'md'}, type=${type}, weight=${weight}`;
    component.layoutMode = "HORIZONTAL";
    component.primaryAxisSizingMode = "AUTO";
    component.counterAxisSizingMode = "AUTO";

    // Create text node
    const text = figma.createText();
    
    // Load and set font
    const fontStyle = weight === 'bold' ? 'Bold' : weight === 'medium' ? 'Medium' : 'Regular';
    await figma.loadFontAsync({ family: "Inter", style: fontStyle });
    text.fontName = { family: "Inter", style: fontStyle };

    // Set text properties
    text.characters = variant.text || 'Text';
    text.fontSize = size.fontSize;
    text.textAutoResize = variant.textAutoResize || "WIDTH_AND_HEIGHT";

    // Set color based on type
    const style = textStyles[type];
    text.fills = [bindColorVariable(style.text)];

    component.appendChild(text);
    return component;
  },

  createComponentSet: async () => {
    // Return cached Text component set if available
    if (componentCache.textSet) {
      return componentCache.textSet;
    }

    const defaultVariants: TextVariant[] = [
      // Different sizes
      { size: 'xs', type: 'default', weight: 'regular', text: 'Extra Small Text' },
      { size: 'sm', type: 'default', weight: 'regular', text: 'Small Text' },
      { size: 'md', type: 'default', weight: 'regular', text: 'Medium Text' },
      { size: 'lg', type: 'default', weight: 'regular', text: 'Large Text' },
      { size: 'xl', type: 'default', weight: 'regular', text: 'Extra Large Text' },
      { size: '2xl', type: 'default', weight: 'regular', text: '2XL Text' },
      { size: '3xl', type: 'default', weight: 'regular', text: '3XL Text' },
      { size: '4xl', type: 'default', weight: 'regular', text: '4XL Text' },
      { size: '5xl', type: 'default', weight: 'regular', text: '5XL Text' },
      { size: '6xl', type: 'default', weight: 'regular', text: '6XL Text' },

      // Different types (Medium size)
      { size: 'md', type: 'primary', weight: 'regular', text: 'Primary Text' },
      { size: 'md', type: 'secondary', weight: 'regular', text: 'Secondary Text' },
      { size: 'md', type: 'success', weight: 'regular', text: 'Success Text' },
      { size: 'md', type: 'warning', weight: 'regular', text: 'Warning Text' },
      { size: 'md', type: 'danger', weight: 'regular', text: 'Danger Text' },
      { size: 'md', type: 'disabled', weight: 'regular', text: 'Disabled Text' },

      // Different weights (Medium size)
      { size: 'md', type: 'default', weight: 'regular', text: 'Regular Text' },
      { size: 'md', type: 'default', weight: 'medium', text: 'Medium Weight Text' },
      { size: 'md', type: 'default', weight: 'bold', text: 'Bold Text' },
    ];

    const components: ComponentNode[] = [];

    // Create components for each variant
    for (const variant of defaultVariants) {
      const component = await textHandlers.createTextComponent(variant);
      components.push(component);

      // Adjust component spacing
      if (components.length > 1) {
        component.x = components[components.length - 2].x;
        component.y = components[components.length - 2].y + components[components.length - 2].height + 40;
      }
    }

    // Combine components as variants
    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Text";
    componentSet.layoutMode = "HORIZONTAL";
    componentSet.layoutWrap = "WRAP";
    componentSet.itemSpacing = 40;
    componentSet.paddingLeft = componentSet.paddingRight = 40;
    componentSet.paddingTop = componentSet.paddingBottom = 40;
    componentSet.resize(800, componentSet.height);
    componentSet.primaryAxisSizingMode = "FIXED";
    componentSet.counterAxisSizingMode = "AUTO";
    componentSet.fills = [
      {
        type: "SOLID",
        color: { r: 1, g: 1, b: 1 },
      },
    ];

    // Cache the component set
    componentCache.textSet = componentSet;

    return componentSet;
  }
}; 