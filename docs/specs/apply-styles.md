# Apply Styles API Specification

## Overview

The `applyCssStyles` function is the core API for applying Tailwind CSS-like styles directly to Figma nodes. It takes a Figma node and a CSS class string, then applies the corresponding Figma properties to transform the node's appearance and layout.

## Function Signature

```typescript
async function applyCssStyles<T extends SceneNode>(
  node: T, 
  styles: string = ''
): Promise<T>
```

### Parameters

- **`node`** (`T extends SceneNode`): The target Figma node to apply styles to
- **`styles`** (`string`): Tailwind CSS-like class string (optional, defaults to empty string)

### Returns

- **`Promise<T>`**: The same node with styles applied

## Basic Usage

### Frame Styling
```typescript
// Create and style a frame
const frame = figma.createFrame();
await applyCssStyles(frame, 'flex-col bg-white rounded-lg p-[16] gap-[8]');

// Result: Vertical layout frame with white background, rounded corners, padding, and gap
```

### Text Styling
```typescript
// Create and style text
const text = figma.createText();
text.characters = 'Hello World';
await applyCssStyles(text, 'text-lg font-bold text-[#1a1a1a]');

// Result: Large, bold, dark gray text
```

### Complex Component Styling
```typescript
// Create a card component
const card = figma.createFrame();
await applyCssStyles(card, 'w-[320] h-auto bg-white rounded-xl shadow-lg border border-gray-200');

const content = figma.createFrame();
await applyCssStyles(content, 'flex-col p-[24] gap-[16]');
card.appendChild(content);

const title = figma.createText();
title.characters = 'Card Title';
await applyCssStyles(title, 'text-xl font-bold text-gray-900');
content.appendChild(title);
```

## Supported Node Types

### Frame-like Nodes
- **FRAME**: Full layout and styling support
- **COMPONENT**: Full layout and styling support
- **INSTANCE**: Layout and styling (with component property constraints)
- **SECTION**: Basic layout and styling

### Content Nodes
- **TEXT**: Typography, sizing, and fill properties
- **VECTOR**: Fill, stroke, and basic properties
- **RECTANGLE/ELLIPSE**: Fill, stroke, corner radius, effects

### Layout Nodes
- **GROUP**: Limited styling (opacity, effects)

## Property Application Logic

### Layout Properties (Frame-like nodes only)

```typescript
// Layout mode and direction
'flex-col'     → layoutMode: "VERTICAL"
'flex-row'     → layoutMode: "HORIZONTAL"

// Alignment
'items-center' → counterAxisAlignItems: "CENTER"
'justify-end'  → primaryAxisAlignItems: "MAX"

// Sizing behavior
'w-full'       → layoutSizingHorizontal: "FILL"
'h-auto'       → layoutSizingVertical: "HUG"

// Spacing
'gap-[16]'     → itemSpacing: 16
'p-[24]'       → paddingTop/Right/Bottom/Left: 24
```

### Universal Properties (All compatible nodes)

```typescript
// Fill/Background
'bg-white'     → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
'bg-[#FF0000]' → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// Stroke/Border
'border-2'     → strokeWeight: 2
'border-red-500' → strokes: [{ type: "SOLID", color: {...} }]

// Corner radius
'rounded-lg'   → cornerRadius: 8
'rounded-[12]' → cornerRadius: 12

// Effects
'shadow-md'    → effects: [{ type: "DROP_SHADOW", ... }]
'blur-sm'      → effects: [{ type: "LAYER_BLUR", radius: 4 }]

// Opacity
'opacity-50'   → opacity: 0.5
```

### Text-specific Properties

```typescript
// Typography
'text-lg'      → fontSize: 18
'font-bold'    → fontName: { family: "Inter", style: "Bold" }
'text-center'  → textAlignHorizontal: "CENTER"

// Text behavior
'w-full' (on text) → layoutSizingHorizontal: "FILL" + textAutoResize: "HEIGHT"
'w-auto h-auto'    → textAutoResize: "WIDTH_AND_HEIGHT"

// Text styling
'uppercase'    → textCase: "UPPER"
'underline'    → textDecoration: "UNDERLINE"
'leading-tight' → lineHeight: { value: 125, unit: "PERCENT" }
```

## Advanced Features

### Variable Binding

The function automatically handles Figma variable references:

```typescript
// Color variables
'bg-$[colors/primary]'    → Binds background to color variable
'text-$[colors/text]'     → Binds text color to color variable

// Number variables  
'p-$[spacing/md]'         → Binds padding to spacing variable
'text-$[typography/body]' → Binds font size to typography variable
```

### Image Handling

Background images are automatically processed:

```typescript
// URL images are uploaded to Figma
'bg-[url("https://example.com/image.jpg")]' → 
  // 1. Fetches image from URL
  // 2. Uploads to Figma as imageHash
  // 3. Creates IMAGE paint with uploaded hash

// Data URLs are supported
'bg-[url("data:image/png;base64,...")]' → 
  // Processes base64 data directly

// Image positioning
'bg-center bg-cover' → 
  // Sets imageTransform and scaleMode
```

### Gradient Processing

Complex gradients are fully supported:

```typescript
'bg-gradient-to-r from-blue-500 to-purple-600' →
  fills: [{
    type: "GRADIENT_LINEAR",
    gradientStops: [
      { position: 0, color: { r: 0.23, g: 0.51, b: 0.96 } },
      { position: 1, color: { r: 0.55, g: 0.27, b: 0.85 } }
    ],
    gradientTransform: [[1, 0, 0], [0, 1, 0]]
  }]
```

## Error Handling

### Graceful Fallbacks

The function implements comprehensive error handling:

```typescript
// Font loading failures
try {
  textNode.fontName = { family: "CustomFont", style: "Bold" };
} catch (error) {
  // Falls back to Inter Regular
  textNode.fontName = { family: "Inter", style: "Regular" };
}

// Image upload failures
if (imageUploadFailed) {
  // Returns transparent fallback
  return {
    type: 'SOLID',
    color: { r: 0, g: 0, b: 0 },
    opacity: 0,
    visible: false
  };
}

// Layout constraint violations
try {
  frameNode.layoutSizingHorizontal = "FILL";
} catch (error) {
  console.error('Layout sizing failed:', error);
  // Continues with other properties
}
```

### Debug Logging

Extensive debug information is provided:

```typescript
console.log('🔧 Layout Debug - Node:', frameNode.name, 'Type:', frameNode.type);
console.log('📍 Node ID:', frameNode.id);
console.log('🎯 Parent:', frameNode.parent ? `${frameNode.parent.name}` : 'None');
console.log('📐 Style Object:', JSON.stringify(styleObject, null, 2));
```

## Performance Considerations

### Async Operations

The function is fully async to handle:
- Font loading for text nodes
- Variable resolution
- Image uploads from URLs
- Complex paint processing

### Batch Processing

For multiple nodes, consider batching:

```typescript
// Process multiple nodes efficiently
const nodes = [frame1, frame2, frame3];
const styles = ['bg-white p-4', 'bg-gray-100 p-8', 'bg-blue-50 p-6'];

await Promise.all(
  nodes.map((node, i) => applyCssStyles(node, styles[i]))
);
```

### Memory Management

The function avoids memory leaks by:
- Not storing references to processed nodes
- Cleaning up temporary objects
- Efficient paint object creation

## Integration Patterns

### Component Creation

```typescript
async function createButton(text: string, variant: 'primary' | 'secondary') {
  const button = figma.createComponent();
  button.name = `Button/${variant}`;
  
  // Base structure
  await applyCssStyles(button, 'flex-row items-center justify-center px-[16] py-[8] rounded-md');
  
  // Variant-specific styling
  if (variant === 'primary') {
    await applyCssStyles(button, 'bg-blue-600 text-white');
  } else {
    await applyCssStyles(button, 'bg-gray-100 text-gray-900 border border-gray-300');
  }
  
  // Add text
  const label = figma.createText();
  label.characters = text;
  await applyCssStyles(label, 'font-medium text-sm');
  button.appendChild(label);
  
  return button;
}
```

### Design System Integration

```typescript
// Using design tokens
const tokens = {
  primary: 'bg-$[colors/primary] text-$[colors/onPrimary]',
  surface: 'bg-$[colors/surface] border-$[colors/outline]',
  typography: 'text-$[typography/body] leading-$[typography/lineHeight]'
};

async function createCard() {
  const card = figma.createFrame();
  await applyCssStyles(card, `${tokens.surface} rounded-$[radius/lg] p-$[spacing/lg]`);
  return card;
}
```

### State Management

```typescript
// Handle different states
async function updateButtonState(button: FrameNode, state: 'default' | 'hover' | 'pressed') {
  const stateStyles = {
    default: 'bg-blue-600 text-white',
    hover: 'bg-blue-700 text-white shadow-md',
    pressed: 'bg-blue-800 text-white shadow-sm'
  };
  
  await applyCssStyles(button, stateStyles[state]);
}
```

## Common Patterns

### Responsive Layouts

```typescript
// Create responsive grid
const grid = figma.createFrame();
await applyCssStyles(grid, 'flex-row flex-wrap gap-[16] p-[24]');

// Grid items
for (let i = 0; i < 6; i++) {
  const item = figma.createFrame();
  await applyCssStyles(item, 'w-[200] h-[150] bg-white rounded-lg shadow-sm');
  grid.appendChild(item);
}
```

### Complex Components

```typescript
// Multi-section component
async function createProductCard() {
  const card = figma.createFrame();
  await applyCssStyles(card, 'w-[300] bg-white rounded-xl shadow-lg overflow-hidden');
  
  // Image section
  const imageContainer = figma.createFrame();
  await applyCssStyles(imageContainer, 'w-full h-[200] bg-gray-200');
  card.appendChild(imageContainer);
  
  // Content section
  const content = figma.createFrame();
  await applyCssStyles(content, 'flex-col p-[16] gap-[8]');
  card.appendChild(content);
  
  // Title
  const title = figma.createText();
  title.characters = 'Product Name';
  await applyCssStyles(title, 'text-lg font-bold text-gray-900');
  content.appendChild(title);
  
  // Price
  const price = figma.createText();
  price.characters = '$99.99';
  await applyCssStyles(price, 'text-xl font-bold text-green-600');
  content.appendChild(price);
  
  return card;
}
```

## Best Practices

### Style Organization

```typescript
// Group related styles
const baseCard = 'w-[320] bg-white rounded-lg shadow-md';
const cardContent = 'flex-col p-[16] gap-[12]';
const cardTitle = 'text-lg font-bold text-gray-900';

await applyCssStyles(card, baseCard);
await applyCssStyles(content, cardContent);
await applyCssStyles(title, cardTitle);
```

### Error Prevention

```typescript
// Validate node type before applying layout properties
if (['FRAME', 'COMPONENT', 'INSTANCE'].includes(node.type)) {
  await applyCssStyles(node, 'flex-col items-center');
} else {
  await applyCssStyles(node, 'bg-white rounded-lg');
}
```

### Performance Optimization

```typescript
// Combine styles in single call
await applyCssStyles(node, 'flex-col bg-white rounded-lg p-[16] gap-[8] shadow-md');

// Instead of multiple calls
// await applyCssStyles(node, 'flex-col');
// await applyCssStyles(node, 'bg-white');
// await applyCssStyles(node, 'rounded-lg');
```

## Limitations

### Node Type Constraints

- Layout properties only work on frame-like nodes
- Text properties only work on text nodes
- Some properties require specific parent/child relationships

### Figma API Constraints

- Variable binding requires variables to exist
- Font loading is async and may fail
- Image uploads require valid URLs and internet connection
- Layout sizing requires compatible parent layout modes

### Performance Considerations

- Complex gradients and effects may impact performance
- Large image uploads can be slow
- Batch operations should be chunked for large datasets

## Migration Notes

### From Direct Property Setting

```typescript
// Old approach
frameNode.layoutMode = "VERTICAL";
frameNode.primaryAxisAlignItems = "CENTER";
frameNode.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

// New approach
await applyCssStyles(frameNode, 'flex-col items-center bg-white');
```

### From Style Objects

```typescript
// Old approach
const styles = processCssStyles('flex-col bg-white rounded-lg');
Object.assign(frameNode, styles);

// New approach
await applyCssStyles(frameNode, 'flex-col bg-white rounded-lg');
``` 