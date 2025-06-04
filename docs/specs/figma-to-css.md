# Figma to CSS Conversion Specification

This document outlines how Figma properties are converted to Tailwind CSS classes in the reverse direction (Figma → CSS).

## Overview

The `figmaToCss()` function takes a Figma node's style properties and converts them to equivalent Tailwind CSS classes. The conversion follows these principles:

1. **Arbitrary Values**: Most properties use arbitrary value syntax `[value]`
2. **Preset Mapping**: Common values are mapped to Tailwind presets when available
3. **Variable Handling**: Figma variables are converted to CSS variable references
4. **Type-Specific Logic**: Different node types (TEXT, FRAME, etc.) have specialized handling

## Function Structure

```typescript
export function figmaToCss(styles: Record<string, any>): string
```

The main function calls these converters in order:
- `convertLayout()` - Auto Layout, sizing, alignment
- `convertColors()` - Fills, backgrounds, text colors
- `convertTypography()` - Text properties, fonts
- `convertEffects()` - Opacity, blur effects
- `convertGeometry()` - Corner radius, geometry
- `convertBorder()` - Strokes and border properties
- `convertShadow()` - Drop shadows and box shadows  
- `convertSpacing()` - Padding, margins
- `convertPosition()` - Absolute positioning, constraints
- `convertSize()` - Min/max width/height

## Layout Conversion

### Auto Layout Properties

```typescript
// Layout Mode
layoutMode: 'HORIZONTAL'    → 'flex-row'
layoutMode: 'VERTICAL'      → 'flex-col'
layoutMode: 'NONE'          → (no class)

// Layout Wrap
layoutWrap: 'WRAP'          → 'wrap'
layoutWrap: 'NO_WRAP'       → (no class - default)

// Layout Growth
layoutGrow: 1               → 'flex-grow'
layoutShrink: 1             → 'flex-shrink'
```

### Sizing Properties

```typescript
// Horizontal Sizing
layoutSizingHorizontal: 'FILL'  → 'w-full'
layoutSizingHorizontal: 'HUG'   → 'w-auto'  
layoutSizingHorizontal: 'FIXED' → 'w-[{width}]'

// Vertical Sizing
layoutSizingVertical: 'FILL'    → 'h-full'
layoutSizingVertical: 'HUG'     → 'h-auto'
layoutSizingVertical: 'FIXED'   → 'h-[{height}]'
```

### Alignment Properties

```typescript
// Primary Axis (justify-*)
primaryAxisAlignItems: 'MIN'           → 'justify-start'
primaryAxisAlignItems: 'CENTER'        → 'justify-center'
primaryAxisAlignItems: 'MAX'           → 'justify-end'
primaryAxisAlignItems: 'SPACE_BETWEEN' → 'justify-between'

// Counter Axis (items-*)
counterAxisAlignItems: 'MIN'      → 'items-start'
counterAxisAlignItems: 'CENTER'   → 'items-center'  
counterAxisAlignItems: 'MAX'      → 'items-end'
counterAxisAlignItems: 'BASELINE' → 'items-baseline'
```

### Spacing Properties

```typescript
// Item Spacing (Gap)
itemSpacing: 16                 → 'gap-[16]'

// Padding (unified vs individual)
paddingTop === paddingRight === paddingBottom === paddingLeft → 'p-[{value}]'

// Individual padding
paddingTop: 16                  → 'pt-[16]'
paddingRight: 16                → 'pr-[16]'
paddingBottom: 16               → 'pb-[16]'
paddingLeft: 16                 → 'pl-[16]'
```

## Color Conversion

### Solid Colors

```typescript
// TEXT nodes
type: 'TEXT' + fills: [{ type: 'SOLID', color: {r,g,b} }] → 'text-[#hexcolor]'

// Other nodes (FRAME, RECTANGLE, etc.)
fills: [{ type: 'SOLID', color: {r,g,b} }] → 'bg-[#hexcolor]'

// With opacity
fills: [{ type: 'SOLID', color: {r,g,b}, opacity: 0.5 }] → 'bg-[#hexcolor]/50'
```

### Gradient Conversions

```typescript
// Linear Gradients
fills: [{
  type: 'GRADIENT_LINEAR',
  gradientTransform: [[1,0,0],[0,1,0]], // to-r
  gradientStops: [
    { position: 0, color: {r:1,g:0,b:0} },
    { position: 1, color: {r:0,g:1,b:0} }
  ]
}] → 'bg-linear-to-r from-[#ff0000] to-[#00ff00]'

// Radial Gradients  
type: 'GRADIENT_RADIAL' → 'bg-radial-at-center'

// Angular/Conic Gradients
type: 'GRADIENT_ANGULAR' → 'bg-conic'
rotation: 45 → 'bg-conic-[45deg]'
```

### Blend Modes

```typescript
// Background blend modes (complete mapping)
blendMode: 'MULTIPLY'     → 'bg-blend-multiply'
blendMode: 'SCREEN'       → 'bg-blend-screen'
blendMode: 'OVERLAY'      → 'bg-blend-overlay'
blendMode: 'DARKEN'       → 'bg-blend-darken'
blendMode: 'LIGHTEN'      → 'bg-blend-lighten'
blendMode: 'COLOR_DODGE'  → 'bg-blend-color-dodge'
blendMode: 'COLOR_BURN'   → 'bg-blend-color-burn'
blendMode: 'HARD_LIGHT'   → 'bg-blend-hard-light'
blendMode: 'SOFT_LIGHT'   → 'bg-blend-soft-light'
blendMode: 'DIFFERENCE'   → 'bg-blend-difference'
blendMode: 'EXCLUSION'    → 'bg-blend-exclusion'
blendMode: 'HUE'          → 'bg-blend-hue'
blendMode: 'SATURATION'   → 'bg-blend-saturation'
blendMode: 'COLOR'        → 'bg-blend-color'
blendMode: 'LUMINOSITY'   → 'bg-blend-luminosity'
blendMode: 'NORMAL'       → (no class - default)
```

## Typography Conversion

### Font Properties

```typescript
// Font Size (with preset mapping)
fontSize: 12    → 'text-xs'
fontSize: 14    → 'text-sm'
fontSize: 16    → 'text-base'
fontSize: 18    → 'text-lg'
fontSize: 20    → 'text-xl'
fontSize: 24    → 'text-2xl'
fontSize: 30    → 'text-3xl'
fontSize: 36    → 'text-4xl'
fontSize: {other} → 'text-[{fontSize}]'

// Font Weight (from fontName.style)
fontName.style: 'Thin'       → 'font-thin'
fontName.style: 'Light'      → 'font-light'  
fontName.style: 'Regular'    → (no class - default)
fontName.style: 'Medium'     → 'font-medium'
fontName.style: 'SemiBold'   → 'font-semibold'
fontName.style: 'Bold'       → 'font-bold'
fontName.style: 'ExtraBold'  → 'font-extrabold'
fontName.style: 'Black'      → 'font-black'

// Font Style
fontName.style includes 'Italic' → 'italic'
```

### Text Alignment

```typescript
// Horizontal Alignment
textAlignHorizontal: 'LEFT'      → 'text-left'
textAlignHorizontal: 'CENTER'    → 'text-center'
textAlignHorizontal: 'RIGHT'     → 'text-right'
textAlignHorizontal: 'JUSTIFIED' → 'text-justify'

// Vertical Alignment
textAlignVertical: 'TOP'    → 'align-top'
textAlignVertical: 'CENTER' → 'align-middle'
textAlignVertical: 'BOTTOM' → 'align-bottom'
```

### Text Properties

```typescript
// Text Transform
textCase: 'UPPER'    → 'uppercase'
textCase: 'LOWER'    → 'lowercase'
textCase: 'TITLE'    → 'capitalize'
textCase: 'ORIGINAL' → (no class - default)

// Text Decoration
textDecoration: 'UNDERLINE'     → 'underline'
textDecoration: 'STRIKETHROUGH' → 'line-through'
textDecoration: 'NONE'          → (no class - default)

// Text Decoration Properties
textDecorationColor: {color}    → 'decoration-[#hexcolor]'
textDecorationStyle: 'SOLID'    → 'decoration-solid'
textDecorationStyle: 'DOUBLE'   → 'decoration-double'
textDecorationStyle: 'DOTTED'   → 'decoration-dotted'
textDecorationStyle: 'DASHED'   → 'decoration-dashed'
textDecorationStyle: 'WAVY'     → 'decoration-wavy'

textDecorationThickness: 'from-font'  → 'decoration-from-font'
textDecorationThickness: {number}     → 'decoration-[{value}px]'
textDecorationOffset: {number}        → 'underline-offset-[{value}px]'
```

### Line Height

```typescript
// Line Height (unit-based)
lineHeight: { value: 100, unit: 'PERCENT' }  → 'leading-none'
lineHeight: { value: 125, unit: 'PERCENT' }  → 'leading-tight'
lineHeight: { value: 150, unit: 'PERCENT' }  → 'leading-normal'
lineHeight: { value: {other}, unit: 'PERCENT' } → 'leading-[{value/100}]'
lineHeight: { value: {pixels}, unit: 'PIXELS' } → 'leading-[{value}px]'
lineHeight: { unit: 'AUTO' }                    → (no class - default)
```

### Letter Spacing

```typescript
// Letter Spacing (with preset mapping)
letterSpacing: -0.4           → 'tracking-tight'
letterSpacing: 0              → 'tracking-normal'
letterSpacing: 0.4            → 'tracking-wide'
letterSpacing: {number}       → 'tracking-[{value}]'

// Letter Spacing with units
letterSpacing: { value: 0, unit: 'PERCENT' }     → (no class - default)
letterSpacing: { value: {n}, unit: 'PERCENT' }   → 'tracking-[{value}%]'
letterSpacing: { value: {n}, unit: 'PIXELS' }    → 'tracking-[{value}px]'
```

### Advanced Text Properties

```typescript
// Text Auto-size
textAutoSize: 'NONE'           → 'text-auto-none'
textAutoSize: 'WIDTH_AND_HEIGHT' → 'text-auto-wh'
textAutoSize: 'TRUNCATE'       → 'text-truncate'
textAutoSize: 'HEIGHT'         → 'text-auto-h'

// Text Wrap
textWrap: 'BALANCE'   → 'text-wrap-balance'
textWrap: 'WRAP'      → 'text-wrap'
textWrap: 'TRUNCATE'  → 'text-wrap-truncate'

// Leading Trim
leadingTrim: 'CAP_HEIGHT' → 'leading-trim-cap'
leadingTrim: 'NONE'       → (no class - default)
```

## Geometry Conversion

### Corner Radius

```typescript
// Corner Radius (with preset mapping)
cornerRadius: 4     → 'rounded-sm'
cornerRadius: 6     → 'rounded-md'
cornerRadius: 8     → 'rounded-lg'
cornerRadius: 12    → 'rounded-xl'
cornerRadius: 16    → 'rounded-2xl'
cornerRadius: 9999  → 'rounded-full'
cornerRadius: {other} → 'rounded-[{value}]'
```

## Border Conversion

### Border Width

```typescript
// Unified Border Width
strokeWeight: 0             → 'border-0'
strokeWeight: 1             → (no class - default)
strokeWeight: {other}       → 'border-[{strokeWeight}]'

// Individual Border Widths
strokeTopWeight: {value}    → 'border-t-[{value}]'
strokeRightWeight: {value}  → 'border-r-[{value}]'
strokeBottomWeight: {value} → 'border-b-[{value}]'
strokeLeftWeight: {value}   → 'border-l-[{value}]'
```

### Border Color

```typescript
// Border Color from strokes
strokes: [{ type: 'SOLID', color: {r,g,b} }] → 'border-[#hexcolor]'

// With opacity
strokes: [{ type: 'SOLID', color: {r,g,b}, opacity: 0.5 }] → 'border-[#hexcolor]/50'
```

### Border Style

```typescript
// Border Style
borderStyle: 'SOLID'  → 'border-solid'
borderStyle: 'DASHED' → 'border-dashed'
borderStyle: 'DOTTED' → 'border-dotted'

// Dash Pattern
dashPattern: [5, 5] → 'border-dashed-[5,5]'
```

### Border Alignment

```typescript
// Stroke Alignment
strokeAlign: 'INSIDE'  → 'border-inset'
strokeAlign: 'OUTSIDE' → 'border-outset'
strokeAlign: 'CENTER'  → (no class - default)
```

## Effects & Shadows

### Opacity

```typescript
// Opacity (with preset mapping)
opacity: 0.0    → 'opacity-0'
opacity: 0.05   → 'opacity-5'
opacity: 0.1    → 'opacity-10'
opacity: 0.2    → 'opacity-20'
opacity: 0.25   → 'opacity-25'
opacity: 0.3    → 'opacity-30'
opacity: 0.4    → 'opacity-40'
opacity: 0.5    → 'opacity-50'
opacity: 0.6    → 'opacity-60'
opacity: 0.7    → 'opacity-70'
opacity: 0.75   → 'opacity-75'
opacity: 0.8    → 'opacity-80'
opacity: 0.9    → 'opacity-90'
opacity: 0.95   → 'opacity-95'
opacity: 1.0    → (no class - default)
opacity: {other} → 'opacity-[{percent}%]'
```

### Blur Effects

```typescript
// Layer Blur (blur filter)
effects: [{ type: 'LAYER_BLUR', radius: 0 }]  → 'blur-none'
effects: [{ type: 'LAYER_BLUR', radius: 4 }]  → 'blur-sm'
effects: [{ type: 'LAYER_BLUR', radius: 8 }]  → 'blur'
effects: [{ type: 'LAYER_BLUR', radius: 12 }] → 'blur-md'
effects: [{ type: 'LAYER_BLUR', radius: 16 }] → 'blur-lg'
effects: [{ type: 'LAYER_BLUR', radius: 24 }] → 'blur-xl'
effects: [{ type: 'LAYER_BLUR', radius: 40 }] → 'blur-2xl'
effects: [{ type: 'LAYER_BLUR', radius: 64 }] → 'blur-3xl'
effects: [{ type: 'LAYER_BLUR', radius: {other} }] → 'blur-[{radius}]'

// Background Blur (backdrop filter)
effects: [{ type: 'BACKGROUND_BLUR', radius: 0 }]  → 'backdrop-blur-none'
effects: [{ type: 'BACKGROUND_BLUR', radius: 4 }]  → 'backdrop-blur-sm'
effects: [{ type: 'BACKGROUND_BLUR', radius: 8 }]  → 'backdrop-blur'
effects: [{ type: 'BACKGROUND_BLUR', radius: 12 }] → 'backdrop-blur-md'
effects: [{ type: 'BACKGROUND_BLUR', radius: 16 }] → 'backdrop-blur-lg'
effects: [{ type: 'BACKGROUND_BLUR', radius: 24 }] → 'backdrop-blur-xl'
effects: [{ type: 'BACKGROUND_BLUR', radius: 40 }] → 'backdrop-blur-2xl'
effects: [{ type: 'BACKGROUND_BLUR', radius: 64 }] → 'backdrop-blur-3xl'
effects: [{ type: 'BACKGROUND_BLUR', radius: {other} }] → 'backdrop-blur-[{radius}]'
```

### Drop Shadows (filter-based)

```typescript
// Preset drop-shadows
effects: [{ type: 'DROP_SHADOW', offset: {x:0,y:1}, radius: 1 }] → 'drop-shadow-sm'
effects: [{ type: 'DROP_SHADOW', offset: {x:0,y:1}, radius: 2 }] → 'drop-shadow'
effects: [{ type: 'DROP_SHADOW', offset: {x:0,y:4}, radius: 6 }] → 'drop-shadow-md'
effects: [{ type: 'DROP_SHADOW', offset: {x:0,y:10}, radius: 15 }] → 'drop-shadow-lg'
effects: [{ type: 'DROP_SHADOW', offset: {x:0,y:20}, radius: 25 }] → 'drop-shadow-xl'
effects: [{ type: 'DROP_SHADOW', offset: {x:0,y:25}, radius: 50 }] → 'drop-shadow-2xl'

// Custom drop-shadow
effects: [{ type: 'DROP_SHADOW', offset: {x,y}, radius, color }] → 'drop-shadow-[{x}_{y}_{radius}_{color}]'
```

### Box Shadows

```typescript
// Preset shadows (with spread values)
effects: [{ type: 'DROP_SHADOW', radius: 2, spread: 0 }]   → 'shadow-sm'
effects: [{ type: 'DROP_SHADOW', radius: 6, spread: -2 }]  → 'shadow-md'
effects: [{ type: 'DROP_SHADOW', radius: 10, spread: -3 }] → 'shadow-lg'
effects: [{ type: 'DROP_SHADOW', radius: 20, spread: -5 }] → 'shadow-xl'
effects: [{ type: 'DROP_SHADOW', radius: 25, spread: -8 }] → 'shadow-2xl'

// Custom box-shadow
effects: [{ type: 'DROP_SHADOW', offset: {x,y}, radius, spread, color }] → 'shadow-[{x}_{y}px_{radius}px_{spread}px_{color}]'
```

## Position & Constraints

### Position Type

```typescript
// Position Type
layoutPositioning: 'ABSOLUTE' → 'absolute'
position: 'FIXED'             → 'fixed'
```

### Constraint-Based Positioning

```typescript
// Horizontal Constraints
constraints.horizontal: 'MIN'     → 'left-[{x}px]' (if x !== 0)
constraints.horizontal: 'MAX'     → 'right-[{x}px]'
constraints.horizontal: 'CENTER'  → 'center-x left-[{calculated}px] right-[{calculated}px]'
constraints.horizontal: 'STRETCH' → 'stretch-x right-[{calculated}px]'
constraints.horizontal: 'SCALE'   → 'scale-x right-[{calculated}px]'

// Vertical Constraints  
constraints.vertical: 'MIN'     → 'top-[{y}px]' (if y !== 0)
constraints.vertical: 'MAX'     → 'bottom-[{y}px]'
constraints.vertical: 'CENTER'  → 'center-y top-[{calculated}px] bottom-[{calculated}px]'
constraints.vertical: 'STRETCH' → 'stretch-y bottom-[{calculated}px]'
constraints.vertical: 'SCALE'   → 'scale-y bottom-[{calculated}px]'
```

### Z-Index

```typescript
// Z-Index (from order property)
order: {number} → 'z-[{number}]' (if !== 0)
```

## Size Constraints

```typescript
// Min/Max Sizes
minWidth: {value}  → 'min-w-[{value}]'
maxWidth: {value}  → 'max-w-[{value}]'
minHeight: {value} → 'min-h-[{value}]'
maxHeight: {value} → 'max-h-[{value}]'
```

## Variable Handling

When Figma variables are bound to properties, they are converted to CSS variable references:

```typescript
// Variable-bound properties use CSS variables
boundVariables: {
  color: { type: 'VARIABLE_ALIAS', id: 'color/primary' }
} → 'text-$[color/primary]' or 'bg-$[color/primary]'
```

## Mixed Values

The converter handles Figma's "mixed" values (when multiple elements have different values):

```typescript
function isMixedValue(value: any): boolean {
  return typeof value === 'symbol' && String(value) === 'Symbol(figma.mixed)';
}

// Mixed values are ignored (no class generated)
```

## Color Utilities

### Color Conversion

```typescript
function colorToHex(color: FigmaColor): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
```

### Gradient Direction Detection

The converter detects gradient directions by comparing transformation matrices:

```typescript
// Transform matrix → Direction mapping
[[1, 0, 0], [0, 1, 0]]      → 'to-r'
[[1, 0, 0], [0, -1, 1]]     → 'to-t'  
[[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0]] → 'to-br'
// ... other directions
```

## Implementation Notes

1. **Mixed Value Handling**: All converters check for Figma's "mixed" values using `isMixedValue()` and skip them
2. **Default Value Handling**: Default values (like `font-normal`, `opacity-100`, `border-center`) are often omitted to keep CSS clean
3. **Arbitrary Value Priority**: Most conversions prefer arbitrary values `[value]` over presets for accuracy
4. **Type-Specific Logic**: TEXT nodes use `text-` prefix, other nodes use `bg-` prefix for colors
5. **Multiple Fills**: The converter handles multiple background fills and their blend modes
6. **Parent Context**: Position calculations consider parent dimensions when available for constraint handling
7. **Effect Type Separation**: DROP_SHADOW effects are handled in `convertShadow()` to avoid conflicts between filter drop-shadow and box-shadow
8. **Percentage Conversion**: Opacity values are converted from 0-1 scale to percentage for Tailwind classes

This conversion system ensures high-fidelity translation from Figma designs to Tailwind CSS while maintaining readability and maintainability of the generated code. 