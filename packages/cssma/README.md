# cssma

A library for converting Tailwind CSS like styles to Figma styles and vice versa.

## Overview

`cssma` provides a seamless bridge between Tailwind CSS and Figma's design system. This library allows you to convert Tailwind CSS classes to Figma style objects and convert Figma styles back to Tailwind CSS classes.

## Installation

```bash
npm install cssma
```

or

```bash
pnpm add cssma
```

or

```bash
yarn add cssma
```

## Simple Start

Here's how to get started with `cssma` in a Figma plugin:

```typescript
import { applyCssStyles, processCssStyles } from 'cssma';

// Method 1: Apply styles directly to a node (Recommended)
const frame = figma.createFrame();
frame.name = 'My Card';

// Apply styles directly - this is the easiest way!
await applyCssStyles(frame, 'flex-col bg-white rounded-lg p-[16] gap-[8]');

// Method 2: Convert CSS to Figma styles object first
const styles = processCssStyles('w-[300] h-[200] bg-blue-500');
console.log(styles);
// → { width: 300, height: 200, fills: [{ type: 'SOLID', color: { r: 0.33, g: 0.65, b: 1 } }] }

// Then manually apply the styles
Object.assign(frame, styles);

// Add to page
figma.currentPage.appendChild(frame);
```


## Quick Reference

### API Overview

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `applyCssStyles(node, css)` | Apply CSS → Figma node | Figma node + CSS class string | Styled Figma node |
| `processCssStyles(css)` | CSS → Figma styles | CSS class string | Figma style object |
| `figmaToCss(styles)` | Figma → CSS (complete) | Figma style object | CSS class string |
| `createNodeForData(data)` | Create Figma nodes | NodeData object | Figma node |

### Most Used CSS Classes

#### Layout
```typescript
// Flexbox
'flex'                // layoutMode: "HORIZONTAL"
'flex-col'            // layoutMode: "VERTICAL"
'flex-row'            // layoutMode: "HORIZONTAL"
'items-center'        // counterAxisAlignItems: "CENTER"
'justify-center'      // primaryAxisAlignItems: "CENTER"
'gap-[16]'            // itemSpacing: 16

// Sizing
'w-full'            // layoutSizingHorizontal: "FILL"
'h-auto'            // layoutSizingVertical: "HUG"
'w-[300]'           // width: 300
'h-[200]'           // height: 200

// Self Alignment (NEW!)
'self-start'        // layoutAlign: "MIN"
'self-center'       // layoutAlign: "CENTER"
'self-end'          // layoutAlign: "MAX"
'self-stretch'      // layoutAlign: "STRETCH"
```

#### Spacing
```typescript
// Padding
'p-[16]'            // padding: 16 (all sides)
'px-[20]'           // paddingLeft/Right: 20
'py-[12]'           // paddingTop/Bottom: 12
'pt-[8]'            // paddingTop: 8

// Gaps
'gap-[8]'           // itemSpacing: 8
'gap-x-[12]'        // counterAxisSpacing: 12
```

#### Colors
```typescript
// Solid Colors
'bg-white'          // fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
'bg-[#FF0000]'      // fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
'text-gray-900'     // fills: [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }]

// Opacity
'bg-opacity-80'     // fill opacity: 0.8
'opacity-50'        // node opacity: 0.5
```

#### Border & Radius
```typescript
// Border
'border'            // strokeWeight: 1
'border-2'          // strokeWeight: 2
'border-blue-500'   // stroke color

// Radius
'rounded'           // cornerRadius: 4
'rounded-lg'        // cornerRadius: 8
'rounded-xl'        // cornerRadius: 12
'rounded-[16]'      // cornerRadius: 16
```

#### Typography
```typescript
// Size
'text-sm'           // fontSize: 14
'text-base'         // fontSize: 16
'text-lg'           // fontSize: 18
'text-xl'           // fontSize: 20

// Weight
'font-normal'       // fontWeight: 400
'font-medium'       // fontWeight: 500
'font-semibold'     // fontWeight: 600
'font-bold'         // fontWeight: 700

// Alignment
'text-left'         // textAlignHorizontal: "LEFT"
'text-center'       // textAlignHorizontal: "CENTER"
'text-right'        // textAlignHorizontal: "RIGHT"
```

#### Effects
```typescript
// Shadows
'shadow-sm'         // subtle shadow
'shadow'            // default shadow
'shadow-md'         // medium shadow
'shadow-lg'         // large shadow
'shadow-xl'         // extra large shadow

// Custom shadows
'shadow-[0_4px_8px_rgba(0,0,0,0.1)]'  // custom shadow values
```

#### Animations & Transitions
```typescript
// Transitions
'transition'        // transition: all 150ms ease
'transition-colors' // transition: color, background-color, border-color, text-decoration-color, fill, stroke
'transition-opacity' // transition: opacity
'transition-transform' // transition: transform

// Duration
'duration-200'      // transition-duration: 200ms
'duration-300'      // transition-duration: 300ms
'duration-[500ms]'  // transition-duration: 500ms

// Timing Functions
'ease-linear'       // transition-timing-function: linear
'ease-in'          // transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
'ease-out'         // transition-timing-function: cubic-bezier(0, 0, 0.2, 1)
'ease-in-out'      // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)

// Animations
'animate-spin'      // spin animation (360° rotation)
'animate-ping'      // ping animation (scale + opacity)
'animate-pulse'     // pulse animation (opacity fade)
'animate-bounce'    // bounce animation (translate + scale)
```

### Common Patterns

#### Design System Components
```typescript
// Button variants
const primaryButton = 'flex items-center justify-center px-[16] py-[8] bg-blue-500 text-white rounded-lg';
const secondaryButton = 'flex items-center justify-center px-[16] py-[8] bg-white border border-gray-300 text-gray-700 rounded-lg';

// Card layouts
const card = 'flex-col bg-white rounded-xl shadow-lg p-[20] gap-[16]';
const cardHeader = 'flex-row items-center justify-between mb-[12]';
const cardContent = 'flex-col gap-[8]';

// Navigation
const sidebar = 'flex-col w-[240] h-full bg-white border-r border-gray-200 p-[24]';
const navItem = 'flex items-center px-[12] py-[8] rounded-lg hover:bg-gray-100';

// Grid systems
const gridContainer = 'grid grid-cols-12 gap-[16] w-full';
const gridItem = 'col-span-4 h-[200] bg-gray-100 rounded-lg';
```

#### Animation Patterns
```typescript
// Interactive buttons with hover animations
const animatedButton = 'px-[16] py-[8] bg-blue-500 text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105';
const pulseButton = 'px-[16] py-[8] bg-green-500 text-white rounded-lg animate-pulse hover:animate-none transition-all duration-200';

// Loading states
const spinner = 'w-[32] h-[32] border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin';
const loadingDots = 'flex gap-[4]'; // Use with multiple animate-bounce elements with delay

// Micro-interactions
const hoverCard = 'p-[20] bg-white rounded-xl shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1';
const slideIn = 'transform transition-transform duration-500 ease-out translate-x-[-100] animate-none'; // Add class to trigger

// Form feedback
const successFeedback = 'p-[12] bg-green-100 text-green-800 rounded-lg transition-opacity duration-300';
const errorShake = 'transition-transform duration-150 ease-in-out hover:animate-bounce'; // Can be triggered programmatically
```

#### Responsive Patterns
```typescript
// Container patterns
const responsiveContainer = 'w-full max-w-[1200] mx-auto px-[16]';
const flexContainer = 'flex-col lg:flex-row gap-[24]';
const gridResponsive = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16]';

// Content patterns
const hero = 'flex-col items-center text-center py-[80] px-[20]';
const section = 'w-full py-[60] px-[20]';
const twoColumn = 'grid grid-cols-1 lg:grid-cols-2 gap-[40] items-center';
```


## Dynamic Style System

CSSMA now includes a powerful dynamic style system that solves the common problem of Tailwind CSS not generating styles for arbitrary values at runtime. This system converts Tailwind classes to CSS and injects them dynamically into the document.

### Problem Solved

When using Tailwind CSS with dynamic values like `w-[320px]` or `bg-[#FF0000]`, these styles often don't work because Tailwind only includes classes that are detected at build time. Our dynamic style system solves this by:

1. **Parsing** Tailwind classes using CSSMA's existing parser
2. **Generating** unique CSS classes with proper styles
3. **Injecting** styles into the document head automatically
4. **Caching** styles to prevent duplicates

### Basic Usage

#### Method 1: React Hook (Recommended)

```typescript
import { useCssma } from 'cssma';

function MyComponent({ nodeData }) {
  // Works with any CSSMA/Tailwind classes - static, dynamic, or mixed!
  const className = useCssma('flex items-center w-[320] h-[240] bg-[#FF0000] p-4 rounded-lg');
  
  return <div className={className}>Styled element</div>;
}

// Perfect for template rendering
function TemplateRenderer({ template }) {
  const className = useCssma(template.styles);
  
  return (
    <div className={className}>
      {template.children?.map((child, index) => (
        <TemplateRenderer key={index} template={child} />
      ))}
      {template.text && <span>{template.text}</span>}
    </div>
  );
}
```

#### Method 2: Direct API Usage

```typescript
import { generateDynamicStyle, injectDynamicStyle } from 'cssma';

// Generate CSS class and content
const { className, styleContent, hash } = generateDynamicStyle('w-[320] h-[240] bg-[#FF0000]');

// Inject into document
injectDynamicStyle(hash, styleContent);

// Use the generated class
document.getElementById('myElement').className = className;
```

### Advanced Features

#### Dynamic Props

```typescript
import { useCssma } from 'cssma';

function Card({ width, height, color }) {
  const className = useCssma(`flex flex-col items-center p-4 rounded-lg shadow-md w-[${width}] h-[${height}] bg-[${color}]`);
  
  return (
    <div className={className}>
      <h3>Dynamic Card</h3>
      <p>Width: {width}px, Height: {height}px</p>
    </div>
  );
}
```

#### Conditional Styles

```typescript
import { useCssma } from 'cssma';

function ConditionalComponent({ isActive, size }) {
  const baseStyles = `w-[${size}] h-[${size}] rounded-lg transition-colors`;
  const conditionalStyles = isActive ? 'bg-[#00FF00]' : 'bg-[#CCCCCC]';
  const className = useCssma(`${baseStyles} ${conditionalStyles}`);
  
  return <div className={className}>Conditional Element</div>;
}
```

### Performance Features

#### Automatic Deduplication
```typescript
// These will generate the same CSS class and reuse it
const class1 = useCssma('w-[320] h-[240]');
const class2 = useCssma('w-[320] h-[240]'); // Same class, no duplicate CSS
```

#### Style Statistics
```typescript
import { getStyleStats } from 'cssma';

// Get information about injected styles
const stats = getStyleStats();
console.log(`Injected ${stats.count} unique styles`);
console.log('Style hashes:', stats.hashes);
```

#### Manual Cleanup
```typescript
import { useDynamicTailwindWithCleanup } from 'cssma';

function CleanupComponent() {
  const { className, cleanup } = useDynamicTailwindWithCleanup('w-[320] h-[240]', false);
  
  const handleCleanup = () => {
    cleanup(); // Manually remove the style
  };
  
  return (
    <div>
      <div className={className}>Styled element</div>
      <button onClick={handleCleanup}>Clean up styles</button>
    </div>
  );
}
```

### Integration with Template System

Perfect for template galleries where you need to render components with dynamic styles:

```typescript
import { useCssma } from 'cssma';

function TemplateRenderer({ template }) {
  const className = useCssma(template.styles);
  
  return (
    <div className={className}>
      {template.children?.map((child, index) => (
        <TemplateRenderer key={index} template={child} />
      ))}
      {template.text && <span>{template.text}</span>}
    </div>
  );
}

// Usage with NodeData
const template = {
  name: "Card",
  styles: "flex flex-col w-[320] h-[240] bg-[#FFFFFF] p-[16] rounded-[8] shadow-lg",
  children: [
    {
      name: "Header",
      styles: "text-[18] font-bold text-[#333333] mb-[8]",
      text: "Card Title"
    }
  ]
};
```

### API Reference

#### Hooks

| Hook | Purpose | Parameters | Returns |
|------|---------|------------|---------|
| `useCssma` | Main hook for all CSSMA styles | `cssmaClasses: string` | `className: string` |

#### Core Functions

| Function | Purpose | Parameters | Returns |
|----------|---------|------------|---------|
| `generateDynamicStyle` | Generate CSS class | `tailwindClasses: string` | `{ className, styleContent, hash }` |
| `injectDynamicStyle` | Inject CSS into document | `hash: string, styleContent: string` | `void` |
| `generateHybridStyles` | Separate static/dynamic | `tailwindClasses: string` | `{ staticClassName, dynamicClassName, styleContent, hash }` |

## Real-World Examples

### Design System Creation

Create a complete design system with components using declarative JSON:

```typescript
import { createNodeForData } from 'cssma';

// 1. Color Palette Component
const colorPaletteData = {
  type: 'FRAME',
  name: 'Color Palette',
  styles: 'flex-col w-full h-auto gap-[24] p-[32] bg-gray-50',
  children: [
    {
      type: 'TEXT',
      name: 'Section Title',
      styles: 'text-2xl font-bold text-gray-900 mb-[16]',
      text: 'Brand Colors'
    },
    {
      type: 'FRAME',
      name: 'Primary Colors',
      styles: 'flex-row w-full gap-[16]',
      children: [
        {
          type: 'FRAME',
          name: 'Primary 500',
          styles: 'flex-col items-center gap-[8]',
          children: [
            {
              type: 'RECTANGLE',
              name: 'Color Swatch',
              styles: 'w-[80] h-[80] bg-blue-500 rounded-lg shadow-sm'
            },
            {
              type: 'TEXT',
              name: 'Color Name',
              styles: 'text-sm font-medium text-gray-700',
              text: 'Primary 500'
            },
            {
              type: 'TEXT',
              name: 'Hex Value',
              styles: 'text-xs text-gray-500',
              text: '#3B82F6'
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Primary 600',
          styles: 'flex-col items-center gap-[8]',
          children: [
            {
              type: 'RECTANGLE',
              name: 'Color Swatch',
              styles: 'w-[80] h-[80] bg-blue-600 rounded-lg shadow-sm'
            },
            {
              type: 'TEXT',
              name: 'Color Name',
              styles: 'text-sm font-medium text-gray-700',
              text: 'Primary 600'
            },
            {
              type: 'TEXT',
              name: 'Hex Value',
              styles: 'text-xs text-gray-500',
              text: '#2563EB'
            }
          ]
        }
      ]
    }
  ]
};

// 2. Button Variants Component Set
const buttonVariantsData = {
  type: 'COMPONENT_SET',
  name: 'Button Variants',
  styles: 'flex-row gap-[24] p-[32]',
  children: [
    {
      type: 'COMPONENT',
      name: 'Button/Primary',
      styles: 'flex items-center justify-center px-[24] py-[12] bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm',
      children: [{
        type: 'TEXT',
        styles: 'text-white font-medium',
        text: 'Primary Button'
      }]
    },
    {
      type: 'COMPONENT',
      name: 'Button/Secondary',
      styles: 'flex items-center justify-center px-[24] py-[12] bg-white border border-gray-300 hover:bg-gray-50 rounded-lg',
      children: [{
        type: 'TEXT',
        styles: 'text-gray-700 font-medium',
        text: 'Secondary Button'
      }]
    },
    {
      type: 'COMPONENT',
      name: 'Button/Danger',
      styles: 'flex items-center justify-center px-[24] py-[12] bg-red-500 hover:bg-red-600 rounded-lg shadow-sm',
      children: [{
        type: 'TEXT',
        styles: 'text-white font-medium',
        text: 'Danger Button'
      }]
    }
  ]
};

// 3. Complex Card Component
const cardComponentData = {
  type: 'COMPONENT',
  name: 'Product Card',
  styles: 'flex-col w-[320] h-auto bg-white rounded-xl shadow-lg overflow-hidden',
  children: [
    {
      type: 'FRAME',
      name: 'Image Container',
      styles: 'w-full h-[200] bg-gradient-to-br from-blue-400 to-purple-500 relative',
      children: [
        {
          type: 'FRAME',
          name: 'Badge',
          styles: 'absolute top-[12] right-[12] px-[8] py-[4] bg-white bg-opacity-90 rounded-full',
          children: [{
            type: 'TEXT',
            styles: 'text-xs font-semibold text-blue-600',
            text: 'NEW'
          }]
        }
      ]
    },
    {
      type: 'FRAME',
      name: 'Content',
      styles: 'flex-col p-[20] gap-[12]',
      children: [
        {
          type: 'TEXT',
          name: 'Product Name',
          styles: 'text-lg font-bold text-gray-900',
          text: 'Premium Product'
        },
        {
          type: 'TEXT',
          name: 'Description',
          styles: 'text-sm text-gray-600 leading-relaxed',
          text: 'This is a detailed description of the premium product with all its amazing features.'
        },
        {
          type: 'FRAME',
          name: 'Price Section',
          styles: 'flex-row items-center justify-between mt-[8]',
          children: [
            {
              type: 'TEXT',
              name: 'Price',
              styles: 'text-2xl font-bold text-gray-900',
              text: '$99.99'
            },
            {
              type: 'FRAME',
              name: 'CTA Button',
              styles: 'flex items-center justify-center px-[16] py-[8] bg-blue-500 hover:bg-blue-600 rounded-lg',
              children: [{
                type: 'TEXT',
                styles: 'text-white font-medium',
                text: 'Add to Cart'
              }]
            }
          ]
        }
      ]
    }
  ]
};

// Create all components
const colorPalette = createNodeForData(colorPaletteData);
const buttonVariants = createNodeForData(buttonVariantsData);
const cardComponent = createNodeForData(cardComponentData);

// Add to current page
figma.currentPage.appendChild(colorPalette);
figma.currentPage.appendChild(buttonVariants);
figma.currentPage.appendChild(cardComponent);
```

### Advanced Layout Examples

```typescript
// 1. Responsive Grid System
const gridSystemData = {
  type: 'FRAME',
  name: 'Grid System',
  styles: 'flex-col w-full gap-[32] p-[32]',
  children: [
    {
      type: 'FRAME',
      name: '12 Column Grid',
      styles: 'grid w-full grid-cols-12 gap-[16]',
      children: Array(12).fill(null).map((_, i) => ({
        type: 'RECTANGLE',
        name: `Col ${i + 1}`,
        styles: 'h-[60] bg-blue-100 border border-blue-200 rounded flex items-center justify-center'
      }))
    },
    {
      type: 'FRAME',
      name: 'Complex Layout',
      styles: 'grid w-full grid-cols-12 gap-[16]',
      children: [
        {
          type: 'RECTANGLE',
          name: 'Sidebar',
          styles: 'col-span-3 h-[300] bg-gray-200 rounded-lg'
        },
        {
          type: 'FRAME',
          name: 'Main Content',
          styles: 'col-span-9 flex-col gap-[16]',
          children: [
            {
              type: 'RECTANGLE',
              name: 'Header',
              styles: 'w-full h-[80] bg-blue-100 rounded-lg'
            },
            {
              type: 'FRAME',
              name: 'Content Grid',
              styles: 'grid grid-cols-2 gap-[16]',
              children: Array(4).fill(null).map((_, i) => ({
                type: 'RECTANGLE',
                name: `Content ${i + 1}`,
                styles: 'h-[100] bg-green-100 rounded-lg'
              }))
            }
          ]
        }
      ]
    }
  ]
};

// 2. Dashboard Layout
const dashboardData = {
  type: 'FRAME',
  name: 'Dashboard',
  styles: 'flex w-full h-[800] bg-gray-50',
  children: [
    {
      type: 'FRAME',
      name: 'Sidebar',
      styles: 'flex-col w-[240] h-full bg-white border-r border-gray-200 p-[24] gap-[16]',
      children: [
        {
          type: 'TEXT',
          name: 'Logo',
          styles: 'text-xl font-bold text-gray-900 mb-[24]',
          text: 'Dashboard'
        },
        ...['Analytics', 'Users', 'Products', 'Settings'].map(item => ({
          type: 'FRAME',
          name: `Nav ${item}`,
          styles: 'flex items-center w-full px-[12] py-[8] hover:bg-gray-100 rounded-lg cursor-pointer',
          children: [{
            type: 'TEXT',
            styles: 'text-gray-700 font-medium',
            text: item
          }]
        }))
      ]
    },
    {
      type: 'FRAME',
      name: 'Main Content',
      styles: 'flex-col flex-1 h-full overflow-hidden',
      children: [
        {
          type: 'FRAME',
          name: 'Header',
          styles: 'flex items-center justify-between w-full h-[64] bg-white border-b border-gray-200 px-[32]',
          children: [
            {
              type: 'TEXT',
              name: 'Page Title',
              styles: 'text-2xl font-bold text-gray-900',
              text: 'Analytics Overview'
            },
            {
              type: 'FRAME',
              name: 'User Menu',
              styles: 'flex items-center gap-[16]',
              children: [
                {
                  type: 'ELLIPSE',
                  name: 'Avatar',
                  styles: 'w-[32] h-[32] bg-blue-500'
                },
                {
                  type: 'TEXT',
                  styles: 'text-sm font-medium text-gray-700',
                  text: 'John Doe'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Content Area',
          styles: 'flex-1 p-[32] overflow-auto',
          children: [
            {
              type: 'FRAME',
              name: 'Stats Grid',
              styles: 'grid grid-cols-4 gap-[24] mb-[32]',
              children: [
                'Total Users', 'Revenue', 'Orders', 'Conversion'
              ].map((stat, i) => ({
                type: 'FRAME',
                name: `Stat ${stat}`,
                styles: 'flex-col p-[20] bg-white rounded-lg shadow-sm border border-gray-200',
                children: [
                  {
                    type: 'TEXT',
                    name: 'Value',
                    styles: 'text-3xl font-bold text-gray-900 mb-[4]',
                    text: `${(i + 1) * 1234}`
                  },
                  {
                    type: 'TEXT',
                    name: 'Label',
                    styles: 'text-sm text-gray-600',
                    text: stat
                  }
                ]
              }))
            }
          ]
        }
      ]
    }
  ]
};

const gridSystem = createNodeForData(gridSystemData);
const dashboard = createNodeForData(dashboardData);
```

### Figma-to-CSS Conversion Examples

```typescript
import { figmaToCss, figmaLayoutToCss, figmaColorsToCss } from 'cssma';

// 1. Convert complex Figma component to CSS
const complexFigmaNode = {
  layoutMode: "VERTICAL",
  primaryAxisAlignItems: "MIN",
  counterAxisAlignItems: "STRETCH",
  layoutSizingHorizontal: "FILL",
  layoutSizingVertical: "HUG",
  itemSpacing: 16,
  paddingTop: 24,
  paddingRight: 20,
  paddingBottom: 24,
  paddingLeft: 20,
  fills: [{
    type: "SOLID",
    color: { r: 1, g: 1, b: 1 },
    opacity: 0.95
  }],
  cornerRadius: 12,
  effects: [{
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 8,
    spread: 0
  }],
  strokes: [{
    type: "SOLID",
    color: { r: 0.9, g: 0.9, b: 0.9 }
  }],
  strokeWeight: 1
};

const cssClasses = figmaToCss(complexFigmaNode);
console.log(cssClasses);
// Output: "flex-col items-stretch w-full h-auto gap-[16] px-[20] py-[24] bg-white bg-opacity-95 rounded-xl shadow-lg border border-gray-200"

// 2. Selective conversion for performance
const layoutOnly = figmaLayoutToCss(complexFigmaNode);
console.log(layoutOnly);
// Output: ["flex-col", "items-stretch", "w-full", "h-auto", "gap-[16]", "px-[20]", "py-[24]"]

const visualOnly = [
  ...figmaColorsToCss(complexFigmaNode),
  ...figmaGeometryToCss(complexFigmaNode),
  ...figmaShadowToCss(complexFigmaNode),
  ...figmaBorderToCss(complexFigmaNode)
].join(' ');
console.log(visualOnly);
// Output: "bg-white bg-opacity-95 rounded-xl shadow-lg border border-gray-200"

// 3. Batch conversion for multiple nodes
const figmaNodes = [
  { layoutMode: "HORIZONTAL", itemSpacing: 8, fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }] },
  { layoutMode: "VERTICAL", paddingTop: 16, cornerRadius: 8 },
  { fontSize: 18, fontWeight: 600, fills: [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }] }
];

const convertedNodes = figmaNodes.map(node => ({
  original: node,
  css: figmaToCss(node),
  layoutCss: figmaLayoutToCss(node),
  colorsCss: figmaColorsToCss(node)
}));

console.log(convertedNodes);
// Detailed conversion results for batch processing
```

### Integration with Frontend Frameworks

```typescript
// React Component Example
import React from 'react';
import { figmaToCss } from 'cssma';

const FigmaStyledComponent = ({ figmaStyles, children }) => {
  const cssClasses = figmaToCss(figmaStyles);
  
  return (
    <div className={cssClasses}>
      {children}
    </div>
  );
};

// Usage
const cardStyles = {
  layoutMode: "VERTICAL",
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 16,
  paddingRight: 16,
  fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }],
  cornerRadius: 8,
  effects: [{ type: "DROP_SHADOW", radius: 4 }]
};

function App() {
  return (
    <FigmaStyledComponent figmaStyles={cardStyles}>
      <h2>Card Title</h2>
      <p>Card content here</p>
    </FigmaStyledComponent>
  );
}

// Vue Component Example
import { figmaToCss } from 'cssma';

export default {
  name: 'FigmaStyledComponent',
  props: ['figmaStyles'],
  computed: {
    cssClasses() {
      return figmaToCss(this.figmaStyles);
    }
  },
  template: `
    <div :class="cssClasses">
      <slot></slot>
    </div>
  `
};
```

## Core Features

### 1. Tailwind CSS → Figma Conversion (`processCssStyles`)

Convert Tailwind CSS class strings to Figma style objects:

```typescript
import { processCssStyles } from 'cssma';

const styles = processCssStyles('flex-col w-full bg-[#FF0000] rounded-lg');
// Apply the result to a Figma node
node.layoutMode = styles.layoutMode;
node.fills = styles.fills;
node.cornerRadius = styles.cornerRadius;
```

### 2. Figma → Tailwind CSS Conversion

#### 2.1 Complete Conversion (`figmaToCss`)

Convert all Figma style properties to Tailwind CSS class strings:

```typescript
import { figmaToCss } from 'cssma';

const tailwindClasses = figmaToCss({
  layoutMode: "VERTICAL",
  fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
  cornerRadius: 8,
  paddingTop: 16,
  paddingBottom: 16,
  itemSpacing: 8
});
// Result: "flex-col bg-[#ff0000] rounded-lg py-[16] gap-[8]"
```

#### 2.2 Modular Conversion (Individual Converters)

For better performance and selective conversion, use individual converter functions:

```typescript
import { 
  figmaLayoutToCss,
  figmaColorsToCss,
  figmaTypographyToCss,
  figmaEffectsToCss,
  figmaGeometryToCss,
  figmaBorderToCss,
  figmaShadowToCss,
  figmaSpacingToCss,
  figmaPositionToCss,
  figmaSizeToCss
} from 'cssma';

// Convert only layout properties
const layoutClasses = figmaLayoutToCss({
  layoutMode: "HORIZONTAL",
  primaryAxisAlignItems: "CENTER",
  counterAxisAlignItems: "CENTER",
  itemSpacing: 12
});
// Result: ["flex-row", "justify-center", "items-center", "gap-[12]"]

// Convert only colors
const colorClasses = figmaColorsToCss({
  fills: [{ 
    type: "SOLID", 
    color: { r: 0.2, g: 0.6, b: 1 },
    opacity: 0.8 
  }]
});
// Result: ["bg-[#3396ff]", "bg-opacity-80"]

// Convert only typography
const textClasses = figmaTypographyToCss({
  fontSize: 18,
  fontWeight: 600,
  fills: [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }],
  textAlignHorizontal: "CENTER"
});
// Result: ["text-lg", "font-semibold", "text-[#1a1a1a]", "text-center"]

// Combine multiple converters
const combinedClasses = [
  ...figmaLayoutToCss(styles),
  ...figmaColorsToCss(styles),
  ...figmaTypographyToCss(styles)
].join(' ');
```

#### 2.3 Advanced Modular Usage Examples

**Selective Component Styling:**
```typescript
// Only convert layout for responsive containers
const containerLayout = figmaLayoutToCss({
  layoutMode: "VERTICAL",
  layoutSizingHorizontal: "FILL",
  paddingTop: 24,
  paddingBottom: 24,
  itemSpacing: 16
});
// Result: ["flex-col", "w-full", "py-[24]", "gap-[16]"]

// Only convert visual styles for theming
const visualStyles = [
  ...figmaColorsToCss(styles),
  ...figmaBorderToCss(styles),
  ...figmaShadowToCss(styles)
].join(' ');

// Only convert typography for text components
const textStyles = figmaTypographyToCss({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: { unit: "PERCENT", value: 150 },
  letterSpacing: { unit: "PERCENT", value: 2 }
});
// Result: ["text-sm", "font-normal", "leading-[150%]", "tracking-[0.02em]"]
```

**Performance Optimization:**
```typescript
// For large datasets, use only needed converters
const nodes = figmaNodes.map(node => {
  const classes = [];
  
  // Only process layout if it has layout properties
  if (node.layoutMode) {
    classes.push(...figmaLayoutToCss(node));
  }
  
  // Only process colors if it has fills
  if (node.fills?.length) {
    classes.push(...figmaColorsToCss(node));
  }
  
  // Only process spacing if it has padding/spacing
  if (node.paddingTop || node.itemSpacing) {
    classes.push(...figmaSpacingToCss(node));
  }
  
  return classes.join(' ');
});
```

**Custom Converter Combinations:**
```typescript
// Create custom converter for specific use cases
function convertCardStyles(figmaNode) {
  return [
    ...figmaLayoutToCss(figmaNode),      // Layout structure
    ...figmaColorsToCss(figmaNode),      // Background/theme colors
    ...figmaGeometryToCss(figmaNode),    // Border radius
    ...figmaShadowToCss(figmaNode),      // Shadows for depth
    ...figmaSpacingToCss(figmaNode)      // Internal spacing
  ].filter(Boolean).join(' ');
}

function convertTextStyles(figmaNode) {
  return [
    ...figmaTypographyToCss(figmaNode),  // Font properties
    ...figmaColorsToCss(figmaNode),      // Text colors
    ...figmaEffectsToCss(figmaNode)      // Opacity/filters
  ].filter(Boolean).join(' ');
}

// Usage
const cardClasses = convertCardStyles(cardNode);
const titleClasses = convertTextStyles(titleNode);
```

#### 2.4 Available Modular Converters

| Converter | Handles | Example Input | Example Output |
|-----------|---------|---------------|----------------|
| `figmaLayoutToCss` | Layout modes, alignment, sizing | `{ layoutMode: "HORIZONTAL", itemSpacing: 8 }` | `["flex-row", "gap-[8]"]` |
| `figmaColorsToCss` | Fills, backgrounds, blend modes | `{ fills: [{ type: "SOLID", color: {...} }] }` | `["bg-[#ff0000]"]` |
| `figmaTypographyToCss` | Font size, weight, alignment, color | `{ fontSize: 16, fontWeight: 600 }` | `["text-base", "font-semibold"]` |
| `figmaEffectsToCss` | Opacity, filters | `{ opacity: 0.8 }` | `["opacity-80"]` |
| `figmaGeometryToCss` | Border radius | `{ cornerRadius: 8 }` | `["rounded-lg"]` |
| `figmaBorderToCss` | Stroke width, color, style | `{ strokeWeight: 2, strokes: [...] }` | `["border-2", "border-blue-500"]` |
| `figmaShadowToCss` | Drop shadows, inner shadows | `{ effects: [{ type: "DROP_SHADOW", ... }] }` | `["shadow-md"]` |
| `figmaSpacingToCss` | Padding, margins | `{ paddingTop: 16, paddingLeft: 8 }` | `["pt-[16]", "pl-[8]"]` |
| `figmaPositionToCss` | Absolute positioning, constraints | `{ layoutPositioning: "ABSOLUTE", x: 10 }` | `["absolute", "left-[10]"]` |
| `figmaSizeToCss` | Width, height constraints | `{ width: 100, height: 200 }` | `["w-[100]", "h-[200]"]` |

### 3. Node Creation with Styles (`createNodeForData`)

Create Figma nodes with Tailwind CSS styles using a declarative JSON structure:

```typescript
import { createNodeForData } from 'cssma';

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
- `GROUP` ⚠️ *Requires at least one child*
- `TEXT`
- `RECTANGLE`
- `ELLIPSE`
- `POLYGON`
- `STAR`
- `VECTOR`
- `LINE`
- `BOOLEAN_OPERATION` ⚠️ *Requires at least 2 children*
- `SECTION`
- `COMPONENT`
- `COMPONENT_SET`
- `INSTANCE`

#### Special Node Types

**GROUP Nodes** 
- Must have at least one child (Figma doesn't support empty groups)
- Uses `figma.group()` API internally
- Automatically fits to children size

```typescript
const groupData = {
  type: 'GROUP',
  name: 'Icon Group',
  styles: 'opacity-90',
  children: [
    {
      type: 'ELLIPSE',
      name: 'Background',
      styles: 'w-[100] h-[100] bg-blue-100'
    },
    {
      type: 'VECTOR',
      name: 'Icon',
      styles: 'w-[60] h-[60] stroke-blue-600 stroke-2',
      props: {
        vectorPaths: [{ data: 'M10 10L50 50M50 50L90 10' }]
      }
    }
  ]
};
```

**BOOLEAN_OPERATION Nodes**
- Must have at least 2 children for operation
- Supports: `UNION`, `SUBTRACT`, `INTERSECT`, `EXCLUDE`
- Uses specific Figma APIs (`figma.union()`, `figma.subtract()`, etc.)

```typescript
const booleanData = {
  type: 'BOOLEAN_OPERATION',
  name: 'Combined Shape',
  styles: 'fill-blue-500',
  props: {
    booleanOperation: 'SUBTRACT' // or 'UNION', 'INTERSECT', 'EXCLUDE'
  },
  children: [
    {
      type: 'RECTANGLE',
      name: 'Base',
      styles: 'w-[100] h-[100]'
    },
    {
      type: 'ELLIPSE',
      name: 'Hole',
      styles: 'w-[60] h-[60]'
    }
  ]
};
```

#### Comprehensive Example

Here's a complete example showcasing all supported Figma node types:

```typescript
import { createNodeForData } from 'cssma';

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

Here's an example of creating a modern landing page using cssma:

```typescript
import { createNodeForData } from 'cssma';

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

// Text Transform
uppercase      → textCase: "UPPER"
lowercase      → textCase: "LOWER"
capitalize     → textCase: "TITLE"
normal-case    → textCase: "ORIGINAL"


// Text Vertical Alignment
align-top      → textAlignVertical: "TOP"
align-middle   → textAlignVertical: "CENTER"
align-bottom   → textAlignVertical: "BOTTOM"

// Text Auto-Size
text-auto-none → textAutoSize: "NONE"
text-auto-wh      → textAutoSize: "WIDTH_AND_HEIGHT"
text-truncate  → textAutoSize: "TRUNCATE"
text-auto-h → textAutoSize: "HEIGHT"

// text wrap
text-wrap-balance → textWrap: "BALANCE"
text-wrap    → textWrap: "WRAP"
text-wrap-truncate → textWrap: "TRUNCATE"

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
// Box Shadows
shadow-sm      → effects: [{ type: "DROP_SHADOW", radius: 2, spread: 0, ... }]
shadow-md      → effects: [{ type: "DROP_SHADOW", radius: 6, spread: -2, ... }]
shadow-lg      → effects: [{ type: "DROP_SHADOW", radius: 10, spread: -3, ... }]
shadow-xl      → effects: [{ type: "DROP_SHADOW", radius: 20, spread: -5, ... }]
shadow-2xl     → effects: [{ type: "DROP_SHADOW", radius: 25, spread: -8, ... }]

// Filter Effects - Layer Blur
blur-none      → effects: [{ type: "LAYER_BLUR", radius: 0 }]
blur-sm        → effects: [{ type: "LAYER_BLUR", radius: 4 }]
blur           → effects: [{ type: "LAYER_BLUR", radius: 8 }]
blur-md        → effects: [{ type: "LAYER_BLUR", radius: 12 }]
blur-lg        → effects: [{ type: "LAYER_BLUR", radius: 16 }]
blur-xl        → effects: [{ type: "LAYER_BLUR", radius: 24 }]
blur-2xl       → effects: [{ type: "LAYER_BLUR", radius: 40 }]
blur-3xl       → effects: [{ type: "LAYER_BLUR", radius: 64 }]
blur-[10]      → effects: [{ type: "LAYER_BLUR", radius: 10 }]

// Filter Effects - Backdrop Blur  
backdrop-blur-none → effects: [{ type: "BACKGROUND_BLUR", radius: 0 }]
backdrop-blur-sm   → effects: [{ type: "BACKGROUND_BLUR", radius: 4 }]
backdrop-blur      → effects: [{ type: "BACKGROUND_BLUR", radius: 8 }]
backdrop-blur-md   → effects: [{ type: "BACKGROUND_BLUR", radius: 12 }]
backdrop-blur-lg   → effects: [{ type: "BACKGROUND_BLUR", radius: 16 }]
backdrop-blur-xl   → effects: [{ type: "BACKGROUND_BLUR", radius: 24 }]
backdrop-blur-2xl  → effects: [{ type: "BACKGROUND_BLUR", radius: 40 }]
backdrop-blur-3xl  → effects: [{ type: "BACKGROUND_BLUR", radius: 64 }]
backdrop-blur-[15] → effects: [{ type: "BACKGROUND_BLUR", radius: 15 }]

// Filter Effects - Drop Shadow
drop-shadow-none → effects: [{ type: "DROP_SHADOW", radius: 0, offset: { x: 0, y: 0 } }]
drop-shadow-sm   → effects: [{ type: "DROP_SHADOW", radius: 1, offset: { x: 0, y: 1 }, color: { r: 0, g: 0, b: 0, a: 0.05 } }]
drop-shadow      → effects: [{ type: "DROP_SHADOW", radius: 2, offset: { x: 0, y: 1 }, color: { r: 0, g: 0, b: 0, a: 0.1 } }]
drop-shadow-md   → effects: [{ type: "DROP_SHADOW", radius: 6, offset: { x: 0, y: 4 }, color: { r: 0, g: 0, b: 0, a: 0.1 } }]
drop-shadow-lg   → effects: [{ type: "DROP_SHADOW", radius: 15, offset: { x: 0, y: 10 }, color: { r: 0, g: 0, b: 0, a: 0.1 } }]
drop-shadow-xl   → effects: [{ type: "DROP_SHADOW", radius: 25, offset: { x: 0, y: 20 }, color: { r: 0, g: 0, b: 0, a: 0.25 } }]
drop-shadow-2xl  → effects: [{ type: "DROP_SHADOW", radius: 50, offset: { x: 0, y: 25 }, color: { r: 0, g: 0, b: 0, a: 0.25 } }]
drop-shadow-[0_4_8_rgba(0,0,0,0.1)] → effects: [{ type: "DROP_SHADOW", radius: 8, offset: { x: 0, y: 4 }, color: { r: 0, g: 0, b: 0, a: 0.1 } }]

// Opacity
opacity-[0.5]  → opacity: 0.5
opacity-0      → opacity: 0
opacity-25     → opacity: 0.25
opacity-50     → opacity: 0.5
opacity-75     → opacity: 0.75
opacity-100    → opacity: 1

// Multiple Effects (can be combined)
"blur-sm backdrop-blur-md drop-shadow-lg shadow-md" →
effects: [
  { type: "LAYER_BLUR", radius: 4 },
  { type: "BACKGROUND_BLUR", radius: 12 },
  { type: "DROP_SHADOW", radius: 15, offset: { x: 0, y: 10 }, color: { r: 0, g: 0, b: 0, a: 0.1 } },
  { type: "DROP_SHADOW", radius: 6, spread: -2, offset: { x: 0, y: 4 }, color: { r: 0, g: 0, b: 0, a: 0.1 } }
]
```

#### Filter Effects Usage

**Layer Blur (`blur-*`)**
- Creates a **LAYER_BLUR** effect that blurs the entire element
- Supports preset values from `blur-none` (0px) to `blur-3xl` (64px)
- Arbitrary values: `blur-[10]` for custom radius
- **Bi-directional**: Figma LAYER_BLUR effects convert back to appropriate `blur-*` classes

**Backdrop Blur (`backdrop-blur-*`)**
- Creates a **BACKGROUND_BLUR** effect that blurs content behind the element
- Supports preset values from `backdrop-blur-none` (0px) to `backdrop-blur-3xl` (64px)
- Arbitrary values: `backdrop-blur-[15]` for custom radius
- **Bi-directional**: Figma BACKGROUND_BLUR effects convert back to appropriate `backdrop-blur-*` classes

**Drop Shadow (`drop-shadow-*`)**
- Creates a **DROP_SHADOW** effect for filter-based shadows (no spread)
- Supports preset values from `drop-shadow-none` to `drop-shadow-2xl`
- Arbitrary values: `drop-shadow-[0_4_8_rgba(0,0,0,0.1)]` format (offsetX_offsetY_radius_color)
- **Bi-directional**: Figma DROP_SHADOW effects convert back to appropriate classes
- **Smart detection**: Distinguishes between filter drop-shadow and box-shadow based on spread value

**Examples:**
```typescript
// Glass morphism effect
const glassCard = {
  type: 'FRAME',
  name: 'Glass Card',
  styles: 'w-[300] h-[200] bg-white/20 backdrop-blur-md rounded-xl border border-white/30 p-[24]',
  children: [
    {
      type: 'TEXT',
      styles: 'text-white text-lg font-semibold',
      text: 'Glass Effect'
    }
  ]
};

// Blurred image with drop shadow
const blurredImage = {
  type: 'RECTANGLE',
  name: 'Blurred Image',
  styles: 'w-[200] h-[150] bg-gray-300 blur-sm drop-shadow-lg rounded-lg'
};

// Complex filter combination
const complexEffect = {
  type: 'FRAME',
  name: 'Complex Effect',
  styles: 'w-[250] h-[100] bg-blue-500/30 blur-[2] backdrop-blur-xl drop-shadow-[0_8_16_rgba(0,0,0,0.15)] rounded-2xl'
};
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


### Position and Layout

```typescript
// Position Type
absolute       → layoutPositioning: "ABSOLUTE"
relative       → layoutPositioning: "AUTO"

// Position Values with Constraints
left-[10px]    → x: 10, constraints: { horizontal: "MIN" }
right-[20px]   → x: 20, constraints: { horizontal: "MAX" }
top-[30px]     → y: 30, constraints: { vertical: "MIN" }
bottom-[40px]  → y: 40, constraints: { vertical: "MAX" }

// Center Constraints
center-x       → constraints: { horizontal: "CENTER" }
center-y       → constraints: { vertical: "CENTER" }

// Stretch Constraints
stretch-x      → constraints: { horizontal: "STRETCH" }
stretch-y      → constraints: { vertical: "STRETCH" }

// Scale Constraints
scale-x        → constraints: { horizontal: "SCALE" }
scale-y        → constraints: { vertical: "SCALE" }

// Z-index
z-[10]         → order: 10
```

#### Examples:

```typescript
// Basic positioning
"absolute left-[10px] top-[20px]"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 10,
  y: 20,
  constraints: { 
    horizontal: "MIN",
    vertical: "MIN"
  }
}

// Center positioning
"absolute center-x center-y"
→ {
  layoutPositioning: "ABSOLUTE",
  constraints: { 
    horizontal: "CENTER",
    vertical: "CENTER"
  }
}

// Center with coordinates
"absolute center-x left-[10px] center-y top-[20px]"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 10,
  y: 20,
  constraints: { 
    horizontal: "CENTER",
    vertical: "CENTER"
  }
}

// Stretch positioning
"absolute stretch-x stretch-y"
→ {
  layoutPositioning: "ABSOLUTE",
  constraints: { 
    horizontal: "STRETCH",
    vertical: "STRETCH"
  }
}

// Stretch with coordinates
"absolute stretch-x left-[10px] right-[10px] stretch-y top-[20px] bottom-[20px]"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 10,
  y: 20,
  constraints: { 
    horizontal: "STRETCH",
    vertical: "STRETCH"
  }
}

// Scale positioning
"absolute scale-x scale-y"
→ {
  layoutPositioning: "ABSOLUTE",
  constraints: { 
    horizontal: "SCALE",
    vertical: "SCALE"
  }
}

// Scale with coordinates
"absolute scale-x left-[0px] right-[100px] scale-y top-[0px] bottom-[100px]"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  parent: {
    width: 200,
    height: 200
  },
  constraints: { 
    horizontal: "SCALE",
    vertical: "SCALE"
  }
}

// Mixed positioning
"absolute left-[10px] center-y"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 10,
  constraints: { 
    horizontal: "MIN",
    vertical: "CENTER"
  }
}
```

#### Constraint Behavior:

1. **MIN (left/top)**: Element is positioned relative to the parent's left/top edge.
2. **MAX (right/bottom)**: Element is positioned relative to the parent's right/bottom edge.
3. **CENTER**: Element is centered along the horizontal/vertical axis, with optional offset.
4. **STRETCH**: Element stretches to fill the parent container, with optional margins on both sides.
5. **SCALE**: Element maintains its aspect ratio while scaling to fit the parent container.

#### Important Notes:

1. When using `CENTER` constraints, both `center-x`/`center-y` classes and corresponding position values (`left`/`top`) can be specified.
2. When using `STRETCH` constraints, both `stretch-x`/`stretch-y` classes and corresponding position values (`left`/`right` or `top`/`bottom`) can be specified.
3. When using `SCALE` constraints, both `scale-x`/`scale-y` classes and corresponding position values are used to determine the element's position and size relative to its parent.
4. Position values are always specified in pixels.
5. The `layoutPositioning` property must be set to `"ABSOLUTE"` for constraints to take effect.
6. Multiple constraint types can be combined (e.g., `horizontal: "CENTER"` with `vertical: "STRETCH"`).



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



## Figma Variables System

### Variable Usage

#### Variable References
```typescript
// Basic Variable Reference
bg-$[button/background]  → fills: setBoundVariableForPaint(paint, "color", variable)
text-$[text/primary]     → fills: setBoundVariableForPaint(paint, "color", variable)
p-$[spacing/md]         → padding: setBoundVariableForNumber("padding", variable)

// Variable with Opacity
bg-$[button/background]/50  → fills: setBoundVariableForPaint(paint, "color", variable, 0.5)
text-$[text/primary]/75     → fills: setBoundVariableForPaint(paint, "color", variable, 0.75)

// Multiple Variable References
border-$[border/width] border-$[border/color]  → 
  strokes: setBoundVariableForPaint(paint, "color", colorVar)
  strokeWeight: setBoundVariableForNumber("strokeWeight", widthVar)
```

#### Variable Collections
```typescript
// Collection Organization
$[collection/variable]   → Finds variable in specified collection
$[variable]             → Finds variable in any collection

// Collection Types
local                  → Local file variables
team                   → Team library variables
```

#### Variable Types
```typescript
// Color Variables
bg-$[colors/primary]    → Color variable for background
text-$[colors/text]     → Color variable for text
border-$[colors/border] → Color variable for border

// Number Variables
p-$[spacing/sm]        → Number variable for spacing
gap-$[spacing/md]      → Number variable for gap
text-$[size/body]      → Number variable for font size

// Boolean Variables
hidden-$[state/isHidden] → Boolean variable for visibility
```

### Variable Binding Examples

1. **Color Variable Binding**
```typescript
{
  "type": "FRAME",
  "name": "Button",
  "styles": "bg-$[button/background] text-$[button/text]"
}
```

2. **Spacing Variable Binding**
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "p-$[spacing/lg] gap-$[spacing/md]"
}
```

3. **Mixed Variable Types**
```typescript
{
  "type": "FRAME",
  "name": "Input",
  "styles": "border-$[input/borderWidth] border-$[input/borderColor] p-$[input/padding]"
}
```

> **Note**: The `$[ ]` syntax is specifically used for Figma variable system integration. These values must be properly configured in your Figma design system.

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

We welcome contributions! If you'd like to improve cssma, please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License

---

For more detailed usage and examples, please refer to the [documentation](../docs/spec.md).

