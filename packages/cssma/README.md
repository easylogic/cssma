# @easylogic/cssma

A library for converting Tailwind CSS like styles to Figma styles and vice versa.

## Overview

`@easylogic/cssma` provides a seamless bridge between Tailwind CSS and Figma's design system. This library allows you to convert Tailwind CSS classes to Figma style objects and convert Figma styles back to Tailwind CSS classes.

## Installation

```bash
npm install @easylogic/cssma
```

or

```bash
pnpm add @easylogic/cssma
```

or

```bash
yarn add @easylogic/cssma
```

## Quick Start

Here's how to get started with @easylogic/cssma in a Figma plugin:

```typescript
// In your Figma plugin code
import { processStyles } from '@easylogic/cssma';

// Convert Tailwind CSS to Figma styles
const node = figma.createFrame();
const styles = processStyles('flex-col bg-white rounded-lg p-[16] gap-[8]');

// Apply styles to the node
Object.assign(node, {
  layoutMode: styles.layoutMode,
  fills: styles.fills,
  topLeftRadius: styles.topLeftRadius,
  topRightRadius: styles.topRightRadius,
  bottomLeftRadius: styles.bottomLeftRadius,
  bottomRightRadius: styles.bottomRightRadius,
  paddingTop: styles.paddingTop,
  paddingRight: styles.paddingRight,
  paddingBottom: styles.paddingBottom,
  paddingLeft: styles.paddingLeft,
  itemSpacing: styles.itemSpacing
});

// Add the node to the current page
figma.currentPage.appendChild(node);
```

## Core Features

### 1. Tailwind CSS → Figma Conversion (`processStyles`)

Convert Tailwind CSS class strings to Figma style objects:

```typescript
import { processStyles } from '@easylogic/cssma';

const styles = processStyles('flex-col w-full bg-[#FF0000] rounded-lg');
// Apply the result to a Figma node
node.layoutMode = styles.layoutMode;
node.fills = styles.fills;
node.cornerRadius = styles.cornerRadius;
```

### 2. Figma → Tailwind CSS Conversion (`figmaToStyle`)

Convert Figma style objects to Tailwind CSS class strings:

```typescript
import { figmaToStyle } from '@easylogic/cssma';

const tailwindClasses = figmaToStyle({
  layoutMode: "VERTICAL",
  fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
  cornerRadius: 8
});
// Result: "flex-col bg-[#ff0000] rounded-lg"
```

### 3. Node Creation with Styles (`createNodeForData`)

Create Figma nodes with Tailwind CSS styles using a declarative JSON structure:

```typescript
import { createNodeForData } from '@easylogic/cssma';

// Create a simple card component
const cardData = {
  type: 'FRAME',
  name: 'Card',
  styles: 'flex-col w-full bg-white rounded-lg p-[16] gap-[8]',
  children: [
    {
      type: 'FRAME',
      name: 'Image',
      styles: 'w-full h-[150] bg-gray-200 rounded-md'
    },
    {
      type: 'TEXT',
      name: 'Title',
      styles: 'w-full text-xl font-bold',
      text: 'Card Title'
    }
  ]
};

const card = createNodeForData(cardData);
figma.currentPage.appendChild(card);

// Create a button component
const buttonData = {
  type: 'COMPONENT',
  name: 'Button',
  styles: 'flex w-auto h-auto items-center justify-center px-[16] py-[8] bg-blue-500 rounded-md',
  children: [{
    type: 'TEXT',
    styles: 'w-auto h-auto text-white font-medium',
    text: 'Button'
  }]
};

const button = createNodeForData(buttonData);
```

#### NodeData Interface

```typescript
interface NodeData {
  type: string;              // Node type (FRAME, TEXT, RECTANGLE, etc.)
  name?: string;             // Node name
  styles?: string;           // Tailwind CSS style string
  text?: string;            // Text content for text nodes
  children?: NodeData[];     // Child node data
  props?: Record<string, any>; // Additional properties
}
```

#### Supported Node Types
- `FRAME`
- `TEXT`
- `RECTANGLE`
- `ELLIPSE`
- `POLYGON`
- `STAR`
- `VECTOR`
- `LINE`
- `COMPONENT`

#### Comprehensive Example

Here's a complete example showcasing all supported Figma node types:

```typescript
import { createNodeForData } from '@easylogic/cssma';

const designSystemData = {
  type: 'FRAME',
  name: 'Design System',
  styles: 'flex-col w-full h-auto bg-[#fafafa] p-[32] gap-[32]',
  children: [
    // Typography Section
    {
      type: 'FRAME',
      name: 'Typography',
      styles: 'flex-col w-full h-auto gap-[16]',
      children: [
        {
          type: 'TEXT',
          name: 'Heading 1',
          styles: 'w-full h-auto text-4xl font-bold text-[#111827]',
          text: 'Heading 1'
        },
        {
          type: 'TEXT',
          name: 'Body Text',
          styles: 'w-full h-auto text-base font-normal text-[#374151] leading-relaxed',
          text: 'Regular body text with comfortable line height.'
        }
      ]
    },

    // Shapes Section
    {
      type: 'FRAME',
      name: 'Basic Shapes',
      styles: 'flex-row w-full h-auto gap-[16] items-center',
      children: [
        {
          type: 'RECTANGLE',
          name: 'Square',
          styles: 'w-[64] h-[64] bg-blue-500 rounded-lg shadow-md'
        },
        {
          type: 'ELLIPSE',
          name: 'Circle',
          styles: 'w-[64] h-[64] bg-green-500'
        },
        {
          type: 'POLYGON',
          name: 'Triangle',
          styles: 'w-[64] h-[64] bg-yellow-500',
          props: {
            pointCount: 3
          }
        },
        {
          type: 'STAR',
          name: 'Star',
          styles: 'w-[64] h-[64] bg-purple-500',
          props: {
            pointCount: 5
          }
        }
      ]
    },

    // Vector Graphics
    {
      type: 'FRAME',
      name: 'Vector Graphics',
      styles: 'flex-row w-full h-auto gap-[16] items-center',
      children: [
        {
          type: 'VECTOR',
          name: 'Arrow',
          styles: 'w-[100] h-[40] stroke-black stroke-2 fill-transparent',
          props: {
            vectorPaths: [{
              windingRule: 'NONZERO',
              data: 'M10 10L50 50M50 50L90 10'
            }]
          }
        },
        {
          type: 'LINE',
          name: 'Divider',
          styles: 'w-[100] h-[1] stroke-gray-300 stroke-1',
          props: {
            strokeCap: 'ROUND'
          }
        }
      ]
    },

    // Components Section
    {
      type: 'FRAME',
      name: 'Components',
      styles: 'flex-col w-full h-auto gap-[24]',
      children: [
        // Button Component
        {
          type: 'COMPONENT',
          name: 'Button/Primary',
          styles: 'flex w-auto h-auto items-center justify-center px-[16] py-[8] bg-blue-500 rounded-md',
          children: [{
            type: 'TEXT',
            styles: 'w-auto h-auto text-white font-medium',
            text: 'Button'
          }]
        },
        // Card Component
        {
          type: 'COMPONENT',
          name: 'Card/Basic',
          styles: 'flex-col w-full h-auto bg-white rounded-xl p-[24] gap-[16] shadow-md',
          children: [
            {
              type: 'FRAME',
              name: 'Image Container',
              styles: 'w-full h-[200] bg-gray-100 rounded-lg'
            },
            {
              type: 'TEXT',
              name: 'Title',
              styles: 'w-full h-auto text-xl font-semibold text-gray-900',
              text: 'Card Title'
            },
            {
              type: 'TEXT',
              name: 'Description',
              styles: 'w-full h-auto text-base text-gray-600',
              text: 'Card description with detailed information.'
            }
          ]
        }
      ]
    },

    // Component Instances
    {
      type: 'FRAME',
      name: 'Component Instances',
      styles: 'flex-col w-full h-auto gap-[16]',
      children: [
        {
          type: 'INSTANCE',
          name: 'Button/Primary Instance',
          styles: 'w-auto h-auto bg-green-500', // Override styles
          componentProperties: {
            text: 'Custom Button'
          }
        },
        {
          type: 'INSTANCE',
          name: 'Card/Basic Instance',
          styles: 'w-full bg-gray-50', // Override styles
          componentProperties: {
            title: 'Custom Card',
            description: 'This is a custom card instance.'
          }
        }
      ]
    },

    // Layout Examples
    {
      type: 'FRAME',
      name: 'Layout Examples',
      styles: 'flex-col w-full h-auto gap-[24]',
      children: [
        {
          type: 'FRAME',
          name: 'Grid Layout',
          styles: 'grid w-full h-auto grid-cols-3 gap-[16]',
          children: Array(6).fill(null).map((_, i) => ({
            type: 'RECTANGLE',
            name: `Grid Item ${i + 1}`,
            styles: 'w-full h-[100] bg-blue-100 rounded-md'
          }))
        },
        {
          type: 'FRAME',
          name: 'Flex Layout',
          styles: 'flex-row w-full h-auto justify-between items-center',
          children: [
            {
              type: 'RECTANGLE',
              name: 'Left',
              styles: 'w-[100] h-[100] bg-green-100 rounded-md'
            },
            {
              type: 'RECTANGLE',
              name: 'Center',
              styles: 'w-[100] h-[100] bg-yellow-100 rounded-md'
            },
            {
              type: 'RECTANGLE',
              name: 'Right',
              styles: 'w-[100] h-[100] bg-red-100 rounded-md'
            }
          ]
        }
      ]
    }
  ]
};

// Create the design system
const designSystem = createNodeForData(designSystemData);
figma.currentPage.appendChild(designSystem);
```

This example demonstrates:
- All basic node types (FRAME, TEXT, RECTANGLE, ELLIPSE, etc.)
- Component creation and instances
- Complex layouts (Grid and Flex)
- Various style properties
- Nested structures
- Property overrides
- Vector paths
- Shape properties

#### Landing Page Example

Here's an example of creating a modern landing page using @easylogic/cssma:

```typescript
import { createNodeForData } from '@easylogic/cssma';

const landingPageData = {
  type: 'FRAME',
  name: 'Landing Page',
  styles: 'flex-col w-full h-auto bg-white',
  children: [
    // Navigation Bar
    {
      type: 'FRAME',
      name: 'Navbar',
      styles: 'flex-row w-full h-auto px-[64] py-[16] bg-white items-center justify-between shadow-sm',
      children: [
        {
          type: 'TEXT',
          name: 'Logo',
          styles: 'w-auto h-auto text-2xl font-bold text-blue-600',
          text: 'Brand'
        },
        {
          type: 'FRAME',
          name: 'Nav Links',
          styles: 'flex-row w-auto h-auto gap-[32] items-center',
          children: [
            {
              type: 'TEXT',
              name: 'Home',
              styles: 'w-auto h-auto text-base font-medium text-gray-900',
              text: 'Home'
            },
            {
              type: 'TEXT',
              name: 'Features',
              styles: 'w-auto h-auto text-base font-medium text-gray-600',
              text: 'Features'
            },
            {
              type: 'TEXT',
              name: 'Pricing',
              styles: 'w-auto h-auto text-base font-medium text-gray-600',
              text: 'Pricing'
            },
            {
              type: 'COMPONENT',
              name: 'Button/CTA',
              styles: 'flex w-auto h-auto items-center justify-center px-[16] py-[8] bg-blue-600 rounded-md',
              children: [{
                type: 'TEXT',
                styles: 'w-auto h-auto text-white font-medium',
                text: 'Get Started'
              }]
            }
          ]
        }
      ]
    },

    // Hero Section
    {
      type: 'FRAME',
      name: 'Hero',
      styles: 'flex-col w-full h-auto px-[64] py-[80] bg-gray-50 items-center gap-[32] text-center',
      children: [
        {
          type: 'TEXT',
          name: 'Hero Title',
          styles: 'w-[600] h-auto text-5xl font-bold text-gray-900 leading-tight',
          text: 'Build Beautiful Interfaces\nFaster Than Ever'
        },
        {
          type: 'TEXT',
          name: 'Hero Subtitle',
          styles: 'w-[600] h-auto text-xl text-gray-600 leading-relaxed',
          text: 'Create stunning designs with our powerful design system. Save time and focus on what matters most.'
        },
        {
          type: 'FRAME',
          name: 'CTA Buttons',
          styles: 'flex-row w-auto h-auto gap-[16] items-center mt-[16]',
          children: [
            {
              type: 'COMPONENT',
              name: 'Button/Primary',
              styles: 'flex w-auto h-auto items-center justify-center px-[24] py-[12] bg-blue-600 rounded-md',
              children: [{
                type: 'TEXT',
                styles: 'w-auto h-auto text-lg text-white font-medium',
                text: 'Get Started Free'
              }]
            },
            {
              type: 'COMPONENT',
              name: 'Button/Secondary',
              styles: 'flex w-auto h-auto items-center justify-center px-[24] py-[12] bg-white border-2 border-gray-200 rounded-md',
              children: [{
                type: 'TEXT',
                styles: 'w-auto h-auto text-lg text-gray-600 font-medium',
                text: 'Learn More'
              }]
            }
          ]
        }
      ]
    },

    // Features Section
    {
      type: 'FRAME',
      name: 'Features',
      styles: 'flex-col w-full h-auto px-[64] py-[80] gap-[64]',
      children: [
        {
          type: 'FRAME',
          name: 'Section Header',
          styles: 'flex-col w-full h-auto items-center gap-[16] mb-[32]',
          children: [
            {
              type: 'TEXT',
              name: 'Section Title',
              styles: 'w-auto h-auto text-3xl font-bold text-gray-900',
              text: 'Why Choose Us'
            },
            {
              type: 'TEXT',
              name: 'Section Description',
              styles: 'w-[600] h-auto text-center text-lg text-gray-600',
              text: 'We provide the tools you need to create amazing designs quickly and efficiently.'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Feature Grid',
          styles: 'grid w-full h-auto grid-cols-3 gap-[32]',
          children: [
            // Feature Card 1
            {
              type: 'FRAME',
              name: 'Feature 1',
              styles: 'flex-col w-full h-auto p-[32] bg-white rounded-xl border border-gray-100 gap-[16] shadow-sm',
              children: [
                {
                  type: 'FRAME',
                  name: 'Icon Container',
                  styles: 'flex w-[48] h-[48] bg-blue-100 rounded-lg items-center justify-center',
                  children: [
                    {
                      type: 'TEXT',
                      styles: 'w-auto h-auto text-2xl text-blue-600',
                      text: '⚡'
                    }
                  ]
                },
                {
                  type: 'TEXT',
                  name: 'Feature Title',
                  styles: 'w-full h-auto text-xl font-semibold text-gray-900',
                  text: 'Lightning Fast'
                },
                {
                  type: 'TEXT',
                  name: 'Feature Description',
                  styles: 'w-full h-auto text-base text-gray-600',
                  text: 'Create designs in minutes, not hours. Our tools are optimized for speed and efficiency.'
                }
              ]
            },
            // Feature Card 2
            {
              type: 'FRAME',
              name: 'Feature 2',
              styles: 'flex-col w-full h-auto p-[32] bg-white rounded-xl border border-gray-100 gap-[16] shadow-sm',
              children: [
                {
                  type: 'FRAME',
                  name: 'Icon Container',
                  styles: 'flex w-[48] h-[48] bg-green-100 rounded-lg items-center justify-center',
                  children: [
                    {
                      type: 'TEXT',
                      styles: 'w-auto h-auto text-2xl text-green-600',
                      text: '🎨'
                    }
                  ]
                },
                {
                  type: 'TEXT',
                  name: 'Feature Title',
                  styles: 'w-full h-auto text-xl font-semibold text-gray-900',
                  text: 'Beautiful Designs'
                },
                {
                  type: 'TEXT',
                  name: 'Feature Description',
                  styles: 'w-full h-auto text-base text-gray-600',
                  text: 'Create stunning interfaces with our pre-built components and design system.'
                }
              ]
            },
            // Feature Card 3
            {
              type: 'FRAME',
              name: 'Feature 3',
              styles: 'flex-col w-full h-auto p-[32] bg-white rounded-xl border border-gray-100 gap-[16] shadow-sm',
              children: [
                {
                  type: 'FRAME',
                  name: 'Icon Container',
                  styles: 'flex w-[48] h-[48] bg-purple-100 rounded-lg items-center justify-center',
                  children: [
                    {
                      type: 'TEXT',
                      styles: 'w-auto h-auto text-2xl text-purple-600',
                      text: '🚀'
                    }
                  ]
                },
                {
                  type: 'TEXT',
                  name: 'Feature Title',
                  styles: 'w-full h-auto text-xl font-semibold text-gray-900',
                  text: 'Easy to Use'
                },
                {
                  type: 'TEXT',
                  name: 'Feature Description',
                  styles: 'w-full h-auto text-base text-gray-600',
                  text: 'Intuitive interface and tools that make design accessible to everyone.'
                }
              ]
            }
          ]
        }
      ]
    },

    // CTA Section
    {
      type: 'FRAME',
      name: 'CTA Section',
      styles: 'flex-col w-full h-auto px-[64] py-[80] bg-blue-600 items-center gap-[32] text-center',
      children: [
        {
          type: 'TEXT',
          name: 'CTA Title',
          styles: 'w-[600] h-auto text-4xl font-bold text-white',
          text: 'Ready to Get Started?'
        },
        {
          type: 'TEXT',
          name: 'CTA Description',
          styles: 'w-[600] h-auto text-xl text-blue-100',
          text: 'Join thousands of designers who are already using our tools.'
        },
        {
          type: 'COMPONENT',
          name: 'Button/White',
          styles: 'flex w-auto h-auto items-center justify-center px-[32] py-[16] bg-white rounded-md mt-[16]',
          children: [{
            type: 'TEXT',
            styles: 'w-auto h-auto text-lg text-blue-600 font-medium',
            text: 'Start Free Trial'
          }]
        }
      ]
    }
  ]
};

// Create the landing page
const landingPage = createNodeForData(landingPageData);
figma.currentPage.appendChild(landingPage);
```

This landing page example demonstrates:
- Modern and clean design structure
- Responsive layout using Flex and Grid
- Consistent spacing and typography
- Component reuse (buttons, cards)
- Proper sizing with w-auto/h-auto for text elements
- Semantic color usage
- Nested layouts
- Shadow and border effects
- Icon integration
- Call-to-action sections

## Component System

### Component Set Structure

Component Sets are defined with the following structure:

```typescript
const buttonSystem: ComponentDefinition = {
  type: 'COMPONENT_SET',
  id: 'button-system',           // Unique ID for the component set
  name: 'Button',                // Base name of the component set
  props: {
    // Variant Properties - Shared by all child components
    variantProperties: {
      size: ['sm', 'md', 'lg'],
      style: ['primary', 'secondary', 'outline', 'ghost'],
      state: ['default', 'hover', 'pressed', 'disabled']
    },
    // Property Definitions - Shared properties for all child components
    propertyDefinitions: {
      text: {
        type: 'TEXT',
        defaultValue: 'Button'
      },
      icon: {
        type: 'TEXT',
        defaultValue: ''
      },
      iconPosition: {
        type: 'VARIANT',
        options: ['left', 'right'],
        defaultValue: 'left'
      },
      disabled: {
        type: 'BOOLEAN',
        defaultValue: false
      }
    },
    // Variants - Component definitions based on variant property combinations
    variants: {
      // Primary Button - Small
      'primary-sm-default': {
        id: 'button-primary-sm-default',
        name: 'Button/Primary/Small/Default',
        variant: {
          size: 'sm',
          style: 'primary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[12] py-[6] bg-blue-600 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-sm text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-sm font-medium text-white',
            bind: { text: 'text' }
          },
          {
            type: 'TEXT',
            name: 'Icon/Right',
            styles: 'w-auto h-auto text-sm text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'right'
              }
            }
          }
        ]
      },
      'primary-sm-hover': {
        id: 'button-primary-sm-hover',
        name: 'Button/Primary/Small/Hover',
        variant: {
          size: 'sm',
          style: 'primary',
          state: 'hover'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[12] py-[6] bg-blue-700 rounded-md',
        children: [/* Same structure as default */]
      },
      // Primary Button - Medium
      'primary-md-default': {
        id: 'button-primary-md-default',
        name: 'Button/Primary/Medium/Default',
        variant: {
          size: 'md',
          style: 'primary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-blue-600 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-base text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-base font-medium text-white',
            bind: { text: 'text' }
          },
          {
            type: 'TEXT',
            name: 'Icon/Right',
            styles: 'w-auto h-auto text-base text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'right'
              }
            }
          }
        ]
      },
      // Secondary Button - Medium
      'secondary-md-default': {
        id: 'button-secondary-md-default',
        name: 'Button/Secondary/Medium/Default',
        variant: {
          size: 'md',
          style: 'secondary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-gray-100 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-base text-gray-600',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-base font-medium text-gray-600',
            bind: { text: 'text' }
          }
        ]
      },
      // Outline Button - Medium
      'outline-md-default': {
        id: 'button-outline-md-default',
        name: 'Button/Outline/Medium/Default',
        variant: {
          size: 'md',
          style: 'outline',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-white border-2 border-gray-200 rounded-md',
        children: [/* Similar structure */]
      }
    }
  },
  defaultVariant: 'primary-md-default'
};
```

### Key Rules

1. **ID System**
   ```typescript
   {
     type: 'COMPONENT_SET',
     id: 'button-system',                // Component Set ID
     variants: {
       'primary-sm': {
         id: 'button-primary-sm',        // Variant Component ID
         name: 'Button/Primary/Small'    // Hierarchical name structure
       }
     }
   }
   ```

2. **Variant Properties**
   ```typescript
   variantProperties: {
     size: ['sm', 'md', 'lg'],          // Size variants
     style: ['primary', 'secondary']     // Style variants
   }
   ```
   - All child components must share the same variant properties
   - Variant property values must be selected from predefined options

3. **Naming Convention**
   ```typescript
   {
     name: 'Button',                     // Component set name
     variants: {
       'primary-sm': {
         name: 'Button/Primary/Small'    // {SetName}/{Style}/{Size}
       },
       'secondary-md': {
         name: 'Button/Secondary/Medium' // Name combining variant properties
       }
     }
   }
   ```

4. **Creating Instances**
   ```typescript
   const buttonInstance: ComponentInstance = {
     type: 'INSTANCE',
     componentId: 'button-primary-md',    // Reference to variant component ID
     variantProps: {                      // Must use values from variantProperties
       size: 'md',
       style: 'primary'
     },
     properties: {                        // Properties defined in propertyDefinitions
       text: 'Click me',
       icon: '→'
     }
   };
   ```

### Best Practices

1. **ID Management**
   - Assign unique IDs to component sets and each variant
   - Use meaningful prefixes and separators for IDs
   - Example: `button-system`, `button-primary-sm`

2. **Name Structuring**
   - Use hierarchical structure (parent/middle/child)
   - Reflect variant properties in names
   - Maintain consistent naming conventions

3. **Variant Property Management**
   - Define clear variant options
   - Apply consistent variant properties across all child components
   - Avoid unnecessary variant combinations

4. **Property Binding**
   - Use clear property names
   - Set appropriate default values
   - Maintain type safety

### Complete Button Component Set Example

Here's a comprehensive example of a Button Component Set with all variants and properties:

```typescript
const buttonSystem: ComponentDefinition = {
  type: 'COMPONENT_SET',
  id: 'button-system',
  name: 'Button',
  props: {
    // Variant Properties
    variantProperties: {
      size: ['sm', 'md', 'lg'],
      style: ['primary', 'secondary', 'outline', 'ghost'],
      state: ['default', 'hover', 'pressed', 'disabled']
    },
    // Property Definitions
    propertyDefinitions: {
      text: {
        type: 'TEXT',
        defaultValue: 'Button'
      },
      icon: {
        type: 'TEXT',
        defaultValue: ''
      },
      iconPosition: {
        type: 'VARIANT',
        options: ['left', 'right'],
        defaultValue: 'left'
      },
      disabled: {
        type: 'BOOLEAN',
        defaultValue: false
      }
    },
    // Variants
    variants: {
      // Primary Button - Small
      'primary-sm-default': {
        id: 'button-primary-sm-default',
        name: 'Button/Primary/Small/Default',
        variant: {
          size: 'sm',
          style: 'primary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[12] py-[6] bg-blue-600 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-sm text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-sm font-medium text-white',
            bind: { text: 'text' }
          },
          {
            type: 'TEXT',
            name: 'Icon/Right',
            styles: 'w-auto h-auto text-sm text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'right'
              }
            }
          }
        ]
      },
      'primary-sm-hover': {
        id: 'button-primary-sm-hover',
        name: 'Button/Primary/Small/Hover',
        variant: {
          size: 'sm',
          style: 'primary',
          state: 'hover'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[12] py-[6] bg-blue-700 rounded-md',
        children: [/* Same structure as default */]
      },
      // Primary Button - Medium
      'primary-md-default': {
        id: 'button-primary-md-default',
        name: 'Button/Primary/Medium/Default',
        variant: {
          size: 'md',
          style: 'primary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-blue-600 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-base text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-base font-medium text-white',
            bind: { text: 'text' }
          },
          {
            type: 'TEXT',
            name: 'Icon/Right',
            styles: 'w-auto h-auto text-base text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'right'
              }
            }
          }
        ]
      },
      // Secondary Button - Medium
      'secondary-md-default': {
        id: 'button-secondary-md-default',
        name: 'Button/Secondary/Medium/Default',
        variant: {
          size: 'md',
          style: 'secondary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-gray-100 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-base text-gray-600',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-base font-medium text-gray-600',
            bind: { text: 'text' }
          }
        ]
      },
      // Outline Button - Medium
      'outline-md-default': {
        id: 'button-outline-md-default',
        name: 'Button/Outline/Medium/Default',
        variant: {
          size: 'md',
          style: 'outline',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-white border-2 border-gray-200 rounded-md',
        children: [/* Similar structure */]
      }
    }
  },
  defaultVariant: 'primary-md-default'
};

// Example of creating button instances
const buttonInstances = {
  type: 'FRAME',
  name: 'Button Examples',
  styles: 'flex-col w-full h-auto gap-[24] p-[32]',
  children: [
    // Primary Button with Icon
    {
      type: 'INSTANCE',
      name: 'Primary Button with Left Icon',
      componentId: 'button-primary-md-default',
      variantProps: {
        size: 'md',
        style: 'primary',
        state: 'default'
      },
      properties: {
        text: 'Get Started',
        icon: '→',
        iconPosition: 'left'
      }
    },
    // Secondary Button
    {
      type: 'INSTANCE',
      name: 'Secondary Button',
      componentId: 'button-secondary-md-default',
      variantProps: {
        size: 'md',
        style: 'secondary',
        state: 'default'
      },
      properties: {
        text: 'Learn More'
      }
    },
    // Outline Button
    {
      type: 'INSTANCE',
      name: 'Outline Button',
      componentId: 'button-outline-md-default',
      variantProps: {
        size: 'md',
        style: 'outline',
        state: 'default'
      },
      properties: {
        text: 'Cancel'
      }
    },
    // Disabled Primary Button
    {
      type: 'INSTANCE',
      name: 'Disabled Primary Button',
      componentId: 'button-primary-md-default',
      variantProps: {
        size: 'md',
        style: 'primary',
        state: 'disabled'
      },
      properties: {
        text: 'Submit',
        disabled: true
      },
      styles: 'opacity-50'
    }
  ]
};
```

This example demonstrates:
- Complete variant system (size, style, state)
- Property definitions with defaults
- Icon positioning with conditional visibility
- State handling (default, hover, pressed, disabled)
- Consistent styling across variants
- Instance creation with property overrides
- Proper component naming structure
- Comprehensive style binding

## Using ComponentBuilder

The `ComponentBuilder` class provides a modern and efficient way to create and manage component systems in Figma. This section explains how to use the ComponentBuilder alongside the existing component system.

### Basic Usage

```typescript
import { ComponentBuilder } from '@easylogic/cssma';

// 1. Create a component set
const componentSet = ComponentBuilder.buildComponentSet(buttonSystem);

// 2. Create an instance
const instance = ComponentBuilder.buildInstance('button-primary-md', {
  text: 'Click me',
  icon: '→'
});

// 3. Convert instance to Figma node
const node = ComponentBuilder.buildNode(instance);
```

### Key Features

1. **Component Set Creation**
   ```typescript
   static buildComponentSet(definition: ComponentDefinition): ComponentSetNode
   ```
   Creates a complete component set with all variants:
   ```typescript
   const componentSet = ComponentBuilder.buildComponentSet({
     type: 'COMPONENT_SET',
     id: 'button-system',
     name: 'Button',
     props: {
       variantProperties: {
         size: ['sm', 'md', 'lg'],
         style: ['primary', 'secondary']
       },
       // ... other properties
     }
   });
   ```

2. **Instance Creation**
   ```typescript
   static buildInstance(
     componentId: string,
     properties?: Record<string, any>,
     variantProps?: Record<string, string>
   ): ComponentInstance
   ```
   Creates component instances with specified properties:
   ```typescript
   // Basic instance
   const basic = ComponentBuilder.buildInstance('button-primary-md');

   // Instance with properties
   const withProps = ComponentBuilder.buildInstance('button-primary-md', {
     text: 'Custom Button',
     icon: '→'
   });

   // Instance with properties and variant props
   const withVariants = ComponentBuilder.buildInstance('button-primary-md', {
     text: 'Custom Button',
     icon: '→'
   }, {
     size: 'md',
     style: 'primary'
   });
   ```

3. **Node Generation**
   ```typescript
   static buildNode(instance: ComponentInstance): SceneNode
   ```
   Converts component instances to Figma nodes:
   ```typescript
   const instance = ComponentBuilder.buildInstance('button-primary-md', {
     text: 'Click me'
   });
   const node = ComponentBuilder.buildNode(instance);
   figma.currentPage.appendChild(node);
   ```

### Advanced Usage

1. **Property Binding**
   ```typescript
   const buttonWithBinding = {
     id: 'button-primary',
     children: [
       {
         type: 'TEXT',
         name: 'Label',
         bind: {
           text: 'label',
           visible: {
             property: 'showLabel',
             value: true
           }
         }
       }
     ]
   };
   ```

2. **Style Management**
   ```typescript
   // Base styles
   const baseStyles = 'flex items-center justify-center rounded-md';
   
   // Variant-specific styles
   const buttonVariant = {
     id: 'button-primary',
     styles: `${baseStyles} bg-blue-500 text-white`,
     children: [/* ... */]
   };
   ```

3. **Component Organization**
   ```typescript
   const buttonSystem = {
     type: 'COMPONENT_SET',
     id: 'button-system',
     props: {
       variants: {
         'primary-sm-default': {
           id: 'button-primary-sm-default',
           name: 'Button/Primary/Small/Default',
           // ... variant properties
         },
         'primary-sm-hover': {
           id: 'button-primary-sm-hover',
           name: 'Button/Primary/Small/Hover',
           // ... variant properties
         }
       }
     }
   };
   ```

### Integration Example

Here's how to integrate ComponentBuilder with existing component definitions:

```typescript
// 1. Define your component system
const buttonSystem = {
  type: 'COMPONENT_SET',
  id: 'button-system',
  name: 'Button',
  props: {
    variantProperties: {
      size: ['sm', 'md', 'lg'],
      style: ['primary', 'secondary'],
      state: ['default', 'hover']
    },
    propertyDefinitions: {
      text: { type: 'TEXT', defaultValue: 'Button' },
      icon: { type: 'TEXT' },
      iconPosition: {
        type: 'VARIANT',
        options: ['left', 'right'],
        defaultValue: 'left'
      }
    },
    variants: {
      'primary-md-default': {
        id: 'button-primary-md-default',
        name: 'Button/Primary/Medium/Default',
        variant: {
          size: 'md',
          style: 'primary',
          state: 'default'
        },
        styles: 'flex items-center px-4 py-2 bg-blue-500 text-white rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'text-white font-medium',
            bind: { text: 'text' }
          }
        ]
      }
    }
  }
};

// 2. Create the component set
const componentSet = ComponentBuilder.buildComponentSet(buttonSystem);

// 3. Create instances with different configurations
const instances = [
  // Default button
  ComponentBuilder.buildInstance('button-primary-md-default', {
    text: 'Default Button'
  }),

  // Button with icon
  ComponentBuilder.buildInstance('button-primary-md-default', {
    text: 'Icon Button',
    icon: '→',
    iconPosition: 'right'
  }),

  // Button with custom variant
  ComponentBuilder.buildInstance('button-primary-md-default', {
    text: 'Custom Button'
  }, {
    size: 'lg',
    style: 'secondary'
  })
];

// 4. Convert instances to nodes and add to page
const container = figma.createFrame();
container.name = 'Button Examples';
container.layoutMode = 'VERTICAL';
container.itemSpacing = 16;

instances.forEach(instance => {
  const node = ComponentBuilder.buildNode(instance);
  container.appendChild(node);
});
```

This integration example shows how to:
- Define a complete component system
- Create a component set
- Generate multiple instances with different configurations
- Handle property binding and variants
- Organize components in a container
- Apply layout properties

## Supported Style Properties

### Layout Properties

```typescript
// Flex Direction
flex-row        → layoutMode: "HORIZONTAL"
flex-col        → layoutMode: "VERTICAL"

// Size
w-full          → layoutSizingHorizontal: "FILL"
w-auto          → layoutSizingHorizontal: "HUG"
w-[100]         → width: 100
h-full          → layoutSizingVertical: "FILL"
h-auto          → layoutSizingVertical: "HUG"
h-[100]         → height: 100

// Alignment
justify-start   → primaryAxisAlignItems: "MIN"
justify-center  → primaryAxisAlignItems: "CENTER"
justify-end     → primaryAxisAlignItems: "MAX"
justify-between → primaryAxisAlignItems: "SPACE_BETWEEN"

items-start     → counterAxisAlignItems: "MIN"
items-center    → counterAxisAlignItems: "CENTER"
items-end       → counterAxisAlignItems: "MAX"
items-baseline  → counterAxisAlignItems: "BASELINE"

// Spacing
gap-[16]        → itemSpacing: 16
gap-x-[16]      → itemSpacing: 16 (in HORIZONTAL layout)
gap-y-[16]      → counterAxisSpacing: 16 (in VERTICAL layout)
p-[16]          → padding: 16 (all sides)
px-[16]         → paddingLeft: 16, paddingRight: 16
py-[16]         → paddingTop: 16, paddingBottom: 16
pt-[16]         → paddingTop: 16
pr-[16]         → paddingRight: 16
pb-[16]         → paddingBottom: 16
pl-[16]         → paddingLeft: 16
```

### Colors and Gradients

```typescript
// Solid Colors
bg-[#FF0000]    → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
text-[#FF0000]  → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
bg-transparent  → fills: [] // Removes background fill
bg-white        → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
bg-black        → fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]

// With Opacity
bg-white/50     → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.5 }]
bg-[#FF0000]/75 → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 0.75 }]

// Linear Gradients
bg-linear-to-r from-[#FF0000] to-[#0000FF] →
fills: [{
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { position: 0, color: { r: 1, g: 0, b: 0 } },
    { position: 1, color: { r: 0, g: 0, b: 1 } }
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]]
}]

// Multi-stop Gradients
bg-linear-to-r from-[#FF0000] via-[#00FF00] to-[#0000FF] →
fills: [{
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { position: 0, color: { r: 1, g: 0, b: 0 } },
    { position: 0.5, color: { r: 0, g: 1, b: 0 } },
    { position: 1, color: { r: 0, g: 0, b: 1 } }
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]]
}]

// Radial and Conic Gradients
bg-radial from-[#FF0000] to-[#0000FF] → type: "GRADIENT_RADIAL"
bg-conic from-[#FF0000] to-[#0000FF] → type: "GRADIENT_ANGULAR"
```

### Typography

```typescript
// Font Size
text-xs        → fontSize: 12
text-sm        → fontSize: 14
text-base      → fontSize: 16
text-lg        → fontSize: 18
text-xl        → fontSize: 20
text-2xl       → fontSize: 24
text-3xl       → fontSize: 30
text-[20]      → fontSize: 20

// Font Weight
font-thin      → fontName: { family: "Inter", style: "Thin" }
font-extralight → fontName: { family: "Inter", style: "ExtraLight" }
font-light     → fontName: { family: "Inter", style: "Light" }
font-normal    → fontName: { family: "Inter", style: "Regular" }
font-medium    → fontName: { family: "Inter", style: "Medium" }
font-semibold  → fontName: { family: "Inter", style: "SemiBold" }
font-bold      → fontName: { family: "Inter", style: "Bold" }
font-extrabold → fontName: { family: "Inter", style: "ExtraBold" }
font-black     → fontName: { family: "Inter", style: "Black" }

// Font Style
italic        → fontName: { family: "Inter", style: "Italic" }
not-italic    → fontName: { family: "Inter", style: "Regular" }

// Font Family
font-sans     → fontName: { family: "Inter", style: "Regular" }
font-serif    → fontName: { family: "Georgia", style: "Regular" }
font-mono     → fontName: { family: "Roboto Mono", style: "Regular" }
font-[Arial]  → fontName: { family: "Arial", style: "Regular" }

// Text Alignment
text-left      → textAlignHorizontal: "LEFT"
text-center    → textAlignHorizontal: "CENTER"
text-right     → textAlignHorizontal: "RIGHT"
text-justify   → textAlignHorizontal: "JUSTIFIED"

// Text Decoration
underline      → textDecoration: "UNDERLINE"
line-through   → textDecoration: "STRIKETHROUGH"
no-underline   → textDecoration: "NONE"

// Line Height
leading-none   → lineHeight: { value: 100, unit: "PERCENT" }
leading-tight  → lineHeight: { value: 125, unit: "PERCENT" }
leading-normal → lineHeight: { value: 150, unit: "PERCENT" }
leading-[1.5]  → lineHeight: { value: 150, unit: "PERCENT" }
leading-[24px] → lineHeight: { value: 24, unit: "PIXELS" }

// Letter Spacing
tracking-tight  → letterSpacing: -0.4
tracking-normal → letterSpacing: 0
tracking-wide   → letterSpacing: 0.4
tracking-[0.5]  → letterSpacing: 0.5
```

### Border Properties

```typescript
// Border Width
border         → borderWidth: 1
border-2       → borderWidth: 2
border-4       → borderWidth: 4
border-[3]     → borderWidth: 3

// Border Color
border-white   → strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
border-black   → strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]
border-[#FF0000] → strokes: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// Border Style
border-solid   → borderStyle: "SOLID"
border-dashed  → borderStyle: "DASHED"
border-dotted  → borderStyle: "DOTTED"

// Border Dash Pattern
border-dashed-[4,2]  → dashPattern: [4, 2]
border-dashed-[5,3,2] → dashPattern: [5, 3, 2]
```

### Effects

```typescript
// Shadows
shadow-sm      → effects: [{ type: "DROP_SHADOW", radius: 2, spread: 0, ... }]
shadow-md      → effects: [{ type: "DROP_SHADOW", radius: 6, spread: -2, ... }]
shadow-lg      → effects: [{ type: "DROP_SHADOW", radius: 10, spread: -3, ... }]

// Opacity
opacity-[0.5]  → opacity: 0.5
```

### Geometry

```typescript
// Border Radius
rounded-none   → borderRadius: 0
rounded-sm     → borderRadius: 2
rounded        → borderRadius: 4
rounded-md     → borderRadius: 6
rounded-lg     → borderRadius: 8
rounded-xl     → borderRadius: 12
rounded-2xl    → borderRadius: 16
rounded-3xl    → borderRadius: 24
rounded-full   → borderRadius: 9999
rounded-[10]   → borderRadius: 10

// Individual Corner Radius
rounded-t-lg   → borderRadiusTop: 8
rounded-r-lg   → borderRadiusRight: 8
rounded-b-lg   → borderRadiusBottom: 8
rounded-l-lg   → borderRadiusLeft: 8
rounded-tl-lg  → borderRadiusTopLeft: 8
rounded-tr-lg  → borderRadiusTopRight: 8
rounded-br-lg  → borderRadiusBottomRight: 8
rounded-bl-lg  → borderRadiusBottomLeft: 8
```

## Value Parsing Rules

### Unit Handling

```typescript
// Pixel Units
w-[100px]      → width: 100       // px is automatically stripped
h-[24px]       → height: 24
gap-[16px]     → itemSpacing: 16

// Numbers Only
w-[100]        → width: 100       // same as w-[100px]
h-[24]         → height: 24
gap-[16]       → itemSpacing: 16

// Preset Values
gap-4          → itemSpacing: 16  // preset values are multiplied by 4
p-4            → padding: 16
```

## Limitations

1. Some Tailwind CSS properties may not have direct equivalents in Figma and won't be converted.
2. Complex responsive styles are not supported.
3. Some Figma-specific features may not convert perfectly to Tailwind CSS.
4. Currently only supports the Inter font family by default.

## Future Improvements

1. Support for more Tailwind CSS properties
2. Custom font family support
3. Responsive style support
4. More accurate color conversion
5. Support for additional effects and animations

## Contributing

We welcome contributions! If you'd like to improve @easylogic/cssma, please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License

---

For more detailed usage and examples, please refer to the [documentation](../docs/spec.md).


