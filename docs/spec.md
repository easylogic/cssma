# CSS-to-Figma Specification

## Overview
CSS-to-Figma is a library that converts Tailwind CSS styles to Figma styles and vice versa. It provides a seamless bridge between Tailwind CSS classes and Figma's styling system.

## Core Features

### 1. Tailwind CSS → Figma Conversion (`processStyles`)

#### Layout Properties
```typescript
// Flex Direction
flex-row        → layoutMode: "HORIZONTAL"
flex-col        → layoutMode: "VERTICAL"

// Size
w-full         → layoutSizingHorizontal: "FILL"
w-auto         → layoutSizingHorizontal: "HUG"
w-[100]        → width: 100
h-full         → layoutSizingVertical: "FILL"
h-auto         → layoutSizingVertical: "HUG"
h-[100]        → height: 100

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
gap-[16]       → itemSpacing: 16
p-[16]         → padding: 16 (all sides)
pt-[16]        → paddingTop: 16
pr-[16]        → paddingRight: 16
pb-[16]        → paddingBottom: 16
pl-[16]        → paddingLeft: 16
```

#### Colors and Gradients
```typescript
// Solid Colors
bg-[#FF0000]   → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
text-[#FF0000] → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
bg-transparent → fills: [] // Removes background fill
bg-white       → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
bg-black       → fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]

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

// Radial Gradients
bg-radial from-[#FF0000] to-[#0000FF] →
fills: [{
  type: "GRADIENT_RADIAL",
  gradientStops: [
    { position: 0, color: { r: 1, g: 0, b: 0 } },
    { position: 1, color: { r: 0, g: 0, b: 1 } }
  ],
  centerX: 0.5,
  centerY: 0.5,
  radius: 0.5
}]

// Conic Gradients
bg-conic from-[#FF0000] to-[#0000FF] →
fills: [{
  type: "GRADIENT_ANGULAR",
  gradientStops: [
    { position: 0, color: { r: 1, g: 0, b: 0 } },
    { position: 1, color: { r: 0, g: 0, b: 1 } }
  ],
  centerX: 0.5,
  centerY: 0.5,
  rotation: 0
}]
```

#### Typography
```typescript
// Font Size
text-xs        → fontSize: 12
text-sm        → fontSize: 14
text-base      → fontSize: 16
text-lg        → fontSize: 18
text-xl        → fontSize: 20
text-2xl       → fontSize: 24
text-[20]      → fontSize: 20

// Font Weight
font-thin      → fontName: { family: "Inter", style: "Thin" }
font-normal    → fontName: { family: "Inter", style: "Regular" }
font-medium    → fontName: { family: "Inter", style: "Medium" }
font-bold      → fontName: { family: "Inter", style: "Bold" }

// Text Alignment
text-left      → textAlignHorizontal: "LEFT"
text-center    → textAlignHorizontal: "CENTER"
text-right     → textAlignHorizontal: "RIGHT"
text-justify   → textAlignHorizontal: "JUSTIFIED"

// Text Decoration
underline      → textDecoration: "UNDERLINE"
line-through   → textDecoration: "STRIKETHROUGH"
no-underline   → textDecoration: "NONE"
```

#### Effects
```typescript
// Shadows
shadow-sm      → effects: [{ type: "DROP_SHADOW", radius: 2, spread: 0, ... }]
shadow-md      → effects: [{ type: "DROP_SHADOW", radius: 6, spread: -2, ... }]
shadow-lg      → effects: [{ type: "DROP_SHADOW", radius: 10, spread: -3, ... }]

// Opacity
opacity-[0.5]  → opacity: 0.5
```

#### Geometry
```typescript
// Border Radius
rounded-sm     → cornerRadius: 4
rounded-md     → cornerRadius: 6
rounded-lg     → cornerRadius: 8
rounded-xl     → cornerRadius: 12
rounded-2xl    → cornerRadius: 16
rounded-full   → cornerRadius: 9999
rounded-[10]   → cornerRadius: 10
```

#### Vector Nodes 

Vector nodes allow you to create scalable vector graphics using SVG path data. They maintain the same style string approach as other nodes while adding path data support.

```typescript
{
"type": "VECTOR",
  "name": string,
  "styles": string, // Tailwind CSS style string
  "paths": string[] // Array of SVG path strings
}
// Example: Simple Vector
{
  "type": "VECTOR",
  "name": "Arrow Icon",
  "styles": "w-[24] h-[24] bg-[#111827]",
  "paths": [
    "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
  ]
}
// Example: Multi-path Vector with Stroke
{
  "type": "VECTOR",
  "name": "Check Circle Icon",
  "styles": "w-[24] h-[24] border-[#111827] border-2 bg-transparent",
  "paths": [
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    "M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  ]
}
```

##### Vector Properties
- `type`: Must be "VECTOR" to indicate a vector node
- `name`: Identifier for the vector node
- `styles`: Tailwind CSS style string for appearance
- `paths`: Array of SVG path strings defining the vector shape

##### Style Properties for Vectors

```typescript
// Fill Properties
bg-[#color] → Vector fill color
bg-transparent → No fill
// Stroke Properties
border-[#color] → Vector stroke color
border-{number} → Vector stroke width
```

#### Key Features
1. **SVG Path Support**: Uses standard SVG path syntax for vector shapes
2. **Multiple Paths**: Can combine multiple paths to create complex graphics
3. **Consistent Styling**: Uses the same Tailwind CSS style string format as other nodes
4. **Fill and Stroke**: Supports both fill (background) and stroke (border) styling
5. **Scalable**: Vector graphics remain crisp at any size

#### Usage Notes
- Paths are rendered in the order they appear in the paths array
- Each path string must be valid SVG path data
- Style properties follow Tailwind CSS conventions
- Background (`bg-`) controls the fill color
- Border (`border-`) controls the stroke color and width


### 2. Figma → Tailwind CSS Conversion (`figmaToStyle`)

Converts Figma node styles to Tailwind CSS classes:

```typescript
// Figma Style Object
{
  fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
  layoutMode: "VERTICAL",
  layoutSizingHorizontal: "FILL",
  primaryAxisAlignItems: "CENTER",
  counterAxisAlignItems: "CENTER",
  itemSpacing: 16,
  cornerRadius: 8
}

// Converted Tailwind Classes
"bg-[#ff0000] flex-col w-full justify-center items-center gap-[16] rounded-lg"
```

## Usage Examples

```typescript
// Tailwind CSS → Figma
import { processStyles } from 'css-to-figma';

const styles = processStyles('flex-col w-full bg-[#FF0000] rounded-lg');
// Apply the result to a Figma node
node.layoutMode = styles.layout.layoutMode;
node.fills = styles.fills;
node.cornerRadius = styles.geometry.cornerRadius;

// Figma → Tailwind CSS
import { figmaToStyle } from 'css-to-figma';

const tailwindClasses = figmaToStyle({
  layoutMode: "VERTICAL",
  fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
  cornerRadius: 8
});
// Result: "flex-col bg-[#ff0000] rounded-lg"
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

We welcome contributions! If you'd like to improve CSS-to-Figma, please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License 

## Background Properties

### Background Colors
```typescript
// Solid Colors
bg-white       → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
bg-black       → fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]
bg-transparent → fills: []
bg-[#FF0000]   → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
bg-[rgb(255,0,0)] → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// With Opacity
bg-white/50    → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.5 }]
bg-[#FF0000]/75 → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 0.75 }]
```

### Gradients
```typescript
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

// Directions
bg-linear-to-t  → top (0deg)
bg-linear-to-tr → top-right (45deg)
bg-linear-to-r  → right (90deg)
bg-linear-to-br → bottom-right (135deg)
bg-linear-to-b  → bottom (180deg)
bg-linear-to-bl → bottom-left (225deg)
bg-linear-to-l  → left (270deg)
bg-linear-to-tl → top-left (315deg)

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

// Gradient with Opacity
from-[#FF0000]/50 → opacity: 0.5 in gradientStop
```

### Background Size
```typescript
bg-auto    → backgroundSize: "AUTO"
bg-cover   → backgroundSize: "COVER"
bg-contain → backgroundSize: "CONTAIN"
```

### Background Position
```typescript
bg-center → backgroundPosition: "CENTER"
bg-top    → backgroundPosition: "TOP"
bg-right  → backgroundPosition: "RIGHT"
bg-bottom → backgroundPosition: "BOTTOM"
bg-left   → backgroundPosition: "LEFT"
```

### Background Blend Mode
```typescript
bg-blend-normal   → backgroundBlendMode: "NORMAL"
bg-blend-multiply → backgroundBlendMode: "MULTIPLY"
bg-blend-screen   → backgroundBlendMode: "SCREEN"
bg-blend-overlay  → backgroundBlendMode: "OVERLAY"
```

### Background Repeat
```typescript
bg-repeat    → backgroundRepeat: "REPEAT"
bg-no-repeat → backgroundRepeat: "NO_REPEAT"
bg-repeat-x  → backgroundRepeat: "REPEAT_X"
bg-repeat-y  → backgroundRepeat: "REPEAT_Y"
```

### Background Attachment
```typescript
bg-fixed  → backgroundAttachment: "FIXED"
bg-local  → backgroundAttachment: "LOCAL"
bg-scroll → backgroundAttachment: "SCROLL"
```

### Background Origin
```typescript
bg-origin-border  → backgroundOrigin: "BORDER_BOX"
bg-origin-padding → backgroundOrigin: "PADDING_BOX"
bg-origin-content → backgroundOrigin: "CONTENT_BOX"
```

### Background Clip
```typescript
bg-clip-border  → backgroundClip: "BORDER_BOX"
bg-clip-padding → backgroundClip: "PADDING_BOX"
bg-clip-content → backgroundClip: "CONTENT_BOX"
bg-clip-text    → backgroundClip: "TEXT"
```

### Usage Examples

1. **Basic Background Color**
```typescript
{
  "type": "FRAME",
  "name": "Example",
  "styles": "bg-[#FF0000]"
}
```

2. **Gradient Background**
```typescript
{
  "type": "FRAME",
  "name": "Example",
  "styles": "bg-linear-to-r from-[#FF0000] to-[#0000FF]"
}
```

3. **Complex Background**
```typescript
{
  "type": "FRAME",
  "name": "Example",
  "styles": "bg-[#FF0000]/75 bg-blend-multiply bg-no-repeat bg-cover bg-center"
}
```

### Notes and Constraints

1. **Color Values**
   - Supports hex colors (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
   - Supports rgb/rgba colors
   - Supports preset color names (white, black, transparent, etc.)

2. **Gradient Limitations**
   - Linear gradients support 8 directions
   - Maximum of 3 color stops (from, via, to)
   - Each color stop can have its own opacity

3. **Blend Modes**
   - Limited to most common blend modes (normal, multiply, screen, overlay)
   - Applied to both solid colors and gradients

4. **Size and Position**
   - Background size values are fixed (auto, cover, contain)
   - Position values are fixed (center, top, right, bottom, left)

5. **Performance Considerations**
   - Complex gradients may impact rendering performance
   - Multiple backgrounds are not supported
   - Background images are not supported in the current version 

## Typography System

### Text Properties

#### Text Color
```typescript
// Preset Colors
text-white       → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
text-black       → fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]
text-gray-500    → fills: [{ type: "SOLID", color: { r: 0.42, g: 0.45, b: 0.50 } }]

// Arbitrary Colors
text-[#FF0000]   → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
text-[rgb(255,0,0)] → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// With Opacity
text-white/50    → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.5 }]
text-[#FF0000]/75 → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 0.75 }]
```

#### Text Size
```typescript
// Preset Sizes
text-xs         → fontSize: 12
text-sm         → fontSize: 14
text-base       → fontSize: 16
text-lg         → fontSize: 18
text-xl         → fontSize: 20
text-2xl        → fontSize: 24
text-3xl        → fontSize: 30
text-4xl        → fontSize: 36
text-5xl        → fontSize: 48
text-6xl        → fontSize: 60

// Arbitrary Size
text-[20]       → fontSize: 20
text-[12.5]     → fontSize: 12.5
```

#### Text Alignment
```typescript
// Horizontal Alignment
text-left       → textAlignHorizontal: "LEFT"
text-center     → textAlignHorizontal: "CENTER"
text-right      → textAlignHorizontal: "RIGHT"
text-justify    → textAlignHorizontal: "JUSTIFIED"

// Vertical Alignment
text-top        → textAlignVertical: "TOP"
text-middle     → textAlignVertical: "CENTER"
text-bottom     → textAlignVertical: "BOTTOM"
```

#### Text Decoration
```typescript
// Line Decoration
underline       → textDecoration: "UNDERLINE"
line-through    → textDecoration: "STRIKETHROUGH"
no-underline    → textDecoration: "NONE"

// Text Transform
uppercase       → textTransform: "UPPERCASE"
lowercase       → textTransform: "LOWERCASE"
capitalize      → textTransform: "CAPITALIZE"
normal-case     → textTransform: "NONE"
```

#### Line Height
```typescript
// Preset Line Heights
leading-none    → lineHeight: { value: 100, unit: "PERCENT" }
leading-tight   → lineHeight: { value: 125, unit: "PERCENT" }
leading-snug    → lineHeight: { value: 137.5, unit: "PERCENT" }
leading-normal  → lineHeight: { value: 150, unit: "PERCENT" }
leading-relaxed → lineHeight: { value: 165, unit: "PERCENT" }
leading-loose   → lineHeight: { value: 200, unit: "PERCENT" }

// Arbitrary Line Height
leading-[1.5]   → lineHeight: { value: 150, unit: "PERCENT" }
leading-[24px]  → lineHeight: { value: 24, unit: "PIXELS" }
```

#### Letter Spacing
```typescript
// Preset Letter Spacing
tracking-tighter → letterSpacing: -0.8
tracking-tight   → letterSpacing: -0.4
tracking-normal  → letterSpacing: 0
tracking-wide    → letterSpacing: 0.4
tracking-wider   → letterSpacing: 0.8
tracking-widest  → letterSpacing: 1.6

// Arbitrary Letter Spacing
tracking-[0.5]   → letterSpacing: 0.5
tracking-[-0.5]  → letterSpacing: -0.5
```

### Font Properties

#### Font Family
```typescript
// Preset Families
font-sans       → fontName: { family: "Inter", style: "Regular" }
font-serif      → fontName: { family: "Georgia", style: "Regular" }
font-mono       → fontName: { family: "Roboto Mono", style: "Regular" }

// Arbitrary Family
font-[Arial]    → fontName: { family: "Arial", style: "Regular" }
font-[Helvetica Neue] → fontName: { family: "Helvetica Neue", style: "Regular" }
```

#### Font Weight
```typescript
// Preset Weights
font-thin       → fontName: { family: "Inter", style: "Thin" }
font-extralight → fontName: { family: "Inter", style: "ExtraLight" }
font-light      → fontName: { family: "Inter", style: "Light" }
font-normal     → fontName: { family: "Inter", style: "Regular" }
font-medium     → fontName: { family: "Inter", style: "Medium" }
font-semibold   → fontName: { family: "Inter", style: "SemiBold" }
font-bold       → fontName: { family: "Inter", style: "Bold" }
font-extrabold  → fontName: { family: "Inter", style: "ExtraBold" }
font-black      → fontName: { family: "Inter", style: "Black" }
```

#### Font Style
```typescript
// Style Variants
italic         → fontName: { family: "Inter", style: "Italic" }
not-italic     → fontName: { family: "Inter", style: "Regular" }
```

### Usage Examples

1. **Basic Text**
```typescript
{
  "type": "TEXT",
  "name": "Title",
  "styles": "text-xl font-bold text-[#111827]",
  "text": "Hello World"
}
```

2. **Rich Text Formatting**
```typescript
{
  "type": "TEXT",
  "name": "Paragraph",
  "styles": "text-base leading-relaxed tracking-wide text-gray-600",
  "text": "Lorem ipsum dolor sit amet"
}
```

3. **Custom Typography**
```typescript
{
  "type": "TEXT",
  "name": "Custom Text",
  "styles": "text-[18] leading-[1.6] tracking-[0.2] font-[Helvetica]",
  "text": "Custom Typography"
}
```

### Notes and Constraints

1. **Text Properties**
   - Font sizes follow a consistent scale
   - Text alignment supports both horizontal and vertical
   - Text decoration is limited to underline and strikethrough
   - Text transform affects the visual appearance only

2. **Font Properties**
   - Default font family is Inter
   - Font weights map to specific font styles
   - Custom fonts must be available in Figma
   - Font style (italic) requires the corresponding font variant

3. **Line Height**
   - Can be specified in percentage or pixels
   - Percentage values are relative to font size
   - Pixel values are absolute measurements

4. **Letter Spacing**
   - Values are in ems
   - Negative values move letters closer
   - Positive values move letters apart

5. **Performance Considerations**
   - Use preset values when possible
   - Limit use of arbitrary values
   - Consider font loading impact
   - Use system fonts for better performance

6. **Accessibility**
   - Maintain sufficient contrast ratios
   - Use appropriate font sizes
   - Consider line height for readability
   - Avoid using only color for meaning

## Border Properties

### Border Width
```typescript
// Preset Widths
border-0        → borderWidth: 0
border          → borderWidth: 1
border-2        → borderWidth: 2
border-4        → borderWidth: 4
border-8        → borderWidth: 8

// Arbitrary Width
border-[3]      → borderWidth: 3
```

### Border Color
```typescript
// Preset Colors
border-white    → strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
border-black    → strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]

// Arbitrary Colors
border-[#FF0000] → strokes: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
border-[rgb(255,0,0)] → strokes: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
```

### Border Style
```typescript
border-solid    → borderStyle: "SOLID"
border-dashed   → borderStyle: "DASHED"
border-dotted   → borderStyle: "DOTTED"
```

### Border Radius
```typescript
// Preset Values
rounded         → cornerRadius: 4
rounded-sm      → cornerRadius: 2
rounded-md      → cornerRadius: 6
rounded-lg      → cornerRadius: 8
rounded-xl      → cornerRadius: 12
rounded-2xl     → cornerRadius: 16
rounded-3xl     → cornerRadius: 24
rounded-full    → cornerRadius: 9999
rounded-none    → cornerRadius: 0

// Arbitrary Values
rounded-[8]     → cornerRadius: 8
rounded-[1.5]   → cornerRadius: 1.5
```

#### Individual Corner Radius
```typescript
// Preset Values with Position
rounded-t-lg    → borderRadiusTop: 8
rounded-r-lg    → borderRadiusRight: 8
rounded-b-lg    → borderRadiusBottom: 8
rounded-l-lg    → borderRadiusLeft: 8
rounded-tl-lg   → borderRadiusTopLeft: 8
rounded-tr-lg   → borderRadiusTopRight: 8
rounded-br-lg   → borderRadiusBottomRight: 8
rounded-bl-lg   → borderRadiusBottomLeft: 8

// Arbitrary Values with Position
rounded-t-[8]   → borderRadiusTop: 8
rounded-r-[8]   → borderRadiusRight: 8
rounded-b-[8]   → borderRadiusBottom: 8
rounded-l-[8]   → borderRadiusLeft: 8
rounded-tl-[8]  → borderRadiusTopLeft: 8
rounded-tr-[8]  → borderRadiusTopRight: 8
rounded-br-[8]  → borderRadiusBottomRight: 8
rounded-bl-[8]  → borderRadiusBottomLeft: 8
```

#### Usage Examples
```typescript
// Basic Card
{
  "type": "FRAME",
  "name": "Card",
  "styles": "rounded-lg"  // 8px radius on all corners
}

// Custom Card
{
  "type": "FRAME",
  "name": "Card",
  "styles": "rounded-[12]"  // 12px radius on all corners
}

// Top Rounded Card
{
  "type": "FRAME",
  "name": "Card",
  "styles": "rounded-t-lg"  // 8px radius on top corners only
}

// Mixed Radius Card
{
  "type": "FRAME",
  "name": "Card",
  "styles": "rounded-t-[16] rounded-b-[8]"  // 16px top radius, 8px bottom radius
}
```

#### Notes and Constraints

1. **Preset Values**
   - Predefined radius values follow a consistent scale
   - `rounded` without suffix uses the default radius (4px)
   - `rounded-none` explicitly sets radius to 0

2. **Arbitrary Values**
   - Support any positive number
   - Can use decimal values (e.g., `rounded-[1.5]`)
   - Values are in pixels

3. **Individual Corners**
   - Can target specific corners or sides
   - Supports both preset and arbitrary values
   - Multiple radius values can be combined

4. **Position Prefixes**
   - `t`: top corners
   - `r`: right corners
   - `b`: bottom corners
   - `l`: left corners
   - `tl`: top-left corner
   - `tr`: top-right corner
   - `br`: bottom-right corner
   - `bl`: bottom-left corner

### Usage Examples

1. **Text Styling**
```typescript
{
  "type": "TEXT",
  "name": "Title",
  "styles": "text-xl font-bold text-[#111827] text-center"
}
```

2. **Border Styling**
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "border-2 border-[#E5E7EB] rounded-lg"
}
```

3. **Combined Text and Border**
```typescript
{
  "type": "FRAME",
  "name": "Button",
  "styles": "text-white font-medium text-sm border border-[#3B82F6] rounded-md"
}
```

### Notes and Constraints

1. **Text Properties**
   - Font sizes are fixed to common values
   - Text alignment only supports horizontal alignment
   - Text decoration is limited to underline and strikethrough

2. **Font Properties**
   - Default font family is Inter
   - Font weights map to specific styles in the font family
   - Custom font families must be available in Figma

3. **Border Properties**
   - Border width values are in pixels
   - Border radius can be applied to all corners or individual corners
   - Border styles are limited to solid, dashed, and dotted

4. **Performance Considerations**
   - Use preset values when possible for better performance
   - Avoid excessive use of arbitrary values
   - Consider using design tokens for consistent styling 

## Color System

### Preset Colors

#### Gray Scale
```typescript
gray-50        → { r: 0.98, g: 0.98, b: 0.98 }
gray-100       → { r: 0.95, g: 0.96, b: 0.96 }
gray-200       → { r: 0.90, g: 0.91, b: 0.92 }
gray-300       → { r: 0.82, g: 0.84, b: 0.86 }
gray-400       → { r: 0.61, g: 0.64, b: 0.69 }
gray-500       → { r: 0.42, g: 0.45, b: 0.50 }
gray-600       → { r: 0.29, g: 0.33, b: 0.39 }
gray-700       → { r: 0.22, g: 0.25, b: 0.32 }
gray-800       → { r: 0.12, g: 0.16, b: 0.22 }
gray-900       → { r: 0.07, g: 0.09, b: 0.15 }
```

#### Blue Scale
```typescript
blue-50        → { r: 0.94, g: 0.96, b: 1.00 }
blue-100       → { r: 0.86, g: 0.92, b: 1.00 }
blue-200       → { r: 0.75, g: 0.86, b: 1.00 }
blue-300       → { r: 0.58, g: 0.77, b: 0.99 }
blue-400       → { r: 0.38, g: 0.65, b: 0.98 }
blue-500       → { r: 0.23, g: 0.51, b: 0.96 }
blue-600       → { r: 0.15, g: 0.39, b: 0.92 }
blue-700       → { r: 0.11, g: 0.31, b: 0.85 }
blue-800       → { r: 0.12, g: 0.25, b: 0.69 }
blue-900       → { r: 0.12, g: 0.23, b: 0.54 }
```

#### Red Scale
```typescript
red-50         → { r: 1.00, g: 0.95, b: 0.95 }
red-100        → { r: 1.00, g: 0.89, b: 0.89 }
red-200        → { r: 1.00, g: 0.79, b: 0.79 }
red-300        → { r: 0.99, g: 0.65, b: 0.65 }
red-400        → { r: 0.97, g: 0.44, b: 0.44 }
red-500        → { r: 0.94, g: 0.27, b: 0.27 }
red-600        → { r: 0.86, g: 0.15, b: 0.15 }
red-700        → { r: 0.73, g: 0.11, b: 0.11 }
red-800        → { r: 0.60, g: 0.11, b: 0.11 }
red-900        → { r: 0.50, g: 0.11, b: 0.11 }
```

#### Green Scale
```typescript
green-50       → { r: 0.94, g: 0.99, b: 0.96 }
green-100      → { r: 0.86, g: 0.99, b: 0.91 }
green-200      → { r: 0.73, g: 0.97, b: 0.82 }
green-300      → { r: 0.53, g: 0.94, b: 0.67 }
green-400      → { r: 0.29, g: 0.87, b: 0.50 }
green-500      → { r: 0.13, g: 0.77, b: 0.37 }
green-600      → { r: 0.09, g: 0.64, b: 0.29 }
green-700      → { r: 0.08, g: 0.50, b: 0.24 }
green-800      → { r: 0.09, g: 0.40, b: 0.20 }
green-900      → { r: 0.08, g: 0.33, b: 0.18 }
```

#### Purple Scale
```typescript
purple-50      → { r: 0.98, g: 0.96, b: 1.00 }
purple-100     → { r: 0.95, g: 0.91, b: 1.00 }
purple-200     → { r: 0.91, g: 0.84, b: 1.00 }
purple-300     → { r: 0.85, g: 0.71, b: 1.00 }
purple-400     → { r: 0.75, g: 0.52, b: 0.99 }
purple-500     → { r: 0.66, g: 0.33, b: 0.97 }
purple-600     → { r: 0.58, g: 0.20, b: 0.92 }
purple-700     → { r: 0.49, g: 0.13, b: 0.81 }
purple-800     → { r: 0.42, g: 0.13, b: 0.66 }
purple-900     → { r: 0.35, g: 0.11, b: 0.53 }
```

### Usage Examples

1. **Text Colors**
```typescript
// Preset Colors
text-gray-500   → fills: [{ type: "SOLID", color: { r: 0.42, g: 0.45, b: 0.50 } }]
text-blue-600   → fills: [{ type: "SOLID", color: { r: 0.15, g: 0.39, b: 0.92 } }]
text-red-700    → fills: [{ type: "SOLID", color: { r: 0.73, g: 0.11, b: 0.11 } }]

// Arbitrary Colors
text-[#FF0000]  → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
```

2. **Border Colors**
```typescript
// Preset Colors
border-gray-200 → strokes: [{ type: "SOLID", color: { r: 0.90, g: 0.91, b: 0.92 } }]
border-blue-400 → strokes: [{ type: "SOLID", color: { r: 0.38, g: 0.65, b: 0.98 } }]
border-red-300  → strokes: [{ type: "SOLID", color: { r: 0.99, g: 0.65, b: 0.65 } }]

// Arbitrary Colors
border-[#00FF00] → strokes: [{ type: "SOLID", color: { r: 0, g: 1, b: 0 } }]
```

3. **Combined Usage**
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "bg-white border border-gray-200 text-gray-800"
}
```

### Notes and Constraints

1. **Color Format**
   - Preset colors are pre-defined with specific RGB values
   - All RGB values are normalized to 0-1 range
   - Alpha channel is optional and defaults to 1

2. **Color Scales**
   - Each color has 10 shades (50-900)
   - Lower numbers are lighter shades
   - Higher numbers are darker shades

3. **Usage Guidelines**
   - Use preset colors for consistent design system
   - Use arbitrary colors only when needed
   - Consider accessibility when choosing colors

4. **Performance**
   - Preset colors are optimized for performance
   - Arbitrary colors require additional parsing
   - Use preset colors when possible

## Auto Layout System

### Layout Properties

#### Layout Mode
```typescript
// Direction
flex-row        → layoutMode: "HORIZONTAL"
flex-col        → layoutMode: "VERTICAL"

// Wrapping
flex-wrap       → layoutWrap: "WRAP"
flex-nowrap     → layoutWrap: "NO_WRAP"
```

#### Alignment
```typescript
// Primary Axis (Main Axis)
justify-start   → primaryAxisAlignItems: "MIN"
justify-center  → primaryAxisAlignItems: "CENTER"
justify-end     → primaryAxisAlignItems: "MAX"
justify-between → primaryAxisAlignItems: "SPACE_BETWEEN"

// Counter Axis (Cross Axis)
items-start     → counterAxisAlignItems: "MIN"
items-center    → counterAxisAlignItems: "CENTER"
items-end       → counterAxisAlignItems: "MAX"
items-baseline  → counterAxisAlignItems: "BASELINE"
```

#### Spacing
```typescript
// Gap
gap-[16]       → itemSpacing: 16, counterAxisSpacing: 16
gap-x-[16]     → itemSpacing: 16 (in HORIZONTAL layout)
gap-y-[16]     → counterAxisSpacing: 16 (in VERTICAL layout)

// Gap Overriding Rules
// 1. Basic gap sets both directions
gap-[16]       → itemSpacing: 16, counterAxisSpacing: 16
// 2. Directional gaps override basic gap
gap-[16] gap-x-[24]      → itemSpacing: 24, counterAxisSpacing: 16
gap-[16] gap-y-[32]      → itemSpacing: 16, counterAxisSpacing: 32
// 3. Multiple gaps are processed in order
gap-[16] gap-x-[24] gap-y-[32]  → itemSpacing: 24, counterAxisSpacing: 32

// Padding
p-[16]         → padding: 16 (all sides)
px-[16]        → paddingLeft: 16, paddingRight: 16
py-[16]        → paddingTop: 16, paddingBottom: 16
pt-[16]        → paddingTop: 16
pr-[16]        → paddingRight: 16
pb-[16]        → paddingBottom: 16
pl-[16]        → paddingLeft: 16
```

#### Sizing
```typescript
// Width
w-auto         → layoutSizingHorizontal: "HUG"
w-full         → layoutSizingHorizontal: "FILL"
w-[100]        → width: 100

// Height
h-auto         → layoutSizingVertical: "HUG"
h-full         → layoutSizingVertical: "FILL"
h-[100]        → height: 100
```

### Usage Examples

1. **Basic Auto Layout**
```typescript
{
  "type": "FRAME",
  "name": "Container",
  "styles": "flex-col items-center gap-[16]"
}
```

2. **Complex Layout**
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "flex-row justify-between items-center p-[16] w-full"
}
```

3. **Nested Layouts**
```typescript
{
  "type": "FRAME",
  "name": "Section",
  "styles": "flex-col gap-[24]",
  "children": [
    {
      "type": "FRAME",
      "name": "Header",
      "styles": "flex-row justify-between items-center w-full"
    }
  ]
}
```

### Notes and Constraints

1. **Layout Mode**
   - Only supports HORIZONTAL or VERTICAL direction
   - Cannot mix different layout modes in the same container
   - Wrap only works in the primary axis direction

2. **Alignment**
   - Primary axis alignment affects the main layout direction
   - Counter axis alignment affects the perpendicular direction
   - Baseline alignment only works with text elements

3. **Spacing**
   - Gap values follow a specific override pattern:
     * Basic gap (`gap-[value]`) sets both item and counter-axis spacing
     * Directional gaps (`gap-x-[value]`, `gap-y-[value]`) override the respective direction
     * Later gap declarations override earlier ones in the same direction
   - Gap is always uniform between elements
   - Padding can be applied independently to each side
   - All spacing values are in pixels

4. **Sizing**
   - HUG fits the content size
   - FILL takes up remaining space
   - Fixed sizes override layout sizing
   - Parent must have a layout mode for FILL to work

5. **Performance Considerations**
   - Deeply nested auto layouts may impact performance
   - Use fixed sizes when possible for better performance
   - Limit the use of complex padding combinations

### Value Parsing Rules

#### Unit Handling
```typescript
// Pixel Units
w-[100px]      → width: 100       // px is automatically stripped
h-[24px]       → height: 24
gap-[16px]     → itemSpacing: 16
p-[32px]       → padding: 32

// Numbers Only
w-[100]        → width: 100       // same as w-[100px]
h-[24]         → height: 24
gap-[16]       → itemSpacing: 16
p-[32]         → padding: 32

// Preset Values
gap-4          → itemSpacing: 16  // preset values are multiplied by 4
p-4            → padding: 16
```

#### Preset Value Map
```typescript
// Standard spacing scale
'0': 0,        // gap-0, p-0
'1': 4,        // gap-1, p-1
'2': 8,        // gap-2, p-2
'3': 12,       // gap-3, p-3
'4': 16,       // gap-4, p-4
'5': 20,       // gap-5, p-5
'6': 24,       // gap-6, p-6
'8': 32,       // gap-8, p-8
'10': 40,      // gap-10, p-10
'12': 48,      // gap-12, p-12
'16': 64       // gap-16, p-16
```

### Value Processing Rules

1. **Arbitrary Values**
   - Values in square brackets `[value]` are processed as arbitrary values
   - Units (px) are automatically stripped if present
   - Negative values are allowed for certain properties
   - Decimal values are supported

2. **Preset Values**
   - Preset values follow a consistent scale (multiplied by 4)
   - No units should be specified for preset values
   - Limited to predefined set of values
   - More performant than arbitrary values

3. **Value Inheritance**
   - Later values override earlier values for the same property
   - Direction-specific values (x/y) override general values
   - Property-specific values override shorthand values

4. **Error Handling**
   - Invalid values are ignored
   - Missing units default to pixels
   - Invalid preset values return null
   - Malformed arbitrary values return null

6. **Value Processing**
   - Always prefer preset values over arbitrary values when possible
   - Use arbitrary values only when preset values don't meet requirements
   - Be consistent with unit usage (prefer omitting px for cleaner code)
   - Consider using variables for frequently reused arbitrary values

7. **Error Prevention**
   - Validate values before processing
   - Check for valid units and formats
   - Handle edge cases (negative values, decimals)
   - Consider adding type checking in development