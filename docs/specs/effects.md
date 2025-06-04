# Effects Specification

This specification covers shadows, blur effects, and opacity properties for Figma nodes.

## Shadow Effects

### Drop Shadow
```typescript
// Basic drop shadows
shadow           → effects: [{ type: "DROP_SHADOW", offset: { x: 0, y: 1 }, radius: 3, color: rgba(0,0,0,0.1) }]
shadow-sm        → effects: [{ type: "DROP_SHADOW", offset: { x: 0, y: 1 }, radius: 2, color: rgba(0,0,0,0.05) }]
shadow-md        → effects: [{ type: "DROP_SHADOW", offset: { x: 0, y: 4 }, radius: 6, color: rgba(0,0,0,0.1) }]
shadow-lg        → effects: [{ type: "DROP_SHADOW", offset: { x: 0, y: 10 }, radius: 15, color: rgba(0,0,0,0.1) }]
shadow-xl        → effects: [{ type: "DROP_SHADOW", offset: { x: 0, y: 20 }, radius: 25, color: rgba(0,0,0,0.1) }]
shadow-2xl       → effects: [{ type: "DROP_SHADOW", offset: { x: 0, y: 25 }, radius: 50, color: rgba(0,0,0,0.25) }]

// No shadow
shadow-none      → effects: [] (removes all shadow effects)
```

### Inner Shadow
```typescript
// Inner shadows
shadow-inner     → effects: [{ type: "INNER_SHADOW", offset: { x: 0, y: 2 }, radius: 4, color: rgba(0,0,0,0.06) }]
shadow-inner-sm  → effects: [{ type: "INNER_SHADOW", offset: { x: 0, y: 1 }, radius: 2, color: rgba(0,0,0,0.05) }]
shadow-inner-lg  → effects: [{ type: "INNER_SHADOW", offset: { x: 0, y: 4 }, radius: 8, color: rgba(0,0,0,0.1) }]
```

### Custom Shadows
```typescript
// Custom shadow parameters
shadow-[0_4px_6px_rgba(0,0,0,0.1)]     → effects: [{ 
  type: "DROP_SHADOW", 
  offset: { x: 0, y: 4 }, 
  radius: 6, 
  color: { r: 0, g: 0, b: 0, a: 0.1 }
}]

shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] → effects: [{ 
  type: "INNER_SHADOW", 
  offset: { x: 0, y: 2 }, 
  radius: 4, 
  color: { r: 0, g: 0, b: 0, a: 0.1 }
}]
```

### Colored Shadows
```typescript
// Colored drop shadows
shadow-red-500        → effects: [{ type: "DROP_SHADOW", color: { r: 0.94, g: 0.27, b: 0.27, a: 0.5 } }]
shadow-blue-500/25    → effects: [{ type: "DROP_SHADOW", color: { r: 0.23, g: 0.51, b: 0.97, a: 0.25 } }]
shadow-[#FF0000]      → effects: [{ type: "DROP_SHADOW", color: { r: 1, g: 0, b: 0, a: 0.5 } }]
```

### Multiple Shadows
```typescript
// Layered shadows (multiple effects)
shadow-sm shadow-lg   → effects: [
  { type: "DROP_SHADOW", offset: { x: 0, y: 1 }, radius: 2, color: rgba(0,0,0,0.05) },
  { type: "DROP_SHADOW", offset: { x: 0, y: 10 }, radius: 15, color: rgba(0,0,0,0.1) }
]
```

## Blur Effects

### Background Blur
```typescript
// Backdrop blur (for overlays)
backdrop-blur-none   → effects: []
backdrop-blur-sm     → effects: [{ type: "BACKGROUND_BLUR", radius: 4 }]
backdrop-blur        → effects: [{ type: "BACKGROUND_BLUR", radius: 8 }]
backdrop-blur-md     → effects: [{ type: "BACKGROUND_BLUR", radius: 12 }]
backdrop-blur-lg     → effects: [{ type: "BACKGROUND_BLUR", radius: 16 }]
backdrop-blur-xl     → effects: [{ type: "BACKGROUND_BLUR", radius: 24 }]
backdrop-blur-2xl    → effects: [{ type: "BACKGROUND_BLUR", radius: 40 }]
backdrop-blur-3xl    → effects: [{ type: "BACKGROUND_BLUR", radius: 64 }]

// Custom blur radius
backdrop-blur-[10]   → effects: [{ type: "BACKGROUND_BLUR", radius: 10 }]
```

### Layer Blur
```typescript
// Object blur (blurs the element itself)
blur-none            → effects: []
blur-sm              → effects: [{ type: "LAYER_BLUR", radius: 4 }]
blur                 → effects: [{ type: "LAYER_BLUR", radius: 8 }]
blur-md              → effects: [{ type: "LAYER_BLUR", radius: 12 }]
blur-lg              → effects: [{ type: "LAYER_BLUR", radius: 16 }]
blur-xl              → effects: [{ type: "LAYER_BLUR", radius: 24 }]
blur-2xl             → effects: [{ type: "LAYER_BLUR", radius: 40 }]
blur-3xl             → effects: [{ type: "LAYER_BLUR", radius: 64 }]

// Custom blur radius
blur-[15]            → effects: [{ type: "LAYER_BLUR", radius: 15 }]
```

## Opacity

### Element Opacity
```typescript
// Opacity levels
opacity-0            → opacity: 0
opacity-5            → opacity: 0.05
opacity-10           → opacity: 0.1
opacity-20           → opacity: 0.2
opacity-25           → opacity: 0.25
opacity-30           → opacity: 0.3
opacity-40           → opacity: 0.4
opacity-50           → opacity: 0.5
opacity-60           → opacity: 0.6
opacity-70           → opacity: 0.7
opacity-75           → opacity: 0.75
opacity-80           → opacity: 0.8
opacity-90           → opacity: 0.9
opacity-95           → opacity: 0.95
opacity-100          → opacity: 1

// Custom opacity
opacity-[0.15]       → opacity: 0.15
opacity-[67%]        → opacity: 0.67
```

## Blend Modes

### Blend Mode Effects
```typescript
// Normal blending
blend-normal         → blendMode: "NORMAL"

// Multiply group
blend-multiply       → blendMode: "MULTIPLY"
blend-screen         → blendMode: "SCREEN"
blend-overlay        → blendMode: "OVERLAY"

// Light group
blend-soft-light     → blendMode: "SOFT_LIGHT"
blend-hard-light     → blendMode: "HARD_LIGHT"

// Inversion group
blend-color-dodge    → blendMode: "COLOR_DODGE"
blend-color-burn     → blendMode: "COLOR_BURN"
blend-darken         → blendMode: "DARKEN"
blend-lighten        → blendMode: "LIGHTEN"

// Component group
blend-difference     → blendMode: "DIFFERENCE"
blend-exclusion      → blendMode: "EXCLUSION"

// Color group
blend-hue            → blendMode: "HUE"
blend-saturation     → blendMode: "SATURATION"
blend-color          → blendMode: "COLOR"
blend-luminosity     → blendMode: "LUMINOSITY"
```

## Variable Binding

### Effect Variables
```typescript
// Shadow color binding (actual implementation)
shadow-color-$[color/shadow] → effects: [{ 
  type: "DROP_SHADOW",
  boundVariables: { 
    color: { type: "VARIABLE_ALIAS", id: "color/shadow" } 
  }
}]

// Opacity binding
opacity-$[opacity/modal]     → boundVariables: {
  opacity: { type: "VARIABLE_ALIAS", id: "opacity/modal" }
}

// Shadow binding (full shadow configuration)
shadow-$[effects/shadow/lg]  → effects: [{ 
  type: "DROP_SHADOW",
  boundVariables: { 
    boxShadow: { type: "VARIABLE_ALIAS", id: "effects/shadow/lg" } 
  }
}]
```

## Usage Examples

### Card with Drop Shadow
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "bg-white rounded-lg shadow-lg"
}
// Result:
// effects: [{ 
//   type: "DROP_SHADOW", 
//   offset: { x: 0, y: 10 }, 
//   radius: 15, 
//   color: { r: 0, g: 0, b: 0, a: 0.1 } 
// }]
```

### Modal Overlay with Backdrop Blur
```typescript
{
  "type": "FRAME",
  "name": "Overlay",
  "styles": "bg-black/50 backdrop-blur-sm"
}
// Result:
// opacity: 1
// fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 0.5 }]
// effects: [{ type: "BACKGROUND_BLUR", radius: 4 }]
```

### Glowing Button
```typescript
{
  "type": "FRAME",
  "name": "CTA Button",
  "styles": "bg-blue-500 shadow-blue-500/50 shadow-lg"
}
// Result:
// fills: [{ type: "SOLID", color: { r: 0.23, g: 0.51, b: 0.97 } }]
// effects: [{ 
//   type: "DROP_SHADOW", 
//   offset: { x: 0, y: 10 }, 
//   radius: 15, 
//   color: { r: 0.23, g: 0.51, b: 0.97, a: 0.5 } 
// }]
```

### Frosted Glass Effect
```typescript
{
  "type": "FRAME",
  "name": "Glass Panel",
  "styles": "bg-white/20 backdrop-blur-lg border border-white/30"
}
// Result:
// fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.2 }]
// effects: [{ type: "BACKGROUND_BLUR", radius: 16 }]
// strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.3 }]
```

### Layered Shadow Effect
```typescript
{
  "type": "FRAME",
  "name": "Elevated Card",
  "styles": "shadow-sm shadow-md shadow-xl"
}
// Result:
// effects: [
//   { type: "DROP_SHADOW", offset: { x: 0, y: 1 }, radius: 2, color: rgba(0,0,0,0.05) },
//   { type: "DROP_SHADOW", offset: { x: 0, y: 4 }, radius: 6, color: rgba(0,0,0,0.1) },
//   { type: "DROP_SHADOW", offset: { x: 0, y: 20 }, radius: 25, color: rgba(0,0,0,0.1) }
// ]
```

### Blurred Image with Overlay
```typescript
{
  "type": "FRAME",
  "name": "Hero Background",
  "styles": "blur-sm opacity-80 blend-multiply"
}
// Result:
// effects: [{ type: "LAYER_BLUR", radius: 4 }]
// opacity: 0.8
// blendMode: "MULTIPLY"
```

## Effect Combinations

### Override Rules
```typescript
// Later effects override conflicting types
shadow-lg shadow-none     → effects: [] (shadow-none removes all shadows)
blur-lg blur-none         → effects: [] (blur-none removes all blurs)
opacity-50 opacity-80     → opacity: 0.8 (latest value wins)
```

### Additive Rules
```typescript
// Different effect types are additive
shadow-lg blur-sm backdrop-blur-md → effects: [
  { type: "DROP_SHADOW", ... },
  { type: "LAYER_BLUR", radius: 4 },
  { type: "BACKGROUND_BLUR", radius: 12 }
]
```

### Layer Order
```typescript
// Effects are applied in order: shadows → blurs → blend modes
shadow-lg blur-sm blend-multiply → 
// 1. Apply drop shadow
// 2. Apply layer blur
// 3. Apply blend mode
```

## Notes and Constraints

### Shadow Rules
1. **Shadow Stacking**: Multiple shadows are layered from first to last
2. **Color Format**: Shadow colors support rgba values with alpha
3. **Offset Direction**: Positive Y = down, Positive X = right
4. **Inner Shadows**: Rendered inside the element bounds

### Blur Rules
1. **Background Blur**: Only affects content behind the element
2. **Layer Blur**: Blurs the element itself and its contents
3. **Performance**: High blur values impact rendering performance
4. **Blur Limits**: Maximum blur radius varies by platform

### Opacity Rules
1. **Inheritance**: Opacity affects the entire element and its children
2. **Compositing**: Applied after all other visual effects
3. **Interaction**: Low opacity elements may become non-interactive
4. **Performance**: Frequent opacity changes should use transforms

### Blend Mode Rules
1. **Context**: Blend modes affect how element blends with background
2. **Stacking**: Only affects elements in the same stacking context
3. **Performance**: Complex blend modes impact rendering speed
4. **Browser Support**: Some blend modes may not be supported everywhere

### Figma Limitations
1. **Effect Types**: Limited to DROP_SHADOW, INNER_SHADOW, LAYER_BLUR, BACKGROUND_BLUR
2. **Blur Precision**: Blur radius limited to whole numbers
3. **Shadow Count**: Practical limit of ~5-10 shadows per element
4. **Blend Modes**: Limited set compared to CSS blend modes
5. **Effect Ordering**: Fixed order of effect application 