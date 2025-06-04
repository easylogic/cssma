# Colors Specification

This specification covers the color system, color presets, and color utilities for Figma styles.

## Color Format Support

### Color Input Formats
```typescript
// Hex colors
#FF0000          → { r: 1, g: 0, b: 0 }
#F00             → { r: 1, g: 0, b: 0 }
#FF0000FF        → { r: 1, g: 0, b: 0, a: 1 }

// RGB/RGBA colors
rgb(255, 0, 0)           → { r: 1, g: 0, b: 0 }
rgba(255, 0, 0, 0.5)     → { r: 1, g: 0, b: 0, a: 0.5 }

// HSL/HSLA colors
hsl(0, 100%, 50%)        → { r: 1, g: 0, b: 0 }
hsla(0, 100%, 50%, 0.5)  → { r: 1, g: 0, b: 0, a: 0.5 }

// Named colors
red              → { r: 1, g: 0, b: 0 }
transparent      → { r: 0, g: 0, b: 0, a: 0 }
currentColor     → Inherits from parent text color
```

## Tailwind Color Palette

### Gray Scale
```typescript
// Slate
slate-50    → { r: 0.98, g: 0.98, b: 0.99 }
slate-100   → { r: 0.95, g: 0.96, b: 0.97 }
slate-200   → { r: 0.89, g: 0.91, b: 0.94 }
slate-300   → { r: 0.80, g: 0.84, b: 0.88 }
slate-400   → { r: 0.58, g: 0.64, b: 0.70 }
slate-500   → { r: 0.40, g: 0.46, b: 0.52 }
slate-600   → { r: 0.32, g: 0.37, b: 0.42 }
slate-700   → { r: 0.20, g: 0.25, b: 0.29 }
slate-800   → { r: 0.12, g: 0.16, b: 0.20 }
slate-900   → { r: 0.06, g: 0.08, b: 0.11 }
slate-950   → { r: 0.01, g: 0.04, b: 0.07 }

// Gray
gray-50     → { r: 0.98, g: 0.98, b: 0.98 }
gray-100    → { r: 0.96, g: 0.96, b: 0.96 }
gray-200    → { r: 0.90, g: 0.90, b: 0.90 }
gray-300    → { r: 0.83, g: 0.83, b: 0.83 }
gray-400    → { r: 0.64, g: 0.64, b: 0.64 }
gray-500    → { r: 0.42, g: 0.42, b: 0.42 }
gray-600    → { r: 0.32, g: 0.32, b: 0.32 }
gray-700    → { r: 0.25, g: 0.25, b: 0.25 }
gray-800    → { r: 0.15, g: 0.15, b: 0.15 }
gray-900    → { r: 0.07, g: 0.07, b: 0.07 }
gray-950    → { r: 0.02, g: 0.02, b: 0.02 }
```

### Primary Colors
```typescript
// Red
red-50      → { r: 0.99, g: 0.95, b: 0.95 }
red-100     → { r: 0.99, g: 0.89, b: 0.89 }
red-200     → { r: 0.99, g: 0.80, b: 0.80 }
red-300     → { r: 0.99, g: 0.65, b: 0.65 }
red-400     → { r: 0.96, g: 0.45, b: 0.45 }
red-500     → { r: 0.94, g: 0.27, b: 0.27 }
red-600     → { r: 0.86, g: 0.16, b: 0.16 }
red-700     → { r: 0.73, g: 0.11, b: 0.11 }
red-800     → { r: 0.60, g: 0.11, b: 0.11 }
red-900     → { r: 0.49, g: 0.13, b: 0.13 }
red-950     → { r: 0.27, g: 0.05, b: 0.05 }

// Orange
orange-50   → { r: 1.00, g: 0.97, b: 0.92 }
orange-100  → { r: 1.00, g: 0.93, b: 0.82 }
orange-200  → { r: 0.99, g: 0.85, b: 0.67 }
orange-300  → { r: 0.99, g: 0.73, b: 0.49 }
orange-400  → { r: 0.98, g: 0.58, b: 0.31 }
orange-500  → { r: 0.98, g: 0.46, b: 0.20 }
orange-600  → { r: 0.92, g: 0.34, b: 0.13 }
orange-700  → { r: 0.76, g: 0.25, b: 0.09 }
orange-800  → { r: 0.61, g: 0.20, b: 0.09 }
orange-900  → { r: 0.49, g: 0.18, b: 0.08 }
orange-950  → { r: 0.27, g: 0.08, b: 0.03 }

// Yellow
yellow-50   → { r: 1.00, g: 0.98, b: 0.90 }
yellow-100  → { r: 1.00, g: 0.95, b: 0.74 }
yellow-200  → { r: 1.00, g: 0.90, b: 0.55 }
yellow-300  → { r: 0.99, g: 0.83, b: 0.35 }
yellow-400  → { r: 0.98, g: 0.74, b: 0.18 }
yellow-500  → { r: 0.92, g: 0.64, b: 0.11 }
yellow-600  → { r: 0.78, g: 0.49, b: 0.05 }
yellow-700  → { r: 0.61, g: 0.35, b: 0.04 }
yellow-800  → { r: 0.52, g: 0.30, b: 0.07 }
yellow-900  → { r: 0.44, g: 0.26, b: 0.08 }
yellow-950  → { r: 0.25, g: 0.13, b: 0.02 }
```

### Secondary Colors
```typescript
// Green
green-50    → { r: 0.94, g: 0.99, b: 0.95 }
green-100   → { r: 0.86, g: 0.98, b: 0.88 }
green-200   → { r: 0.73, g: 0.96, b: 0.78 }
green-300   → { r: 0.55, g: 0.93, b: 0.64 }
green-400   → { r: 0.30, g: 0.85, b: 0.46 }
green-500   → { r: 0.13, g: 0.70, b: 0.29 }
green-600   → { r: 0.09, g: 0.58, b: 0.24 }
green-700   → { r: 0.08, g: 0.46, b: 0.22 }
green-800   → { r: 0.09, g: 0.37, b: 0.20 }
green-900   → { r: 0.09, g: 0.31, b: 0.19 }
green-950   → { r: 0.03, g: 0.17, b: 0.09 }

// Blue
blue-50     → { r: 0.94, g: 0.97, b: 1.00 }
blue-100    → { r: 0.86, g: 0.93, b: 0.99 }
blue-200    → { r: 0.73, g: 0.86, b: 0.99 }
blue-300    → { r: 0.58, g: 0.77, b: 0.98 }
blue-400    → { r: 0.38, g: 0.64, b: 0.98 }
blue-500    → { r: 0.23, g: 0.51, b: 0.97 }
blue-600    → { r: 0.15, g: 0.41, b: 0.93 }
blue-700    → { r: 0.11, g: 0.32, b: 0.87 }
blue-800    → { r: 0.12, g: 0.24, b: 0.78 }
blue-900    → { r: 0.14, g: 0.20, b: 0.67 }
blue-950    → { r: 0.09, g: 0.11, b: 0.41 }

// Purple
purple-50   → { r: 0.98, g: 0.95, b: 1.00 }
purple-100  → { r: 0.95, g: 0.89, b: 0.99 }
purple-200  → { r: 0.91, g: 0.78, b: 0.99 }
purple-300  → { r: 0.84, g: 0.62, b: 0.98 }
purple-400  → { r: 0.75, g: 0.42, b: 0.96 }
purple-500  → { r: 0.66, g: 0.32, b: 0.87 }
purple-600  → { r: 0.58, g: 0.25, b: 0.73 }
purple-700  → { r: 0.49, g: 0.20, b: 0.60 }
purple-800  → { r: 0.42, g: 0.16, b: 0.50 }
purple-900  → { r: 0.35, g: 0.15, b: 0.42 }
purple-950  → { r: 0.23, g: 0.08, b: 0.29 }

// Pink
pink-50     → { r: 0.99, g: 0.95, b: 0.98 }
pink-100    → { r: 0.99, g: 0.89, b: 0.95 }
pink-200    → { r: 0.98, g: 0.78, b: 0.91 }
pink-300    → { r: 0.97, g: 0.62, b: 0.83 }
pink-400    → { r: 0.94, g: 0.42, b: 0.70 }
pink-500    → { r: 0.91, g: 0.26, b: 0.57 }
pink-600    → { r: 0.85, g: 0.16, b: 0.47 }
pink-700    → { r: 0.73, g: 0.11, b: 0.40 }
pink-800    → { r: 0.60, g: 0.11, b: 0.34 }
pink-900    → { r: 0.49, g: 0.12, b: 0.29 }
pink-950    → { r: 0.30, g: 0.05, b: 0.16 }
```

## Color Opacity Modifiers

### Opacity Syntax
```typescript
// Color with opacity modifier
red-500/10      → { r: 0.94, g: 0.27, b: 0.27, a: 0.1 }
red-500/25      → { r: 0.94, g: 0.27, b: 0.27, a: 0.25 }
red-500/50      → { r: 0.94, g: 0.27, b: 0.27, a: 0.5 }
red-500/75      → { r: 0.94, g: 0.27, b: 0.27, a: 0.75 }
red-500/90      → { r: 0.94, g: 0.27, b: 0.27, a: 0.9 }

// Custom opacity percentages
blue-600/33     → { r: 0.15, g: 0.41, b: 0.93, a: 0.33 }
green-400/67    → { r: 0.30, g: 0.85, b: 0.46, a: 0.67 }

// Arbitrary color with opacity
[#FF0000]/40    → { r: 1, g: 0, b: 0, a: 0.4 }
[rgb(255,0,0)]/20 → { r: 1, g: 0, b: 0, a: 0.2 }
```

## Color Space Support

### Color Space Conversion
```typescript
// sRGB (default)
rgb(255, 0, 0)           → { r: 1, g: 0, b: 0 }

// Display P3 (when supported)
color(display-p3 1 0 0)  → { r: 1, g: 0, b: 0 } (converted to sRGB)

// HSL conversion
hsl(120, 100%, 50%)      → { r: 0, g: 1, b: 0 }
hsl(240, 100%, 50%)      → { r: 0, g: 0, b: 1 }

// HSB/HSV (Figma native)
hsb(0, 100%, 100%)       → { r: 1, g: 0, b: 0 }
```

## Special Color Values

### Semantic Colors
```typescript
// Basic semantic colors
transparent     → { r: 0, g: 0, b: 0, a: 0 }
current         → Inherits current text color
inherit         → Inherits from parent

// System colors (context-dependent)
canvas          → Background color of canvas
text            → Default text color
accent          → System accent color
```

### CSS Color Keywords
```typescript
// Named CSS colors
aliceblue       → { r: 0.94, g: 0.97, b: 1.00 }
antiquewhite    → { r: 0.98, g: 0.92, b: 0.84 }
aqua            → { r: 0.00, g: 1.00, b: 1.00 }
black           → { r: 0.00, g: 0.00, b: 0.00 }
white           → { r: 1.00, g: 1.00, b: 1.00 }
// ... (140+ named colors supported)
```

## Color Utilities

### Color Manipulation
```typescript
// Brightness modifiers (theoretical - not in current spec)
red-500-lighter     → Lighten red-500 by 10%
red-500-darker      → Darken red-500 by 10%

// Saturation modifiers (theoretical)
blue-500-saturated  → Increase saturation of blue-500
blue-500-desaturated → Decrease saturation of blue-500
```

### Color Validation
```typescript
// Valid color formats
isValidColor("#FF0000")           → true
isValidColor("rgb(255, 0, 0)")    → true
isValidColor("red-500")           → true
isValidColor("invalid-color")     → false

// Color format detection
getColorFormat("#FF0000")         → "hex"
getColorFormat("rgb(255, 0, 0)")  → "rgb"
getColorFormat("red-500")         → "tailwind"
```

## Usage Examples

### Basic Color Usage
```typescript
// Solid colors
{
  "styles": "bg-red-500 text-white border-gray-200"
}
// Result:
// fills: [{ type: "SOLID", color: { r: 0.94, g: 0.27, b: 0.27 } }]
// (text) fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
// strokes: [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }]
```

### Semi-transparent Colors
```typescript
{
  "styles": "bg-black/50 text-white/90 border-red-500/25"
}
// Result:
// fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 0.5 }]
// (text) fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.9 }]
// strokes: [{ type: "SOLID", color: { r: 0.94, g: 0.27, b: 0.27 }, opacity: 0.25 }]
```

### Custom Colors
```typescript
{
  "styles": "bg-[#FF6B35] text-[rgb(255,255,255)] border-[hsl(200,100%,50%)]"
}
// Result:
// fills: [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.21 } }]
// (text) fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
// strokes: [{ type: "SOLID", color: { r: 0, g: 0.75, b: 1 } }]
```

### Gradient Colors
```typescript
{
  "styles": "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
}
// Result:
// fills: [{
//   type: "GRADIENT_LINEAR",
//   gradientStops: [
//     { position: 0, color: { r: 0.66, g: 0.32, b: 0.87 } },
//     { position: 0.5, color: { r: 0.91, g: 0.26, b: 0.57 } },
//     { position: 1, color: { r: 0.94, g: 0.27, b: 0.27 } }
//   ]
// }]
```

## Color Processing Rules

### Color Resolution Order
1. **Variable References**: `{color.primary}` → resolve variable first
2. **Arbitrary Values**: `[#FF0000]` → parse custom color
3. **Tailwind Presets**: `red-500` → lookup in color palette
4. **CSS Keywords**: `red` → convert to RGB values
5. **Fallback**: Invalid colors → transparent or default

### Opacity Handling
1. **Direct Opacity**: `bg-red-500/50` → apply to color fill
2. **Element Opacity**: `opacity-50` → apply to entire element
3. **Color Alpha**: `rgba(255,0,0,0.5)` → embedded in color
4. **Override Priority**: Later declarations override earlier ones

### Color Inheritance
1. **Text Colors**: Inherit from parent when not specified
2. **Current Color**: References current text color
3. **Variable Binding**: Inherits from bound variables
4. **Theme Context**: Respects light/dark mode variables

## Performance Considerations

### Color Optimization
1. **Preset Colors**: Use Tailwind presets for better performance
2. **Color Caching**: Repeated colors are cached internally
3. **Variable References**: Prefer variables for theme consistency
4. **Format Selection**: Simple hex colors parse fastest

### Memory Usage
1. **Color Palette**: Large palettes increase memory usage
2. **Gradient Complexity**: Limit gradient stop count
3. **Alpha Channels**: Semi-transparent colors use more memory
4. **Color Precision**: High precision colors impact performance

## Figma Limitations

### Color Space Constraints
1. **sRGB Only**: Figma operates in sRGB color space
2. **Precision**: Colors limited to 0-1 range with finite precision
3. **Gamut**: Cannot represent colors outside sRGB gamut
4. **Conversion**: Wide gamut colors are converted to sRGB

### API Limitations
1. **Color Format**: All colors normalized to { r, g, b, a } format
2. **Opacity Handling**: Opacity can be on fill or element level
3. **Variable Binding**: Color variables must match expected type
4. **Named Colors**: Limited to supported CSS color keywords 