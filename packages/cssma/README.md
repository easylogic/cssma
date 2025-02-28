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
import { processStyles } from '@easylogic/style';

const styles = processStyles('flex-col w-full bg-[#FF0000] rounded-lg');
// Apply the result to a Figma node
node.layoutMode = styles.layoutMode;
node.fills = styles.fills;
node.cornerRadius = styles.cornerRadius;
```

### 2. Figma → Tailwind CSS Conversion (`figmaToStyle`)

Convert Figma style objects to Tailwind CSS class strings:

```typescript
import { figmaToStyle } from '@easylogic/style';

const tailwindClasses = figmaToStyle({
  layoutMode: "VERTICAL",
  fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
  cornerRadius: 8
});
// Result: "flex-col bg-[#ff0000] rounded-lg"
```

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

### Vector Node Properties

Vector nodes allow you to create scalable vector graphics using SVG path data:

```typescript
{
  "type": "VECTOR",
  "name": "Arrow Icon",
  "styles": "w-[24] h-[24] bg-[#111827]",
  "paths": [
    "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
  ]
}
```

## Usage Examples

### Basic Usage

```typescript
import { processStyles, figmaToStyle } from '@easylogic/style';

// Tailwind CSS → Figma
const figmaStyles = processStyles('flex-col gap-[16] bg-[#f8f9fa] rounded-lg p-[24]');

// Apply to Figma node
node.layoutMode = figmaStyles.layout.layoutMode;
node.itemSpacing = figmaStyles.layout.itemSpacing;
node.fills = figmaStyles.fills;
node.cornerRadius = figmaStyles.geometry.cornerRadius;
node.paddingTop = figmaStyles.layout.paddingTop;
node.paddingRight = figmaStyles.layout.paddingRight;
node.paddingBottom = figmaStyles.layout.paddingBottom;
node.paddingLeft = figmaStyles.layout.paddingLeft;

// Figma → Tailwind CSS
const figmaNode = {
  layoutMode: "VERTICAL",
  itemSpacing: 16,
  fills: [{ type: "SOLID", color: { r: 0.97, g: 0.98, b: 0.98 } }],
  cornerRadius: 8,
  paddingTop: 24,
  paddingRight: 24,
  paddingBottom: 24,
  paddingLeft: 24
};

const tailwindClasses = figmaToStyle(figmaNode);
// Result: "flex-col gap-[16] bg-[#f8f9fa] rounded-lg p-[24]"
```

### Complex Examples

```typescript
// Text Styling
const textStyles = processStyles('text-lg font-medium text-[#1a1a1a] leading-relaxed');

// Card Component
const cardStyles = processStyles('flex-col gap-[16] bg-white rounded-lg shadow-md p-[24] border border-[#e5e7eb]');

// Button Component
const buttonStyles = processStyles('flex-row justify-center items-center bg-[#3b82f6] text-white font-medium rounded-md px-[16] py-[8] shadow-sm');
```

### Working with Vector Nodes

```typescript
// Create a vector icon
const iconNode = figma.createVector();
const iconStyles = processStyles('w-[24] h-[24] bg-[#111827]');

// Apply styles
Object.assign(iconNode, {
  width: iconStyles.width,
  height: iconStyles.height,
  fills: iconStyles.fills
});

// Add SVG path data
iconNode.vectorPaths = [
  {
    windingRule: "EVENODD",
    data: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
  }
];
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

We welcome contributions! If you'd like to improve @easylogic/style, please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License

---

For more detailed usage and examples, please refer to the [documentation](../docs/spec.md).
