# Background Specification

This specification covers background colors, gradients, and images for Figma nodes.

## Solid Colors

### Basic Colors
```typescript
// Direct color values
bg-[#FF0000]      → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
bg-[rgb(255,0,0)] → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
bg-[hsl(0,100%,50%)] → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// Tailwind preset colors
bg-transparent   → fills: []
bg-white         → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
bg-black         → fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]
```

### Color Palette
```typescript
// Red
bg-red-50        → fills: [{ type: "SOLID", color: { r: 0.99, g: 0.95, b: 0.95 } }]
bg-red-100       → fills: [{ type: "SOLID", color: { r: 0.99, g: 0.89, b: 0.89 } }]
bg-red-200       → fills: [{ type: "SOLID", color: { r: 0.99, g: 0.80, b: 0.80 } }]
bg-red-300       → fills: [{ type: "SOLID", color: { r: 0.99, g: 0.65, b: 0.65 } }]
bg-red-400       → fills: [{ type: "SOLID", color: { r: 0.96, g: 0.45, b: 0.45 } }]
bg-red-500       → fills: [{ type: "SOLID", color: { r: 0.94, g: 0.27, b: 0.27 } }]
bg-red-600       → fills: [{ type: "SOLID", color: { r: 0.86, g: 0.16, b: 0.16 } }]
bg-red-700       → fills: [{ type: "SOLID", color: { r: 0.73, g: 0.11, b: 0.11 } }]
bg-red-800       → fills: [{ type: "SOLID", color: { r: 0.60, g: 0.11, b: 0.11 } }]
bg-red-900       → fills: [{ type: "SOLID", color: { r: 0.49, g: 0.13, b: 0.13 } }]

// Blue
bg-blue-50       → fills: [{ type: "SOLID", color: { r: 0.94, g: 0.97, b: 1.00 } }]
bg-blue-100      → fills: [{ type: "SOLID", color: { r: 0.86, g: 0.93, b: 0.99 } }]
bg-blue-200      → fills: [{ type: "SOLID", color: { r: 0.73, g: 0.86, b: 0.99 } }]
bg-blue-300      → fills: [{ type: "SOLID", color: { r: 0.58, g: 0.77, b: 0.98 } }]
bg-blue-400      → fills: [{ type: "SOLID", color: { r: 0.38, g: 0.64, b: 0.98 } }]
bg-blue-500      → fills: [{ type: "SOLID", color: { r: 0.23, g: 0.51, b: 0.97 } }]
bg-blue-600      → fills: [{ type: "SOLID", color: { r: 0.15, g: 0.41, b: 0.93 } }]
bg-blue-700      → fills: [{ type: "SOLID", color: { r: 0.11, g: 0.32, b: 0.87 } }]
bg-blue-800      → fills: [{ type: "SOLID", color: { r: 0.12, g: 0.24, b: 0.78 } }]
bg-blue-900      → fills: [{ type: "SOLID", color: { r: 0.14, g: 0.20, b: 0.67 } }]
```

### Opacity
```typescript
// Background with opacity
bg-red-500/50    → fills: [{ 
  type: "SOLID", 
  color: { r: 0.94, g: 0.27, b: 0.27 },
  opacity: 0.5 
}]

bg-[#FF0000]/30  → fills: [{ 
  type: "SOLID", 
  color: { r: 1, g: 0, b: 0 },
  opacity: 0.3 
}]
```

## Gradients

### Linear Gradients
```typescript
// Basic linear gradient
bg-gradient-to-r  → fills: [{ 
  type: "GRADIENT_LINEAR",
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
  gradientStops: [
    { position: 0, color: {...} },
    { position: 1, color: {...} }
  ]
}]

// Gradient directions
bg-gradient-to-t   → transform: [[0, -1, 0], [1, 0, 0]]  // ↑
bg-gradient-to-tr  → transform: [[0.707, -0.707, 0], [0.707, 0.707, 0]]  // ↗
bg-gradient-to-r   → transform: [[1, 0, 0], [0, 1, 0]]  // →
bg-gradient-to-br  → transform: [[0.707, 0.707, 0], [-0.707, 0.707, 0]]  // ↘
bg-gradient-to-b   → transform: [[0, 1, 0], [-1, 0, 0]]  // ↓
bg-gradient-to-bl  → transform: [[-0.707, 0.707, 0], [-0.707, -0.707, 0]]  // ↙
bg-gradient-to-l   → transform: [[-1, 0, 0], [0, -1, 0]]  // ←
bg-gradient-to-tl  → transform: [[-0.707, -0.707, 0], [0.707, -0.707, 0]]  // ↖
```

### Radial Gradients
```typescript
// Radial gradient
bg-gradient-radial → fills: [{ 
  type: "GRADIENT_RADIAL",
  gradientTransform: [[1, 0, 0.5], [0, 1, 0.5]],
  gradientStops: [...]
}]

// Conic gradient (Diamond in Figma)
bg-gradient-conic → fills: [{ 
  type: "GRADIENT_DIAMOND",
  gradientTransform: [[1, 0, 0.5], [0, 1, 0.5]],
  gradientStops: [...]
}]
```

### Gradient Colors
```typescript
// Multi-color gradients
from-red-500      → gradientStops[0].color = { r: 0.94, g: 0.27, b: 0.27 }
via-yellow-500    → gradientStops[1].color = { r: 0.98, g: 0.82, b: 0.18 }
to-blue-500       → gradientStops[2].color = { r: 0.23, g: 0.51, b: 0.97 }

// Simple two-color gradient
from-red-500 to-blue-500 → [
  { position: 0, color: { r: 0.94, g: 0.27, b: 0.27 } },
  { position: 1, color: { r: 0.23, g: 0.51, b: 0.97 } }
]
```

### Gradient Stops
```typescript
// Custom stop positions
from-red-500 via-yellow-500 to-blue-500 → [
  { position: 0, color: red },
  { position: 0.5, color: yellow },
  { position: 1, color: blue }
]

// Multiple via stops
from-red-500 via-30% via-yellow-500 via-70% to-blue-500 → [
  { position: 0, color: red },
  { position: 0.3, color: yellow },
  { position: 0.7, color: yellow },
  { position: 1, color: blue }
]
```

## Advanced Patterns

### Multiple Backgrounds
```typescript
// Multiple fill layers (last one on top)
bg-red-500 bg-gradient-to-r → fills: [
  { type: "SOLID", color: red },
  { type: "GRADIENT_LINEAR", ... }
]
```

### Pattern Fills
```typescript
// Using SVG patterns (converted to image fills)
bg-[url('data:image/svg+xml,...')] → fills: [{
  type: "IMAGE",
  scaleMode: "TILE",
  imageHash: "...",
  scalingFactor: 1
}]
```

## Variable Binding

### Color Variables
```typescript
// Figma variable references (actual implementation)
bg-$[color/primary]    → fills: [{ 
  type: "SOLID", 
  boundVariables: { 
    color: { type: "VARIABLE_ALIAS", id: "color/primary" } 
  }
}]

bg-$[color/brand]/50   → fills: [{ 
  type: "SOLID",
  boundVariables: { 
    color: { type: "VARIABLE_ALIAS", id: "color/brand" } 
  },
  opacity: 0.5
}]
```

## Usage Examples

### Basic Solid Background
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "bg-white"
}
// Result:
// fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
```

### Gradient Background
```typescript
{
  "type": "FRAME",
  "name": "Hero",
  "styles": "bg-gradient-to-r from-purple-500 to-pink-500"
}
// Result:
// fills: [{
//   type: "GRADIENT_LINEAR",
//   gradientTransform: [[1, 0, 0], [0, 1, 0]],
//   gradientStops: [
//     { position: 0, color: { r: 0.66, g: 0.32, b: 0.87 } },
//     { position: 1, color: { r: 0.93, g: 0.36, b: 0.65 } }
//   ]
// }]
```

### Semi-transparent Background
```typescript
{
  "type": "FRAME",
  "name": "Overlay",
  "styles": "bg-black/50"
}
// Result:
// fills: [{ 
//   type: "SOLID", 
//   color: { r: 0, g: 0, b: 0 },
//   opacity: 0.5 
// }]
```

## Notes and Constraints

### Color Processing Rules
1. **Color Format**: All colors are normalized to 0-1 range
2. **Multiple Backgrounds**: Later declarations add new fill layers
3. **Opacity Override**: Opacity modifiers override existing opacity
4. **Transparent**: `bg-transparent` removes all fills

### Gradient Rules
1. **Direction**: Must specify direction for linear gradients
2. **Color Stops**: Minimum 2 stops required
3. **Position Calculation**: Via stops default to middle positions
4. **Transform Matrix**: Calculated based on direction and size

### Performance Considerations
1. **Simple Colors**: Use solid fills when possible
2. **Gradient Complexity**: Limit number of gradient stops
3. **Variable Binding**: Prefer variables for theme consistency
4. **Multiple Fills**: Avoid excessive layering

### Figma Limitations
1. **Gradient Types**: Limited to LINEAR, RADIAL, ANGULAR, DIAMOND
2. **Stop Count**: Practical limit of ~10 gradient stops
3. **Image Fills**: Require uploaded images or data URLs
4. **Pattern Support**: Limited pattern fill capabilities 